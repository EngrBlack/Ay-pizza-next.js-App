import Link from "next/link";

function EmptyOrderHistory() {
  return (
    <div className="text-center flex flex-col items-center justify-center gap-3 w-5/6 mx-auto h-[calc(100vh-70vh)] md:h-[calc(100vh-80vh)] mb-20 sm:mb-30">
      <p className="font-rowdies text-2xl">No History available...😔</p>
      <Link
        href="/menu"
        className="text-brown-300 text-lg font-bold hover:underline focus:underline trans ease-in-out cursor-pointer"
      >
        Start placing your Order
      </Link>
    </div>
  );
}

export default EmptyOrderHistory;
