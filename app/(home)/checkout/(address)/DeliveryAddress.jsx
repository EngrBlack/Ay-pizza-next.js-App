import Modal from "@/app/_components/Modal";
import SelectInput from "@/app/_components/SelectInput";
import { formatCurrency, locations } from "@/app/_helper/helper";
import { HiPencilSquare } from "react-icons/hi2";
import EmptyAddress from "./EmptyAddress";
import UpdateAddressForm from "./UpdateAddressForm";

import { updateDeliveryPrice } from "@/app/_libs/checkoutActions";
import { useState } from "react";
import toast from "react-hot-toast";

function DeliveryAddress({ user }) {
  const { address } = user;

  const [selectedLocation, setSelectedLocation] = useState(null);

  async function handleDeliveryPrice(e) {
    const location = JSON.parse(e.target.value); // { name, price }
    setSelectedLocation(location);

    const formData = new FormData();
    formData.append("close_location", JSON.stringify(location));

    try {
      await updateDeliveryPrice(formData);
      toast.success(`Delivery fee added: ${formatCurrency(location.price)}`);
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div className="border-2 border-cream-100 p-4 rounded-sm shadow-md focus-within:border-orangered-200 focus-within:shadow-xl trans ">
      <div className="border-b-1 border-brown-100 pb-2 mb-4 flex justify-between items-start ">
        <div>
          <h2 className="text-orangered-200 font-rowdies lg:text-xl">
            Delivery Address
          </h2>
          <p className="text-[13px] lg:text-base">
            Enter an address that matches your payment method.
          </p>
        </div>

        {address && (
          <Modal>
            <Modal.Open openWindowName="address">
              <button className="text-sm flex items-center gap-2 text-orangered-100 hover:underline hover:text-brown-300 trans cursor-pointer">
                <span>Change</span>
                <HiPencilSquare />
              </button>
            </Modal.Open>
            <Modal.Window openWindowName="address">
              <UpdateAddressForm user={user} />
            </Modal.Window>
          </Modal>
        )}
      </div>
      {!address ? (
        <EmptyAddress />
      ) : (
        <div>
          <p>{address?.fullName}</p>
          <p className="text-brown-300">
            {`${address?.address} |`}
            <span>{` ${address?.state} - ${address?.city} |`} </span>
            <span> {` ${address?.contact}.`}</span>
          </p>
        </div>
      )}

      <div>
        <p className="font-rowdies text-brown-300 mt-2 ">
          Please select closest delivery location :
        </p>
        <SelectInput
          value={selectedLocation ? JSON.stringify(selectedLocation) : ""}
          name="close_location"
          onChange={handleDeliveryPrice}
        >
          <option value="">----- Select Location ------</option>
          {locations.map((location) => (
            <option key={location.name} value={JSON.stringify(location)}>
              {`${location.name} - ${formatCurrency(location.price)}`}
            </option>
          ))}
        </SelectInput>
      </div>
    </div>
  );
}

export default DeliveryAddress;
