"use client";
import SpeicialCard from "./SpeicialCard";
import { motion } from "framer-motion";

function SpecialOffer() {
  return (
    <div className="sm:w-[80%] md:w-full mx-auto ">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 1 }}
        transition={{ duration: 0.6 }}
        className="font-pacifico font-bold text-3xl bg-linear-to-r from-gradient-1 to-gradient-2 text-transparent bg-clip-text w-fit mx-auto py-8"
      >
        Special Offers
      </motion.h1>
      <SpeicialCard />
    </div>
  );
}

export default SpecialOffer;
