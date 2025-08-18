import { HiTrash } from "react-icons/hi2";
import Button from "../../_components/Button";
import { formatCurrency } from "../../_helper/helper";
import UpdateItemQuantity from "../../_components/UpdateItemQuantity";
import Image from "next/image";

function CartItem({ cart }) {
  const {
    menu_id: { discount, image, name },
    quantity,
    total_price: totalPrice,
    selected_toppings: selectedToppings,
  } = cart;

  const size = cart?.selected_size?.name;
  const price = cart?.selected_size?.price;

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
            src={image}
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
            <span className="text-brown-200">{size ? size : "Null"}</span>
          </p>
        </div>
        <div className="row-span-2 text-xs">
          <p className="text-orangered-200 font-bold text-sm sm:text-base lg:text-lg mb-2">
            {discount
              ? formatCurrency((price - discount) * quantity)
              : formatCurrency(totalPrice)}
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

        <button className="place-self-center  flex items-center justify-center gap-0.5 sm:gap-1 text-xs md:text-sm border border-brown text-brown rounded py-1 sm:py-1.5  px-2 sm:px-3 md:px-2 hover:bg-brown hover:text-cream-200 trans ease-in-out md:w-full ">
          <HiTrash />
          <span>REMOVE</span>
        </button>
        <p className=" text-xs place-self-center">Available</p>
        <UpdateItemQuantity quantity={quantity} />
      </div>
    </div>
  );
}

export default CartItem;
