import { BiSolidShoppingBagAlt } from "react-icons/bi";
import {
  HiMiniBanknotes,
  HiMiniCurrencyDollar,
  HiUsers,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../_helper/helper";

function Stats({ menuCount, users, totalSalesAndRevenue }) {
  const dataList = [
    {
      icon: <HiMiniCurrencyDollar />,
      name: "Total Revenue",
      value: formatCurrency(totalSalesAndRevenue?.revenue),
      textColor: "text-cyan",
      bgColor: "bg-cyan-100",
    },
    {
      icon: <HiMiniBanknotes />,
      name: "Sales",
      value: totalSalesAndRevenue?.sales,
      textColor: "text-green",
      bgColor: "bg-green-100",
    },
    {
      icon: <HiUsers />,
      name: "Customers",
      value: `${users?.length}`,
      textColor: "text-blue",
      bgColor: "bg-blue-100",
    },
    {
      icon: <BiSolidShoppingBagAlt />,
      name: "Products",
      value: `${menuCount}`,
      textColor: "text-yellow",
      bgColor: "bg-yellow-100",
    },
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {dataList.map((data) => (
        <Stat data={data} key={data.name} />
      ))}
    </div>
  );
}

export default Stats;
