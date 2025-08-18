import { formatCurrency } from "@/app/_helper/helper";
import OrderSummaryCard from "../../checkout/OrderSummaryCard";

function OrderInProcess() {
  return (
    <div className="flex flex-col gap-4 md:flex-row lg:gap-6">
      <div className="md:basis-[58%] lg:basis-[60%] flex flex-col gap-4 lg:gap-6">
        <PaymentMethod />
        <DeliveryAddress />
        <OrderedItems />
      </div>
      <OrderedItemsSummary />
    </div>
  );
}

export default OrderInProcess;

function PaymentMethod() {
  return (
    <div className="  border-2 border-cream-100 shadow-md rounded-md p-4 sm:p-6 flex flex-col gap-2">
      <h1 className="text-lg font-bold">Payment Method: </h1>
      <p className="">Stripe</p>
      <div className="bg-red w-fit rounded-full py-0.5 px-4 font-bold text-cream-200 text-sm ">
        Not Paid
      </div>
    </div>
  );
}

function DeliveryAddress() {
  return (
    <div className="  border-2 border-cream-100 shadow-md rounded-md p-4 sm:p-6 flex flex-col gap-2">
      <h1 className="text-lg font-bold">Delivery Address: </h1>
      <div>
        <p className="">Gabriel Uchenna</p>
        <p>
          Block 569 Flat 6, Abesan Estate Ipaja, L.G.A Alimosho, Lagos State.
        </p>
      </div>
      <div className="bg-red w-fit rounded-full py-0.5 px-4 font-bold text-cream-200 text-sm ">
        Not Delivered
      </div>
    </div>
  );
}

function OrderedItems() {
  return (
    <div className="  border-2 border-cream-100 shadow-md rounded-md p-4 sm:p-6 pb-8 flex flex-col gap-2">
      <h1 className="text-lg font-bold">Order Items: </h1>
      <OrderSummaryCard />
    </div>
  );
}

function OrderedItemsSummary() {
  return (
    <div className="md:self-start border-2 border-cream-100 shadow-md rounded-md p-4 sm:p-6 pb-8 grow flex flex-col gap-3">
      <div className="flex justify-between font-bold">
        <span>Items</span>
        <span>{formatCurrency(12500)}</span>
      </div>
      <div className="flex justify-between font-bold">
        <span>Tax</span>
        <span>{formatCurrency(200)}</span>
      </div>
      <div className="flex justify-between font-bold">
        <span>Delivery Fee</span>
        <span>{formatCurrency(1000)}</span>
      </div>
      <div className="flex justify-between font-bold border-t pt-2 text-lg">
        <span>Total</span>
        <span>{formatCurrency(13700)}</span>
      </div>
    </div>
  );
}
