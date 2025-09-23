"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "./supabase";
import { auth } from "./auth";
import { nanoid } from "nanoid";
import { getCategoryIdByName } from "./categoryActions";

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

  // fetch categoryId by Name

  const categoryId = await getCategoryIdByName(product.category);

  //5) Insert product into DB
  const { data, error } = await supabase
    .from("menus")
    .insert([
      {
        name: product.name,
        categoryId,
        base_price: product.base_price,
        size: JSON.parse(product.sizes),
        toppings: JSON.parse(product.toppings),
        ingredients: product.ingredients,
        image: imagePath,
        discount: product.discount,
        is_available: product.available ?? true, // optional
      },
    ])
    .select()
    .single();

  if (error) throw new Error("Menu could not be created");

  //6) Upload new image to Supabase storage
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

  //7) return and revalidate-path
  revalidatePath("/admin/products");
  return data;
}
export async function editMenuById(editedMenu, menuId) {
  const session = await auth();
  if (session?.user?.role !== "admin") {
    throw new Error("User is not authorized");
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

  const file = editedMenu.image instanceof File ? editedMenu.image : null;

  let imagePath = null;
  let imageName = null;

  if (file) {
    imageName = `${nanoid(10)}-${file.name}`.replaceAll("/", "");
    imagePath = `${supabaseUrl}/storage/v1/object/public/menu-image/${imageName}`;
  } else if (typeof editedMenu.image === "string") {
    imagePath = editedMenu.image;
  }

  const normalizedCategory = editedMenu.category?.replace("_", " ");
  const categoryId = await getCategoryIdByName(normalizedCategory);

  const updatePayload = {
    name: editedMenu.name,
    category_id: categoryId,
    base_price: Number(editedMenu.base_price) || 0,
    size: Array.isArray(editedMenu.sizes) ? editedMenu.sizes : null,
    toppings: Array.isArray(editedMenu.toppings) ? editedMenu.toppings : null,
    ingredients: editedMenu.ingredients || "",
    image: imagePath,
    discount: Number(editedMenu.discount) || 0,
    is_available: Boolean(editedMenu.available),
  };

  console.log("🔍 Updating menu with ID:", menuId);
  console.log("Update payload:", updatePayload);

  const { data, error } = await supabase
    .from("menu")
    .update(updatePayload)
    .eq("id", menuId)
    .select();

  if (error) {
    console.error("❌ Supabase update error:", error);
    throw new Error(
      "Menu update failed: " + (error.message || JSON.stringify(error))
    );
  }

  if (!file) {
    revalidatePath("/admin/products");
    return data?.[0] || null;
  }

  const { error: storageError } = await supabase.storage
    .from("menu-image")
    .upload(imageName, file, { upsert: true });

  if (storageError) {
    console.error("❌ Image upload failed:", storageError);
    throw new Error("Image upload failed: " + storageError.message);
  }

  revalidatePath("/admin/products");
  return data?.[0] || null;
}

// export async function createEditCategory(newCategory, id) {
//   const session = await auth();
//   if (session?.user?.role !== "admin") {
//     throw new Error("User is not authorized");
//   }

//   const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

//   // Normalize image input
//   const file =
//     newCategory.image instanceof File
//       ? newCategory.image
//       : newCategory.image?.[0] instanceof File
//         ? newCategory.image[0]
//         : null;

//   let imagePath = null;
//   let imageName = null;

//   if (file) {
//     imageName = `${nanoid(10)}-${file.name}`.replaceAll("/", "");
//     imagePath = `${supabaseUrl}/storage/v1/object/public/category-image/${imageName}`;
//   } else if (typeof newCategory.image === "string") {
//     // preserve old path
//     imagePath = newCategory.image;
//   }

//   let query = supabase.from("category");

//   if (!id) {
//     // CREATE
//     const { data: existingCategory, error: existingError } = await query
//       .select("id")
//       .eq("name", newCategory.name)
//       .maybeSingle();

//     if (existingError) throw new Error(existingError.message);
//     if (existingCategory) {
//       throw new Error("Category already exists in your list.");
//     }

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
//   if (error) throw new Error(error.message || "Category create/update failed");

//   // If no new file, we’re done
//   if (!file) {
//     revalidatePath("/admin/category");
//     return data;
//   }

//   // Upload the new file
//   const { error: storageError } = await supabase.storage
//     .from("category-image")
//     .upload(imageName, file, { upsert: true });

//   if (storageError) {
//     if (!id) {
//       // rollback on create only
//       await supabase.from("category").delete().eq("id", data.id);
//     }
//     throw new Error(
//       `Image upload failed: ${storageError.message}${
//         !id ? ", category was deleted." : ""
//       }`
//     );
//   }

//   revalidatePath("/admin/category");
//   return data;
// }
