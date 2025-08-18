"use client";

import Table from "@/app/_components/Table";
import ProductItem from "./ProductItem";
import Pagination from "@/app/_components/Pagination";
import MenuOperator from "@/app/(home)/menu/MenuOperator";

const headers = [
  "id",
  "image",
  "name",
  "price",
  "category",
  "Available",
  "created at",
  "Actions",
];

function ProductList({ menus, count }) {
  const pageSize = Number(process.env.NEXT_PUBLIC_PAGE_SIZE);

  return (
    <>
      <MenuOperator />
      <Table size="grid-cols-8 " className="p-6">
        <Table.Header>
          {headers.map((el) => (
            <div key={el}>{el}</div>
          ))}
        </Table.Header>

        {menus.map((menu) => (
          <Table.Body key={menu.id} className="p-2.5 ">
            <ProductItem menu={menu} />
          </Table.Body>
        ))}
      </Table>
      {count > pageSize && <Pagination field="page" count={count} />}
    </>
  );
}

export default ProductList;
