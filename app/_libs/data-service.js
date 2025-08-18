"use server";

import { createClient } from "@/utils/supabase/server";

export async function createUserByEmail(email, fullName = null) {
  const supabase = await createClient();

  // Check if user already has a row in user_profiles table
  const { data: existingUser } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("email", email)
    .single();

  if (!existingUser) {
    // insert new row
    const { data: newUser, error } = await supabase
      .from("user_profiles")
      .insert({
        email,
        fullName,
      })
      .single();

    if (error) {
      return { status: "error", message: insertError.message, user: null };
    }

    return { status: "success", user: newUser };
  }

  return { status: "success", user: existingUser };
}
