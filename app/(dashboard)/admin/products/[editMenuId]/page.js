import { getMenuById } from "@/app/_libs/menuActions";
import EditProductForm from "./EditProductForm";
import { getCategories } from "@/app/_libs/categoryActions";

async function page({ params }) {
  const { editMenuId } = params;
  const menu = await getMenuById(editMenuId);
  const categories = await getCategories();

  return (
    <section className="bg-cream-200 ">
      <div className="px-4 sm:px-6 py-4 sm:py-10 xl:px-10 lg:py-10 w-full tracking-wide bg-cream-200">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-rowdies text-brown-300 text-2xl sm:text-3xl lg:text-4xl ">
            Edit Product: {menu?.id}
          </h1>
        </div>
        <EditProductForm menu={menu} categories={categories} />
      </div>
    </section>
  );
}

export default page;
