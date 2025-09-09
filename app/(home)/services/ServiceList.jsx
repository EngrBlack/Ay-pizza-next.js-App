"use client";

import { BiBowlHot } from "react-icons/bi";
import { HiCheckCircle, HiOutlineShoppingCart } from "react-icons/hi2";
import { motion } from "framer-motion";

function ServiceList() {
  return (
    <div className=" flex flex-col gap-6 md:flex-row mb-4">
      <ServiceItemFirst />
      <ServiceItemSecond />
    </div>
  );
}

export default ServiceList;

function ServiceItemFirst() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ amount: 0.4 }}
      transition={{ duration: 0.6 }}
      className="shadow-md border-2 border-cream-100 rounded-lg p-4 flex flex-col gap-3"
    >
      <div className="flex items-center gap-2">
        <span className="text-xl bg-brown-200 text-cream-200 p-1.5 rounded-sm h-fit grid place-content-center">
          <BiBowlHot className=" " />
        </span>
        <h1 className="font-rowdies text-orangered-200 text-lg">
          Dine-in Experience
        </h1>
      </div>

      <p className="text-brown text-justify ">
        Immerse yourself in our authentic atmosphere while enjoyingfresly made
        pizza. Our restaurant also features a nice foreign Burger, chicken with
        chips and a conditional seating environment.
      </p>

      <ul className="space-y-1">
        <li className="flex gap-1  text-brown-300">
          <HiCheckCircle className="text-orangered-100 mt-1" />
          <span>Comfortable seating for groups and couples.</span>
        </li>
        <li className="flex gap-1  text-brown-300">
          <HiCheckCircle className="text-orangered-100 mt-1" />
          <span>Watch our Chefs preparing your menu.</span>
        </li>
        <li className="flex gap-1 text-brown-300">
          <HiCheckCircle className="text-orangered-100 mt-1" />
          <span>Nicely contion environment for our esteem Customer.</span>
        </li>
        <li className="flex  gap-1 text-brown-300">
          <HiCheckCircle className="text-orangered-100 mt-1" />
          <span>Full services with trained Staffs.</span>
        </li>
      </ul>
    </motion.div>
  );
}
function ServiceItemSecond() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ amount: 0.4 }}
      transition={{ duration: 0.6 }}
      className="shadow-md border-2 border-cream-100 rounded-lg p-4 flex flex-col gap-3"
    >
      <div className="flex items-center gap-2">
        <span className="text-xl bg-brown-200 text-cream-200 p-1.5 rounded-sm h-fit grid place-content-center">
          <HiOutlineShoppingCart />
        </span>
        <h1 className="font-rowdies text-orangered-200 text-lg">
          Takeout & Delivery
        </h1>
      </div>

      <p className="text-brown text-justify ">
        Enjoy our delicious Pizza in the comfort of your own home. we offer
        quick takeout and delivery services with special packaging to keep your
        food hot and fresh.
      </p>

      <ul className="space-y-1">
        <li className="flex gap-1  text-brown-300">
          <HiCheckCircle className="text-orangered-100 mt-1" />
          <span>Special packaging to keep snack hot.</span>
        </li>
        <li className="flex gap-1  text-brown-300">
          <HiCheckCircle className="text-orangered-100 mt-1" />
          <span>Easy online ordering system.</span>
        </li>
        <li className="flex gap-1 text-brown-300">
          <HiCheckCircle className="text-orangered-100 mt-1" />
          <span>Delivery within 3 miles radius.</span>
        </li>
        <li className="flex  gap-1 text-brown-300">
          <HiCheckCircle className="text-orangered-100 mt-1" />
          <span>Menu customization options.</span>
        </li>
      </ul>
    </motion.div>
  );
}
