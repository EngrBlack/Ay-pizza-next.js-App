"use client";

import { HiArrowLeft } from "react-icons/hi2";

import Link from "next/link";
import AdditionalNote from "./(address)/AdditionalNote";
import ContactInfo from "./(address)/ContactInfo";
import DeliveryAddress from "./(address)/DeliveryAddress";
import PaymentMethod from "./PaymentMethod";
import DeliveryMethod from "./DeliveryMethod";
import { useState } from "react";

function CheckoutForm({ user }) {
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState("");

  return (
    <div className="grow-1">
      <div className="flex flex-col gap-6 md:gap-3 lg:gap-5">
        <ContactInfo user={user} />
        <DeliveryMethod
          selectedDeliveryMethod={selectedDeliveryMethod}
          setSelectedDeliveryMethod={setSelectedDeliveryMethod}
        />
        {selectedDeliveryMethod === "delivery" && (
          <DeliveryAddress user={user} />
        )}
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
              <span>Return to order page</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutForm;
