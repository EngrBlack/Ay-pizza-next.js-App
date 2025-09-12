import Modal from "@/app/_components/Modal";
import { use, useState, useTransition } from "react";
import toast from "react-hot-toast";
import {
  HiArrowPath,
  HiOutlinePencilSquare,
  HiOutlineTrash,
} from "react-icons/hi2";
import ConfirmDelete from "../../../_components/ConfirmDelete";
import UpdateUserForm from "./UpdateUserForm";

function UserGroupedButton({ onClick, user, onDeleteCategory }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const userId = user?.id;

  function handleDelete() {
    startTransition(async () => {
      // try {
      //   await onDeleteCategory(categoryId);
      //   toast.success(`Category ${name} was deleted successfully.`);
      // } catch (error) {
      //   toast.error("Could not delete Category.");
      // }
    });
  }

  return (
    <div className="flex gap-2 items-center justify-center">
      <Modal>
        <Modal.Open openWindowName={userId}>
          <button
            onClick={onClick}
            className="bg-brown-300 text-cream-200 p-1 text-xl rounded shadow hover:-translate-y-0.5 active:translate-y-0 trans ease-in-out"
          >
            <HiOutlinePencilSquare />
          </button>
        </Modal.Open>
        <Modal.Window openWindowName={userId}>
          <UpdateUserForm onCloseModal user={user} />
        </Modal.Window>
      </Modal>
      <button
        onClick={() => setIsOpen(true)}
        className=" bg-orangered-100 text-cream-200 p-1 text-xl rounded shadow hover:-translate-y-0.5 active:translate-y-0 trans ease-in-out flex items-center justify-center"
      >
        {isPending ? (
          <HiArrowPath className="animate-spin" />
        ) : (
          <HiOutlineTrash />
        )}
      </button>

      {isOpen && (
        <ConfirmDelete
          onClose={() => setIsOpen(false)}
          resource="User"
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

export default UserGroupedButton;
