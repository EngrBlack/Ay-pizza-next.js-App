"use client";

import Filter from "@/app/_components/Filter";
import SortBy from "@/app/_components/SortBy";

function MenuOperator() {
  return (
    <div className="md:self-end flex items-center gap-2 mb-4 md:mb-6 md:justify-end md:w-[60%] lg:w-[49%]">
      <div className="basis-[50%] sm:basis-full md:basis-[50%] lg:basis-[60%] ">
        <Filter
          field="category"
          options={[
            { label: "All", value: "all" },
            { label: "Pizza", value: "pizza" },
            { label: "Ice Cream", value: "ice_cream" },
            { label: "Burger", value: "burger" },
            { label: "MilkShake", value: "milkshake" },
            { label: "Drinks", value: "drinks" },
            { label: "Sides Dishes", value: "side" },
          ]}
        />
      </div>
      <SortBy
        field="sortedBy"
        options={[
          { label: "Latest Added (Recently)", value: "created_at-asc" },
          { label: "Latest Added (Old)", value: "created_at-desc" },
          { label: "Price (Low - High)", value: "base_price-asc" },
          { label: "Price (High - Low)", value: "base_price-desc" },
          { label: "Name (A-Z)", value: "name-asc" },
          { label: "Name (Z-A)", value: "name-desc" },
          { label: "Discount", value: "discount" },
          // { label: "Category (A-Z)", value: "category-asc" },
          // { label: "Category (Z-A)", value: "category-dec" },
        ]}
      />
    </div>
  );
}

export default MenuOperator;
