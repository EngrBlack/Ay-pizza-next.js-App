"use client";

import OrderedItem from "./OrderedItem";
import OrderedItemsSummary from "./OrderedItemsSummary";

function OrderInProcess({ orders, user }) {
  return (
    <div className="flex flex-col gap-4 md:flex-row lg:gap-6">
      <div className="md:basis-[58%] lg:basis-[60%] flex flex-col gap-4 lg:gap-6">
        <PaymentMethod user={user} orders={orders} />
        <DeliveryAddress user={user} />
        <OrderedItems orders={orders} />
      </div>
      <OrderedItemsSummary orders={orders} user={user} />
    </div>
  );
}

export default OrderInProcess;

function PaymentMethod({ user, orders }) {
  const { is_paid: isPaid } = orders;

  return (
    <div className="  border-2 border-cream-100 shadow-md rounded-md p-4 sm:p-6 flex flex-col gap-2">
      <h1 className="text-lg font-bold">Payment Method: </h1>
      <p className="">
        <span className="capitalize text-brown-300">
          {user?.payment_method === "cod" ? "Cash On Delivery" : "PAYSTACK"}
        </span>
      </p>
      <div
        className={` w-fit rounded-full py-1 px-4 font-bold text-cream-200 text-sm ${
          isPaid ? "bg-green-500" : "bg-red-500"
        } `}
      >
        {isPaid ? "Paid" : "Not Paid"}
      </div>
    </div>
  );
}

function DeliveryAddress({ user }) {
  const address = user?.address;
  const closestLocation = user?.closest_location;

  return (
    <div className="  border-2 border-cream-100 shadow-md rounded-md p-4 sm:p-6 flex flex-col gap-2">
      <h1 className="text-lg font-bold">Delivery Address: </h1>
      <div className="text-brown-300 flex flex-col gap-1">
        <p className="">{address?.fullName}</p>
        <p>
          {address?.address} | {`${address?.city} | ${address?.state} State.`}
        </p>
        <p>
          <span className=" font-bold mr-2">Contact:</span>
          {address.contact}
        </p>
        <p>
          <span className="font-bold mr-2">Closest Delivery Location:</span>
          {closestLocation}
        </p>
      </div>
      <div className="bg-red-500 w-fit rounded-full py-1 px-4 font-bold text-cream-200 text-sm ">
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
