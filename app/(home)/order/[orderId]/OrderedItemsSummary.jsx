"use client";

import { formatCurrency } from "@/app/_helper/helper";
import toast from "react-hot-toast";
import PaystackPop from "@paystack/inline-js";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

function OrderedItemsSummary({ orders, user }) {
  const [isPending, startTransition] = useTransition();

  const router = useRouter();
  const {
    items_price: itemsPrice,
    tax_price: taxPrice,
    delivery_price: deliveyPrice,
    total_price: totalPrice,
  } = orders;

  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "";

  if (!publicKey) {
    toast.error("PayStack public key is not set");
    return null;
  }

  const pay = () => {
    const paystack = new PaystackPop();
    paystack.newTransaction({
      key: publicKey,
      email: user?.email,
      amount: totalPrice * 100,
      currency: "NGN",
      metadata: {
        name: user?.fullName,
        phone: user?.address?.contact,
        orderId: orders?.id,
      },

      onSuccess: (reference) => {
        startTransition(() => {
          (async () => {
            toast.success("Payment successful, verifying...");
            router.push("/thank-you");

            try {
              const res = await fetch("/api/verify-payment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ reference, orderId: orders.id }),
              });

              const data = await res.json();

              if (res.ok) {
                toast.success("Order Paid ✅");
              } else {
                toast.error(data.error || "Could not update order");
              }
            } catch (err) {
              toast.error("Verification failed");
            }
          })();
        });
      },

      onClose: () => toast.error("Payment cancelled"),

      onError: () => toast.error("Payment failed"),
    });
  };

  return (
    <div className="md:self-start border-2 border-cream-100 shadow-md rounded-md p-4 sm:p-6 pb-8 grow flex flex-col gap-3">
      <div className="flex justify-between font-bold">
        <span>Items</span>
        <span>{formatCurrency(itemsPrice)}</span>
      </div>
      <div className="flex justify-between font-bold">
        <span>Tax</span>
        <span>{formatCurrency(taxPrice)}</span>
      </div>
      <div className="flex justify-between font-bold">
        <span>Delivery Fee</span>
        <span>{formatCurrency(deliveyPrice)}</span>
      </div>
      <div className="flex justify-between font-bold border-t pt-2 text-lg">
        <span>Total</span>
        <span>{formatCurrency(totalPrice)}</span>
      </div>

      <div>
        <button
          onClick={pay}
          className="text-cream-200 bg-orangered-100 w-full font-bold p-2.5 rounded-sm shadow-lg hover:-translate-y-0.5 focus:-translate-y-0.5 active:translate-y-0 active:shadow-sm trans ease-in-out mt-2 disabled:cursor-not-allowed"
          disabled={isPending}
        >
          {isPending ? "Processing Payment..." : "Pay with Paystack"}
        </button>
      </div>
    </div>
  );
}
export default OrderedItemsSummary;
