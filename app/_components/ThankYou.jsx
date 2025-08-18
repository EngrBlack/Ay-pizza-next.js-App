import Button from "./Button";

function ThankYou() {
  return (
    <section className="bg-cream-200">
      <div className="tracking-wide flex flex-col items-center gap-2 md:gap-4  xl:gap-5 text-center absolute top-[30%] -translate-y-1/2 left-1/2 -translate-x-1/2 w-full px-4  lg:px-12 sm:px-6 xl:px-32 mx-auto">
        <h1 className="font-rowdies text-3xl sm:text-4xl md:text-5xl xl:text-6xl">
          Thanks for Ordering From Us
        </h1>
        <p className="text-lg">We are processing your order.</p>
        <Button type="danger">View Order</Button>
      </div>
    </section>
  );
}

export default ThankYou;
