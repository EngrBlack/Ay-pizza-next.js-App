"use client";

import SortBy from "../_components/SortBy";

function DashboardOperation() {
  return (
    <div>
      <SortBy
        field="sortedBy"
        options={[
          { label: "Today", value: "1" },
          { label: "Last 3 days ago", value: "3" },
          { label: "Last 7 days ago", value: "7" },
          { label: "Last 2 weeks", value: "14" },
          { label: "Last 1 month", value: "30" },
          { label: "Last 3 months", value: "60" },
          { label: "Last 6 months", value: "183" },
          { label: "Last 1 year", value: "365" },
        ]}
      />
    </div>
  );
}

export default DashboardOperation;
