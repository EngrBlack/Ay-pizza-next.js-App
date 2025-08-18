import OrderInProcess from "./OrderInProcess";

function page({ params }) {
  const { orderId } = params;
  console.log(orderId);

  return (
    <section className=" px-4  lg:px-12 lg:py-12 sm:px-6 xl:px-32 py-8 mx-auto w-full">
      <h1 className="font-rowdies text-lg sm:text-xl md:text-2xl mb-4">
        Order: ({orderId})
      </h1>
      <OrderInProcess />
    </section>
  );
}

export default page;
