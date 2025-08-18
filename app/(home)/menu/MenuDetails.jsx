"use client";

import Button from "@/app/_components/Button";
import InputGroup from "@/app/_components/InputGroup";
import SelectInput from "@/app/_components/SelectInput";
import UpdateItemQuantity from "@/app/_components/UpdateItemQuantity";
import { formatCurrency } from "@/app/_helper/helper";
import { useState } from "react";
import { HiChevronUp, HiShoppingCart } from "react-icons/hi2";
import MenuToppings from "./MenuToppings";

function MenuDetails() {
  const [openToppings, setOpenToppings] = useState(false);

  return (
    <div className=" grid gap-2 md:grid-cols-2 md:gap-3 xl:gap-4">
      <figure className="col-span-2 md:col-span-1 rounded-md overflow-hidden aspect-3/2 md:aspect-auto md:h-fit">
        <img src="burger.jpg" alt=" " className="w-full h-full object-cover" />
      </figure>

      <div className="col-span-2  md:col-span-1 flex flex-col gap-3 overflow-hidden">
        <h1 className="font-rowdies text-lg lg:text-xl xl:text-2xl mt-2 md:mt-3 lg:mt-0">
          Strawberry Lovers Milkshake
        </h1>

        <div>
          <p className="font-bold text-sm lg:text-base mb-1">
            Choose Size and Price
          </p>
          <SelectInput>
            <option>Small Shake - {formatCurrency(3500)}</option>
            <option>Medium Shake - {formatCurrency(4500)}</option>
          </SelectInput>
        </div>
        <p className="col-span-2 text-sm">
          <span className="bg-brown-200 text-cream-100 py-0.5 px-1.5 mr-1">
            Added:
          </span>
          <span>chicken (Double), Chesse(Double)</span>
        </p>
        <div>
          <div
            className="flex justify-between items-center cursor-pointer mb-1 mt-1 sm:mt-0"
            onClick={() => setOpenToppings((open) => !open)}
          >
            <span className="font-bold text-sm lg:text-base ">
              Extra Toppings (Optional)
            </span>
            <HiChevronUp
              className={`trans ${openToppings ? "rotate-180" : "rotate-0"}`}
            />
          </div>
          <div
            className={`flex flex-col gap-2  trans transform ${
              openToppings
                ? "translate-y-0 opacity-100 sm:overflow-y-scroll max-fit sm:max-h-44 lg:max-h-50"
                : "-translate-y-full opacity-0 max-h-0 overflow-hidden"
            }`}
          >
            {Array.from({ length: 5 }, (_, i) => (
              <MenuToppings key={i} openToppings={openToppings} />
            ))}
          </div>
        </div>
      </div>
      <div className="col-span-2 mt-1 sm:mt-0">
        <p className="font-bold text-sm lg:text-base mb-1">
          Special Note (Optional)
        </p>
        <InputGroup>
          <textarea
            className="input w-full h-30 md:h-40"
            name="note"
            id="note"
            placeholder="Special notes if any; eg Need extra sauce..."
          ></textarea>
        </InputGroup>
      </div>
      <div className="col-span-2 flex items-center justify-between mt-1">
        <Button type="danger" icon={<HiShoppingCart />}>
          Add - ({formatCurrency(3500)})
        </Button>
        <UpdateItemQuantity />
      </div>
    </div>
  );
}

export default MenuDetails;
