import { maskId } from "@/app/_helper/helper";
import { getUserProfile } from "@/app/_libs/checkoutActions";
import { getUserOrders } from "@/app/_libs/orderActions";
import OrderInProcess from "./OrderInProcess";

export async function generateMetadata({ params }) {
  const { id: orderId } = await getUserOrders(params.orderId);
  return { title: `Order ${maskId(orderId)}` };
}

async function page({ params }) {
  const { orderId } = params;
  const orders = await getUserOrders(orderId);
  const user = await getUserProfile();

  console.log(orders);

  return (
    <section className=" px-4  lg:px-12 lg:py-12 sm:px-6 xl:px-32 py-8 mx-auto w-full">
      <h1 className="font-rowdies text-lg sm:text-xl md:text-2xl mb-4">
        Order: ({maskId(orderId, 10)})
      </h1>
      <OrderInProcess orders={orders} user={user} />
    </section>
  );
}

export default page;
