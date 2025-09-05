import { NextResponse } from "next/server";
import { supabase } from "@/app/_libs/supabase";
import { revalidatePath } from "next/cache";

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("Incoming payload:", body);

    const { reference, orderId } = body;
    const ref =
      typeof reference === "string" ? reference : reference?.reference;

    if (!ref || !orderId) {
      return NextResponse.json(
        { error: "Missing reference or orderId" },
        { status: 400 }
      );
    }

    console.log("Verifying ref:", ref);

    // Verify with Paystack
    const verifyRes = await fetch(
      `https://api.paystack.co/transaction/verify/${ref}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const verifyData = await verifyRes.json();
    console.log("Verify response:", verifyData);

    if (!verifyRes.ok || verifyData.data?.status !== "success") {
      return NextResponse.json(
        { error: "Payment not verified" },
        { status: 400 }
      );
    }

    // Update Supabase
    const { data, error } = await supabase
      .from("orders")
      .update({
        is_paid: true,
        paid_at: new Date().toISOString(),
        transaction_ref: ref,
      })
      .eq("id", orderId)
      .select();

    if (error) {
      console.error("Supabase error:", error);
      throw error;
    }

    console.log("Updated order:", data);

    revalidatePath(`/order/${orderId}`);

    return NextResponse.json({ success: true, order: data });
  } catch (err) {
    console.error("Payment verification failed:", err);
    return NextResponse.json(
      { error: "Internal server error", details: err.message },
      { status: 500 }
    );
  }
}
