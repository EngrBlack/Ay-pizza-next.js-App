import { formatCurrency } from "@/app/_helper/helper";
import { HiEllipsisVertical } from "react-icons/hi2";

function OrderItem() {
  return (
    <>
      <div>...34jhs</div>
      <div>Dec 17, 2025, 8:12 PM</div>
      <div>Gabriel Uchenna</div>
      <div>{formatCurrency(230000)}</div>
      <div>Dec 28, 2025, 8:12 PM</div>
      <div>Dec 15, 2025, 8:12 PM</div>
      <div>
        <HiEllipsisVertical />
      </div>
    </>
  );
}

export default OrderItem;
