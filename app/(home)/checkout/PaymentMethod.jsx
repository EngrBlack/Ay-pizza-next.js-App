import InputRadio from "@/app/_components/InputRadio";
import { BiLogoPaypal } from "react-icons/bi";
import { HiCreditCard, HiMiniBanknotes } from "react-icons/hi2";

function PaymentMethod() {
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
          id="stripe"
          name="payment"
          icon={<HiCreditCard />}
        />
        <InputRadio
          label="Cash on Delivery"
          id="cod"
          name="payment"
          icon={<HiMiniBanknotes />}
        />
        <InputRadio
          label="PayPal"
          id="paypal"
          name="payment"
          icon={<BiLogoPaypal />}
        />
      </div>
    </div>
  );
}

export default PaymentMethod;
