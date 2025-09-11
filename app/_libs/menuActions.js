"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "./supabase";
import { auth } from "./auth";
import { nanoid } from "nanoid";

export async function getMenus(filter, sortBy, page) {
  const pageSize = Number(process.env.NEXT_PUBLIC_PAGE_SIZE) || 10;

  let categoryId;
  // FILTER
  // Step 1: Resolve category name to ID
  if (filter && filter !== "all") {
    const { data: categoryData, error: categoryError } = await supabase
      .from("category")
      .select("id")
      .eq("name", filter)
      .single();

    if (categoryError)
      throw new Error(`Category not found: ${categoryError.message}`);

    categoryId = categoryData.id;
  }

  // Step 2: Get menus
  let query = supabase
    .from("menus")
    .select("*, category(*)", { count: "exact" });

  if (categoryId) {
    query = query.eq("categoryId", categoryId);
  }

  // SORT-BY
  // Step 3: If sorting by menu field, apply server-side sort
  if (sortBy?.field && sortBy.field !== "category.name") {
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });
  }

  //PAGINATION

  if (page) {
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;
  if (error) throw new Error(`Menu could not be loaded: ${error.message}`);

  return { data, count };
}

export async function getMenuById(id) {
  const { data, error } = await supabase
    .from("menus")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error(`Menu could not be loaded: ${error.message}`);
  return data;
}

export async function deleteMenuById(menuId) {
  const { error } = await supabase
    .from("menus")
    .delete()
    .eq("id", menuId)
    .single();

  if (error) throw new Error(`Menu could not be delete: ${error.message}`);

  revalidatePath("/cart");
  return true;
}

export async function createMenu(product) {
  const session = await auth();
  if (session?.user?.role !== "admin") {
    throw new Error("User is not authorized");
  }

  let imageUrl = null;

  // 1. Upload image if provided
  if (product.image && product.image[0]) {
    const file = product.image[0];
    const fileName = `${nanoid(10)}-${file.name}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("menu-image") // 👈 bucket name
      .upload(fileName, file);

    if (uploadError) throw new Error(uploadError.message);

    // 2. Get public URL
    const { data: publicUrl } = supabase.storage
      .from("menu-image")
      .getPublicUrl(fileName);

    imageUrl = publicUrl.publicUrl;
  }

  // 3. Insert product into DB
  const { data, error } = await supabase
    .from("menus")
    .insert([
      {
        name: product.name,
        category: product.category,
        base_price: product.base_price,
        size: product.sizes,
        toppings: product.toppings,
        ingredients: product.ingredients,
        // image: imageUrl, // ✅ uploaded image URL
        available: product.available ?? true, // optional
      },
    ])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}
