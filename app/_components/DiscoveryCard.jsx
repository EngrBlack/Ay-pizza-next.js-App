import Image from "next/image";
import Button from "./Button";
import { motion } from "framer-motion";

function DiscoveryCard({ data, onClick }) {
  const { image, title, description, position } = data;
  return (
    <div
      className={`flex flex-col items-center gap-8 lg:gap-20 md:flex-row ${position}`}
    >
      <motion.figure
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ amount: 0.1 }}
        transition={{ duration: 0.6 }}
        className="mx-auto w-[90%]  max-w-screen-sm aspect-[3/2] overflow-hidden rounded-md relative"
      >
        <Image
          fill
          quality={80}
          src={image || ""}
          alt=""
          className="w-full h-full object-cover"
        />
      </motion.figure>

      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ amount: 0.1 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col gap-4 lg:gap-6 items-center md:items-stretch text-center md:text-left  w-[95%] lg:w-[85%] mx-auto tracking-wide"
      >
        <h2 className="font-pacifico text-2xl lg:text-4xl ">{title}</h2>
        <p className="w-full md:text-sm lg:text-base xl:text-lg  md:text-justify">
          {description}
        </p>
        <Button type="secondary" onClick={onClick}>
          Read More
        </Button>
      </motion.div>
    </div>
  );
}

export default DiscoveryCard;
