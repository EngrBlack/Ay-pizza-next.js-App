import { requireAdmin } from "@/app/_libs/authActions";
import OrderList from "./OrderList";
import { getAllOrders } from "@/app/_libs/orderActions";
import OrderHeading from "./OrderHeading";

export const metadata = {
  title: "Orders",
};

async function page({ searchParams }) {
  await requireAdmin();

  // SORT-BY
  const sorted = searchParams?.sortedBy || "created_at-desc";
  const [field, direction] = sorted?.split("-");
  const sortBy = { field, direction };

  //PAGINATION
  const currentPage = Number(searchParams?.page) || 1;
  const { data: orders, count } = await getAllOrders(sortBy, currentPage);

  console.log(orders);

  return (
    <section className="bg-cream-200 ">
      <div className="px-4 sm:px-6 py-4 sm:py-10 xl:px-10 lg:py-10 w-full tracking-wide bg-cream-200">
        <OrderHeading />
        <OrderList orders={orders} count={count} />
      </div>
    </section>
  );
}

export default page;
