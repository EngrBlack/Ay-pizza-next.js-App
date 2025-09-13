import InputGroup from "@/app/_components/InputGroup";
import { HiEnvelope } from "react-icons/hi2";
import { motion } from "framer-motion";

function ContactInfo({ user }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ amount: 0.15 }}
      transition={{ duration: 0.6 }}
      className="border-2 border-cream-100 p-4 rounded-sm shadow-md focus-within:border-orangered-200 focus-within:shadow-xl trans "
    >
      <div className="border-b-1 border-brown-100 pb-2 mb-4">
        <h2 className="text-orangered-200 font-rowdies lg:text-xl">
          Contact Information
        </h2>
        <p className="text-[13px] lg:text-base">
          We&apos;ll use this email to send you details and updates about your
          order.
        </p>
      </div>
      <InputGroup label="Email" icon={<HiEnvelope />}>
        <input
          type="email"
          className="input"
          defaultValue={user?.email}
          name="email"
          id="email"
          required
          disabled
        />
      </InputGroup>
    </motion.div>
  );
}

export default ContactInfo;
