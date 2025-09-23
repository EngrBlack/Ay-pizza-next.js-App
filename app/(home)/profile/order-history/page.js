import { getUserOrders } from "@/app/_libs/orderActions";
import OrderHistory from "./OrderHistory";
import OrderHistoryHeading from "./OrderHistoryHeading";

export const metadata = {
  title: "My Order History",
};

async function page({ searchParams }) {
  // SORT-BY
  const sorted = searchParams?.sortedBy || "created_at-desc";
  const [field, direction] = sorted?.split("-");
  const sortBy = { field, direction };

  //PAGINATION
  const currentPage = Number(searchParams?.page) || 1;

  const { data: userOrders, count } =
    (await getUserOrders(sortBy, currentPage)) || [];

  return (
    <section className="bg-cream-200 h-full  mt-[4rem] sm:mt-[5rem] lg:mt-[6rem]">
      <div className="px-4  lg:px-12 lg:py-12 sm:px-6 xl:px-32 py-8 mx-auto w-full xl:w-[95%] ">
        <OrderHistoryHeading />
        <OrderHistory userOrders={userOrders} count={count} />
      </div>
    </section>
  );
}

export default page;
