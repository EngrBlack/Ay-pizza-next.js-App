import InputRadio from "@/app/_components/InputRadio";
import { paymentMethod } from "@/app/_libs/checkoutActions";
import { useState } from "react";
import toast from "react-hot-toast";
import { BiLogoPaypal } from "react-icons/bi";
import { HiCreditCard, HiMiniBanknotes } from "react-icons/hi2";

function PaymentMethod() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  async function handleChange(e) {
    const value = e.target.value;
    setSelectedPaymentMethod(value);

    try {
      const formData = new FormData();
      formData.append("payment", value);

      await paymentMethod(formData);
      toast.success("Payment method saved");
    } catch (err) {
      toast.error("something went wrong while selecting payment method");
    }
  }

  return (
    <div className="border-2 border-cream-100 p-4 rounded-sm shadow-md focus-within:border-orangered-200 focus-within:shadow-xl trans ">
      <div className="border-b-1 border-brown-100 pb-2 mb-4">
        <h2 className="text-orangered-200 font-rowdies lg:text-xl">
          Payment Method
        </h2>
        <p className="text-[13px] lg:text-base">
          All transaction are secure and encrypted.
        </p>
      </div>
      <div className="flex flex-col gap-3">
        <InputRadio
          label="Credit / Debit Card"
          className="gap-2 px-4 py-2  border trans border-brown-100 rounded  hover:border-brown-300 "
          id="stripe"
          name="payment"
          onChange={handleChange}
          icon={<HiCreditCard />}
          value="stripe"
          checked={selectedPaymentMethod === "stripe"}
        />
        <InputRadio
          label="Cash on Delivery"
          className="gap-2 px-4 py-2  border trans border-brown-100 rounded  hover:border-brown-300 "
          id="cod"
          name="payment"
          onChange={handleChange}
          icon={<HiMiniBanknotes />}
          value="cod"
          checked={selectedPaymentMethod === "cod"}
        />
        <InputRadio
          label="PayPal"
          className="gap-2 px-4 py-2  border trans border-brown-100 rounded  hover:border-brown-300 "
          id="paypal"
          name="payment"
          onChange={handleChange}
          icon={<BiLogoPaypal />}
          value="paypal"
          checked={selectedPaymentMethod === "paypal"}
        />
      </div>
    </div>
  );
}

export default PaymentMethod;
