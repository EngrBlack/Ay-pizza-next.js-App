"use client";

import CustomerInfo from "./CustomerInfo";
import ItemOrdered from "./ItemOrdered";
import OrderInfo from "./OrderInfo";
import PaymentSummary from "./PaymentSummary";

function OrderDetails({ order }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col  gap-6 lg:flex-row">
        <OrderInfo order={order} />
        <CustomerInfo order={order} />
      </div>
      <ItemOrdered order={order} />
      <PaymentSummary order={order} />
    </div>
  );
}

export default OrderDetails;
