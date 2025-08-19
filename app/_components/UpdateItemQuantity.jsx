import { decreaseCartItem, increaseCartItem } from "../_libs/cartActions";

function UpdateItemQuantity({ quantity, cartId }) {
  async function handleIncreaseItem() {
    await increaseCartItem(cartId);
  }
  async function handleDecreaseItem() {
    await decreaseCartItem(cartId);
  }

  return (
    <div className="place-self-end flex items-center w-fit gap-4 p-1  rounded-full bg-orangered-100 text-cream-200 font-bold text-lg">
      <button
        onClick={handleDecreaseItem}
        className="border-1 w-6 h-6 p-1 sm:p-3 grid place-content-center rounded-full hover:bg-cream-200 hover:text-orangered-100 trans cursor-pointer"
      >
        -
      </button>
      <p className="text-sm sm:text-base">{Number(quantity)}</p>
      <button
        onClick={handleIncreaseItem}
        className="border-1 w-6 h-6 p-1 sm:p-3 grid place-content-center rounded-full hover:bg-cream-200 hover:text-orangered-100 trans cursor-pointer"
      >
        +
      </button>
    </div>
  );
}

export default UpdateItemQuantity;
