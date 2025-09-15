import AreaChart from "./AreaChart";
import RecentSales from "./RecentSales";
import Stats from "./Stats";

function Dashboard({ menuCount, users, recentOrders }) {
  return (
    <div className="flex flex-col gap-6">
      <Stats menuCount={menuCount} users={users} />
      <div className="flex gap-6">
        <AreaChart />
        <RecentSales recentOrders={recentOrders} />
      </div>
    </div>
  );
}

export default Dashboard;
