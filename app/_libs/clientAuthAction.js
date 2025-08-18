"use client";

import { createClient } from "@/utils/supabase/client";

export async function resetPassword(formData) {
  const password = formData.get("password");
  const supabase = createClient();

  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    return { status: error.message };
  }

  return { status: "success" };
}
