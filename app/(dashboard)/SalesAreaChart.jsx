import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatCurrency } from "../_helper/helper";

function SalesAreaChart({ numDays, ordersAfterDate }) {
  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  const data = allDates.map((date) => {
    return {
      label: format(date, "MMM dd"),
      totalSales: ordersAfterDate
        .filter((order) => isSameDay(date, new Date(order?.created_at)))
        .reduce((accu, order) => accu + Number(order?.items_price), 0),
    };
  });

  return (
    <div className="border border-brown-200 p-3 py-2 rounded">
      <h2 className="font-rowdies text-xl mb-2">
        Sales &nbsp;
        {allDates.length > 1
          ? `from: ${format(allDates.at(0), "do MMM yyyy")} - ${format(
              allDates.at(-1),
              "do MMM yyyy"
            )}`
          : `today: ${format(allDates.at(0), "do MMM yyyy")}`}
      </h2>

      <ResponsiveContainer width="100%" height={240}>
        <AreaChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 0,
          }}
        >
          <XAxis
            dataKey="label"
            tick={{ fill: "hsl(14, 65%, 9%)" }}
            tickLine={{ stroke: "hsl(14, 65%, 9%)" }}
          />
          <YAxis
            tick={{ fill: "hsl(14, 65%, 9%)" }}
            tickLine={{ stroke: " hsl(14, 65%, 9%)" }}
            tickFormatter={(value) => formatCurrency(value)}
          />
          <CartesianGrid strokeDasharray="4" />
          <Tooltip
            contentStyle={{ backgroundColor: "hsl(20, 50%, 98%)" }}
            formatter={(value) => formatCurrency(value)}
          />
          <Area
            type="monotone"
            dataKey="totalSales"
            stroke="#4a42e8"
            fill="#9f9be6"
            strokeWidth={2}
            name="Total Sales"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SalesAreaChart;
