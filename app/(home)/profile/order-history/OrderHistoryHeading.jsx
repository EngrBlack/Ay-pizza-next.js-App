import SortBy from "@/app/_components/SortBy";

function OrderHistoryHeading() {
  return (
    <div className="flex items-center justify-between gap-4  mb-4">
      <h1 className="font-rowdies w-fit text-xl sm:text-2xl bg-gradient-to-br from-gradient-1 to-gradient-2 bg-clip-text text-transparent lg:text-3xl ">
        Orders History
      </h1>
      <div>
        <SortBy
          field="sortedBy"
          options={[
            { label: "Recent Orders", value: "created_at-desc" },
            { label: "Old Orders", value: "created_at-asc" },
            { label: "Price (Low - High)", value: "total_price-asc" },
            { label: "Price (High - Low)", value: "total_price-desc" },
            { label: "Paid", value: "is_paid" },
            { label: "Delivered", value: "is_delivered" },
          ]}
        />
      </div>
    </div>
  );
}

export default OrderHistoryHeading;
