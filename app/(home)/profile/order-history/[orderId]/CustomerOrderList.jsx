"use client";

import CustomerOrderItem from "./CustomerOrderItem";
import { motion } from "framer-motion";

function CustomerOrderList({ order }) {
  const { order_items: orderItems } = order;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mt-4 xl:mt-6 grid md:grid-cols-2 gap-0.5 gap-x-8 lg:gap-x-12 shadow-md border-2 border-cream-100 rounded-md p-4 "
    >
      {orderItems?.map((orderItem) => (
        <CustomerOrderItem key={orderItem.id} orderItem={orderItem} />
      ))}
    </motion.div>
  );
}

export default CustomerOrderList;
