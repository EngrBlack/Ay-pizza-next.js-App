"use client";

import { formatCurrency } from "@/app/_helper/helper";
import OrderedItem from "./OrderedItem";
import toast from "react-hot-toast";
import { PaystackButton } from "react-paystack";
import { useRouter } from "next/navigation";

function OrderInProcess({ orders, user }) {
  return (
    <div className="flex flex-col gap-4 md:flex-row lg:gap-6">
      <div className="md:basis-[58%] lg:basis-[60%] flex flex-col gap-4 lg:gap-6">
        <PaymentMethod user={user} />
        <DeliveryAddress user={user} />
        <OrderedItems orders={orders} />
      </div>
      <OrderedItemsSummary orders={orders} user={user} />
    </div>
  );
}

export default OrderInProcess;

function PaymentMethod({ user }) {
  return (
    <div className="  border-2 border-cream-100 shadow-md rounded-md p-4 sm:p-6 flex flex-col gap-2">
      <h1 className="text-lg font-bold">Payment Method: </h1>
      <p className="">
        <span className="capitalize text-brown-300">
          {user?.payment_method}
        </span>
      </p>
      <div className="bg-red w-fit rounded-full py-0.5 px-4 font-bold text-cream-200 text-sm ">
        Not Paid
      </div>
    </div>
  );
}

function DeliveryAddress({ user }) {
  const address = user?.address;

  return (
    <div className="  border-2 border-cream-100 shadow-md rounded-md p-4 sm:p-6 flex flex-col gap-2">
      <h1 className="text-lg font-bold">Delivery Address: </h1>
      <div className="text-brown-300">
        <p className="">{address?.fullName}</p>
        <p>
          {address?.address} | {`${address?.city} | ${address?.state} State.`}
        </p>
        <p>
          <span className="bg-brown-300 text-cream-200 py-0.5 px-2 font-bold mr-1">
            Contact:
          </span>
          {address.contact}
        </p>
      </div>
      <div className="bg-red w-fit rounded-full py-0.5 px-4 font-bold text-cream-200 text-sm ">
        Not Delivered
      </div>
    </div>
  );
}

function OrderedItems({ orders }) {
  const orderItems = orders?.order_items;
  return (
    <div className="  border-2 border-cream-100 shadow-md rounded-md p-4 sm:p-6 pb-8 flex flex-col gap-2">
      <h1 className="text-lg font-bold">Order Items: </h1>

      {orderItems.map((orderItem) => (
        <OrderedItem key={orderItem.id} orderItem={orderItem} />
      ))}
    </div>
  );
}

function OrderedItemsSummary({ orders, user }) {
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

  const componentProps = {
    email: user?.email,
    amount: totalPrice * 100,
    publicKey,
    text: "Pay with PayStack",
    currency: "NGN",
    metadata: {
      name: user?.fullName,
      phone: user?.address?.contact,
      orderId: orders?.id,
    },

    onSuccess: () => {
      toast.success("Payment successful");
      router.push("/thank-you");
    },

    onClose: () => toast.error("Payment cancelled"),

    onError: () => toast.error("Payment failed"),
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
        <PaystackButton
          className="text-cream-200 bg-orangered-100 w-full font-bold p-2.5 rounded-sm shadow-lg hover:-translate-y-0.5 focus:-translate-y-0.5 active:translate-y-0 active:shadow-sm trans ease-in-out mt-2"
          {...componentProps}
        />
      </div>
    </div>
  );
}
