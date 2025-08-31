import { getUserOrders } from "@/app/_libs/orderActions";
import OrderInProcess from "./OrderInProcess";
import { getUserProfile } from "@/app/_libs/checkoutActions";

async function page({ params }) {
  const { orderId } = params;
  const orders = await getUserOrders(orderId);
  console.log(orders);

  const user = await getUserProfile();

  return (
    <section className=" px-4  lg:px-12 lg:py-12 sm:px-6 xl:px-32 py-8 mx-auto w-full">
      <h1 className="font-rowdies text-lg sm:text-xl md:text-2xl mb-4">
        Order: ({orderId})
      </h1>
      <OrderInProcess orders={orders} user={user} />
    </section>
  );
}

export default page;
