"use client";

import Button from "@/app/_components/Button";
import InputGroup from "@/app/_components/InputGroup";
import SelectInput from "@/app/_components/SelectInput";
import { phoneValid } from "@/app/_helper/helper";
import { updateAddress } from "@/app/_libs/checkoutActions";
import { stateData } from "@/app/_libs/stateList";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  HiInformationCircle,
  HiMapPin,
  HiPaperAirplane,
  HiPhone,
  HiUser,
} from "react-icons/hi2";

function CreateAddressForm({ onCloseModal }) {
  const [selectedState, setSelectedState] = useState("Lagos");
  const [selectedCity, setSelectedCity] = useState("");
  const lgas =
    stateData.find((state) => state.state === selectedState)?.lgas || [];

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  function handleSelectedState(e) {
    const value = e.target.value;
    setSelectedState(value);
    setSelectedCity(""); // reset city when state changes
  }

  function handleSelectedCity(e) {
    const { value } = e.target;
    setSelectedCity(value);
  }

  async function onSubmit(data) {
    const { firstName, lastName, address, state, city, contact, note } = data;
    const names = [firstName, lastName];
    const fullName = names.join(" ");

    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("address", address);
    formData.append("state", state);
    formData.append("city", city);
    formData.append("contact", contact);
    formData.append("note", note);

    try {
      const res = await updateAddress(formData);
      if (res?.success) toast.success("Address updated sucessfully");
      reset();
      onCloseModal();
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <form action="" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="font-rowdies capitalize text-2xl bg-transparent bg-linear-to-r from-gradient-1 to-gradient-2 bg-clip-text text-transparent  mb-2.5">
        Add Your Address
      </h1>

      <div className="mt-0 flex flex-col gap-2 md:gap-4">
        <InputGroup
          label="First Name:"
          icon={<HiUser />}
          error={errors?.firstName?.message}
        >
          <input
            className="input "
            type="text"
            id="firstName"
            placeholder="Enter FirstName"
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
            id="lastName"
            placeholder="Enter LastName"
            {...register("lastName", { required: "Last name is required" })}
          />
        </InputGroup>

        <InputGroup
          label="Contact:"
          icon={<HiPhone />}
          error={errors?.contact?.message}
        >
          <input
            className="input "
            type="text"
            inputMode="number"
            id="contact"
            placeholder="Enter Your Contact"
            {...register("contact", {
              required: "Contact is required",
              validate: (value) =>
                phoneValid(value) ||
                "Enter a valid Nigerian phone number (e.g. 08012345678 or +2348012345678)",
            })}
          />
        </InputGroup>
        <div className="mt-4 flex gap-2">
          <SelectInput
            id="state"
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
          label="Address:"
          icon={<HiMapPin />}
          error={errors?.address?.message}
        >
          <input
            className="input "
            type="text"
            id="address"
            placeholder="Enter Your Address"
            {...register("address", { required: "Address is required" })}
          />
        </InputGroup>

        <InputGroup
          label="Additional Information: (Optional)"
          icon={<HiInformationCircle />}
        >
          <input
            className="input "
            type="text"
            id="note"
            {...register("note")}
          />
        </InputGroup>

        <div className="flex items-center justify-end gap-4 mt-2">
          <Button onClick={onCloseModal}>Cancel</Button>
          <Button type="danger" position="right" icon={<HiPaperAirplane />}>
            Save
          </Button>
        </div>
      </div>
    </form>
  );
}

export default CreateAddressForm;
