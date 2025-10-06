"use client";

import { useState } from "react";
import AdminOrderAlarm from "./AdminOrderAlarm";
import Dashboard from "./Dashboard";
import DashboardHeading from "./admin/DashboardHeading";

export default function DashboardRealtimeWrapper({ initialData }) {
  const [data, setData] = useState(initialData);
  const [numDays, setNumDays] = useState(initialData?.numDays);

  async function refreshDashboard(days = numDays) {
    const res = await fetch(`/api/dashboard/refresh?days=${days}`);
    if (res.ok) {
      const newData = await res.json();
      setData(newData);
      setNumDays(days);
    }
  }

  return (
    <>
      <DashboardHeading onChangeDays={refreshDashboard} />
      <div className="flex justify-end">
        <AdminOrderAlarm onNewOrder={refreshDashboard} />
      </div>

      <Dashboard
        menuCount={data.menuCount}
        users={data.users}
        recentOrders={data.recentOrders}
        totalSalesAndRevenue={data.totalSalesAndRevenue}
        numDays={data.numDays}
        ordersAfterDate={data.ordersAfterDate}
      />
    </>
  );
}
