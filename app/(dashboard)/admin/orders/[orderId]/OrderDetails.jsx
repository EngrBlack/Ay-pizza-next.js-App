"use client";

import { maskId } from "@/app/_helper/helper";
import CustomerInfo from "./CustomerInfo";
import ItemOrdered from "./ItemOrdered";
import OrderInfo from "./OrderInfo";
import PaymentSummary from "./PaymentSummary";
import Button from "@/app/_components/Button";
import { HiArrowLeft } from "react-icons/hi2";
import { useRouter } from "next/navigation";

function OrderDetails({ order, updatePaymentStatus }) {
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between gap-2 sm:gap-4 mb-4">
        <h1 className="font-rowdies text-brown text-xl sm:text-3xl  ">
          Order Details: {maskId(order?.id, 7)}
        </h1>
        <Button
          type="danger"
          icon={<HiArrowLeft />}
          onClick={() => router.back()}
        >
          Back
        </Button>
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col  gap-6 lg:flex-row">
          <OrderInfo order={order} updatePaymentStatus={updatePaymentStatus} />
          <CustomerInfo order={order} />
        </div>
        <ItemOrdered order={order} />
        <PaymentSummary order={order} />
      </div>
    </>
  );
}

export default OrderDetails;
