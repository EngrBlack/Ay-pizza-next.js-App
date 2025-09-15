"use client";

import { useOptimistic } from "react";
import Table from "../_components/Table";
import RecentSalesItem from "./RecentSalesItem";
import { deleteOrderById } from "../_libs/orderActions";

const headers = ["id", "buyer", "date", "total price", "actions"];

function RecentSales({ recentOrders }) {
  const [optimisticRecentOrders, optimisticDelete] = useOptimistic(
    recentOrders ?? [], // safe default
    function (curOrders, recentOrderId) {
      return curOrders.filter((item) => item?.id !== recentOrderId);
    }
  );

  async function handleDeleteRecentOrder(recentOrderId) {
    optimisticDelete(recentOrderId);
    await deleteOrderById(recentOrderId);
  }

  return (
    <div className="basis-1/2">
      <Table size="grid-cols-[50px_repeat(3,1fr)_70px]" className="p-4">
        <h2 className="font-rowdies text-xl mb-2">Recent Sales</h2>

        <Table.Header>
          {headers.map((el) => (
            <div key={el}>{el}</div>
          ))}
        </Table.Header>
        {optimisticRecentOrders.map((recentOrder) => (
          <Table.Body key={recentOrder.id} className="py-1 px-4 text-sm">
            <RecentSalesItem
              recentOrder={recentOrder}
              onDeleteRecentOrder={handleDeleteRecentOrder}
            />
          </Table.Body>
        ))}
      </Table>
    </div>
  );
}

export default RecentSales;
