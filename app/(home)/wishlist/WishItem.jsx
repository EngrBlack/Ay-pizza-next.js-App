import { formatCurrency } from "@/app/_helper/helper";
import { HiOutlineShoppingCart, HiPlusSmall } from "react-icons/hi2";

function WishItem() {
  return (
    <div className="p-2 pb-4 rounded-md border-2 border-cream-100 leading-[1.2] flex flex-col gap-2 shadow-lg hover:border-orangered-100 trans ease-in-out">
      <figure className="overflow-hidden aspect-5/4  rounded-md">
        <img src="/burger.jpg" alt="burger" />
      </figure>
      <h1 className="font-rowdies lg:text-lg ">Chiken Veggie Pizza</h1>
      <p className="text-sm lg:text-base font-bold">{formatCurrency(12500)}</p>
      <div className="flex items-center justify-between mt-2 lg:mt-4">
        <button className="flex items-center bg-cream-200 py-1 px-3 rounded border text-brown text-sm lg:text-base hover:bg-brown hover:text-cream-200 trans ease-in-out">
          Select
        </button>
        <button className="flex items-center bg-orangered-100 py-1.5 px-3 rounded  text-cream-200 hover:bg-orangered-200 trans ease-in-out lg:text-xl">
          <HiPlusSmall />
          <HiOutlineShoppingCart />
        </button>
      </div>
    </div>
  );
}

export default WishItem;
