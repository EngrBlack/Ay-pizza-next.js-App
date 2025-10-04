"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { item } from "../_helper/framerMotion";
import { toCapitaliseWords } from "../_helper/helper";

function DishesCard({ category }) {
  const { name, image } = category;

  const router = useRouter();

  return (
    <motion.li
      variants={item}
      onClick={() => router.push(`/menu?category=${name}`)}
      className=" group hover:shadow-xl focus:shadow-xl shadow-md  w-68 aspect-square rounded-full relative trans"
    >
      <div className="flex flex-col items-center gap-0.5 text-center absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
        <figure className="rounded-full overflow-hidden w-40 aspect-square mx-auto border-4 border-orangered-100 ">
          <img
            src={image}
            alt=""
            className="object-cover w-full h-full group-hover:scale-110 group-hover:brightness-75 trans"
          />
        </figure>
        <p className="font-rowdies text-lg mt-2 capitalize">
          {toCapitaliseWords(name)}
        </p>
        <button className="text-sm  text-cream-200 bg-orangered-100 hover:bg-orangered-200 hover:-translate-y-0.5 focus:bg-orangered-200 focus:-translate-y-0.5 active:translate-y-0 animate-pulse hover:animate-none py-1 px-2 rounded trans">
          Order Now
        </button>
      </div>
    </motion.li>
  );
}

export default DishesCard;
