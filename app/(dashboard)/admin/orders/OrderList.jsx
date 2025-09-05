"use client";

import Table from "@/app/_components/Table";
import OrderItem from "./OrderItem";

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
  console.log(orders);

  return (
    <Table size="grid-cols-7" className="p-6">
      <Table.Header>
        {headers.map((el) => (
          <div key={el}>{el}</div>
        ))}
      </Table.Header>

      {orders.map((order) => (
        <Table.Body key={order.id} className="p-2.5 ">
          <OrderItem order={order} />
        </Table.Body>
      ))}
    </Table>
  );
}

export default OrderList;
