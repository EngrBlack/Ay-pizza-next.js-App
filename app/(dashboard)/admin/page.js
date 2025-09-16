import { calculateSalesAndRevenue } from "@/app/_helper/helper";
import { requireAdmin } from "@/app/_libs/authActions";
import { getMenus } from "@/app/_libs/menuActions";
import { getOrdersAfterDate, getRecentOrders } from "@/app/_libs/orderActions";
import { getAllUsers } from "@/app/_libs/userAction";
import { subDays } from "date-fns";
import Dashboard from "../Dashboard";
import DashboardHeading from "./DashboardHeading";

export const metadata = {
  title: "Admin Dashboard",
};

async function page({ searchParams }) {
  const numDays = Number(searchParams?.sortedBy) || 1;

  const queryDate = subDays(new Date(), numDays).toISOString();

  await requireAdmin();
  const menus = await getMenus();
  const menuCount = menus?.count;
  const users = await getAllUsers();
  const recentOrders = await getRecentOrders();
  const ordersAfterDate = await getOrdersAfterDate(queryDate);
  const totalSalesAndRevenue = calculateSalesAndRevenue(
    ordersAfterDate,
    numDays
  );

  return (
    <section className="bg-cream-200 h-screen text-brown">
      <div className="px-4 sm:px-6 py-4 sm:py-4 xl:px-10 lg:py-6 w-full tracking-wide flex flex-col gap-2">
        <DashboardHeading />
        <Dashboard
          menuCount={menuCount}
          users={users}
          recentOrders={recentOrders}
          totalSalesAndRevenue={totalSalesAndRevenue}
        />
      </div>
    </section>
  );
}

export default page;
