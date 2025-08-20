"use client";

import { useRouter } from "next/navigation";
import { HiMiniShoppingCart } from "react-icons/hi2";

function CartButton({ cartItems }) {
  const router = useRouter();

  const totalCartQuantity = cartItems.reduce(
    (accu, curItem) => accu + Number(curItem?.quantity),
    0
  );

  return (
    <button
      onClick={() => router.push("/cart")}
      className="flex items-center justify-center  gap-1 w-full  px-2.5 py-1.5 sm:py-2  lg:px-3.5  text-[0.9rem] outline-0 rounded-sm cursor-pointer border shadow-xl trans border-brown bg-cream-200 text-brown hover:bg-brown hover:text-cream-200 hover:-translate-y-0.5 active:translate-y-0 active:shadow-lg md:text-[15px]"
    >
      <span>Cart</span>

      <div className="relative">
        <HiMiniShoppingCart />
        {cartItems.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-orangered-100 text-cream-100 text-[10px] w-4 h-4 rounded-full flex items-center justify-center pt-0.5">
            {totalCartQuantity}
          </span>
        )}
      </div>
    </button>
  );
}

export default CartButton;
