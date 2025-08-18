import Heading from "@/app/_components/Heading";
import Spinner from "@/app/_components/Spinner";
import { getMenus } from "@/app/_libs/menuActions";
import { Suspense } from "react";
import MenuList from "./MenuList";

export const metadata = {
  title: "Menu",
};

export const revalidate = 3600;

async function page({ searchParams }) {
  // FILTER
  const filterValue = searchParams?.category || "all";

  // SORT-BY
  const sorted = searchParams?.sortedBy || "created_at-asc";
  const [field, direction] = sorted?.split("-");
  const sortBy = { field, direction };

  //PAGINATION
  const currentPage = Number(searchParams?.page) || 1;

  const { data: menus, count } = await getMenus(
    filterValue,
    sortBy,
    currentPage
  );

  return (
    <section className="bg-cream-200 ">
      <div className=" px-4  lg:px-12 lg:py-12 sm:px-6 xl:px-32 py-8 mx-auto w-full">
        <Heading>our menu</Heading>
        <div className="relative">
          <Suspense fallback={<Spinner />} key={filterValue}>
            <MenuList menus={menus || []} count={count || 0} />
          </Suspense>
        </div>
      </div>
    </section>
  );
}

export default page;
