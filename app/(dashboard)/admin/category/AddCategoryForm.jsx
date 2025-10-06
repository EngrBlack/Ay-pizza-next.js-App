"use client";

import Button from "@/app/_components/Button";
import InputGroup from "@/app/_components/InputGroup";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { HiArrowPath, HiPaperAirplane } from "react-icons/hi2";

function AddCategoryForm({ onCloseModal }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  async function onAddCategory(data) {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("image", data.image[0]);

    try {
      const res = await fetch("/api/category", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.error || "Unknown error");

      toast.success("Category successfully Created.");
      router.refresh();
      onCloseModal?.();
      reset();
    } catch (err) {
      toast.error(`Failed to create category: ${err.message}`);
      reset();
    }
  }

  return (
    <form action="" onSubmit={handleSubmit(onAddCategory)}>
      <h1 className="font-rowdies capitalize text-2xl bg-transparent bg-linear-to-r from-gradient-1 to-gradient-2 bg-clip-text text-transparent  mb-2.5">
        Add Category
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
            {isSubmitting ? "Creating..." : " Create"}
          </Button>
        </div>
      </div>
    </form>
  );
}

export default AddCategoryForm;
