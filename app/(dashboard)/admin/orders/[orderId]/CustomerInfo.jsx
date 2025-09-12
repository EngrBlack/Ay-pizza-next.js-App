import Flexitem from "@/app/_components/Flexitem";

function CustomerInfo({ order }) {
  const {
    user_id: {
      fullName,
      email,
      address: { contact, address, city, state },
    },
  } = order;

  return (
    <div className="basis-1/2 shadow-md border-2 border-cream-100 rounded-md p-4 flex flex-col gap-2">
      <h2 className="font-bold text-xl">Customer Info:</h2>
      <Flexitem label="Name:">{fullName}</Flexitem>
      <Flexitem label="Email:">{email}</Flexitem>
      <Flexitem label="contact:">{contact}</Flexitem>
      <Flexitem label=" Address:">
        <div className=" bg-brown text-cream-100 w-fit rounded-lg  py-2 px-4 text-lg justify-self-end">
          {`${address} | ${city} | ${state}.`}
        </div>
      </Flexitem>
    </div>
  );
}

export default CustomerInfo;
