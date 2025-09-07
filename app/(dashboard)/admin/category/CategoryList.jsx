"use client";

import Table from "@/app/_components/Table";
import CategoryItem from "./CategoryItem";
import { useOptimistic } from "react";
import {
  deleteCategoryById,
  getCategoryById,
} from "@/app/_libs/categoryActions";

const headers = ["name", "image", "created at", "Actions"];

function CategoryList({ categories }) {
  const [optimisticCategories, optimisticDelete] = useOptimistic(
    categories,
    function (curCategory, categoryId) {
      return curCategory.filter((item) => item.id !== categoryId);
    }
  );

  async function handleDeleteCategory(categoryId) {
    optimisticDelete(categoryId);
    await deleteCategoryById(categoryId);
  }

  return (
    <Table size="grid-cols-4" className="p-6">
      <Table.Header>
        {headers.map((el) => (
          <div key={el}>{el}</div>
        ))}
      </Table.Header>
      {optimisticCategories.map((category) => (
        <Table.Body key={category.id} className="p-2.5 ">
          <CategoryItem
            category={category}
            onDeleteCategory={handleDeleteCategory}
          />
        </Table.Body>
      ))}
    </Table>
  );
}

export default CategoryList;
