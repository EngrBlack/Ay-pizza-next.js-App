import { formatCurrency, formatDateTime, maskId } from "@/app/_helper/helper";
import OrderGroupedButton from "./OrderGroupedButton";

function OrderItem({ order, onDeleteOrder }) {
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
        <OrderGroupedButton orderId={orderId} onDeleteOrder={onDeleteOrder} />
      </div>
    </>
  );
}

export default OrderItem;
