import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  // fallback redirect if no "next" provided
  const nextUrl = searchParams.get("next") ?? "/";

  if (code) {
    const supabase = createClient(); // SSR client
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return NextResponse.redirect(nextUrl);
    }
  }

  return NextResponse.redirect("/auth/auth-code-error");
}
