"use client";

import Flexitem from "@/app/_components/Flexitem";
import { motion } from "framer-motion";

function CustomerDetails({ order }) {
  const { user_id } = order;

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="basis-1/2 shadow-md border-2 border-cream-100 rounded-md p-4 flex flex-col gap-2"
    >
      <h2 className="font-bold lg:text-xl">Contact Info:</h2>
      <Flexitem label="Name:" className="text-sm lg:text-base">
        {user_id?.fullName}
      </Flexitem>
      <Flexitem label="Email:" className="text-sm lg:text-base">
        {user_id?.email}
      </Flexitem>
      <Flexitem label="contact:" className="text-sm lg:text-base">
        {user_id?.address?.contact}
      </Flexitem>
      <Flexitem label=" Address:" className="text-sm lg:text-base">
        <div className=" bg-brown text-cream-100 w-fit rounded-lg  py-2 px-4 text-sm justify-self-end">
          {`${user_id?.address?.address} | ${user_id?.address?.city} | ${user_id?.address?.state}.`}
        </div>
      </Flexitem>
    </motion.div>
  );
}

export default CustomerDetails;
