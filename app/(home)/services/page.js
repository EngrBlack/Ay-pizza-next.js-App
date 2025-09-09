import Heading from "@/app/_components/Heading";
import SpecialOffer from "./SpecialOffer";
import ServiceList from "./ServiceList";

function page() {
  return (
    <section className="bg-cream-200 mt-[4rem] sm:mt-[5rem] lg:mt-[6rem]">
      <div className=" px-4  lg:px-12 lg:py-12 sm:px-6 xl:px-32 py-8 mx-auto w-full mb-6">
        <Heading>our Services</Heading>
        <div className="">
          <ServiceList />
          <SpecialOffer />
        </div>
      </div>
    </section>
  );
}

export default page;
