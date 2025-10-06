import { requireAdmin } from "@/app/_libs/authActions";
import { getMenus } from "@/app/_libs/menuActions";
import CreateProductButtton from "./create/CreateProductButtton";
import ProductList from "./ProductList";
import { getCategories } from "@/app/_libs/categoryActions";

export const metadata = {
  title: "Availble Product",
};

export default async function Page({ searchParams }) {
  await requireAdmin();

  const categories = await getCategories();

  // FILTER
  const filterValue = searchParams?.category || "all";

  // SORT-BY
  const sorted = searchParams?.sortedBy || "created_at-desc";
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
      <div className="px-4 sm:px-6 py-4 sm:py-10 xl:px-10 lg:py-10 w-full tracking-wide bg-cream-200">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-rowdies text-brown-300 text-2xl sm:text-3xl lg:text-4xl ">
            Products
          </h1>
          <CreateProductButtton />
        </div>

        <ProductList
          menus={menus || []}
          count={count || 0}
          categories={categories}
        />
      </div>
    </section>
  );
}
