"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function signUp(formData) {
  const supabase = await createClient();

  const credentials = {
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const { data, error } = await supabase.auth.signUp({
    email: credentials.email,
    password: credentials.password,
    options: {
      data: {
        fullName: credentials.fullName,
        // avatar: "",
      },
    },
  });

  // Handle Supabase errors first
  if (error) {
    return {
      status: error.message,
      user: null,
    };
  }

  // If `identities` is empty, the email is already registered
  if (data?.user?.identities?.length === 0) {
    return {
      status: "User with this email already exists, please login",
      user: null,
    };
  }

  // Revalidate paths after successful sign-up
  revalidatePath("/", "layout");

  return {
    status: "success",
    user: data,
  };
}

export async function login(formData) {
  const supabase = await createClient();

  const credentials = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const { data, error } = await supabase.auth.signInWithPassword({
    email: credentials.email,
    password: credentials.password,
  });

  if (error) {
    return {
      status: error.message,
      user: null,
    };
  }

  const { data: existingUser } = await supabase
    .from("users_profile")
    .select("*")
    .eq("email", credentials.email)
    .single();

  // NOTE: existingUser will be undefined if not found - this is fine.
  if (!existingUser) {
    const { error: insertError } = await supabase.from("users_profile").insert({
      email: data?.user?.email,
      fullName: data?.user?.user_metadata?.fullName || null,
    });

    if (insertError) {
      return { status: insertError.message, user: null };
    }
  }

  // Make sure revalidatePath is imported from 'next/cache'
  revalidatePath("/", "layout");

  return {
    status: "success",
    user: data?.user,
  };
}

export async function getCurrentUser() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) return null;

  return data.user; // return the user object directly
}

export async function logOut() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) return { status: "error", message: error.message };

  revalidatePath("/", "layout");
  return { status: "success" };
}

export async function loginWithGoogle() {
  const supabase = await createClient();

  const origin = headers().get("origin");
  console.log("origin:", origin); // should now log the correct domain

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${origin}/auth/callback`,
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });

  if (error) {
    console.error("OAuth error:", error.message);
    return { status: error.message };
  }

  if (data?.url) {
    redirect(data.url);
  }
}

export async function forgotPassword(formData) {
  const supabase = await createClient();

  const email = formData.get("email");
  const origin = headers().get("origin");

  const { error: resetError } = await supabase.auth.resetPasswordForEmail(
    email,
    {
      redirectTo: `${origin}/reset-password`,
    }
  );

  if (resetError) {
    return { status: "error", message: resetError.message };
  }

  return { status: "success" };
}

export async function revalidateRoot() {
  revalidatePath("/", "layout");
}
