import Dashboard from "../Dashboard";

function page() {
  return (
    <section className="bg-cream-200 h-screen text-brown">
      <div className="px-4 sm:px-6 py-4 sm:py-4 xl:px-10 lg:py-6 w-full tracking-wide flex flex-col gap-2">
        <h1 className="font-rowdies text-2xl sm:text-3xl lg:text-4xl capitalize mb-2">
          Dashboard
        </h1>
        <Dashboard />
      </div>
    </section>
  );
}

export default page;
