"use client";

import Table from "@/app/_components/Table";
import OrderItem from "./OrderItem";
import { useOptimistic } from "react";
import { deleteOrderById } from "@/app/_libs/orderActions";
import Pagination from "@/app/_components/Pagination";

const headers = [
  "ID",
  "Date",
  "Buyer",
  "Total ",
  "Paid",
  "Delivered",
  "Actions",
];

function OrderList({ orders, count }) {
  const pageSize = Number(process.env.NEXT_PUBLIC_PAGE_SIZE);

  const [optimisticOrders, optimisticDelete] = useOptimistic(
    orders,
    function (curOrders, orderId) {
      return curOrders.filter((item) => item.id !== orderId);
    }
  );

  async function handleDeleteOrder(orderId) {
    optimisticDelete(orderId);
    await deleteOrderById(orderId);
  }

  return (
    <div>
      <Table size="grid-cols-7" className="p-6">
        <Table.Header>
          {headers.map((el) => (
            <div key={el}>{el}</div>
          ))}
        </Table.Header>

        {optimisticOrders.map((order) => (
          <Table.Body key={order.id} className="p-2.5 ">
            <OrderItem order={order} onDeleteOrder={handleDeleteOrder} />
          </Table.Body>
        ))}
      </Table>
      {count > pageSize && <Pagination field="page" count={count} />}
    </div>
  );
}

export default OrderList;
