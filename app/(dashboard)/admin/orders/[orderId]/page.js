import OrderDetails from "./OrderDetails";

export default async function page({ params }) {
  const { orderId } = await params;
  console.log(orderId);

  return (
    <section className="bg-cream-200 ">
      <div className="px-4 sm:px-6 py-4 sm:py-10 xl:px-10 lg:py-10 w-full md:w-[90%] mx-auto tracking-wide bg-cream-200">
        <h1 className="font-rowdies text-brown text-2xl sm:text-3xl  mb-4">
          Order Details: {orderId}
        </h1>

        <div>
          <OrderDetails orderId={orderId} />
        </div>
      </div>
    </section>
  );
}
