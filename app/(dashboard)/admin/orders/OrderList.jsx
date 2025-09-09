"use client";

import Table from "@/app/_components/Table";
import OrderItem from "./OrderItem";
import { useOptimistic } from "react";
import { deleteOrderById } from "@/app/_libs/orderActions";

const headers = [
  "ID",
  "Date",
  "Buyer",
  "Total ",
  "Paid",
  "Delivered",
  "Actions",
];

function OrderList({ orders }) {
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
  );
}

export default OrderList;
