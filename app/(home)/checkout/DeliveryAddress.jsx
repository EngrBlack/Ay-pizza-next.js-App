import EmptyAddress from "./EmptyAddress";

function DeliveryAddress() {
  return (
    <div className="border-2 border-cream-100 p-4 rounded-sm shadow-md focus-within:border-orangered-200 focus-within:shadow-xl trans ">
      <div className="border-b-1 border-brown-100 pb-2 mb-4">
        <h2 className="text-orangered-200 font-rowdies lg:text-xl">
          Delivery Address
        </h2>
        <p className="text-[13px] lg:text-base">
          Enter an address that matches your payment method.
        </p>
      </div>
      <EmptyAddress />
    </div>
  );
}

export default DeliveryAddress;
