"use client";

import DiscoveryCard from "./DiscoveryCard";

const datalist = [
  {
    image: "/pizza-2.jpg",
    title: "Honoring the Craft of Great Cooking",
    description:
      "Our kitchen is where time-honored techniques meet fresh creativity, producing food that's both beautiful and delicious. We create meals designed to be enjoyed together, fostering connection and building unforgottable memories around the table. With every box we serve, we strive to deliver a masterpiece.",
  },
  {
    image: "/wings-and-chips.jpg",
    title: "Passion for Quality and Taste",
    description:
      "At our restaurant, every dish is prepared with fresh, high-quanlity ingredients and a commmitment to culinary excellence. we believa dining is about more than just food &dash; it's about creating moments that are unfrogettable.",
    position: "md:flex-row-reverse",
  },
];

function DiscoverySection() {
  return (
    <section className="bg-brown text-cream-200">
      <div className="px-4 lg:px-12 lg:py-20 sm:px-6 xl:px-32 py-16 mx-auto w-full flex flex-col gap-16 ">
        {datalist.map((data) => (
          <DiscoveryCard data={data} key={data.title} />
        ))}
      </div>
    </section>
  );
}

export default DiscoverySection;
