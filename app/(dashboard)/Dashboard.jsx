import AreaChart from "./AreaChart";
import RecentSales from "./RecentSales";
import Stats from "./Stats";

function Dashboard() {
  return (
    <div className="flex flex-col gap-6">
      <Stats />
      <div className="flex gap-6">
        <AreaChart />
        <RecentSales />
      </div>
    </div>
  );
}

export default Dashboard;
