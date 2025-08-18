import Button from "@/app/_components/Button";
import InputGroup from "@/app/_components/InputGroup";
import SelectInput from "@/app/_components/SelectInput";

function UpdateUserForm({ onCloseModal }) {
  return (
    <form action="">
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
          <input className="input " type="email" name="email" id="email" />
        </InputGroup>
        <InputGroup label="Image">
          <input className="input " type="file" name="image" id="image" />
        </InputGroup>
        <div>
          <label className="font-bold text-brown-300  tracking-wide">
            Role
          </label>
          <SelectInput label="Role">
            <option>User</option>
            <option>Admin</option>
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
