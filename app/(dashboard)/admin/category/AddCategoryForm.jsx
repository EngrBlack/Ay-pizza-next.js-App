import Button from "@/app/_components/Button";
import InputGroup from "@/app/_components/InputGroup";

function AddCategoryForm({ onCloseModal }) {
  return (
    <form action="">
      <h1 className="font-rowdies capitalize text-2xl bg-transparent bg-linear-to-r from-gradient-1 to-gradient-2 bg-clip-text text-transparent  mb-2.5">
        Add Category
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
        <InputGroup label="Image">
          <input className="input " type="file" name="image" id="image" />
        </InputGroup>

        <div className="flex items-center justify-end gap-4 mt-2">
          <Button onClick={onCloseModal}>Cancel</Button>
          <Button type="danger" position="right">
            Add
          </Button>
        </div>
      </div>
    </form>
  );
}

export default AddCategoryForm;
