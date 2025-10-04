import Link from "next/link";
import { FaCartArrowDown } from "react-icons/fa6";

function EmptyOrderHistory() {
  return (
    <div className="text-center flex flex-col items-center justify-center gap-3 w-5/6 lg:w-1/2 mx-auto h-[calc(100vh-70vh)] md:h-[calc(100vh-80vh)] my-30 sm:my-40 ">
      <p className="font-rowdies text-2xl text-brown-300">
        You have no order history...😔
      </p>
      <div className="*:text-[10rem] *:sm:text-[14rem] *:lg:text-[16rem] *:text-brown-100">
        <FaCartArrowDown />
      </div>

      <p className="sm:text-lg text-center text-brown-200">
        You have not made any order, please search for your menu item and make
        an order to view history here
      </p>
      <Link
        href="/menu"
        className="text-cream-200 bg-brown-300 animate-pulse py-1 md:py-2 px-3 md:px-4 rounded text-lg font-bold hover:bg-brown-300 focus:bg-brown-300` hover:animate-none trans ease-in-out cursor-pointer shadow-xl 
    hover:-translate-y-0.5 focus:-translate-y-0.5 active:translate-y-0 active:shadow-lg md:text-[15px] disabled:cursor-not-allowed"
      >
        Start placing your Order
      </Link>
    </div>
  );
}

export default EmptyOrderHistory;
