"use server";

import { signIn, signOut } from "@/app/_libs/auth";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function signInWithCredentials(formData) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  try {
    const result = await signIn("credentials", {
      ...data,
      redirect: false,
    });

    if (result?.error) {
      return {
        status: "error",
        message: result.error || "Invalid email or password",
      };
    }

    return { status: "success", message: "Login successful" };
  } catch (err) {
    return { status: "error", message: err.message || "Login failed" };
  }
}

export async function logInWithGoogle() {
  await signIn("google", { redirectTo: "/" });
}

export async function logOut() {
  try {
    await signOut({ redirect: false });
    return { status: "success" };
  } catch (err) {
    return { status: "error", message: "Logout failed" };
  }
}

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
