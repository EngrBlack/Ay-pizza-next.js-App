"use server";

import { revalidatePath } from "next/cache";
import { auth } from "./auth";
import { supabase } from "./supabase";

export async function getUserProfile() {
  const { user } = await auth();
  const userId = user?.id;
  if (!userId) throw new Error("User must be logged in.");

  const { data, error } = await supabase
    .from("users_profile")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) throw new Error(error.message || "Could not user profile.");

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
