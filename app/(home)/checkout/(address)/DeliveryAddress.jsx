import Modal from "@/app/_components/Modal";
import { HiPencilSquare } from "react-icons/hi2";
import EmptyAddress from "./EmptyAddress";
import UpdateAddressForm from "./UpdateAddressForm";

function DeliveryAddress({ userProfile }) {
  const { address } = userProfile;

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
              <UpdateAddressForm userProfile={userProfile} />
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
    </div>
  );
}

export default DeliveryAddress;
