import Link from "next/link";
import { FaCartArrowDown } from "react-icons/fa6";
import { HiArrowLeft } from "react-icons/hi2";

function EmptyCart() {
  return (
    <div>
      <Link
        href="/menu"
        className="flex items-center gap-2 text-orangered-100 hover:text-brown-300 hover:underline trans mb-2 sm:mb-4"
      >
        <HiArrowLeft />
        <span> Back to menu</span>
      </Link>
      <div className="flex flex-col items-center gap-4 text-center text-brown-200">
        <FaCartArrowDown className="text-[10rem] sm:text-[14rem] lg:text-[16rem] text-brown-100" />
        <p className="font-bold sm:text-lg md:text-xl lg:text-2xl">
          Your cart is still empty. Start adding some pizzas
        </p>
      </div>
    </div>
  );
}

export default EmptyCart;
