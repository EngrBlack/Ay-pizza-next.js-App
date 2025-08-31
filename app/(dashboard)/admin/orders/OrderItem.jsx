import { formatCurrency, formatDateTime } from "@/app/_helper/helper";
import { HiEllipsisVertical } from "react-icons/hi2";

function OrderItem({ order }) {
  const {
    id: orderId,
    created_at: createdAt,
    total_price: totalPrice,
    delivery_address: { fullName },
  } = order;

  return (
    <>
      <div>
        {orderId.slice(-6).padStart(orderId.length, "*")}
      </div>
      <div>{formatDateTime(createdAt)}</div>
      <div>{fullName}</div>
      <div>{formatCurrency(totalPrice)}</div>
      <div>Dec 28, 2025, 8:12 PM</div>
      <div>Dec 15, 2025, 8:12 PM</div>
      <div>
        <HiEllipsisVertical />
      </div>
    </>
  );
}

export default OrderItem;
