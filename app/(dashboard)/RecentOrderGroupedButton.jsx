import { useState, useTransition } from "react";
import toast from "react-hot-toast";
import { HiArrowPath, HiOutlineEye, HiOutlineTrash } from "react-icons/hi2";

import { useRouter } from "next/navigation";
import { maskId } from "@/app/_helper/helper";
import ConfirmDelete from "../_components/ConfirmDelete";

function RecentOrderGroupedButton({ recentOrderId, onDeleteRecentOrder }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  function handleDelete() {
    startTransition(async () => {
      try {
        await onDeleteRecentOrder(recentOrderId);
        toast.success(
          `Order  ${maskId(recentOrderId, 5)} was deleted successfully.`
        );
      } catch (error) {
        toast.error("Could not delete order.");
      }
    });
  }

  return (
    <div className="flex gap-2 items-center justify-center">
      <button
        onClick={() => router.push(`/admin/orders/${recentOrderId}`)}
        className="text-orangered-100 bg-cream-100 rounded  p-1 text-xl  shadow hover:-translate-y-0.5 active:translate-y-0 trans ease-in-out"
      >
        <HiOutlineEye />
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
          resource={`Order ${maskId(recentOrderId, 5)}`}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

export default RecentOrderGroupedButton;
