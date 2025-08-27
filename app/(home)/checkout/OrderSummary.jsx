"use client";

import { formatCurrency, tax } from "@/app/_helper/helper";
import { nanoid } from "nanoid";
import { useRouter } from "next/navigation";
import OrderSummaryItem from "./OrderSummaryItem";
import { useClosestLocation } from "@/app/_context/LocationProvider";

function OrderSummary({ cartItems }) {
  const router = useRouter();
  const orderId = nanoid(12);
  const { deliveryPrice } = useClosestLocation();

  const totalCartPrice = cartItems.reduce((accu, cur) => {
    const rawBasePrice =
      cur?.selected_size?.price ?? cur?.menu_id?.base_price ?? 0;

    const basePrice = cur?.menu_id?.discount
      ? Number(rawBasePrice) - Number(cur.menu_id.discount)
      : Number(rawBasePrice);

    const toppingsPrice =
      cur?.selected_toppings?.reduce(
        (sum, t) => sum + Number(t?.price || 0),
        0
      ) || 0;

    const itemTotal = (basePrice + toppingsPrice) * (cur?.quantity || 1);

    return accu + itemTotal;
  }, 0);

  const taxPrice = tax;

  return (
    <div className="md:basis-[45%] lg:basis-[35%] border-2 border-cream-100 p-4 rounded-sm shadow-md focus-within:border-orangered-200 focus-within:shadow-xl trans ">
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
          <span>{formatCurrency(totalCartPrice)}</span>
        </p>
        <p className="flex items-center justify-between">
          <span>Tax :</span>
          <span>{formatCurrency(tax)}</span>
        </p>
        <p className="flex items-center justify-between">
          <span> Delivery Fee :</span>
          <span>{formatCurrency(Number(deliveryPrice))}</span>
        </p>
      </div>
      <div className="border-t-1 border-brown-100  pt-3 flex items-center justify-between font-bold">
        <p>Total :</p>
        <p>{formatCurrency(totalCartPrice + tax + deliveryPrice)}</p>
      </div>
      <button
        onClick={() => router.push(`/order/${orderId}`)}
        type="submit"
        className="button w-full my-4"
      >
        Place Order &mdash;{" "}
        {formatCurrency(totalCartPrice + tax + deliveryPrice)}
      </button>
    </div>
  );
}

export default OrderSummary;
