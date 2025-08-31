"use server";

import { revalidatePath } from "next/cache";
import { auth } from "./auth";
import { supabase } from "./supabase";

export async function getCategories() {
  // await new Promise((resolve) => setTimeout(resolve, 40000));

  const { data, error } = await supabase.from("category").select("*");
  if (error) throw new Error(`Category could not be loaded: ${error.message}`);
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
  if (session?.user?.role !== "admin")
    throw new Error("User is not authorized");

  const hasImagePath = newCategory.image?.startsWith?.("http");

  const ImageName = `${Math.random()}-${newCategory.image?.name}`.replaceAll(
    "/",
    ""
  );

  // By default store the same name
  let ImagePath = hasImagePath ? newCategory.image : null;

  let query = supabase.from("category");

  // CREATE
  if (!id) query = query.insert([{ ...newCategory, image: ImagePath }]);
  // EDIT
  if (id)
    query = query
      .update({ ...newCategory, image: ImagePath })
      .eq("id", id)
      .select();

  const { data, error } = await query.select().single();
  if (error) throw new Error("Category could not be created/updated");

  if (!hasImagePath) {
    const { error: storageError } = await supabase.storage
      .from("category-image")
      .upload(ImageName, newCategory.image, { upsert: true });

    if (storageError) {
      await supabase.from("category").delete().eq("id", data.id);
      throw new Error(
        `Image upload failed: ${storageError.message}, category was deleted.`
      );
    }

    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from("category-image")
      .getPublicUrl(ImageName);

    ImagePath = publicUrlData.publicUrl;

    // Update with final image URL
    await supabase
      .from("category")
      .update({ image: ImagePath })
      .eq("id", data.id);
  }

  revalidatePath("/admin/category");
  return data;
}
