"use client";

import Button from "@/app/_components/Button";
import InputGroup from "@/app/_components/InputGroup";
import SelectInput from "@/app/_components/SelectInput";
import { phoneValid } from "@/app/_helper/helper";
import { updateUserProfile } from "@/app/_libs/checkoutActions";
import { stateData } from "@/app/_libs/stateList";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { HiArrowPath, HiEnvelope, HiMapPin, HiUser } from "react-icons/hi2";

function EditProfileForm({ user, onEdit }) {
  const { fullName, address } = user;
  const firstName = fullName.split(" ")?.at(0);
  const lastName = fullName.split(" ")?.at(1);

  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const lgas =
    stateData.find((state) => state.state === selectedState)?.lgas || [];

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  function handleSelectedState(e) {
    const value = e.target.value;
    setSelectedState(value);
    setSelectedCity("");
  }

  function handleSelectedCity(e) {
    const { value } = e.target;
    setSelectedCity(value);
  }

  async function onUpdateProfile(data) {
    const fullName = [data?.firstName, data?.lastName].join(" ");

    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("contact", data?.contact);
    formData.append("address", data?.address);
    formData.append("state", data?.state);
    formData.append("city", data?.city);

    try {
      const res = await updateUserProfile(formData);
      if (res.success) toast.success("Profile updated successfully.");
      onEdit();
    } catch (error) {
      toast.error(`cound not update profile ${error.message}`);
    }
  }

  return (
    <div className=" rounded border-2 border-cream-100 p-3 sm:p-6 shadow-lg hover:shadow-2xl trans">
      <form action="" onSubmit={handleSubmit(onUpdateProfile)}>
        <h1 className="font-rowdies sm:text-lg md:text-xl">
          Edit Your Profile
        </h1>

        <div className="mt-4 flex flex-col gap-2 md:gap-4">
          <div className="flex flex-col md:flex-row gap-2 md:gap-4">
            <InputGroup
              label="First Name:"
              icon={<HiUser />}
              error={errors?.firstName?.message}
            >
              <input
                className="input "
                type="text"
                name="firstName"
                id="firstName"
                defaultValue={firstName}
                {...register("firstName", {
                  required: "First name is required",
                })}
              />
            </InputGroup>
            <InputGroup
              label="Last Name:"
              icon={<HiUser />}
              error={errors?.lastName?.message}
            >
              <input
                className="input "
                type="text"
                name="lastName"
                id="lastName"
                defaultValue={lastName}
                {...register("lastName", { required: "Last name is required" })}
              />
            </InputGroup>
          </div>
          <div className="flex flex-col md:flex-row gap-2 md:gap-4">
            <InputGroup
              label="Contact"
              icon={<HiEnvelope />}
              error={errors?.contact?.message}
            >
              <input
                className="input"
                type="text"
                inputMode="number"
                id="contact"
                defaultValue={address?.contact}
                {...register("contact", {
                  required: "Contact is required",
                  validate: (value) =>
                    phoneValid(value) ||
                    "Enter a valid Nigerian phone number (e.g. 08012345678 or +2348012345678)",
                })}
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

          <div className="mt-4 flex gap-4">
            <SelectInput
              id="state"
              defaultValue={address?.state}
              error={errors?.state?.message}
              {...register("state", { required: "State is required" })}
              value={selectedState}
              onChange={(e) => {
                handleSelectedState(e);
              }}
            >
              <option value="">--- Select State ---</option>
              {stateData.map((state) => (
                <option key={state.state} value={state.state}>
                  {state.state}
                </option>
              ))}
            </SelectInput>

            <SelectInput
              id="city"
              defaultValue={address?.city}
              error={errors?.city?.message}
              {...register("city", { required: "City is required" })}
              value={selectedCity}
              onChange={(e) => {
                handleSelectedCity(e);
              }}
            >
              <option value="">--- Select L.G.A ---</option>
              {lgas.map((lga, i) => (
                <option key={i} value={lga}>
                  {lga}
                </option>
              ))}
            </SelectInput>
          </div>

          <InputGroup
            label="Delivery Address:"
            icon={<HiMapPin />}
            error={errors?.address?.message}
          >
            <textarea
              className="input h-30 md:h-40"
              type="text"
              name="address"
              id="address"
              defaultValue={address?.address}
              {...register("address", { required: "Address is required" })}
            ></textarea>
          </InputGroup>
          <div className="flex items-center justify-end gap-4 mt-2">
            <Button type="danger" onClick={onEdit}>
              Cancel
            </Button>
            <Button
              icon={isSubmitting && <HiArrowPath className="animate-spin" />}
            >
              {isSubmitting ? "Updating..." : "Update"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditProfileForm;
