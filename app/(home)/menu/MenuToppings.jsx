import InputCheck from "@/app/_components/InputCheck";
import { formatCurrency } from "@/app/_helper/helper";
import Image from "next/image";

function MenuToppings({ openToppings }) {
  return (
    <div className={`flex justify-between items-center gap-4 `}>
      <div className="flex items-center gap-3">
        <figure className="relative aspect-square overflow-hidden rounded-full w-10">
          <Image
            width={40}
            height={40}
            src="/burger.jpg"
            alt="Cheese topping"
            className="w-full h-full object-cover"
          />
        </figure>
        <p>Cheese</p>
      </div>

      <InputCheck
        className="flex-row-reverse"
        label={`${formatCurrency(1450)}`}
      />
    </div>
  );
}

export default MenuToppings;
