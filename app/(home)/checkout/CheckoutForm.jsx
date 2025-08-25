"use client";

import { HiArrowLeft } from "react-icons/hi2";

import { formatCurrency } from "@/app/_helper/helper";
import { nanoid } from "nanoid";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AdditionalNote from "./AdditionalNote";
import ContactInfo from "./ContactInfo";
import DeliveryAddress from "./DeliveryAddress";
import PaymentMethod from "./PaymentMethod";

function CheckoutForm({ user }) {
  const router = useRouter();
  const orderId = nanoid(12);

  return (
    <div className="grow-1">
      <div className="flex flex-col gap-6 md:gap-3 lg:gap-5">
        <ContactInfo user={user} />
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
      </div>
    </div>
  );
}

export default CheckoutForm;
