"use client";

import { framerContainer } from "@/app/_helper/framerMotion";
import HistoryCard from "./HistoryCard";
import { motion } from "framer-motion";
import EmptyOrderHistory from "./EmptyOrderHistory";

function OrderHistory({ userOrders }) {
  return (
    <motion.ul
      variants={framerContainer}
      initial="hidden"
      animate="show"
      className="grid md:grid-cols-2 gap-4"
    >
      {userOrders.length > 0 ? (
        userOrders.map((order) => <HistoryCard key={order.id} order={order} />)
      ) : (
        <EmptyOrderHistory />
      )}
    </motion.ul>
  );
}

export default OrderHistory;
