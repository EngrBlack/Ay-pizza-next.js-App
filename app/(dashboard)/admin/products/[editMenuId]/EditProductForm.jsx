"use client";

import Button from "@/app/_components/Button";
import InputCheck from "@/app/_components/InputCheck";
import InputGroup from "@/app/_components/InputGroup";
import SelectInput from "@/app/_components/SelectInput";
import { editMenuById } from "@/app/_libs/menuActions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { HiArrowLeft, HiArrowPath, HiPaperAirplane } from "react-icons/hi2";

function EditProductForm({ menu, categories }) {
  const router = useRouter();
  const [showSizes, setShowSizes] = useState(false);
  const [showToppings, setShowToppings] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      name: menu?.name || "",
      category: menu?.category?.name || "",
      sizes: Array.isArray(menu?.size) ? menu.size : [],
      toppings: Array.isArray(menu?.toppings) ? menu.toppings : [],
      base_price: menu?.base_price || "",
      available: menu?.is_available ?? true,
      ingredients: menu?.ingredients || "",
      discount: menu?.discount || 0,
      image: menu?.image || null,
    },
  });

  const {
    fields: sizeFields,
    append: addSize,
    remove: removeSize,
  } = useFieldArray({ control, name: "sizes" });

  const {
    fields: toppingFields,
    append: addTopping,
    remove: removeTopping,
  } = useFieldArray({ control, name: "toppings" });

  async function onSubmit(data) {
    try {
      const formData = new FormData();

      if (data.id) formData.append("id", data.id); // only on edit
      formData.append("name", data.name);
      formData.append("category", data.category);
      formData.append("base_price", data.base_price);
      formData.append("ingredients", data.ingredients);
      formData.append("discount", data.discount ?? 0);
      formData.append("available", data.available ? "true" : "false");

      if (data.sizes?.length > 0)
        formData.append(
          "sizes",
          JSON.stringify(data.sizes.filter((s) => s.name && s.price))
        );

      if (data.toppings?.length > 0)
        formData.append(
          "toppings",
          JSON.stringify(data.toppings.filter((t) => t.name && t.price))
        );

      if (data.image instanceof File) {
        formData.append("image", data.image);
      } else if (data.image) {
        // keep old path if no new upload
        formData.append("existingImage", data.image);
      }

      const method = data.id ? "PUT" : "POST";

      const res = await fetch("/api/menu", { method, body: formData });
      const result = await res.json();

      if (!res.ok) throw new Error(result.error || "Failed");

      toast.success(data.id ? "Product updated!" : "Product created!");
      router.push("/admin/products");
      reset();
    } catch (err) {
      toast.error(err.message);
    }
  }

  return (
    <div className="border-2 border-cream-100 p-6 rounded shadow-md">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {/* Top Row */}
        <div className="flex items-center flex-col gap-4 md:flex-row ">
          <InputGroup label="Product Name">
            <input
              className="input"
              type="text"
              id="name"
              placeholder="Enter Product Name"
              {...register("name", { required: true })}
            />
          </InputGroup>
          <InputGroup label="Discount">
            <input
              className="input"
              type="number"
              placeholder="Discount"
              {...register("discount")}
            />
          </InputGroup>
          <div className="basis-2/3">
            <h3 className="font-semibold text-brown-300">Category:</h3>
            <SelectInput {...register("category")}>
              {categories.map((category) => (
                <option
                  key={category.id}
                  value={category?.name.replace(" ", "_")}
                >
                  {category?.name.replace("_", " ")}
                </option>
              ))}
            </SelectInput>
          </div>
        </div>

        {/* Price + Image + Available */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <InputGroup label="Price">
            <input
              className="input"
              type="number"
              id="base_price"
              placeholder="Base Price"
              {...register("base_price")}
            />
          </InputGroup>

          <InputGroup label="Image">
            <input
              className="input grow"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setValue("image", file, { shouldValidate: true });
                }
              }}
            />
          </InputGroup>

          <InputCheck
            type="checkbox"
            label="Is Available?"
            className="md:self-baseline-last"
            checked={watch("available")}
            {...register("available")}
          />
        </div>

        {/* Sizes and Toppings */}
        <div className="flex items-start gap-4">
          {/* Sizes */}
          <div className="basis-1/2">
            <h3 className="font-semibold text-brown-300">Sizes</h3>
            {sizeFields.map((field, i) => (
              <div key={field.id} className="flex gap-4 items-center mb-4">
                <InputGroup>
                  <input
                    className="input "
                    type="text"
                    placeholder="Size"
                    {...register(`sizes.${i}.name`)}
                  />
                </InputGroup>
                <InputGroup error={errors?.sizes?.[i]?.price?.message}>
                  <input
                    className="input "
                    type="number"
                    placeholder="Price"
                    {...register(`sizes.${i}.price`)}
                  />
                </InputGroup>
                <Button type="danger" onClick={() => removeSize(i)}>
                  Remove
                </Button>
                <Button onClick={() => addSize({ name: "", price: "" })}>
                  +Add
                </Button>
              </div>
            ))}
          </div>

          {/* Toppings */}
          <div className="grow">
            <h3 className="font-semibold text-brown-300">Toppings</h3>
            {toppingFields.map((field, i) => (
              <div key={field.id} className="flex gap-4 items-center mb-4">
                <InputGroup>
                  <input
                    className="input "
                    type="text"
                    placeholder="Topping Name"
                    {...register(`toppings.${i}.name`)}
                  />
                </InputGroup>
                <InputGroup error={errors?.toppings?.[i]?.price?.message}>
                  <input
                    className="input "
                    type="number"
                    placeholder="Price"
                    {...register(`toppings.${i}.price`)}
                  />
                </InputGroup>
                <Button type="danger" onClick={() => removeTopping(i)}>
                  Remove
                </Button>
                <Button onClick={() => addTopping({ name: "", price: "" })}>
                  +Add
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Ingredients */}
        <InputGroup label="Ingredients:">
          <textarea
            className="input h-40 "
            {...register("ingredients")}
            placeholder="Enter Product ingredients"
          ></textarea>
        </InputGroup>

        {/* Actions */}
        <div className="self-end mt-2 flex items-center gap-2 sm:gap-4">
          <Button
            type="primary"
            icon={<HiArrowLeft />}
            onClick={() => router.back()}
          >
            Back
          </Button>
          <Button
            type="danger"
            icon={
              isSubmitting ? (
                <HiArrowPath className="animate-spin" />
              ) : (
                <HiPaperAirplane />
              )
            }
            position={isSubmitting ? "left" : "right"}
          >
            {isSubmitting ? "Editing..." : "Edit Product"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default EditProductForm;
