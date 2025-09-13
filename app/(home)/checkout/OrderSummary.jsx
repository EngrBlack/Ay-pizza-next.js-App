"use client";

import OrderSummaryItem from "./OrderSummaryItem";
import { calcItemTotal, formatCurrency, tax } from "@/app/_helper/helper";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { HiMiniArrowPath } from "react-icons/hi2";
import toast from "react-hot-toast";
import { placeOrder } from "@/app/_libs/orderActions";
import { motion } from "framer-motion";

function OrderSummary({ cartItems, user }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const itemsPrice = cartItems.reduce((accu, cur) => {
    return accu + calcItemTotal(cur);
  }, 0);

  const deliveryPrice = user?.delivery_price ?? 0;
  const taxPrice = user?.tax_price ?? 0;
  const totalPrice = itemsPrice + deliveryPrice + taxPrice;

  function handlePlaceOrder() {
    try {
      startTransition(async () => {
        const order = await placeOrder();

        if (!order) {
          toast.error("No response from server.");
          return;
        }

        if (order.success === false) {
          toast.error(order.message || "Order failed");
          if (order.redirectTo) router.push(order.redirectTo);
          return;
        }

        toast.success("Order placed successfully! 🎉");
        router.push(`/order/${order.id}`);
      });
    } catch (err) {
      toast.error(err.message || "Something went wrong.");
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ amount: 0.15 }}
      transition={{ duration: 0.6 }}
      className="md:basis-[45%] lg:basis-[35%] border-2 border-cream-100 p-4 rounded-sm shadow-md focus-within:border-orangered-200 focus-within:shadow-xl trans "
    >
      <h2 className="text-orangered-200 font-rowdies border-b-1 border-brown-100  pb-2 mb-2 lg:text-xl">
        Order Summary
      </h2>

      <div>
        {cartItems.map((cartItem) => (
          <OrderSummaryItem cartItem={cartItem} key={cartItem.id} />
        ))}
      </div>

      <div className="flex flex-col gap-2 font-bold text-sm py-4">
        <p className="flex items-center justify-between">
          <span>Subtotal :</span>
          <span>{formatCurrency(itemsPrice)}</span>
        </p>
        <p className="flex items-center justify-between">
          <span>Tax :</span>
          <span>{formatCurrency(taxPrice)}</span>
        </p>
        <p className="flex items-center justify-between">
          <span> Delivery Fee :</span>
          <span>{formatCurrency(Number(deliveryPrice))}</span>
        </p>
      </div>
      <div className="border-t-1 border-brown-100  pt-3 flex items-center justify-between font-bold">
        <p>Total :</p>
        <p>{formatCurrency(totalPrice)}</p>
      </div>
      <button
        onClick={handlePlaceOrder}
        type="submit"
        className="button w-full my-4 disabled:cursor-not-allowed"
        disabled={isPending}
      >
        {isPending ? (
          <span className="flex items-center gap-2">
            <HiMiniArrowPath className="animate-spin text-lg" />
            <span>Placing Order...</span>
          </span>
        ) : (
          `Place Order - ${formatCurrency(totalPrice)}`
        )}
      </button>
    </motion.div>
  );
}

export default OrderSummary;
