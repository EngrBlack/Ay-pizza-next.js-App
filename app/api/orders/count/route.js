import { NextResponse } from "next/server";
import { supabase } from "@/app/_libs/supabase";

export async function GET(request) {
  try {
    // Return total orders count (for admins this is fine) and most recent order id
    const { data, error, count } = await supabase
      .from("orders")
      .select("id", { count: "exact", head: false })
      .order("created_at", { ascending: false })
      .limit(1);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const latestId = data && data.length ? data[0].id : null;
    // Use count query separately because supabase returns count only when head: true
    const { count: totalCount } = await supabase
      .from("orders")
      .select("id", { count: "exact", head: true });

    return NextResponse.json({ count: totalCount ?? 0, latestId });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
