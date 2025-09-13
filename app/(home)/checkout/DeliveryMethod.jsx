"use client";

import InputRadio from "@/app/_components/InputRadio";
import { deliveryMethod } from "@/app/_libs/checkoutActions";
import toast from "react-hot-toast";
import { BiBowlHot } from "react-icons/bi";
import { HiOutlineClock, HiOutlineTruck } from "react-icons/hi2";
import { motion } from "framer-motion";

function DeliveryMethod({ selectedDeliveryMethod, setSelectedDeliveryMethod }) {
  async function handleDeliveryMethod(e) {
    const { value } = e.target;
    setSelectedDeliveryMethod(value);

    const formData = new FormData();
    formData.append("delivery-method", value);

    try {
      await deliveryMethod(formData);
      toast.success("Delivery method saved");
    } catch (error) {
      toast.error(error?.message || "cound not add delivery method");
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ amount: 0.15 }}
      transition={{ duration: 0.6 }}
      className="border-2 border-cream-100 p-4 rounded-sm shadow-md focus-within:border-orangered-200 focus-within:shadow-xl trans "
    >
      <div className="border-b-1 border-brown-100 pb-2 mb-4">
        <h2 className="text-orangered-200 font-rowdies lg:text-xl">
          Order Options ( Delivery Method )
        </h2>
        <p className="text-[13px] lg:text-base">
          Choose how you want to enjoy your meal.
        </p>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
        <div className="border py-2 grow px-3 rounded border-brown-200 hover:border-orangered-100 focus:border-orangered-100   trans ease-in-out cursor-pointer">
          <InputRadio
            className="mb-1"
            label="Delivery"
            id="delivery"
            name="delivery-method"
            value="delivery"
            checked={selectedDeliveryMethod === "delivery"}
            onChange={handleDeliveryMethod}
          />
          <div className="text-brown-300 text-xs ml-6 sm:ml-0">
            <p className="flex items-center gap-1 mb-0.5">
              <HiOutlineTruck className="text-base" />
              <span>30 - 45minutes</span>
            </p>
            <p>Delivered to your Address.</p>
          </div>
        </div>
        <div className="border py-2  px-3 grow  rounded border-brown-200 hover:border-orangered-100 focus:border-orangered-100 trans ease-in-out cursor-pointer">
          <InputRadio
            className="mb-1"
            label="Pick-up"
            id="pick-up"
            name="delivery-method"
            value="pick-up"
            checked={selectedDeliveryMethod === "pick-up"}
            onChange={handleDeliveryMethod}
          />
          <div className="text-brown-300 text-xs ml-6 sm:ml-0 ">
            <p className="flex items-center gap-1 mb-0.5">
              <HiOutlineClock className="text-base" />
              <span>15 - 30minutes</span>
            </p>
            <p>Ready for pick-up at restaurant.</p>
          </div>
        </div>
        <div className="border py-2  px-3 grow  rounded border-brown-200 hover:border-orangered-100 focus:border-orangered-100 trans ease-in-out cursor-pointer">
          <InputRadio
            className="mb-1"
            label="Dine In"
            id="dine-in"
            name="delivery-method"
            value="dine-in"
            checked={selectedDeliveryMethod === "dine-in"}
            onChange={handleDeliveryMethod}
          />
          <div className="text-brown-300 text-xs ml-6 sm:ml-0 ">
            <p className="flex items-center gap-1 mb-0.5">
              <BiBowlHot className="text-base" />
              <span>Served immediately</span>
            </p>
            <p>Enjoy at our restaurant.</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default DeliveryMethod;
