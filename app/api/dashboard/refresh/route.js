import { calculateSalesAndRevenue } from "@/app/_helper/helper";
import { getMenus } from "@/app/_libs/menuActions";
import { getOrdersAfterDate, getRecentOrders } from "@/app/_libs/orderActions";
import { getAllUsers } from "@/app/_libs/userAction";
import { subDays } from "date-fns";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const numDays = Number(searchParams.get("days")) || 1;
  const queryDate = subDays(new Date(), numDays).toISOString();

  const menus = await getMenus();
  const menuCount = menus?.count;

  const { data: users } = await getAllUsers();

  const recentOrders = await getRecentOrders();
  const ordersAfterDate = await getOrdersAfterDate(queryDate);
  const totalSalesAndRevenue = calculateSalesAndRevenue(
    ordersAfterDate,
    numDays
  );

  return Response.json({
    menuCount,
    users,
    recentOrders,
    totalSalesAndRevenue,
    numDays,
    ordersAfterDate,
  });
}
