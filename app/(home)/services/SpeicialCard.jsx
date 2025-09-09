import { formatCurrency } from "@/app/_helper/helper";
import { motion } from "framer-motion";

function SpeicialCard() {
  return (
    <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-3">
      <SpeicialCardFirst />
      <SpeicialCardSecond />
      <SpeicialCardThrid />
    </div>
  );
}

export default SpeicialCard;

function SpeicialCardFirst() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0.4 }}
      transition={{ duration: 0.6 }}
      className="shadow rounded-lg p-4 sm:p-5 lg:p-4  bg-linear-to-r from-blue to-blue-100 text-white text-shadow-slate-900 text-md"
    >
      <h3 className="font-rowdies mb-1">Student Discount</h3>
      <h1 className="font-extrabold text-xl mb-1.5">15% OFF</h1>
      <p className="text-xs mb-6 ">
        Valid student ID required Available for dine only.
      </p>

      <button className="font-rowdies w-full text-center shadow-2xl rounded-sm p-2 bg-slate-100/20 hover:bg-slate-100/40 hover:-translate-y-0.5 active:translate-y-0 trans ease-in-out">
        Claim Offer
      </button>
    </motion.div>
  );
}
function SpeicialCardSecond() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0.4 }}
      transition={{ duration: 0.6 }}
      className="shadow rounded-lg p-4 sm:p-5 lg:p-4  bg-linear-to-r from-orangered-100 to-yellow text-white text-shadow-slate-900 text-md"
    >
      <h3 className="font-rowdies mb-1">Lunch Special</h3>
      <h1 className="font-extrabold text-xl mb-1.5">{formatCurrency(5000)}</h1>
      <p className="text-xs mb-6 ">
        Monday - Friday, 11am - 2pm includes Pizza and a drink.
      </p>

      <button className="font-rowdies w-full text-center shadow-2xl rounded-sm p-2 bg-slate-100/20 hover:bg-slate-100/40 hover:-translate-y-0.5 active:translate-y-0 trans ease-in-out">
        Claim Offer
      </button>
    </motion.div>
  );
}

function SpeicialCardThrid() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0.4 }}
      transition={{ duration: 0.6 }}
      className="shadow rounded-lg p-4 sm:p-5 lg:p-4  bg-linear-to-r from-green to-cyan text-white text-shadow-slate-900 text-md"
    >
      <h3 className="font-rowdies mb-1">Happy Hour</h3>
      <h1 className="font-extrabold text-xl mb-1.5">2 for 1</h1>
      <p className="text-xs mb-6 ">
        Appetizer and Drink, Monday - Thursday, 4pm - 6pm.
      </p>

      <button className="font-rowdies w-full text-center shadow-2xl rounded-sm p-2 bg-slate-100/20 hover:bg-slate-100/40 hover:-translate-y-0.5 active:translate-y-0 trans ease-in-out">
        Claim Offer
      </button>
    </motion.div>
  );
}
