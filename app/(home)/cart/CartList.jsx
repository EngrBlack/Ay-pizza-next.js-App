"use client";

import { useOptimistic, useState } from "react";
import CartItem from "./CartItem";
import ConfirmDelete from "../../_components/ConfirmDelete";
import EmptyCart from "./EmptyCart";
import { clearCartItems, removeCartItem } from "@/app/_libs/cartActions";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

function CartList({ cartItems, totalCartQuantity }) {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);

  console.log(cartItems);

  const [optimisticCartItems, optimisticDelete] = useOptimistic(
    cartItems,
    (curCartItems, cartId) => {
      return curCartItems.filter((item) => item.id !== cartId);
    }
  );

  async function handleRemoveCartItem(cartId) {
    optimisticDelete(cartId);
    await removeCartItem(cartId);
  }

  async function handleClearCart() {
    try {
      await clearCartItems();
      toast.success("Your Cart is cleared");
    } catch (error) {
      toast.error(`Could not clear cart: ${error?.message}`);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="grow-1 border-2 border-cream-100 shadow-lg p-4 py-4 sm:p-6 lg:p-8 rounded-sm"
    >
      <div className="flex  items-center justify-between border-b-1 border-brown-50 pb-2 sm:pb-3 mb-2 lg:mb-4">
        <h1 className=" sm:text-2xl md:text-xl lg:text-2xl  font-extrabold text-orangered-200">
          Your Shopping Cart {cartItems?.length > 0 && `(${totalCartQuantity})`}
        </h1>
        <button
          className="text-orangered-100 text-xs hover:text-brown hover:underline trans md:text-base"
          onClick={() => setIsOpen((open) => !open)}
        >
          Clear Cart
        </button>

        {isOpen && cartItems.length > 0 && (
          <ConfirmDelete
            onClose={close}
            onDelete={handleClearCart}
            resource="Cart"
          />
        )}
      </div>
      {cartItems?.length ? (
        <div>
          {optimisticCartItems?.map((cart) => (
            <CartItem
              key={cart.id}
              cart={cart}
              onRemoveCartItem={handleRemoveCartItem}
            />
          ))}
        </div>
      ) : (
        <EmptyCart />
      )}
    </motion.div>
  );
}

export default CartList;
