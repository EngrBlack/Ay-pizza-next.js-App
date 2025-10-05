"use server";
import { revalidatePath } from "next/cache";
import { getUserProfile } from "./checkoutActions";
import { supabase } from "./supabase";
import { createClient } from "@supabase/supabase-js";

export async function getAllUsers(sortBy, page) {
  const userProfile = await getUserProfile();
  const user = userProfile;
  if (user?.role !== "admin") throw new Error("User is not authorized");

  let query = supabase.from("users_profile").select("*", { count: "exact" });

  if (sortBy) {
    const { field, direction } = sortBy;
    query = query.order(field, { ascending: direction === "asc" });
  }

  if (page) {
    const pageSize = Number(process.env.NEXT_PUBLIC_PAGE_SIZE) || 10; // fallback pageSize
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) throw new Error(error.message || "Could not load users");

  return { data, count };
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
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  const userProfile = await getUserProfile();
  const user = userProfile;
  if (user?.role !== "admin") throw new Error("User is not authorized");

  try {
    // 1) Delete from Supabase Auth
    const { error: authError } =
      await supabaseAdmin.auth.admin.deleteUser(userId);

    if (authError) {
      console.error("Auth delete error:", authError.message);
      throw new Error("Failed to delete user from auth");
    }

    // 2) Delete from your custom profile table
    const { error: profileError } = await supabaseAdmin
      .from("users_profile")
      .delete()
      .eq("id", userId);

    if (profileError) {
      console.error("Profile delete error:", profileError.message);
      throw new Error("Failed to delete user profile");
    }

    revalidatePath("/admin/users");
    return { success: true };
  } catch (err) {
    console.error("Unexpected error deleting user:", err.message);
    throw err;
  }
}
