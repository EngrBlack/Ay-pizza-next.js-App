"use client";

import Flexitem from "@/app/_components/Flexitem";
import { formatCurrency } from "@/app/_helper/helper";
import { motion } from "framer-motion";

function CustomerPaymentSummary({ order }) {
  const {
    delivery_price: deliveryPrice,
    tax_price: taxPrice,
    items_price: itemsPrice,
    total_price: totalPrice,
    order_items: orderItems,
  } = order;

  const totalQuantity = orderItems.reduce(
    (accu, cur) => accu + cur?.quantity,
    0
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="basis-1/2 shadow-md border-2 border-cream-100 rounded-md p-4 mt-4 xl:mt-6"
    >
      <div className="  flex flex-col gap-2 sm:p-6  md:gap-4 sm:border sm:border-brown-100 whitespace-nowrap">
        <h2 className="font-bold md:text-xl">Payment Summary:</h2>
        <Flexitem
          label={`Subtotal (${totalQuantity}-items):`}
          className="text-sm lg:text-base"
        >
          {formatCurrency(itemsPrice)}
        </Flexitem>
        <Flexitem label="Delivery Fee:" className="text-sm lg:text-base">
          {formatCurrency(deliveryPrice)}
        </Flexitem>
        <Flexitem label="Tax 10% (Included):" className="text-sm lg:text-base">
          {formatCurrency(taxPrice)}
        </Flexitem>
        <div className="flex items-center justify-between font-bold text-sm sm:text-base md:text-xl border-t-1 border-brown-300 pt-2">
          <p>Total to be paid:</p>
          <p>{formatCurrency(totalPrice)}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default CustomerPaymentSummary;
