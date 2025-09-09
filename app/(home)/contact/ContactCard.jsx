import { item } from "@/app/_helper/framerMotion";
import { motion } from "framer-motion";

function ContactCard({ data }) {
  const { icon, title, content, addedContent } = data;

  return (
    <motion.li
      variants={item}
      className="flex gap-5 items-center tracking-wide border-2 border-cream-100 shadow-md p-5 sm:pr-10 md:pr-5 lg:pr-10"
    >
      <span className="bg-brown-200 text-cream-200 text-xl p-1 rounded">
        {icon}
      </span>
      <div className="flex flex-col gap-1">
        <h2 className="text-orangered-200 font-rowdies text-lg">{title}</h2>
        <p className="font-bold">{content}</p>
        <p className="font-bold">{addedContent}</p>
      </div>
    </motion.li>
  );
}

export default ContactCard;
