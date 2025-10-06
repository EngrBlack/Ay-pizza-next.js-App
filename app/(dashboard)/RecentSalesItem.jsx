import { formatCurrency, formatDateTime, maskId } from "../_helper/helper";
import RecentOrderGroupedButton from "./RecentOrderGroupedButton";

function RecentSalesItem({ recentOrder, onDeleteRecentOrder }) {
  console.log(recentOrder);
  const {
    id: recentOrderId,
    total_price: totalPrice,
    user_id,
    created_at: createdAt,
    is_paid: isPaid,
  } = recentOrder;
  return (
    <>
      <div className="flex items-center gap-1 pl-4">
        <span
          className={`h-3 w-3 rounded-full ${isPaid ? "bg-green-500" : "bg-red-500"}`}
        ></span>
        <span> {maskId(recentOrderId, 5)}</span>
      </div>
      <div>{user_id?.address?.fullName} </div>
      <div>{formatDateTime(createdAt)}</div>
      <div className="font-bold">{formatCurrency(totalPrice)}</div>
      <div>
        <RecentOrderGroupedButton
          recentOrderId={recentOrderId}
          onDeleteRecentOrder={onDeleteRecentOrder}
        />
      </div>
    </>
  );
}

export default RecentSalesItem;
