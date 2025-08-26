import Modal from "@/app/_components/Modal";
import { HiPencilSquare } from "react-icons/hi2";
import CreateAddressForm from "./CreateAddressForm";

function EmptyAddress() {
  return (
    <div className="text-sm leading-6 lg:text-base">
      <p>Please Enter your Delivery Address By Click on </p>

      <Modal>
        <Modal.Open openWindowName="address">
          <button className="flex items-center gap-2 cursor-pointer text-orangered-100 hover:underline hover:text-brown-300 trans">
            <span>Add Address</span>
            <HiPencilSquare />
          </button>
        </Modal.Open>
        <Modal.Window openWindowName="address">
          <CreateAddressForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default EmptyAddress;
