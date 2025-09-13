"use client";

import Button from "@/app/_components/Button";
import InputGroup from "@/app/_components/InputGroup";
import { createEditCategory } from "@/app/_libs/categoryActions";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { HiArrowPath, HiOutlinePaperAirplane } from "react-icons/hi2";

function EditCategoryForm({ onCloseModal, category }) {
  console.log(category);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  async function onEditCategory(formData) {
    try {
      await createEditCategory(formData, category.id);
      onCloseModal?.();
      toast.success("Category was successfully edited");
      reset();
    } catch (err) {
      toast.error(`Failed to edit category: ${err.message}`);
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
            defaultValue={category?.name}
            className="input"
            type="text"
            id="name"
            placeholder="Category Name"
            {...register("name")}
          />
        </InputGroup>

        <InputGroup label="Image:" error={errors?.image?.message}>
          <input
            className="input"
            type="file"
            id="image"
            {...register("image")}
          />
        </InputGroup>
        {category?.image && (
          <div className="w-fit flex items-center gap-2 border border-brown-100 p-1 rounded">
            <img
              src={category.image}
              alt="Current category"
              className="w-10 aspect-3/2 object-cover rounded "
            />
            <p className="text-brown-300 font-bold text-xs md:text-sm">
              Last Image uploaded
            </p>
          </div>
        )}

        <div className="flex items-center justify-end gap-4 mt-2">
          <Button onClick={onCloseModal}>Cancel</Button>
          <Button
            type="danger"
            position={isSubmitting ? "left" : "right"}
            icon={
              isSubmitting ? (
                <HiArrowPath className="animate-spin" />
              ) : (
                <HiOutlinePaperAirplane />
              )
            }
          >
            {isSubmitting ? "Editing..." : "Edit"}
          </Button>
        </div>
      </div>
    </form>
  );
}

export default EditCategoryForm;
