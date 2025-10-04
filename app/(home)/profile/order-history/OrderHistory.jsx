"use client";

import { framerContainer } from "@/app/_helper/framerMotion";
import HistoryCard from "./HistoryCard";
import { motion } from "framer-motion";
import EmptyOrderHistory from "./EmptyOrderHistory";
import Pagination from "@/app/_components/Pagination";

function OrderHistory({ userOrders, count }) {
  const pageSize = Number(process.env.NEXT_PUBLIC_PAGE_SIZE);

  return (
    <div>
      {userOrders?.length > 0 ? (
        <motion.ul
          variants={framerContainer}
          initial="hidden"
          animate="show"
          className="grid md:grid-cols-2 gap-4"
        >
          {userOrders.map((order) => (
            <HistoryCard key={order.id} order={order} />
          ))}
        </motion.ul>
      ) : (
        <EmptyOrderHistory />
      )}
      {count > pageSize && userOrders?.length > 0 && (
        <Pagination field="page" count={count} />
      )}
    </div>
  );
}

export default OrderHistory;
