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
