import { HiEllipsisVertical } from "react-icons/hi2";
import { formatCurrency, formatDateTime, maskId } from "../_helper/helper";
import RecentOrderGroupedButton from "./RecentOrderGroupedButton";

function RecentSalesItem({ recentOrder, onDeleteRecentOrder }) {
  const {
    id: recentOrderId,
    total_price: totalPrice,
    user_id,
    created_at: createdAt,
  } = recentOrder;
  return (
    <>
      <div>{maskId(recentOrderId, 5)}</div>
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
