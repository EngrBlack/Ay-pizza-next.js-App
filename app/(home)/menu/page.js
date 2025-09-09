import Heading from "@/app/_components/Heading";
import { getMenus } from "@/app/_libs/menuActions";
import EmptyMenu from "./EmptyMenu";
import MenuList from "./MenuList";
import { getCartItems } from "@/app/_libs/cartActions";

export const metadata = {
  title: "Menu",
};

export const revalidate = 3600;

async function page({ searchParams }) {
  const cartItems = await getCartItems();

  // FILTER
  const filterValue = searchParams?.category || "all";

  // SORT-BY
  const sorted = searchParams?.sortedBy || "created_at-asc";
  const [field, direction] = sorted?.split("-");
  const sortBy = { field, direction };

  //PAGINATION
  const currentPage = Number(searchParams?.page) || 1;

  const { data: menus, count } =
    (await getMenus(filterValue, sortBy, currentPage)) || [];

  return (
    <section className="bg-cream-200 mt-[4rem] sm:mt-[5rem] lg:mt-[6rem]">
      <div className=" px-4  lg:px-12 lg:py-12 sm:px-6 xl:px-32 py-8 mx-auto w-full">
        <Heading>our menu</Heading>
        <div className="relative">
          {menus.length > 0 ? (
            <MenuList menus={menus} count={count || 0} carts={cartItems} />
          ) : (
            <EmptyMenu />
          )}
        </div>
      </div>
    </section>
  );
}

export default page;
