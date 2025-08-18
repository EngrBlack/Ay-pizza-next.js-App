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

function OrderList() {
  return (
    <Table size="grid-cols-7" className="p-6">
      <Table.Header>
        {headers.map((el) => (
          <div key={el}>{el}</div>
        ))}
      </Table.Header>
      {Array.from({ length: 10 }, (_, i) => (
        <Table.Body key={i} className="p-2.5 ">
          <OrderItem />
        </Table.Body>
      ))}
    </Table>
  );
}

export default OrderList;
