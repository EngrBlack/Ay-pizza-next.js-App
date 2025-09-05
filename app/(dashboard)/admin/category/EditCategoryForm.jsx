"use client";

import Button from "@/app/_components/Button";
import InputGroup from "@/app/_components/InputGroup";
import { createEditCategory } from "@/app/_libs/categoryActions";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

function EditCategoryForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  async function onEditCategory(data) {
    try {
      await createEditCategory({ name: data?.name, image: data?.image[0] });
      onCloseModal?.();
      toast.success("Category successfully Created.");
      reset();
    } catch (err) {
      toast.error(`Failed to create category: ${err.message}`);
    }
  }

  return (
    <form action="" onSubmit={handleSubmit(onEditCategory)}>
      <h1 className="font-rowdies capitalize text-2xl bg-transparent bg-linear-to-r from-gradient-1 to-gradient-2 bg-clip-text text-transparent  mb-2.5">
        Edit Category
      </h1>

      <div className="mt-0 flex flex-col gap-2 md:gap-4">
        <InputGroup label="Name:" error={errors?.name?.message}>
          <input
            className="input"
            type="text"
            id="name"
            placeholder="Category Name"
            {...register("name", { required: "Category name is required" })}
          />
        </InputGroup>

        <InputGroup label="Image:" error={errors?.image?.message}>
          <input
            className="input"
            type="file"
            id="image"
            {...register("image", {
              required: "Add a sample image by uploading",
            })}
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

export default EditCategoryForm;
