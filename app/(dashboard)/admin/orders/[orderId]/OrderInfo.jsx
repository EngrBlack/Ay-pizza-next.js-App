import Button from "@/app/_components/Button";
import Flexitem from "@/app/_components/Flexitem";
import { formatDate, formatDateTime, maskId } from "@/app/_helper/helper";

function OrderInfo({ order, updatePaymentStatus }) {
  const {
    id: orderId,
    created_at: createdAt,
    is_paid: isPaid,
    is_delivered: isDelivered,
    payment_method: paymentMethod,
  } = order;

  return (
    <div className="basis-1/2 shadow-md border-2 border-cream-100 rounded-md p-4 flex flex-col gap-2">
      <h2 className="font-bold text-xl">Order Info:</h2>
      <Flexitem label="Order Date:">{formatDateTime(createdAt)}</Flexitem>
      <Flexitem label="Delivery Date:">{formatDate(createdAt)}</Flexitem>
      <Flexitem label="Order ID:">{maskId(orderId, 8)}</Flexitem>
      <Flexitem label="Status:" className="mb-1.5">
        {isDelivered ? (
          <span className="bg-amber-300 text-cream-100 rounded-full py-1.5 px-4">
            Delivered
          </span>
        ) : (
          <span className=" bg-orange-400 text-cream-100 rounded-full py-1.5 px-4">
            In Progress...
          </span>
        )}
      </Flexitem>
      <Flexitem label="Payment Status:" className="capitalize">
        {isPaid ? (
          <span className="bg-green-500 rounded-full py-1.5 px-6 text-cream-200">
            paid
          </span>
        ) : (
          <span className="bg-red-500 rounded-full py-1.5 px-4 text-cream-200">
            Not Paid
          </span>
        )}
      </Flexitem>
      {!isPaid && paymentMethod === "cod" && (
        <Flexitem className="">
          <form action={updatePaymentStatus}>
            <Button
              type="danger"
              className=" font-rowdies mt-4 justify-self-end w-full "
            >
              Mark as Paid
            </Button>
          </form>
        </Flexitem>
      )}
    </div>
  );
}
export default OrderInfo;
