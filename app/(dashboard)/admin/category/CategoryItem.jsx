import { formatDate } from "@/app/_helper/helper";
import Image from "next/image";
import CategoryGroupedButton from "./CategoryGroupedButton";

function CategoryItem({ category, onDeleteCategory }) {
  const { name, created_at: createdAt, image, id: categoryId } = category;

  return (
    <>
      <figure className="overflow-hidden relative w-30 aspect-video rounded-sm">
        <Image
          fill
          quality={20}
          src={image || "/pizza-1.jpg"}
          alt={name}
          className="w-full h-full object-cover"
        />
      </figure>
      <div className="font-rowdies text-lg capitalize">
        {name.split("_").join(" ")}
      </div>

      <div>{formatDate(createdAt)}</div>
      <div>
        <CategoryGroupedButton
          category={category}
          onDeleteCategory={onDeleteCategory}
        />
      </div>
    </>
  );
}

export default CategoryItem;
