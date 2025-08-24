import InputCheck from "@/app/_components/InputCheck";
import { formatCurrency } from "@/app/_helper/helper";
import Image from "next/image";
import { useState } from "react";

function MenuToppings({ topping, checked, onToggle }) {
  const [toppingValue, setToppingValue] = useState(false);
  console.log(toppingValue);

  const toppingImages = {
    // regular toppings
    oreo: "/oreo.jpeg",
    "m & m": "/mandm.jpeg",
    "brown coconut": "/brown-cocoanut.jpeg",
    "cashua nut": "/cashua-nut.jpg",
    "chocolate syrup": "/chocolate-syrup.jpeg",
    "caramel syrup": "/caramel-syrup.jpeg",
    "waffle cone": "/waffle-cone.jpeg",
    "waffle bowl": "/waffle-bowl.jpeg",

    // extra toppings
    "extra beef": "/beef.jpeg",
    "extra cheese": "/cheese.jpeg",
    "extra chicken": "/chicken.jpeg",
    "extra pepperoni": "/pepperoni.jpeg",
    "regular half & half": "/half-and-half.jpeg",
    "standard half & half": "/half-and-half.jpeg",
    "large half & half": "/half-and-half.jpeg",
  };

  // normalize input (trim + lowercase)
  const key = topping?.name?.trim().toLowerCase();
  const image = toppingImages[key] || "/burger.jpg";

  return (
    <div className={`flex justify-between items-center gap-4 `}>
      <div className="flex items-center gap-3">
        <figure className="relative aspect-square overflow-hidden rounded-full w-10 shadow-md">
          <Image
            width={40}
            height={40}
            src={image || "/burger.jpg"}
            alt={`${topping?.name || "topping"} image`}
            className="w-full h-full object-cover"
          />
        </figure>
        <p className="capitalize text-sm ">{topping?.name}</p>
      </div>

      <InputCheck
        checked={checked}
        onChange={onToggle}
        className="flex-row-reverse"
        label={`${formatCurrency(topping?.price)}`}
      />
    </div>
  );
}

export default MenuToppings;
