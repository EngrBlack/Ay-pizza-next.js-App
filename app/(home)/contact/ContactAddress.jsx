import {
  HiOutlineClock,
  HiOutlineMapPin,
  HiOutlinePhone,
  HiPhone,
} from "react-icons/hi2";
import ContactCard from "./ContactCard";

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
    <div className="flex flex-col gap-5 basis-1/2">
      {dataList.map((data) => (
        <ContactCard data={data} key={data.title} />
      ))}
    </div>
  );
}

export default ContactAddress;
