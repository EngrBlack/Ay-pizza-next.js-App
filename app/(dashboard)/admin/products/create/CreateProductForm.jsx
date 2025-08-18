import Button from "@/app/_components/Button";
import InputCheck from "@/app/_components/InputCheck";
import InputGroup from "@/app/_components/InputGroup";
import { HiPaperAirplane } from "react-icons/hi2";

function CreateProductForm() {
  return (
    <div className="border-2 border-cream-100 p-6 rounded shadow-md">
      <form action=" " className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 md:flex-row">
          <InputGroup label="Product Name">
            <input
              className="input"
              type="text"
              name="name"
              id="name"
              placeholder="Enter Product Name"
              required
            />
          </InputGroup>
          <InputGroup label="Category">
            <input
              className="input"
              type="text"
              name="category"
              id="category"
              placeholder="Category"
              required
            />
          </InputGroup>
        </div>
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <InputGroup label="Price">
            <input
              className="input"
              type="text"
              inputMode="number"
              name="price"
              id="price"
              placeholder="Price"
              required
            />
          </InputGroup>

          <InputGroup label="Image">
            <input className="input " type="file" name="image" id="image" />
          </InputGroup>
          <InputCheck
            label="is Available? "
            className="md:mr-10 md:self-baseline-last"
          />
        </div>
        <InputGroup label="Description">
          <textarea
            className="input h-40 "
            type="text"
            name="description"
            id="description"
            placeholder="Enter Product Description"
          ></textarea>
        </InputGroup>

        <Button type="danger" className="self-end mt-2">
          Create Product
        </Button>
      </form>
    </div>
  );
}

export default CreateProductForm;
