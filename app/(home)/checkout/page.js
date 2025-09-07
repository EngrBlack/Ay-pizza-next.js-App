import { getCartItems } from "@/app/_libs/cartActions";
import { getUserProfile } from "@/app/_libs/checkoutActions";
import { redirect } from "next/navigation";
import CheckoutForm from "./CheckoutForm";
import OrderSummary from "./OrderSummary";

export const metadata = {
  title: "Checkout",
};

async function page() {
  const userProfile = await getUserProfile();
  const userId = userProfile.id;
  const cartItems = await getCartItems();

  if (!userId) throw new Error("User not found");

  if (!cartItems || cartItems.length === 0) redirect("/cart");

  return (
    <section className="bg-cream-200 mt-[4rem] sm:mt-[5rem] lg:mt-[6rem]">
      <div className="px-4  lg:px-12 lg:py-12 sm:px-6 xl:px-32 py-8 mx-auto w-full">
        <h1 className="font-pacifico text-3xl bg-gradient-to-br from-gradient-1 to-gradient-2 bg-clip-text text-transparent lg:text-5xl">
          Checkout
        </h1>
        <p className="font-rowdies text-sm lg:text-lg">
          Complete your order in just a few moment
        </p>
        <div className="mt-6 flex flex-col gap-6 md:flex-row md:gap-3 lg:gap-5 md:items-start">
          <CheckoutForm user={userProfile} />
          <OrderSummary cartItems={cartItems} user={userProfile} />
        </div>
      </div>
    </section>
  );
}

export default page;
