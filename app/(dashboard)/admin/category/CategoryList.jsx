"use client";

import Table from "@/app/_components/Table";
import CategoryItem from "./CategoryItem";

const headers = ["name", "image", "created at", "Actions"];

function CategoryList({ categories }) {
  return (
    <Table size="grid-cols-4" className="p-6">
      <Table.Header>
        {headers.map((el) => (
          <div key={el}>{el}</div>
        ))}
      </Table.Header>
      {categories.map((category) => (
        <Table.Body key={category.id} className="p-2.5 ">
          <CategoryItem category={category} />
        </Table.Body>
      ))}
    </Table>
  );
}

export default CategoryList;
