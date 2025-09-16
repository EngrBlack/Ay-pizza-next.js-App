"use client";

import DashboardOperation from "../DashboardOperation";

function DashboardHeading() {
  return (
    <div className="flex items-center justify-between">
      <h1 className="font-rowdies text-2xl sm:text-3xl lg:text-4xl capitalize mb-2">
        Dashboard
      </h1>
      <DashboardOperation />
    </div>
  );
}

export default DashboardHeading;
