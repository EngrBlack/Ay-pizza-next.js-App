import { requireAdmin } from "@/app/_libs/authActions";
import Dashboard from "../Dashboard";
import { getMenus } from "@/app/_libs/menuActions";
import { getAllUsers } from "@/app/_libs/userAction";
import { getRecentOrders } from "@/app/_libs/orderActions";

export const metadata = {
  title: "Admin Dashboard",
};

async function page() {
  await requireAdmin();
  const menus = await getMenus();
  const menuCount = menus?.count;
  const users = await getAllUsers();
  const recentOrders = (await getRecentOrders()) || [];

  return (
    <section className="bg-cream-200 h-screen text-brown">
      <div className="px-4 sm:px-6 py-4 sm:py-4 xl:px-10 lg:py-6 w-full tracking-wide flex flex-col gap-2">
        <h1 className="font-rowdies text-2xl sm:text-3xl lg:text-4xl capitalize mb-2">
          Dashboard
        </h1>
        <Dashboard
          menuCount={menuCount}
          users={users}
          recentOrders={recentOrders}
        />
      </div>
    </section>
  );
}

export default page;
