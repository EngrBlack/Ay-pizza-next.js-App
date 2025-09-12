"use client";

import { nanoid } from "nanoid";
import { supabase } from "./supabase";

export async function resetPassword(formData) {
  const password = formData.get("password");

  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    return { status: error.message };
  }

  return { status: "success" };
}

export async function uploadUserImage(file) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

  if (!(file instanceof File)) throw new Error("Invalid file");

  const imageName = `${nanoid(10)}-${file.name}`.replaceAll("/", "");

  const { error } = await supabase.storage
    .from("profile-images")
    .upload(imageName, file, {
      cacheControl: "3600",
      upsert: true,
      contentType: file.type,
    });

  if (error) throw new Error(`Upload failed: ${error.message}`);

  return `${supabaseUrl}/storage/v1/object/public/profile-images/${imageName}`;
}
