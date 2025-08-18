import Pagination from "@/app/_components/Pagination";
import MenuItem from "./MenuItem";
import MenuOperator from "./MenuOperator";

function MenuList({ menus, count }) {
  const pageSize = Number(process.env.NEXT_PUBLIC_PAGE_SIZE);

  return (
    <div className="sm:w-5/6 md:w-full xl:w-[95%] mx-auto flex flex-col">
      <MenuOperator />

      <ul className="grid gap-4 md:grid-cols-2 lg:gap-6 ">
        {menus.map((menu) => (
          <MenuItem menu={menu} key={menu.id}></MenuItem>
        ))}
      </ul>

      {count > pageSize && <Pagination field="page" count={count} />}
    </div>
  );
}

export default MenuList;
