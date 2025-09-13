import { useState, useTransition } from "react";
import toast from "react-hot-toast";
import {
  HiArrowPath,
  HiOutlinePencilSquare,
  HiOutlineTrash,
} from "react-icons/hi2";
import ConfirmDelete from "../../../_components/ConfirmDelete";
import { useRouter } from "next/navigation";

function ProductGroupedButton({ menu, onDeleteMenu }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleDelete() {
    startTransition(async () => {
      try {
        await onDeleteMenu(menu?.id);

        toast.success(`Menu ${menu?.id} was deleted successfully.`);
      } catch (error) {
        toast.error("Could not delete Category.");
      }
    });
  }

  return (
    <div className="flex gap-2 items-center justify-center">
      <button
        onClick={() => router.push(`/admin/products/${menu.id}`)}
        className="bg-brown-300 text-cream-200 p-1 text-xl rounded shadow hover:-translate-y-0.5 active:translate-y-0 trans ease-in-out"
      >
        <HiOutlinePencilSquare />
      </button>

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
          resource={`Menu ${menu?.id}`}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

export default ProductGroupedButton;
