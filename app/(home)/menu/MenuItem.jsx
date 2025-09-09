import UpdateItemQuantity from "@/app/_components/UpdateItemQuantity";
import { addToCart } from "@/app/_libs/cartActions";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import toast from "react-hot-toast";
import {
  HiArrowPath,
  HiOutlineHeart,
  HiOutlineShoppingCart,
} from "react-icons/hi2";
import Button from "../../_components/Button";
import { formatCurrency } from "../../_helper/helper";
import MenuDetails from "./MenuDetails";
import MenuModal from "./MenuModal";
import { motion } from "framer-motion";
import { framerItem } from "@/app/_helper/framerMotion";

function MenuItem({ menu, carts }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { name, base_price: basePrice, size, image, id: menuId } = menu;

  const cartItem = carts.find((item) => item?.menu_id?.id === menuId);
  const isInCart = Boolean(cartItem);
  const quantity = cartItem?.quantity;

  const maxPrice = Number(
    size
      ?.map((el) => el.price)
      ?.reduce((max, current) => (current > max ? current : max))
  );

  function handleAddToCart() {
    startTransition(async () => {
      try {
        await addToCart(menuId);
        toast.success("Added to cart!");
      } catch (error) {
        toast.error(`Could not add to Cart: Sign-in to add menu to Cart`);
      }
    });
  }

  return (
    <motion.li
      variants={framerItem}
      className=" flex gap-2 sm:gap-4 border-2 border-cream-100 rounded-md p-2  shadow-lg hover:shadow-2xl hover:border-orangered-100 trans group"
    >
      <div className="w-26 min-w-26 aspect-square overflow-hidden sm:w-28 sm:min-w-24  rounded-md lg:w-34 xl:w-38">
        <Image
          src={image}
          alt=""
          width={80}
          height={80}
          className="w-full h-full rounded-md overflow-hidden object-fill group-hover:scale-110 group-hover:brightness-75 trans ease-in-out"
        />
      </div>
      <div className=" flex flex-col justify-between grow-1 gap-1.5 lg:gap-2">
        <div className="grid grid-cols-[1fr_min-content] gap-1">
          <h2 className="font-rowdies text-base sm:text-lg lg:text-xl xl:text-2xl leading-[1.4]">
            {name}
          </h2>
          <HiOutlineHeart
            className="text-2xl lg:text-3xl hover:text-orangered-100 hover:fill-orangered-100 trans "
            onClick={() => router.push("/wishlist")}
          />

          <div className="col-span-2 text-brown font-medium text-base lg:text-[17px] xl:text-lg 2xl:text-xl">
            {size ? (
              <>
                <span>{formatCurrency(Number(basePrice))}</span> &mdash;
                <span> {formatCurrency(maxPrice)}</span>
              </>
            ) : (
              <span>{formatCurrency(basePrice)}</span>
            )}
          </div>
        </div>

        <div className="flex justify-between mb-1">
          <MenuModal>
            <MenuModal.Open openWindowName="menuDetails">
              <Button>Customise</Button>
            </MenuModal.Open>
            <MenuModal.Window openWindowName="menuDetails">
              <MenuDetails
                menuId={menuId}
                quantity={quantity}
                cartId={cartItem?.id}
              />
            </MenuModal.Window>
          </MenuModal>

          {size ? (
            <MenuModal>
              <MenuModal.Open openWindowName="menuDetails">
                <Button type="danger">Select Option</Button>
              </MenuModal.Open>
              <MenuModal.Window openWindowName="menuDetails">
                <MenuDetails
                  menuId={menuId}
                  quantity={quantity}
                  cartId={cartItem?.id}
                />
              </MenuModal.Window>
            </MenuModal>
          ) : !isInCart ? (
            <Button
              type="danger"
              onClick={handleAddToCart}
              icon={<HiOutlineShoppingCart />}
              position="right"
              className="flex items-center "
            >
              {isPending ? (
                <HiArrowPath className="animate-spin text-xl" />
              ) : (
                <span>Add To </span>
              )}
            </Button>
          ) : (
            <UpdateItemQuantity quantity={quantity} cartId={cartItem?.id} />
          )}
        </div>
      </div>
    </motion.li>
  );
}

export default MenuItem;
