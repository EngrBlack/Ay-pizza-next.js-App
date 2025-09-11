import Button from "@/app/_components/Button";
import { formatCurrency, formatDate, maskId } from "@/app/_helper/helper";
import { useRouter } from "next/navigation";
import { HiMinus } from "react-icons/hi2";
import { motion } from "framer-motion";
import { framerItem } from "@/app/_helper/framerMotion";

function HistoryCard({ order }) {
  const router = useRouter();

  const {
    id: orderId,
    created_at: createdAt,
    total_price: totalPrice,
    order_items: orderItems,
    is_delivered: isDelivered,
  } = order;

  const orderQuantity = orderItems.reduce(
    (accu, cur) => accu + cur?.quantity,
    0
  );

  return (
    <motion.li
      variants={framerItem}
      className="border-1 border-brown-200 rounded-md shadow"
    >
      <div className="flex items-center justify-between border-b-1 border-brown-200  px-4 py-3 ">
        <p className="text-sm">{formatDate(createdAt)}</p>
        <p className=" text-cream-200 bg-brown-200 p-0.5 px-2.5 rounded-full text-xs">
          {isDelivered ? "Delivered" : "Not delivered"}
        </p>
      </div>
      <div className="flex items-center justify-between gap-4 p-4 ">
        <div className="space-y-1 text-brown-300">
          <p className="font-rowdies ">{maskId(orderId, 16)}</p>
          <div className="flex items-center gap-1">
            <span className="font-bold">
              {`${orderQuantity} ${orderQuantity > 1 ? "Items" : "Item"}`}{" "}
            </span>{" "}
            <HiMinus /> <span>{formatCurrency(totalPrice)}</span>
          </div>
        </div>
        <Button
          onClick={() => router.push(`/profile/order-history/${orderId}`)}
        >
          Detials
        </Button>
      </div>
    </motion.li>
  );
}

export default HistoryCard;
