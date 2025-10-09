"use client";

import Button from "@/app/_components/Button";
import InputGroup from "@/app/_components/InputGroup";
import MapView from "@/app/_components/MapView";
import SelectInput from "@/app/_components/SelectInput";
import { phoneValid, sanitizeAddress } from "@/app/_helper/helper";
import { useGeolocate } from "@/app/_hooks/useGeolocate";
import { updateAddress } from "@/app/_libs/checkoutActions";
import { stateData } from "@/app/_libs/stateList";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  HiArrowPath,
  HiInformationCircle,
  HiMapPin,
  HiPaperAirplane,
  HiPhone,
  HiUser,
} from "react-icons/hi2";

function CreateAddressForm({ onCloseModal }) {
  const { lat, lng } = useGeolocate();
  const [mapPosition, setMapPosition] = useState([
    lat || 6.5244,
    lng || 3.3792,
  ]);
  const [autoAddress, setAutoAddress] = useState("");
  const [selectedState, setSelectedState] = useState("Lagos");
  const [selectedCity, setSelectedCity] = useState("");
  const lgas =
    stateData.find((state) => state.state === selectedState)?.lgas || [];

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  function handleSelectedState(e) {
    const value = e.target.value;
    setSelectedState(value);
    setSelectedCity(""); // reset city when state changes
    setValue("state", value); // sync with RHF
    setValue("city", "");
  }

  function handleSelectedCity(e) {
    const { value } = e.target;
    setSelectedCity(value);
    setValue("city", value); // sync with RHF
  }

  function handleAddressSelect(data) {
    if (!data) return;

    // Sanitize address
    setAutoAddress(sanitizeAddress(data?.display_name) || "");
    setValue("address", sanitizeAddress(data?.display_name) || "");

    // Normalize and match state
    const rawState = data?.address?.state || data?.address?.region || "";
    if (rawState) {
      const normalized = rawState.replace(/state/i, "").trim().toLowerCase();
      let matchedState =
        stateData.find((s) => s.state.toLowerCase().includes(normalized))
          ?.state || "";

      // Handle "FCT" or "Abuja" fallback
      if (!matchedState && /fct|abuja/.test(normalized))
        matchedState = "Federal Capital Territory";

      if (matchedState) {
        setSelectedState(matchedState);
        setValue("state", matchedState);
      }
    }

    // Detect city/LGA
    const cityValue = data?.address?.city || data?.address?.county || "";
    if (cityValue) {
      setSelectedCity(cityValue);
      setValue("city", cityValue);
    }
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
    <div className=" mx-auto lg:w-3xl">
      <h1 className="font-rowdies capitalize text-2xl bg-transparent bg-linear-to-r from-gradient-1 to-gradient-2 bg-clip-text text-transparent  mb-2.5 lg:mb-3.5">
        Add Your Address
      </h1>
      <div className="flex flex-col gap-4 lg:flex-row lg:w-full">
        <div className="basis-1/2">
          <MapView
            mapPosition={mapPosition}
            setMapPosition={setMapPosition}
            onAddressSelect={handleAddressSelect}
          />
        </div>
        <form
          action=""
          onSubmit={handleSubmit(onSubmit)}
          className="grow lg:border lg:border-brown-100 lg:rounded lg:p-4"
        >
          <div className="mt-0 flex flex-col gap-2 md:gap-2 ">
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
                value={autoAddress}
                onChange={(e) => setAutoAddress(e.target.value)}
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
              <Button
                type="danger"
                position={isSubmitting ? "left" : "right"}
                icon={
                  isSubmitting ? (
                    <HiArrowPath className="animate-spin" />
                  ) : (
                    <HiPaperAirplane />
                  )
                }
              >
                {isSubmitting ? "Saving..." : "Save"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateAddressForm;
