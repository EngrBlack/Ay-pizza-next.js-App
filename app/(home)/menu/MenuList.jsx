"use client";

import Pagination from "@/app/_components/Pagination";
import MenuItem from "./MenuItem";
import MenuOperator from "./MenuOperator";
import { motion } from "framer-motion";
import { framerContainer } from "@/app/_helper/framerMotion";

function MenuList({ menus, count, carts }) {
  const pageSize = Number(process.env.NEXT_PUBLIC_PAGE_SIZE);

  return (
    <div className="sm:w-5/6 md:w-full xl:w-[95%] mx-auto flex flex-col">
      <MenuOperator />

      <motion.ul
        variants={framerContainer}
        initial="hidden"
        animate="show"
        className="grid gap-4 md:grid-cols-2 lg:gap-6 "
      >
        {menus.map((menu) => (
          <MenuItem menu={menu} key={menu.id} carts={carts} />
        ))}
      </motion.ul>

      {count > pageSize && <Pagination field="page" count={count} />}
    </div>
  );
}

export default MenuList;
