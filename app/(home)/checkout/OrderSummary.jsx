import { formatCurrency } from "@/app/_helper/helper";
import OrderSummaryCard from "./OrderSummaryCard";

function OrderSummary() {
  return (
    <div className="md:basis-[45%] lg:basis-[35%] border-2 border-cream-100 p-4 rounded-sm shadow-md focus-within:border-orangered-200 focus-within:shadow-xl trans ">
      <h2 className="text-orangered-200 font-rowdies border-b-1 border-brown-100  pb-2 mb-2 lg:text-xl">
        Order Summary
      </h2>

      <OrderSummaryCard />

      <div className="flex flex-col gap-2 font-bold text-sm py-4">
        <p className="flex items-center justify-between">
          <span>Subtotal :</span>
          <span>{formatCurrency(37500)}</span>
        </p>
        <p className="flex items-center justify-between">
          <span>Tax :</span>
          <span>{formatCurrency(50)}</span>
        </p>
        <p className="flex items-center justify-between">
          <span> Delivery Fee :</span>
          <span>{formatCurrency(1000)}</span>
        </p>
      </div>
      <div className="border-t-1 border-brown-100  pt-3 flex items-center justify-between font-bold">
        <p>Total :</p>
        <p>{formatCurrency(38550)}</p>
      </div>
    </div>
  );
}

export default OrderSummary;
