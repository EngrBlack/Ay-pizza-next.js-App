import Button from "@/app/_components/Button";
import InputGroup from "@/app/_components/InputGroup";
import SelectInput from "@/app/_components/SelectInput";
import { updateUserRole } from "@/app/_libs/userAction";
import { useState, useTransition } from "react";
import toast from "react-hot-toast";
import { HiArrowPath, HiOutlinePaperAirplane } from "react-icons/hi2";

function UpdateUserForm({ onCloseModal, user }) {
  const [selected, setSelected] = useState("customer");
  const [isPending, startTranstion] = useTransition();

  function handleSubmit(e) {
    e.preventDefault();
    startTranstion(async () => {
      try {
        await updateUserRole(user.id, selected);
        toast.success(
          `${
            selected === "admin"
              ? "User updated to Admin successfully."
              : "User updated to Customer successfully."
          }`
        );
        onCloseModal();
      } catch (error) {
        toast.error("Something went wrong" || error?.message);
      }
    });
  }

  return (
    <form action="" onSubmit={handleSubmit}>
      <h1 className="font-rowdies capitalize text-2xl bg-transparent bg-linear-to-r from-gradient-1 to-gradient-2 bg-clip-text text-transparent  mb-2.5">
        Update User
      </h1>

      <div className="mt-0 flex flex-col gap-2 md:gap-4">
        <InputGroup label="Name:">
          <input
            className="input "
            type="text"
            name="name"
            id="name"
            defaultValue={user?.fullName}
            disabled={true}
            placeholder="Category Name"
          />
        </InputGroup>
        <InputGroup label="Email">
          <input
            className="input "
            type="email"
            name="email"
            id="email"
            defaultValue={user?.email}
            disabled={true}
          />
        </InputGroup>
        <div>
          <label className="font-bold text-brown-300  tracking-wide">
            Role
          </label>
          <SelectInput
            label="Role"
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
          >
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
          </SelectInput>
        </div>

        <div className="flex items-center justify-end gap-4 mt-2">
          <Button onClick={onCloseModal}>Cancel</Button>
          <Button
            type="danger"
            position={isPending ? "left" : "right"}
            icon={
              isPending ? (
                <HiArrowPath className="animate-spin" />
              ) : (
                <HiOutlinePaperAirplane />
              )
            }
          >
            {isPending ? "Updating..." : " Update"}
          </Button>
        </div>
      </div>
    </form>
  );
}

export default UpdateUserForm;
