import Heading from "@/app/_components/Heading";
import ContactSection from "./ContactSection";

export const metadata = {
  title: "Contact Us",
};

function page() {
  return (
    <section className="bg-cream-200">
      <div className="px-4  lg:px-12 lg:py-12 sm:px-6 xl:px-32 py-8 mx-auto w-full md:w-[90%]">
        <div className="text-center">
          <Heading>Our Location</Heading>
          <p className="font-rowdies w-[95%] mx-auto leading-[1.2] -mt-5 md:-mt-6 md:text-lg">
            Visit us in the heart of the city Akoka to experience authentic
            restuarant in a warm inviting atmosphere.
          </p>
        </div>

        <div>
          <ContactSection />
        </div>
      </div>
    </section>
  );
}

export default page;
