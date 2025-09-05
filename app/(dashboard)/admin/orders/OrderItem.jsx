import { formatCurrency, formatDateTime, maskId } from "@/app/_helper/helper";
import { HiEllipsisVertical } from "react-icons/hi2";

function OrderItem({ order }) {
  const {
    id: orderId,
    created_at: createdAt,
    total_price: totalPrice,
    delivery_address: { fullName },
    paid_at: paidAt,
    is_delivered: isDelivered,
  } = order;

  return (
    <>
      <div>{maskId(orderId, 6)}</div>
      <div>{formatDateTime(createdAt)}</div>
      <div>{fullName}</div>
      <div>{formatCurrency(totalPrice)}</div>
      <div>{formatDateTime(paidAt) || "Not Paid"}</div>
      <div>{isDelivered ? "Delivered" : "Not Delivered"}</div>
      <div>
        <HiEllipsisVertical />
      </div>
    </>
  );
}

export default OrderItem;
