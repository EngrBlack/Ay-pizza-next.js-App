"use client";

import Table from "@/app/_components/Table";
import ProductItem from "./ProductItem";
import Pagination from "@/app/_components/Pagination";
import MenuOperator from "@/app/(home)/menu/MenuOperator";
import { useOptimistic } from "react";
import { deleteMenuById } from "@/app/_libs/menuActions";

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

function ProductList({ menus, count, categories }) {
  const pageSize = Number(process.env.NEXT_PUBLIC_PAGE_SIZE);

  const [optimisticMenus, optimisticDelete] = useOptimistic(
    menus,
    function (curMenus, menuId) {
      return curMenus.filter((item) => item.id !== menuId);
    }
  );

  async function handleDeleteMenu(menuId) {
    optimisticDelete(menuId);
    await deleteMenuById(menuId);
  }

  return (
    <>
      <MenuOperator categories={categories} />
      <Table size="grid-cols-8 " className="p-6">
        <Table.Header>
          {headers.map((el) => (
            <div key={el}>{el}</div>
          ))}
        </Table.Header>

        {optimisticMenus.map((menu) => (
          <Table.Body key={menu.id} className="p-2.5 ">
            <ProductItem menu={menu} onDeleteMenu={handleDeleteMenu} />
          </Table.Body>
        ))}
      </Table>
      {count > pageSize && <Pagination field="page" count={count} />}
    </>
  );
}

export default ProductList;
