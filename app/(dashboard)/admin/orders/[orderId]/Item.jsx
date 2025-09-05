import { formatCurrency } from "@/app/_helper/helper";
import Image from "next/image";
import { HiMiniMinus } from "react-icons/hi2";

function Item({ item }) {
  const {
    menu_id: { id: menuId, name, image, base_price: basePrice, discount },
    price,
    quantity,
    selected_size: selectedSize,
    selected_toppings: selectedToppings,
  } = item;

  const selectedSizePrice = selectedSize?.price;

  return (
    <>
      <div>{menuId}</div>
      <div>
        <figure className="w-10 aspect-square rounded-md overflow-hidden">
          <Image
            width={50}
            height={50}
            src={image || "/pizza-1.jpg"}
            alt={name}
            className="w-full h-full object-cover"
          />
        </figure>
      </div>
      <div>{name}</div>
      <div>{selectedSize?.name || <HiMiniMinus />}</div>
      <div className="text-xs">
        {selectedToppings.length > 0 ? (
          selectedToppings.map((topping) => `${topping.name},`)
        ) : (
          <HiMiniMinus />
        )}

        {selectedToppings.length > 0 && (
          <span className="ml-1"> ({selectedToppings.length}) </span>
        )}
      </div>
      <div>{quantity}</div>
      <div>
        {discount
          ? formatCurrency(selectedSizePrice - discount || basePrice - discount)
          : formatCurrency(selectedSizePrice || basePrice)}
      </div>
      <div>{formatCurrency(price)}</div>
    </>
  );
}

export default Item;
