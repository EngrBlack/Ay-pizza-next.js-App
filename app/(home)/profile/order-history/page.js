import { getAllUserOrders } from "@/app/_libs/orderActions";
import OrderHistory from "./OrderHistory";

export const metadata = {
  title: "My Order History",
};

async function page() {
  const userOrders = await getAllUserOrders();

  return (
    <section className="bg-cream-200 h-full  mt-[4rem] sm:mt-[5rem] lg:mt-[6rem]">
      <div className="px-4  lg:px-12 lg:py-12 sm:px-6 xl:px-32 py-8 mx-auto w-full xl:w-[95%] ">
        <h1 className="font-rowdies w-fit text-2xl bg-gradient-to-br from-gradient-1 to-gradient-2 bg-clip-text text-transparent lg:text-3xl pb-4">
          Orders History
        </h1>
        <OrderHistory userOrders={userOrders} />
      </div>
    </section>
  );
}

export default page;
