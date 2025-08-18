"use client";

import Table from "../_components/Table";
import RecentSalesItem from "./RecentSalesItem";

const headers = ["id", "buyer", "date", "total price", "actions"];

function RecentSales() {
  return (
    <div className="basis-1/2">
      <Table size="grid-cols-[50px_repeat(3,1fr)_70px]" className="p-4">
        <h2 className="font-rowdies text-xl mb-2">Recent Sales</h2>

        <Table.Header>
          {headers.map((el) => (
            <div key={el}>{el}</div>
          ))}
        </Table.Header>
        {Array.from({ length: 8 }, (_, i) => (
          <Table.Body key={i} className="py-1 px-4 text-sm">
            <RecentSalesItem />
          </Table.Body>
        ))}
      </Table>
    </div>
  );
}

export default RecentSales;
