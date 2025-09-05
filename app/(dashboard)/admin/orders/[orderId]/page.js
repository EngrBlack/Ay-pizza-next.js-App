import { requireAdmin } from "@/app/_libs/authActions";
import OrderDetails from "./OrderDetails";
import { getOrderById } from "@/app/_libs/orderActions";
import { maskId } from "@/app/_helper/helper";

export const metadata = {
  title: "Order Details",
};

export default async function page({ params }) {
  await requireAdmin();
  const { orderId } = await params;
  const order = await getOrderById(orderId);

  return (
    <section className="bg-cream-200 ">
      <div className="px-4 sm:px-6 py-4 sm:py-10 xl:px-10 lg:py-10 w-full md:w-[90%] mx-auto tracking-wide bg-cream-200">
        <h1 className="font-rowdies text-brown text-2xl sm:text-3xl  mb-4">
          Order Details: {maskId(orderId, 8)}
        </h1>

        <div>
          <OrderDetails order={order} />
        </div>
      </div>
    </section>
  );
}
