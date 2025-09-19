import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatCurrency } from "../_helper/helper";

function SalesBarChart({ numDays, ordersAfterDate }) {
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
    <div className="border border-brown-200 p-3 py-3 rounded">
      <ResponsiveContainer width="100%" height={240}>
        <BarChart
          width={500}
          height={200}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="4" />
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
          <Tooltip
            contentStyle={{ backgroundColor: "hsl(20, 50%, 98%)" }}
            formatter={(value) => formatCurrency(value)}
          />
          <Legend />
          <Bar
            dataKey="totalSales"
            fill="#8884d8"
            activeBar={<Rectangle fill="#9f9be6" stroke="#4a42e8" />}
            type="monotone"
            strokeWidth={1}
            name="Total Sales"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SalesBarChart;
