import { requireAdmin } from "@/app/_libs/authActions";
import { getOrderById } from "@/app/_libs/orderActions";
import OrderDetails from "./OrderDetails";

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
        <OrderDetails order={order} />
      </div>
    </section>
  );
}
