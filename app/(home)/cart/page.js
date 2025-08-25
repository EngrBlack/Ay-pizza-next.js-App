import { getCartItems } from "@/app/_libs/cartActions";
import Heading from "../../_components/Heading";
import CartList from "./CartList";
import CartSummary from "./CartSummary";

export const metadata = {
  title: "Shopping Cart",
};

async function page() {
  const cartItems = (await getCartItems()) || [];

  const totalCartQuantity = cartItems.reduce(
    (accu, curItem) => accu + Number(curItem?.quantity),
    0
  );

  const totalCartPrice = cartItems.reduce(
    (accu, curItem) =>
      accu +
      Number(curItem?.quantity) *
        Number(
          curItem?.discount !== null
            ? curItem?.menu_id?.base_price - curItem?.menu_id?.discount
            : curItem?.menu_id?.base_price || curItem?.selected_size?.price
        ),
    0
  );

  return (
    <section className="bg-cream-200">
      <div className="px-4  lg:px-12 lg:py-12 sm:px-6 xl:px-32 py-8 mx-auto w-full">
        <Heading>Shopping Cart</Heading>
        <div className="flex flex-col md:flex-row gap-8 md:gap-4 lg:gap-6 lg:w-[95%] xl:w-[90%]  mx-auto">
          <div className="md:grow-1">
            <CartList
              cartItems={cartItems}
              totalCartQuantity={totalCartQuantity}
            />
          </div>
          <div className="md:basis-[43%] lg:basis-[35%]">
            <CartSummary
              cartItems={cartItems}
              totalCartPrice={totalCartPrice}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default page;
