"use server";
import { revalidatePath } from "next/cache";
import { getUserProfile } from "./checkoutActions";
import { supabase } from "./supabase";

export async function getAllUsers() {
  const userProfile = await getUserProfile();
  const user = userProfile;
  if (user?.role !== "admin") throw new Error("User is not authorized");

  const { data, error } = await supabase.from("users_profile").select("*");

  if (error) throw new Error(error.message || "Could not load users");

  return data;
}

export async function updateUserRole(userId, newRole) {
  const userProfile = await getUserProfile();
  const user = userProfile;
  if (user?.role !== "admin") throw new Error("User is not authorized");

  const { error } = await supabase
    .from("users_profile")
    .update({ role: newRole })
    .eq("id", userId);

  if (error) {
    console.error("Error updating user role:", error);
    throw new Error("Could not update user role");
  }

  revalidatePath("/admin/users");
  return { success: true };
}

export async function deleteUser(userId) {
  try {
    // delete from Supabase Auth
    const { error: authError } = await supabase.auth.admin.deleteUser(userId);

    if (authError) {
      console.error("Auth delete error:", authError.message);
      throw new Error("Failed to delete user from auth");
    }

    // delete from your custom profile table
    const { error: profileError } = await supabaseAdmin
      .from("users_profile")
      .delete()
      .eq("id", userId);

    if (profileError) {
      console.error("Profile delete error:", profileError.message);
      throw new Error("Failed to delete user profile");
    }

    return { success: true };
  } catch (err) {
    console.error("Unexpected error deleting user:", err);
    throw err;
  }
}
