import Button from "@/app/_components/Button";
import InputGroup from "@/app/_components/InputGroup";
import SelectInput from "@/app/_components/SelectInput";
import { stateData } from "@/app/_libs/stateList";
import {
  HiInformationCircle,
  HiMapPin,
  HiPaperAirplane,
  HiPhone,
  HiUser,
} from "react-icons/hi2";

function UpdateAddress({ onCloseModal }) {
  const data = stateData;

  console.log(data);

  return (
    <form action="">
      <h1 className="font-rowdies capitalize text-2xl bg-transparent bg-linear-to-r from-gradient-1 to-gradient-2 bg-clip-text text-transparent  mb-2.5">
        Add Your Address
      </h1>

      <div className="mt-0 flex flex-col gap-2 md:gap-4">
        <InputGroup label="First Name:" icon={<HiUser />}>
          <input
            className="input "
            type="text"
            name="firstName"
            id="firstName"
            placeholder="Enter FirstName"
          />
        </InputGroup>
        <InputGroup label="Last Name:" icon={<HiUser />}>
          <input
            className="input "
            type="text"
            name="lastName"
            id="lastName"
            placeholder="Enter LastName"
          />
        </InputGroup>

        <InputGroup label="Contact:" icon={<HiPhone />}>
          <input
            className="input "
            type="text"
            inputMode="number"
            name="contact"
            id="contact"
            placeholder="Enter Your Contact"
          />
        </InputGroup>
        <div className="mt-4 flex  gap-2">
          <SelectInput>
            <option className="w-full px-6 text-brown-100" disabled>
              Select State
            </option>
            {stateData.map((state) => (
              <option key={state.state}>{state.state}</option>
            ))}
          </SelectInput>
          <SelectInput>
            <option className="w-full px-6 text-brown-100 " disabled>
              Select L.G.A
            </option>
          </SelectInput>
        </div>
        <InputGroup label="Address:" icon={<HiMapPin />}>
          <input
            className="input "
            type="text"
            name="address"
            id="address"
            placeholder="Enter Your Address"
          />
        </InputGroup>

        <InputGroup
          label="Additional Information: (Optional)"
          icon={<HiInformationCircle />}
        >
          <input className="input " type="text" name="note" id="note" />
        </InputGroup>

        <div className="flex items-center justify-end gap-4 mt-2">
          <Button onClick={onCloseModal}>Cancel</Button>
          <Button
            type="danger"
            position="right"
            icon={<HiPaperAirplane></HiPaperAirplane>}
          >
            Save
          </Button>
        </div>
      </div>
    </form>
  );
}

export default UpdateAddress;
