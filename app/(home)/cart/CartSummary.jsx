"use client";

import { useRouter } from "next/navigation";
import { HiArrowLeft, HiArrowRightCircle } from "react-icons/hi2";
import { formatCurrency } from "../../_helper/helper";

function CartSummary({ totalCartPrice }) {
  const router = useRouter();
  return (
    <div className="grow-2 border-2 border-cream-100 shadow-lg p-6  px-4 pb-12 sm:pb-12 md:pb-12 sm:p-8 md:p-6 rounded-sm">
      <h1 className="text-lg sm:text-2xl md:text-xl font-extrabold border-b-1 border-brown-200 pb-2 sm:pb-3 mb-4 lg:mb-6">
        Cart Summary
      </h1>
      <div className="flex justify-between items-center font-bold mb-6 text-xl md:text-lg">
        <p>Subtotal:</p>
        <p>{formatCurrency(totalCartPrice)}</p>
      </div>

      <div className="flex flex-col gap-6">
        <button
          className="button w-full"
          onClick={() => {
            router.push("/menu");
          }}
        >
          <HiArrowLeft />
          <span> Continue Shopping</span>
        </button>
        <button
          className="button w-full"
          onClick={() => {
            router.push("/checkout");
          }}
        >
          <span>Proceed to Checkout</span>
          <HiArrowRightCircle />
        </button>
      </div>
    </div>
  );
}

export default CartSummary;
