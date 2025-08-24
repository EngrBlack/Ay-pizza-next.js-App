import Image from "next/image";
import UpdateItemQuantity from "../../_components/UpdateItemQuantity";
import { formatCurrency } from "../../_helper/helper";
import RemoveCartItem from "./RemoveCartItem";

function CartItem({ cart, onRemoveCartItem }) {
  const {
    id,
    menu_id: { discount, image, name, base_price: basePrice },
    quantity,
    selected_toppings: selectedToppings,
  } = cart;

  const size = cart?.selected_size?.name;
  const price = Number(cart?.selected_size?.price) || Number(basePrice);

  const toppingsList = (selectedToppings || [])
    .map((topping) => topping.name)
    .join(", ");

  return (
    <div className="leading-[1] ">
      <div className="grid grid-cols-[max-content_1fr_max-content] grid-rows-[repeat(4,max-content)] gap-1 gap-x-2 sm:gap-2 py-2.5 sm:py-3 border-b-1 border-brown-100">
        <figure className="row-span-3  max-w-full  aspect-square overflow-hidden rounded ">
          <Image
            width={60}
            height={60}
            src={image || "/pizza-1.jpg"}
            alt=""
            className="w-full h-full object-fit"
          />
        </figure>
        <div className="row-span-2">
          <h2 className="font-rowdies mb-2 sm:text-lg md:text-xl capitalize">
            {name}
          </h2>
          <p className="text-xs sm:text-sm md:text-base capitalize">
            Size :{" "}
            <span className="text-brown-200">
              {size ? size.split("_").join(" ") : "Null"}
            </span>
          </p>
        </div>
        <div className="row-span-2 text-xs place-self-end-safe self-start">
          <p className="text-orangered-200 font-bold text-base lg:text-lg ">
            {discount
              ? formatCurrency((price - discount) * quantity)
              : formatCurrency(price * quantity)}
          </p>
          <span className="text-brown-200 line-through text-[13px]">
            {discount && formatCurrency(price * quantity)}
          </span>
        </div>

        <p className="col-span-2 text-xs capitalize">
          <span className="bg-brown-200 text-cream-100 py-0.5 px-1.5 mr-1">
            Added:
          </span>
          <span className="text-brown-300">
            {selectedToppings ? toppingsList : "No toppings"}
          </span>
        </p>

        <RemoveCartItem cartId={id} onRemoveCartItem={onRemoveCartItem} />
        <p className=" text-xs place-self-center">Available</p>
        <UpdateItemQuantity quantity={quantity} cartId={id} />
      </div>
    </div>
  );
}

export default CartItem;
