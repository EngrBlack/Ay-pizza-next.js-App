import { getUserOrderByOrdeId } from "@/app/_libs/orderActions";
import CustomerDetails from "./CustomerDetails";
import CustomerOrderInfo from "./CustomerOrderInfo";
import CustomerOrderList from "./CustomerOrderList";
import CustomerPaymentSummary from "./CustomerPaymentSummary";

async function page({ params }) {
  const order = await getUserOrderByOrdeId(params.orderId);

  return (
    <section className="bg-cream-200 h-full  mt-[4rem] sm:mt-[5rem] lg:mt-[6rem]">
      <div className="px-4  lg:px-12 lg:py-12 sm:px-6 xl:px-32 py-8 mx-auto w-full">
        <h1 className="font-rowdies w-fit text-2xl bg-gradient-to-br from-gradient-1 to-gradient-2 bg-clip-text text-transparent lg:text-3xl pb-4">
          Orders Details
        </h1>
        <div className="grid md:grid-cols-2 gap-4 xl:gap-6">
          <CustomerOrderInfo order={order} />
          <CustomerDetails order={order} />
        </div>

        <CustomerOrderList order={order} />
        <CustomerPaymentSummary order={order} />
      </div>
    </section>
  );
}

export default page;
