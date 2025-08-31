import { formatCurrency } from "@/app/_helper/helper";
import Image from "next/image";

function OrderedItem({ orderItem }) {
  const {
    menu_id: { discount, image, name, base_price: basePrice },
    quantity,
    selected_size: size,
    selected_toppings: toppings,
  } = orderItem;

  const price = Number(orderItem?.selected_size?.price) || Number(basePrice);
  const toppingsPrice =
    toppings?.reduce((accu, cur) => accu + cur?.price, 0) || 0;
  console.log(toppingsPrice);

  return (
    <div className="grid grid-cols-[auto_1fr_auto]  gap-2 border-b-1 border-brown-100 py-2.5">
      <figure className="overflow-hidden rounded-[5px] w-16 max-w-20 aspect-square">
        <Image
          src={image || "/burger.jpg"}
          width={60}
          height={60}
          alt={name}
          className="w-full h-full object-cover"
        />
      </figure>

      <div>
        <h2 className="font-bold text-sm xl:text-base  tracking-wide ">
          {name}
        </h2>
        <p className="  text-[13px] lg:text-sm  capitalize">
          size: <span className="text-brown-300">{size?.name || "Normal"}</span>
        </p>
        {toppings.length > 0 && (
          <p className="text-[10px] capitalize mt-1">
            <span className="text-cream-200 bg-brown-300 px-1 py-[1px] mr-1">
              Added:
            </span>

            {toppings.map((topping) => (
              <span
                key={topping.name}
                className="text-brown-300 mr-0.5"
              >{`${topping?.name},`}</span>
            ))}
          </p>
        )}
      </div>

      <div className="text-right flex flex-col justify-between">
        <h2 className="font-semibold text-orangered-200 ">
          {" "}
          {discount
            ? formatCurrency((price - discount + toppingsPrice) * quantity)
            : formatCurrency((price + toppingsPrice) * quantity)}
        </h2>
        <p className="text-sm text-brown-500  ">Qty {quantity}</p>
      </div>
    </div>
  );
}

export default OrderedItem;
