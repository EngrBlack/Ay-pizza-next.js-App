"use client";

import Flexitem from "@/app/_components/Flexitem";
import { formatDate, formatDateTime, maskId } from "@/app/_helper/helper";
import { motion } from "framer-motion";

function CustomerOrderInfo({ order }) {
  const {
    id: orderId,
    created_at: createdAt,
    is_paid: isPaid,
    is_delivered: isDelivered,
  } = order;
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="basis-1/2 shadow-md border-2 border-cream-100 rounded-md p-4 flex flex-col gap-2 whitespace-nowrap"
    >
      <h2 className="font-bold  lg:text-xl">Order Info:</h2>
      <Flexitem label="Order Date:" className="text-sm lg:text-base">
        {formatDateTime(createdAt)}
      </Flexitem>
      <Flexitem label="Delivery Date:" className="text-sm lg:text-base">
        {formatDate(createdAt)}
      </Flexitem>
      <Flexitem label="Order ID:" className="text-sm lg:text-base">
        {maskId(orderId, 8)}
      </Flexitem>
      <Flexitem label="Status:" className="mb-1.5 text-sm lg:text-base">
        {isDelivered ? (
          <span className="bg-amber-300 text-cream-100 rounded-full py-1.5 px-4">
            Delivered
          </span>
        ) : (
          <span className=" bg-orange-400 text-cream-100 rounded-full py-1.5 px-4">
            In Progress
          </span>
        )}
      </Flexitem>
      <Flexitem
        label="Payment Status:"
        className="capitalize text-sm lg:text-base"
      >
        {isPaid ? (
          <span className="bg-green-500 rounded-full py-1.5 px-6 text-cream-200">
            paid
          </span>
        ) : (
          <span className="bg-red-500 rounded-full py-1.5 px-4 text-cream-200">
            Not Paid
          </span>
        )}
      </Flexitem>
    </motion.div>
  );
}
export default CustomerOrderInfo;
