"use server";

import { revalidatePath } from "next/cache";
import { auth } from "./auth";
import { supabase } from "./supabase";

export async function getUserProfile() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return null;

  const { data, error } = await supabase
    .from("users_profile")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) throw new Error(error.message || "Could not user profile.");

  return data;
}

export async function updateUserProfile(formData) {
  const { user } = await auth();
  const userId = user?.id;
  if (!userId) throw new Error("User must be logged in.");

  const updateData = {
    fullName: formData.get("fullName"),
    contact: formData.get("contact"),
    address: formData.get("address"),
    state: formData.get("state"),
    city: formData.get("city"),
  };

  const { data, error } = await supabase
    .from("users_profile")
    .update({
      fullName: updateData.fullName,
      address: {
        address: updateData.address,
        contact: updateData.contact,
        state: updateData.state,
        city: updateData.city,
      },
    })
    .eq("id", userId)
    .select()
    .single();

  if (error) throw new Error(error.message || "Could not update user profile.");

  revalidatePath("/profile");
  return data;
}

export async function updateUserImage(newImage) {
  const { user } = await auth();
  const userId = user?.id;
  if (!userId) throw new Error("User must be logged in.");

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

  // Ensure newImage is a File
  if (!(newImage?.image instanceof File)) {
    throw new Error("Invalid image file.");
  }

  // Generate unique image name
  const imageName = `${nanoid(10)}-${newImage.image.name}`.replaceAll("/", "");

  // Upload image first
  const { error: storageError } = await supabase.storage
    .from("profile-images")
    .upload(imageName, newImage.image, { upsert: true });

  if (storageError) {
    throw new Error(`Storage upload failed: ${storageError.message}`);
  }

  // Build public URL for the uploaded file
  const imagePath = `${supabaseUrl}/storage/v1/object/public/profile-images/${imageName}`;

  // Update DB with image path
  const { data, error } = await supabase
    .from("users_profile")
    .update({ image: imagePath })
    .eq("id", userId)
    .select()
    .single();

  if (error) {
    throw new Error(`Database update failed: ${error.message}`);
  }

  revalidatePath("/profile");
  return data;
}

export async function updateDeliveryPrice(formData) {
  const { user } = await auth();
  const userId = user?.id;
  if (!userId) throw new Error("User must be logged in.");
  const deliveryPrice = formData.get("delivery-price");

  const { data, error } = await supabase
    .from("users_profile")
    .update({ delivery_price: deliveryPrice })
    .eq("id", userId)
    .select();

  if (error) throw new Error(error.message || "Could not set delivery price.");

  revalidatePath("/checkout");

  return data;
}

export async function updateAddress(formData) {
  const { user } = await auth();
  const userId = user?.id;
  if (!userId) throw new Error("User must be logged in.");

  const newAddress = {
    fullName: formData.get("fullName"),
    contact: formData.get("contact"),
    state: formData.get("state"),
    city: formData.get("city"),
    address: formData.get("address"),
    additional_note: formData.get("note"),
  };

  const { data, error } = await supabase
    .from("users_profile")
    .update({ address: newAddress })
    .eq("id", userId) // ✅ match the auth.users.id
    .select()
    .single();

  if (error) throw new Error(error.message || "Could not update user Address.");

  revalidatePath("/Checkout");
  return { success: true, data };
}

export async function paymentMethod(formData) {
  const { user } = await auth();
  const userId = user?.id;
  if (!userId) throw new Error("User must be logged in.");

  const method = formData.get("payment");
  if (!method) throw new Error("No payment method provided.");

  const { data, error } = await supabase
    .from("users_profile")
    .update({ payment_method: method })
    .eq("id", userId)
    .select()
    .single();

  if (error) throw new Error(error.message || "Could not add address.");

  return data;
}

export async function deliveryMethod(formData) {
  const { user } = await auth();
  const userId = user?.id;
  if (!userId) throw new Error("User must be logged in.");

  const deliveryMethod = formData.get("delivery-method");
  if (!deliveryMethod) throw new Error("No delivery method provided.");

  const { data, error } = await supabase
    .from("users_profile")
    .update({ delivery_method: deliveryMethod })
    .eq("id", userId)
    .select()
    .single();

  if (error)
    throw new Error(error.message || "Could not update delivery-method.");

  return data;
}
