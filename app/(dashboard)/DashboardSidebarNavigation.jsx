"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BiSolidShoppingBagAlt } from "react-icons/bi";
import {
  HiMiniArrowLeftOnRectangle,
  HiMiniCog8Tooth,
  HiOutlineHome,
  HiOutlineShoppingCart,
  HiOutlineUsers,
  HiQueueList,
} from "react-icons/hi2";
import Logo from "../_components/Logo";
import { logOut } from "../_libs/authActions";
import toast from "react-hot-toast";

const linkData = [
  { name: "Dashboard", icon: <HiOutlineHome />, href: "/admin" },
  { name: "Orders", icon: <HiOutlineShoppingCart />, href: "/admin/orders" },
  {
    name: "Products",
    icon: <BiSolidShoppingBagAlt />,
    href: "/admin/products",
  },
  {
    name: "Category",
    icon: <HiQueueList />,
    href: "/admin/category",
  },
  { name: "Admin Users", icon: <HiOutlineUsers />, href: "/admin/users" },
];

function DashboardSibebarNavigation({ isOpen, onOpen }) {
  const router = useRouter();
  const pathName = usePathname();

  async function handleLogout() {
    const res = await logOut();
    if (res.status === "success") {
      toast.success("Logout successfully");
      router.push("/");
    } else {
      toast.error("Cound not Logout user" || res.message);
    }
  }

  return (
    <>
      <div
        className={` ${
          isOpen
            ? "fixed w-full bg-stone-400/15 backdrop-blur-xs top-0 left-0 h-screen z-40"
            : ""
        }`}
        onClick={onOpen}
      ></div>
      <div
        className={`bg-brown text-cream-200 fixed top-0 left-0 bottom-0 z-50 h-screen  flex flex-col  py-6 px-3 pb-30 shadow-xl shadow-slate-900 -translate-x-full transform trans ease-in-out  ${
          isOpen ? "translate-x-0" : ""
        }`}
      >
        <div className=" h-full">
          <div className="mb-10 flex items-center gap-6 justify-between">
            <Logo color="text-cream-200 " size="small" />
            <span className="*:text-xl " onClick={onOpen}>
              <HiMiniArrowLeftOnRectangle />
            </span>
          </div>

          <div className="flex flex-col h-full justify-between">
            <ul className="flex flex-col gap-6 lg:gap-8">
              {linkData.map(({ name, icon, href }) => (
                <li key={name} onClick={onOpen}>
                  <Link
                    href={href}
                    className={`flex items-center gap-2 hover:bg-cream-200 hover:text-brown rounded-xs py-1.5 pl-2 pr-12 trans ${
                      pathName === href ? " bg-cream-200 text-brown" : ""
                    }`}
                  >
                    <span className="*:text-xl ">{icon}</span>
                    <p>{name}</p>
                  </Link>
                </li>
              ))}
            </ul>

            <ul className="flex flex-col gap-6 lg:gap-8">
              <li>
                <Link
                  href="/admin/settings"
                  className={`flex items-center gap-2 hover:bg-cream-200 hover:text-brown rounded-xs py-1 pl-2 pr-12 trans `}
                >
                  <span className="*:text-xl ">
                    <HiMiniCog8Tooth />
                  </span>
                  <p>Settings</p>
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className={`flex items-center gap-2 cursor-pointer hover:bg-cream-200 hover:text-brown rounded-xs py-1.5 pl-2 pr-12 trans w-full`}
                >
                  <span className="*:text-xl ">
                    <HiMiniArrowLeftOnRectangle />
                  </span>
                  <span>Logout</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardSibebarNavigation;
