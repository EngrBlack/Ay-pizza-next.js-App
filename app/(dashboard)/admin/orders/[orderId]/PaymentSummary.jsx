import Flexitem from "@/app/_components/Flexitem";
import { formatCurrency } from "@/app/_helper/helper";

function PaymentSummary({ order }) {
  const {
    delivery_price: deliveryPrice,
    tax_price: taxPrice,
    items_price: itemsPrice,
    total_price: totalPrice,
    order_items: orderItems,
    is_paid: isPaid,
  } = order;

  const totalQuantity = orderItems.reduce(
    (accu, cur) => accu + cur?.quantity,
    0
  );

  return (
    <div className="basis-1/2 shadow-md border-2 border-cream-100 rounded-md p-4">
      <div className="  flex flex-col gap-2 md:gap-4 border p-6 border-brown-100">
        <h2 className="font-bold text-xl">Payment Summary:</h2>
        <Flexitem label={`Subtotal (${totalQuantity}-items):`}>
          {formatCurrency(itemsPrice)}
        </Flexitem>
        <Flexitem label="Delivery Fee:">
          {formatCurrency(deliveryPrice)}
        </Flexitem>
        <Flexitem label="Tax 10% (Included):">
          {formatCurrency(taxPrice)}
        </Flexitem>
        <div className="flex items-center justify-between font-bold text-sm sm:text-base md:text-xl border-t-1 border-brown-300 pt-2">
          <p>
            {isPaid
              ? "Total paid by Customer:"
              : "Total to be paid by Customer:"}
          </p>
          <p>{formatCurrency(totalPrice)}</p>
        </div>
      </div>
    </div>
  );
}

export default PaymentSummary;
