import Image from "next/image";

function OrderSummaryItem() {
  return (
    <div className="grid grid-cols-[auto_1fr_auto]  gap-2 border-b-1 border-brown-100 py-2.5">
      <figure className="overflow-hidden rounded-[5px] w-16 max-w-20 aspect-square">
        <Image
          src="/burger.jpg"
          width={60}
          height={60}
          alt=""
          className="w-full h-full object-cover"
        />
      </figure>

      <div>
        <h2 className="font-bold text-sm mb-2 tracking-wide ">
          BBQ Beef PizzaMilk
        </h2>
        <p className=" text-brown-500 text-xs ">
          size: <span className="">King Size (Triple Deck)</span>
        </p>
      </div>

      <div className="text-right flex flex-col justify-between">
        <h2 className="font-semibold text-orangered-200 ">N37,500</h2>
        <p className="text-sm text-brown-500  ">Qty 4</p>
      </div>
    </div>
  );
}

export default OrderSummaryItem;
