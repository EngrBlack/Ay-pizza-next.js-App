import { HiEllipsisVertical } from "react-icons/hi2";
import { formatCurrency } from "../_helper/helper";

function RecentSalesItem() {
  return (
    <>
      <div>..424hd</div>
      <div>Fabioan Peace </div>
      <div>Tue, Dec 17, 2014. 18:34 PM</div>
      <div>{formatCurrency(204343)}</div>
      <div>
        <HiEllipsisVertical />
      </div>
    </>
  );
}

export default RecentSalesItem;
