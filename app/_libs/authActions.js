"use server";

import { auth, signIn, signOut } from "@/app/_libs/auth";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

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
    revalidatePath("/"); // clears any cached data for home
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
      },
    },
  });

  // Handle Supabase errors first
  if (error) {
    return {
      status: "error",
      message: error.message,
      user: null,
    };
  }

  // Check if user already exists
  if (data?.user && data.user.identities?.length === 0) {
    return {
      status: "error",
      message: "User with this email already exists, please login",
      user: null,
    };
  }

  // Revalidate paths after successful sign-up
  revalidatePath("/", "layout");

  return {
    status: "success",
    message:
      "Account created successfully! Please check your Email-Box for  email verification.",
    user: data.user,
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

export async function requireAdmin() {
  const session = await auth();

  if (session?.user?.role !== "admin") {
    redirect("/unauthorized");
  }

  return session;
}
