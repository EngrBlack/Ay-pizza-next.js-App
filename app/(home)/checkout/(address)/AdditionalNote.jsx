import { useState } from "react";
import { motion } from "framer-motion";

function AdditionalNote() {
  const [isOpen, setIsOpen] = useState(false);

  function handleChange(e) {
    setIsOpen(e.target.checked);
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ amount: 0.15 }}
      transition={{ duration: 0.6 }}
      className="border-2 border-cream-100 p-4 rounded-sm shadow-md focus-within:border-orangered-200 focus-within:shadow-xl trans "
    >
      <div
        className={`${
          isOpen ? "border-b-1 border-brown-100 mb-4 pb-2 " : ""
        } flex items-baseline justify-between`}
      >
        <h2 className="text-orangered-200 font-rowdies lg:text-xl ">
          Add a note to your order (Optional)
        </h2>
        <input
          onChange={handleChange}
          checked={isOpen}
          type="checkbox"
          className="mr-2 accent-orangered-200 w-4 h-4 cursor-pointer"
          id="note"
          name="note"
        />
      </div>
      {isOpen && (
        <textarea
          type="text"
          className="input w-full h-36 tracking-wide"
          name="note"
          id="note"
          placeholder="Special instruction for your order..."
        ></textarea>
      )}
    </motion.div>
  );
}

export default AdditionalNote;
