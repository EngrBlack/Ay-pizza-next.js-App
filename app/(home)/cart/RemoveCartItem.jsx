import { removeCartItem } from "@/app/_libs/cartActions";
import { useTransition } from "react";
import toast from "react-hot-toast";
import { HiArrowPath, HiTrash } from "react-icons/hi2";

function RemoveCartItem({ cartId }) {
  const [isPending, startTransition] = useTransition();

  function handleRemoveCartItem() {
    startTransition(async () => {
      try {
        await removeCartItem(cartId);
        toast.success("Menu removed succesfully!");
      } catch (error) {
        toast.error(`Could not remove menu from Cart: ${error.message}`);
      }
    });
  }

  return (
    <button
      onClick={handleRemoveCartItem}
      className="place-self-center  flex items-center justify-center gap-0.5 sm:gap-1 text-xs md:text-sm border border-brown text-brown rounded py-1 sm:py-1.5  px-2 sm:px-3 md:px-2 group hover:bg-brown hover:text-cream-200 trans ease-in-out w-full "
    >
      {isPending ? (
        <div className="px-6">
          <HiArrowPath className="animate-spin text-xl group-hover:text-cream-100 text-brown " />
        </div>
      ) : (
        <>
          <HiTrash />
          <span>REMOVE</span>
        </>
      )}
    </button>
  );
}

export default RemoveCartItem;
