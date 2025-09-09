import {
  HiOutlineClock,
  HiOutlineMapPin,
  HiOutlinePhone,
} from "react-icons/hi2";
import ContactCard from "./ContactCard";
import { motion } from "framer-motion";
import { container } from "@/app/_helper/framerMotion";

const dataList = [
  {
    icon: <HiOutlineMapPin />,
    title: "Our Address",
    content:
      "Shop 12, Havas Food Court Plaza, Opp.Jaja Hall, Unilag Campus, Akoka, Lagos",
  },
  {
    icon: <HiOutlinePhone />,
    title: "Contact Us",
    content: "Phone: +234 813 073 1895",
    addedContent: "Email: Ay@gmail.com",
  },
  {
    icon: <HiOutlineClock />,
    title: "Opening Hours",
    content: "Monday — Sunday",
    addedContent: "11:00 AM — 10:00 PM",
  },
];

function ContactAddress() {
  return (
    <motion.ul
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ amount: 0.2 }}
      className="flex flex-col gap-5 basis-1/2"
    >
      {dataList.map((data) => (
        <ContactCard data={data} key={data.title} />
      ))}
    </motion.ul>
  );
}

export default ContactAddress;
