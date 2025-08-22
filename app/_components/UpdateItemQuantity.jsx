import { useTransition } from "react";
import { decreaseCartItem, increaseCartItem } from "../_libs/cartActions";
import { HiArrowPath } from "react-icons/hi2";

function UpdateItemQuantity({ quantity, cartId }) {
  const [isPending, startTransition] = useTransition();

  async function handleIncreaseItem() {
    startTransition(() => {
      increaseCartItem(cartId);
    });
  }

  async function handleDecreaseItem() {
    startTransition(() => {
      decreaseCartItem(cartId);
    });
  }

  return (
    <div className="place-self-end flex items-center w-fit gap-2 sm:gap-3  p-1  rounded-full bg-orangered-100 text-cream-200 font-bold text-lg">
      <button
        onClick={handleDecreaseItem}
        className="border-1 w-6 h-6 p-1 sm:p-3 grid place-content-center rounded-full hover:bg-cream-200 hover:text-orangered-100 trans cursor-pointer"
      >
        -
      </button>

      {isPending ? (
        <HiArrowPath className="animate-spin" />
      ) : (
        <p className="text-sm sm:text-base">{quantity}</p>
      )}

      <button
        onClick={handleIncreaseItem}
        className="border-1 w-6 h-6 p-1 sm:p-3 grid place-content-center rounded-full hover:bg-cream-200 hover:text-orangered-100 trans cursor-pointer"
      >
        <span>+</span>
      </button>
    </div>
  );
}

export default UpdateItemQuantity;
