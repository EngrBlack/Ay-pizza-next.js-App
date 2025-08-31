"use client";

import Button from "@/app/_components/Button";
import InputGroup from "@/app/_components/InputGroup";
import { createEditCategory } from "@/app/_libs/categoryActions";
import { useState } from "react";
import toast from "react-hot-toast";

function AddCategoryForm({ onCloseModal }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);

  async function handleAddCategory(e) {
    e.preventDefault();
    console.log(name, image);
    try {
      await createEditCategory({ name, image });
      onCloseModal?.();
      toast.success("Category successfully Created.");
    } catch (err) {
      console.error("Failed to create category:", err.message);
    }
  }

  return (
    <form action="" onSubmit={handleAddCategory}>
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
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Category Name"
          />
        </InputGroup>

        <InputGroup label="Image:">
          <input
            className="input"
            type="file"
            name="image"
            id="image"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
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
