import Button from "@/app/_components/Button";
import InputGroup from "@/app/_components/InputGroup";
import SelectInput from "@/app/_components/SelectInput";
import { useSession } from "next-auth/react";
import { useState } from "react";

function UpdateUserForm({ onCloseModal, user }) {
  // const { data: session, update } = useSession();

  const [selected, setSelected] = useState("");
  // console.log(selected);

  // console.log(session);

  async function handleSubmit(e) {
    e.preventDefault();

    // await update({
    //   user: { role: selected }, // triggers jwt(trigger === "update")
    // });
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
            <option value="customer">User</option>
            <option value="admin">Admin</option>
          </SelectInput>
        </div>

        <div className="flex items-center justify-end gap-4 mt-2">
          <Button onClick={onCloseModal}>Cancel</Button>
          <Button type="danger" position="right">
            Update
          </Button>
        </div>
      </div>
    </form>
  );
}

export default UpdateUserForm;
