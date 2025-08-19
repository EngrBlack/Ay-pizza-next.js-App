"use client";

import { useState } from "react";
import CartItem from "./CartItem";
import ConfirmDelete from "../../_components/ConfirmDelete";
import EmptyCart from "./EmptyCart";
// import EmptyCart from "./EmptyCart";

function CartList({ cartItems }) {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);

  return (
    <div className="grow-1 border-2 border-cream-100 shadow-lg p-3 py-4 sm:p-6 lg:p-8 rounded-sm">
      <div className="flex  items-center justify-between border-b-1 border-brown-50 pb-2 sm:pb-3 mb-2 lg:mb-4">
        <h1 className=" sm:text-2xl md:text-xl lg:text-2xl  font-extrabold text-orangered-200">
          Your Shopping Cart (12)
        </h1>
        <button
          className="text-orangered-100 text-xs hover:text-brown hover:underline trans md:text-base"
          onClick={() => setIsOpen((open) => !open)}
        >
          Clear Cart
        </button>

        {isOpen && cartItems.length > 0 && <ConfirmDelete onClose={close} />}
      </div>
      {cartItems.length ? (
        <div>
          {cartItems?.map((cart) => (
            <CartItem key={cart.id} cart={cart} />
          ))}
        </div>
      ) : (
        <EmptyCart />
      )}
    </div>
  );
}

export default CartList;
