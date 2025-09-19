"use client";

import SalesAreaChart from "./SalesAreaChart";
import SalesBarChart from "./SalesBarChart";

function SalesChart({ numDays, ordersAfterDate }) {
  return (
    <div className="basis-1/2 border-2 border-cream-100 shadow-md p-4 flex flex-col gap-4">
      <SalesAreaChart numDays={numDays} ordersAfterDate={ordersAfterDate} />
      <SalesBarChart numDays={numDays} ordersAfterDate={ordersAfterDate} />
    </div>
  );
}

export default SalesChart;
