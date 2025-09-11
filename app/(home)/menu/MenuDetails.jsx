"use client";

import Button from "@/app/_components/Button";
import InputGroup from "@/app/_components/InputGroup";
import SelectInput from "@/app/_components/SelectInput";
import Spinner from "@/app/_components/Spinner";
import { formatCurrency } from "@/app/_helper/helper";
import { addToCart } from "@/app/_libs/cartActions";
import { getMenuById } from "@/app/_libs/menuActions";
import Image from "next/image";
import { useEffect, useState, useTransition } from "react";
import toast from "react-hot-toast";
import { HiChevronUp, HiShoppingCart } from "react-icons/hi2";
import MenuToppings from "./MenuToppings";

function MenuDetails({ menuId, quantity, cartId }) {
  const [openToppings, setOpenToppings] = useState(false);
  const [menuItem, setMenuItem] = useState(null);
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedToppings, setSelectedToppings] = useState([]);

  const sizes = menuItem?.size || [];

  const selectedSizeObj =
    sizes.find((s) => s.name === selectedSize) || sizes[0];

  function handleToggleTopping(topping) {
    setSelectedToppings(
      (prev) =>
        prev.some((t) => t.name === topping.name)
          ? prev.filter((t) => t.name !== topping.name) // remove
          : [...prev, topping] // add
    );
  }

  function handleAddToCart() {
    startTransition(async () => {
      try {
        await addToCart(menuId, 1, selectedSizeObj, selectedToppings);
        toast.success("Added to cart!");
      } catch (error) {
        toast.error(`Could not add to Cart: Sign-in to add menu to Cart`);
      }
    });
  }

  const toppings = menuItem?.toppings;

  const basePrice = selectedSizeObj?.price || menuItem?.base_price || 0;

  // Sum toppings prices
  const toppingsTotal = selectedToppings.reduce(
    (acc, topping) => acc + (Number(topping?.price) || 0),
    0
  );

  const totalPrice = basePrice + toppingsTotal;

  useEffect(() => {
    async function getMenuItem() {
      try {
        setIsLoading(true);
        const res = await getMenuById(menuId);

        setMenuItem(res);
      } catch (error) {
        console.error("Failed to fetch menu item:", error);
      } finally {
        setIsLoading(false);
      }
    }

    if (menuId) getMenuItem();
  }, [menuId]);

  return (
    <div className=" flex flex-col gap-2  md:gap-3 xl:gap-4 ">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <div className="mt-2 grid gap-2 sm:gap-4 sm:grid-cols-2  w-full">
            <figure className="w-full col-span-2 md:col-span-1 rounded-md overflow-hidden aspect-3/2 md:aspect-square md:h-full relative">
              <Image
                fill
                src={menuItem?.image || "/pizza-1jpg"}
                alt={menuItem?.name || "Menu item"}
                className="w-full h-full object-cover sm:object-fill"
              />
            </figure>

            <div className="col-span-2  md:col-span-1 flex flex-col gap-3 overflow-hidden">
              <h1 className="font-rowdies text-lg lg:text-xl xl:text-2xl mt-2 md:mt-3 lg:mt-0">
                {menuItem?.name}
              </h1>

              {sizes.length > 0 && (
                <div>
                  <p className="font-bold text-sm lg:text-base mb-1">
                    Choose Size and Price
                  </p>
                  <SelectInput
                    className="font-bold"
                    value={selectedSize || ""}
                    onChange={(e) => setSelectedSize(e.target.value)}
                  >
                    <option value="">-- Select a size --</option>
                    {sizes.map((size) => (
                      <option
                        className="capitalize"
                        value={size.name}
                        key={size.name}
                      >{`${size?.name.split("_").join(" ")} - (${formatCurrency(
                        size?.price
                      )})`}</option>
                    ))}
                  </SelectInput>
                </div>
              )}
              {selectedToppings.length > 0 && (
                <p className="col-span-2 text-sm text-brown-300">
                  <span className="bg-brown-200 text-cream-100 py-0.5 px-1.5 mr-1">
                    Added:
                  </span>
                  ({" "}
                  {selectedToppings?.map((top) => (
                    <span
                      key={top.name}
                      className="mr-1.5 font-rowdies text-brown-300"
                    >
                      {top.name},
                    </span>
                  ))}
                  )
                </p>
              )}
              <div>
                <div
                  className="flex justify-between items-center cursor-pointer mb-1 mt-1 sm:mt-0"
                  onClick={() => setOpenToppings((open) => !open)}
                >
                  <span className="font-bold text-sm lg:text-base ">
                    Extra Toppings (Optional)
                  </span>
                  <HiChevronUp
                    className={`trans ${
                      openToppings ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </div>
                <div
                  className={`flex flex-col gap-3  trans transform ${
                    openToppings
                      ? "translate-y-0 opacity-100 sm:overflow-y-scroll max-fit sm:max-h-44 lg:max-h-50"
                      : "-translate-y-full opacity-0 max-h-0 overflow-hidden"
                  }`}
                >
                  {toppings?.map((topping) => (
                    <MenuToppings
                      key={topping.name}
                      topping={topping}
                      checked={selectedToppings.some(
                        (t) => t.name === topping.name
                      )}
                      onToggle={() => handleToggleTopping(topping)}
                    />
                  ))}
                </div>
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
            <Button
              type="danger"
              icon={<HiShoppingCart />}
              onClick={handleAddToCart}
              disabled={sizes.length > 0 && !selectedSize}
            >
              {isPending ? (
                <span>Adding...</span>
              ) : (
                <span className="font-bold flex items-center gap-2">
                  <span>Add</span>
                  {formatCurrency(totalPrice)}
                </span>
              )}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default MenuDetails;
