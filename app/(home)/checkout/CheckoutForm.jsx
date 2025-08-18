"use client";

import { BiLogoPaypal } from "react-icons/bi";
import {
  HiArrowLeft,
  HiCreditCard,
  HiEnvelope,
  HiMiniBanknotes,
  HiPencilSquare,
} from "react-icons/hi2";

import Link from "next/link";
import { useState } from "react";
import InputGroup from "@/app/_components/InputGroup";
import InputRadio from "@/app/_components/InputRadio";
import { formatCurrency } from "@/app/_helper/helper";
import Modal from "@/app/_components/Modal";
import UpdateAddress from "./UpdateAddress";
import { useRouter } from "next/navigation";
import { nanoid } from "nanoid";

function CheckoutForm() {
  const router = useRouter();
  const orderId = nanoid(12);

  return (
    <div className="grow-1">
      <form action="" className="flex flex-col gap-6 md:gap-3 lg:gap-5">
        <ContactInfo />
        <DeliveryAddress />
        <PaymentMethod />
        <AdditionalNote />
        <div className="space-y-4">
          <p className="text-sm md:text-base">
            By proceeding with your purchase you agree to our Terms and
            Conditions and Privacy Policy.
          </p>
          <div className=" flex flex-col gap-4 md:flex-row md:justify-between">
            <Link
              href="/menu"
              className="flex items-center gap-1 text-orangered-100 hover:text-brown-300 hover:underline trans"
            >
              <HiArrowLeft />
              <span>Return to order Page</span>
            </Link>
            <button
              onClick={() => router.push(`/order/${orderId}`)}
              type="submit"
              className="button w-full md:w-[65%]"
            >
              Place Order &mdash; {formatCurrency(85000)}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

function ContactInfo() {
  return (
    <div className="border-2 border-cream-100 p-4 rounded-sm shadow-md focus-within:border-orangered-200 focus-within:shadow-xl trans ">
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
          name="email"
          id="email"
          required
        />
      </InputGroup>
    </div>
  );
}

function DeliveryAddress() {
  return (
    <div className="border-2 border-cream-100 p-4 rounded-sm shadow-md focus-within:border-orangered-200 focus-within:shadow-xl trans ">
      <div className="border-b-1 border-brown-100 pb-2 mb-4">
        <h2 className="text-orangered-200 font-rowdies lg:text-xl">
          Delivery Address
        </h2>
        <p className="text-[13px] lg:text-base">
          Enter an address that matches your payment method.
        </p>
      </div>
      <EmptyAddress />
    </div>
  );
}

function EmptyAddress() {
  return (
    <div className="text-sm leading-6 lg:text-base">
      <p>Please Enter your Delivery Address By Click on </p>

      <Modal>
        <Modal.Open openWindowName="address">
          <div className="flex items-center gap-2 cursor-pointer text-orangered-100 hover:underline hover:text-brown-300 trans">
            <span>Add Address</span>
            <HiPencilSquare />
          </div>
        </Modal.Open>
        <Modal.Window openWindowName="address">
          <UpdateAddress />
        </Modal.Window>
      </Modal>
    </div>
  );
}

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

function AdditionalNote() {
  const [isOpen, setIsOpen] = useState(false);

  function handleChange(e) {
    setIsOpen(e.target.checked);
  }

  return (
    <div className="border-2 border-cream-100 p-4 rounded-sm shadow-md focus-within:border-orangered-200 focus-within:shadow-xl trans ">
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
          className="mr-2 accent-orangered-200 w-4 h-4"
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
    </div>
  );
}

export default CheckoutForm;
