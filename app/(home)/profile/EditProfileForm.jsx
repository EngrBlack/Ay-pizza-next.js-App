"use client";

import Button from "@/app/_components/Button";
import InputGroup from "@/app/_components/InputGroup";
import { useUser } from "@/app/_context/UserProvider";
import { HiEnvelope, HiMapPin, HiUser } from "react-icons/hi2";

function EditProfileForm() {
  const { user } = useUser();

  return (
    <div className=" rounded border-2 border-cream-100 p-3 sm:p-6 shadow-lg hover:shadow-2xl trans">
      <form action="">
        <h1 className="font-rowdies sm:text-lg md:text-xl">
          Edit Your Profile
        </h1>

        <div className="mt-4 flex flex-col gap-2 md:gap-4">
          <div className="flex flex-col md:flex-row gap-2 md:gap-4">
            <InputGroup label="First Name:" icon={<HiUser />}>
              <input
                className="input "
                type="text"
                name="firstName"
                id="firstName"
              />
            </InputGroup>
            <InputGroup label="Last Name:" icon={<HiUser />}>
              <input
                className="input "
                type="text"
                name="lastName"
                id="lastName"
              />
            </InputGroup>
          </div>
          <div className="flex flex-col md:flex-row gap-2 md:gap-4">
            <InputGroup label="Contact" icon={<HiEnvelope />}>
              <input
                className="input "
                type="text"
                inputMode="number"
                name="contact"
                id="contact"
              />
            </InputGroup>

            <InputGroup label="Email:" icon={<HiEnvelope />}>
              <input
                className="input disabled:cursor-not-allowed disabled:bg-brown-100"
                type="email"
                name="email"
                id="email"
                defaultValue={user?.email}
                disabled
              />
            </InputGroup>
          </div>

          <InputGroup label="Delivery Address:" icon={<HiMapPin />}>
            <textarea
              className="input h-30 md:h-40"
              type="text"
              name="address"
              id="address"
            ></textarea>
          </InputGroup>
          <div className="flex items-center justify-end gap-4 mt-2">
            <Button type="danger">Cancel</Button>
            <Button>Save</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditProfileForm;
