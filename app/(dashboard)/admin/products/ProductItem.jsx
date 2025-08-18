import { formatCurrency, formatDate } from "@/app/_helper/helper";
import Image from "next/image";
import { HiEllipsisVertical } from "react-icons/hi2";

function ProductItem({ menu }) {
  const {
    name,
    id: menuId,
    image,
    created_at: createdAt,
    is_available: isAvailable,
    base_price: basePrice,
    category: { name: categoryName },
  } = menu;

  return (
    <>
      <div>{menuId}</div>
      <figure className="w-20 aspect-video overflow-hidden relative rounded">
        <Image
          fill
          src={image || "/pizza-1.jpg"}
          alt={name}
          className="w-full h-full object-cover object-center"
        />
      </figure>
      <div>{name}</div>
      <div>{formatCurrency(basePrice)}</div>
      <div className="capitalize">{categoryName.split("_").join(" ")}</div>

      <div>{isAvailable ? "True" : "False"}</div>
      <div>{formatDate(createdAt)}</div>
      <div>
        <HiEllipsisVertical />
      </div>
    </>
  );
}

export default ProductItem;
