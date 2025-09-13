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
    .select("*, category(*)")
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
  //1) check if user is equal to Admin.
  const session = await auth();
  if (session?.user?.role !== "admin") {
    throw new Error("User is not authorized");
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

  //2) Generate a unique image name if it's a File
  const imageName = `${nanoid(10)}-${product.image?.name}`.replaceAll("/", "");

  //3)   Build image path
  const imagePath = `${supabaseUrl}/storage/v1/object/public/menu-image/${imageName}`;

  //4) Insert product into DB
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
        image: imagePath,
        discount: product.discount,
        is_available: product.available ?? true, // optional
      },
    ])
    .select()
    .single();

  if (error) throw new Error("Menu could not be created");

  //5) Upload new image to Supabase storage
  if (imageName) {
    const { error: storageError } = await supabase.storage
      .from("menu-image")
      .upload(imageName, product.image, { upsert: false });

    if (storageError) {
      await supabase.from("menus").delete().eq("id", data.id);
      throw new Error(
        `Image upload failed: ${storageError.message}, Menu was deleted.`
      );
    }
  }

  //6) return and revalidate-path
  revalidatePath("/admin/products");
  return data;
}

// export async function createEditCategory(newCategory, id) {
//   const session = await auth();
//   if (session?.user?.role !== "admin") {
//     throw new Error("User is not authorized");
//   }

//   const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

//   // If the image is already a URL
//   const hasImagePath = newCategory.image?.startsWith?.("http");

//   // Generate a unique image name if it's a File
//   const imageName = hasImagePath
//     ? null
//     : `${nanoid(10)}-${newCategory.image?.name}`.replaceAll("/", "");

//   // Build image path
//   const imagePath = hasImagePath
//     ? newCategory.image
//     : `${supabaseUrl}/storage/v1/object/public/category-image/${imageName}`;

//   let query = supabase.from("category");

//   if (!id) {
//     // CREATE
//     query = query
//       .insert([{ name: newCategory.name, image: imagePath }])
//       .select()
//       .single();
//   } else {
//     // EDIT
//     query = query
//       .update({ name: newCategory.name, image: imagePath })
//       .eq("id", id)
//       .select()
//       .single();
//   }

//   const { data, error } = await query;
//   if (error) throw new Error("Category could not be created/updated");

//   // If image is already hosted, return
//   if (hasImagePath) {
//     revalidatePath("/admin/category");
//     return data;
//   }

//   // Upload new image to Supabase storage
//   const { error: storageError } = await supabase.storage
//     .from("category-image")
//     .upload(imageName, newCategory.image);

//   if (storageError) {
//     // Rollback the DB insert if image upload failed
//     await supabase.from("category").delete().eq("id", data.id);
//     throw new Error(
//       `Image upload failed: ${storageError.message}, category was deleted.`
//     );
//   }

//   revalidatePath("/admin/category");
//   return data;
// }
