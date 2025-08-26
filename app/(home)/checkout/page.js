import { auth } from "@/app/_libs/auth";
import CheckoutForm from "./CheckoutForm";
import OrderSummary from "./OrderSummary";
import { getUserProfile } from "@/app/_libs/checkoutActions";
import { getCartItems } from "@/app/_libs/cartActions";

async function page() {
  const session = await auth();
  const user = session?.user;
  const userProfile = await getUserProfile();
  const cartItems = await getCartItems();

  return (
    <section className="bg-cream-200">
      <div className="px-4  lg:px-12 lg:py-12 sm:px-6 xl:px-32 py-8 mx-auto w-full">
        <h1 className="font-pacifico text-3xl bg-gradient-to-br from-gradient-1 to-gradient-2 bg-clip-text text-transparent lg:text-5xl">
          Checkout
        </h1>
        <p className="font-rowdies text-sm lg:text-lg">
          Complete your order in just a few moment
        </p>
        <div className="mt-6 flex flex-col gap-6 md:flex-row md:gap-3 lg:gap-5 md:items-start">
          <CheckoutForm user={user} userProfile={userProfile} />
          <OrderSummary cartItems={cartItems} />
        </div>
      </div>
    </section>
  );
}

export default page;
