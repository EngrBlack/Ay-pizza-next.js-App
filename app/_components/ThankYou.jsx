"use client";

import { useRouter } from "next/navigation";
import Button from "./Button";

function ThankYou() {
  const router = useRouter();

  return (
    <section className="bg-cream-200 h-[calc(100vh-50vh)]">
      <div className="tracking-wide flex flex-col items-center justify-center h-full gap-2 md:gap-4  xl:gap-5 text-center w-full px-4  mx-auto">
        <h1 className="font-rowdies text-3xl sm:text-4xl md:text-5xl xl:text-6xl text-brown-300">
          Thanks for Ordering From Us
        </h1>
        <p className="text-lg font-bold">We are processing your order...</p>
        <Button
          type="danger"
          onClick={() => router.push("/profile/order-history")}
        >
          View Order
        </Button>
      </div>
    </section>
  );
}

export default ThankYou;
