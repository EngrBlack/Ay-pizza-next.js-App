import { requireAdmin } from "@/app/_libs/authActions";
import OrderList from "./OrderList";
import { getAllOrders } from "@/app/_libs/orderActions";

export const metadata = {
  title: "Orders",
};

async function page() {
  await requireAdmin();
  const orders = await getAllOrders();

  return (
    <section className="bg-cream-200 ">
      <div className="px-4 sm:px-6 py-4 sm:py-10 xl:px-10 lg:py-10 w-full tracking-wide bg-cream-200">
        <div className="flex items-center justify-between  mb-6 ">
          <h1 className="font-rowdies text-brown-300 text-2xl sm:text-3xl  ">
            Orders
          </h1>
        </div>
        <div>
          <OrderList orders={orders} />
        </div>
      </div>
    </section>
  );
}

export default page;
