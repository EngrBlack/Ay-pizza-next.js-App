"use client";

import Button from "@/app/_components/Button";
import InputCheck from "@/app/_components/InputCheck";
import InputGroup from "@/app/_components/InputGroup";
import SelectInput from "@/app/_components/SelectInput";
import { createMenu } from "@/app/_libs/menuActions";
import { useRouter } from "next/navigation";
import { useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { HiArrowLeft, HiArrowPath, HiPaperAirplane } from "react-icons/hi2";

function CreateProductForm({ categories }) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    reset,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      name: "",
      category: "pizza",
      sizes: [{ name: "", price: "" }],
      toppings: [{ name: "", price: "" }],
      base_price: "",
      available: true,
      ingredients: "",
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
      // Normalize for DB
      const payload = {
        ...data,
        sizes:
          data.sizes.length > 0
            ? JSON.stringify(data.sizes.filter((s) => s.name && s.price))
            : null,
        toppings:
          data.toppings.length > 0
            ? JSON.stringify(data.toppings.filter((t) => t.name && t.price))
            : null,
        base_price: data.base_price,
        image: data.image,
        discount: data.discount ?? 0,
      };

      await createMenu(payload);
      toast.success("Product created successfully!");
      router.push("/admin/products");

      reset();
    } catch (err) {
      toast.error(err.message || " Failed to create product");
    }
  }

  return (
    <div className="border-2 border-cream-100 p-6 rounded shadow-md">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex items-center flex-col gap-4 md:flex-row ">
          <InputGroup label="Product Name">
            <input
              className="input"
              type="text"
              name="name"
              id="name"
              placeholder="Enter Product Name"
              {...register("name", { required: true })}
            />
          </InputGroup>
          <InputGroup label="Discount">
            <input
              className="input"
              type="text"
              inputMode="number"
              id="name"
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
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <InputGroup label="Price">
            <input
              className="input"
              type="text"
              inputMode="number"
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
                // store File object instead of string
                const file = e.target.files?.[0];
                if (file) {
                  // replace RHF value with File object
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
        <div className="flex  items-start gap-4">
          <div className="grow">
            <h3 className="font-semibold text-brown-300">Sizes</h3>
            {sizeFields.map((field, i) => (
              <div key={field.id} className="flex gap-4 items-center mb-4">
                <InputGroup>
                  <input
                    className="input "
                    type="text"
                    placeholder="Size "
                    {...register(`sizes.${i}.name`)}
                  />
                </InputGroup>
                <InputGroup error={errors?.sizes?.[i]?.price?.message}>
                  <input
                    className="input "
                    type="text"
                    inputMode="number"
                    placeholder="Price"
                    {...register(`sizes.${i}.price`)}
                  />
                </InputGroup>
                <Button type="danger" onClick={() => removeSize(i)}>
                  Remove
                </Button>
                <Button onClick={() => addSize({ name: "", size: "" })}>
                  +Add
                </Button>
              </div>
            ))}
          </div>

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
                    type="text"
                    inputMode="number"
                    placeholder="Price"
                    {...register(`toppings.${i}.price`)}
                  />
                </InputGroup>
                <Button type="danger" onClick={() => removeTopping(i)}>
                  Remove
                </Button>
                <Button onClick={() => addTopping({ name: "", size: "" })}>
                  +Add
                </Button>
              </div>
            ))}
          </div>
        </div>
        <InputGroup label="Ingredients:">
          <textarea
            className="input h-40 "
            type="text"
            name="ingredients"
            {...register("ingredients")}
            placeholder="Enter Product ingredients"
          ></textarea>
        </InputGroup>
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
            {isSubmitting ? "Creating..." : " Create Product"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CreateProductForm;
