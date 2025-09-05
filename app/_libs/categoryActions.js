"use server";

import { revalidatePath } from "next/cache";
import { auth } from "./auth";
import { supabase } from "./supabase";
import { nanoid } from "nanoid";

export async function getCategories() {
  // await new Promise((resolve) => setTimeout(resolve, 40000));
  const session = await auth();
  if (session?.user?.role !== "admin")
    throw new Error("User is not authorized");

  const { data, error } = await supabase.from("category").select("*");
  if (error) throw new Error(`Category could not be loaded: ${error.message}`);
  return data;
}

export async function getCategoryById(categoryId) {
  const session = await auth();
  if (session?.user?.role !== "admin")
    throw new Error("User is not authorized");

  const { data, error } = await supabase
    .from("category")
    .select("*")
    .eq("id", categoryId)
    .single();

  if (error) throw new Error(`Cound not fetch this particular category`);
  return data;
}

export async function deleteCategoryById(categoryId) {
  const session = await auth();
  if (session?.user?.role !== "admin")
    throw new Error("User is not authorized");

  const { error } = await supabase
    .from("category")
    .delete()
    .eq("id", categoryId);

  if (error) {
    throw new Error(error.message || "Could not delete category.");
  }

  revalidatePath("/admin/category");
  return { success: true };
}

export async function createEditCategory(newCategory, id) {
  const session = await auth();
  if (session?.user?.role !== "admin") {
    throw new Error("User is not authorized");
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

  // If the image is already a URL
  const hasImagePath = newCategory.image?.startsWith?.("http");

  // Generate a unique image name if it's a File
  const imageName = hasImagePath
    ? null
    : `${nanoid(10)}-${newCategory.image?.name}`.replaceAll("/", "");

  // Build image path
  const imagePath = hasImagePath
    ? newCategory.image
    : `${supabaseUrl}/storage/v1/object/public/category-image/${imageName}`;

  let query = supabase.from("category");

  if (!id) {
    // CREATE
    query = query
      .insert([{ name: newCategory.name, image: imagePath }])
      .select()
      .single();
  } else {
    // EDIT
    query = query
      .update({ name: newCategory.name, image: imagePath })
      .eq("id", id)
      .select()
      .single();
  }

  const { data, error } = await query;
  if (error) throw new Error("Category could not be created/updated");

  // If image is already hosted, return
  if (hasImagePath) {
    revalidatePath("/admin/category");
    return data;
  }

  // Upload new image to Supabase storage
  const { error: storageError } = await supabase.storage
    .from("category-image")
    .upload(imageName, newCategory.image);

  if (storageError) {
    // Rollback the DB insert if image upload failed
    await supabase.from("category").delete().eq("id", data.id);
    throw new Error(
      `Image upload failed: ${storageError.message}, category was deleted.`
    );
  }

  revalidatePath("/admin/category");
  return data;
}

// SQL-SUPABASE
// create policy "Anyone can upload category images"
// on storage.objects
// for insert
// with check (bucket_id = 'category-image');
