import { NextResponse } from "next/server";
import { supabase } from "@/app/_libs/supabase"; // adjust path to your client
import { revalidatePath } from "next/cache";

export async function POST(req) {
  try {
    const { reference, orderId } = await req.json();

    if (!reference || !orderId) {
      return NextResponse.json(
        { error: "Missing reference or orderId" },
        { status: 400 }
      );
    }

    // Verify with Paystack
    const verifyRes = await fetch(
      `https://api.paystack.co/transaction/verify/${reference.reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`, // secret key, not public key
        },
      }
    );

    const verifyData = await verifyRes.json();

    if (!verifyRes.ok || verifyData.data.status !== "success") {
      return NextResponse.json(
        { error: "Payment not verified" },
        { status: 400 }
      );
    }

    // Update order in Supabase
    const { error } = await supabase
      .from("orders")
      .update({ is_paid: true, paid_at: new Date().toISOString() })
      .eq("id", orderId);

    if (error) throw error;

    revalidatePath(`/order/${orderId}`);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Payment verification failed:", err.message);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
