"use client";

import { container } from "../_helper/framerMotion";
import DishesCard from "./DishesCard";
import Heading from "./Heading";
import { motion } from "framer-motion";

function PopularDishesSection({ categories }) {
  const dataList = [
    { name: "Pizzas", image: "/pizza-1.jpg", category: "pizza" },
    { name: "Side Dishes", image: "/chicken-chips.jpg", category: "side" },
    { name: "Burger", image: "/burger.jpg", category: "burger" },
    { name: "Ice Cream ", image: "/icecream-2.jpg", category: "ice_cream" },
    { name: "MilkShakes", image: "/milkshake-1.jpg", category: "milkshake" },
    { name: "Drinks", image: "/drinks.jpg", category: "drinks" },
  ];

  return (
    <section className="bg-cream-200">
      <div className="px-4 lg:px-12 lg:py-20 sm:px-6 xl:px-32 py-16 mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Heading>Our Popular Dishes</Heading>
          <p className="font-rowdies w-[98%] mx-auto leading-[1.2] -mt-5 md:-mt-6 md:text-lg">
            Explore our most loved, metriculous dishes with authentic flavour
            and fresh ingredients
          </p>
        </motion.div>

        <motion.ul
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-4 md:gap-12 pt-12  px-4 place-items-center"
        >
          {categories.map((category) => (
            <DishesCard category={category} key={category.name} />
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

export default PopularDishesSection;
