import RecentSales from "./RecentSales";
import SalesChart from "./SalesChart";
import Stats from "./Stats";

function Dashboard({
  menuCount,
  users,
  recentOrders,
  ordersAfterDate,
  totalSalesAndRevenue,
  numDays,
}) {
  return (
    <div className="flex flex-col gap-6">
      <Stats
        menuCount={menuCount}
        users={users}
        totalSalesAndRevenue={totalSalesAndRevenue}
      />
      <div className="flex gap-6">
        <SalesChart numDays={numDays} ordersAfterDate={ordersAfterDate} />
        <RecentSales recentOrders={recentOrders} />
      </div>
    </div>
  );
}

export default Dashboard;
