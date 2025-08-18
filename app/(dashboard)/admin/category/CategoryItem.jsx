import { formatDate } from "@/app/_helper/helper";
import Image from "next/image";
import { HiEllipsisVertical } from "react-icons/hi2";

function CategoryItem({ category }) {
  const { name, created_at: createdAt, image, id } = category;

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
        <HiEllipsisVertical />
      </div>
    </>
  );
}

export default CategoryItem;
