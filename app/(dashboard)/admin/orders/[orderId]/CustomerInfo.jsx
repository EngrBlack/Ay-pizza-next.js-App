import Flexitem from "@/app/_components/Flexitem";
import { formatCurrency } from "@/app/_helper/helper";

function CustomerInfo({ order }) {
  const {
    delivery_price,
    user_id: {
      fullName,
      email,
      address: { contact, address, city, state },
      closest_location,
    },
  } = order;

  return (
    <div className="basis-1/2 shadow-md border-2 border-cream-100 rounded-md p-4 flex flex-col gap-2">
      <h2 className="font-bold text-xl">Customer Info:</h2>
      <Flexitem label="Name:">{fullName}</Flexitem>
      <Flexitem label="Email:">{email}</Flexitem>
      <Flexitem label="contact:">{contact}</Flexitem>
      <Flexitem label="Fast Location for Riders:">
        <div className=" bg-brown text-cream-100 w-fit rounded  py-1 px-4 text-lg justify-self-end animate-pulse">
          {`${closest_location} - ${formatCurrency(delivery_price)}`}
        </div>
      </Flexitem>
      <Flexitem label=" Address:">
        <div className=" bg-brown text-cream-100 w-fit rounded  py-1 px-4 text-lg justify-self-end">
          {`${address} | ${city} | ${state}.`}
        </div>
      </Flexitem>
    </div>
  );
}

export default CustomerInfo;
