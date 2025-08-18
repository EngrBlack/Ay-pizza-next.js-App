import OrderHistory from "./OrderHistory";

function page() {
  return (
    <section className="bg-cream-200 h-full">
      <div className="px-4  lg:px-12 lg:py-12 sm:px-6 xl:px-32 py-8 mx-auto w-full">
        <OrderHistory />
      </div>
    </section>
  );
}

export default page;
