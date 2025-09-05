"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { FaPizzaSlice, FaServicestack } from "react-icons/fa6";
import {
  HiArrowRight,
  HiBars3BottomLeft,
  HiHome,
  HiMiniXMark,
  HiPhone,
} from "react-icons/hi2";
import Button from "./Button";
import CartButton from "./CartButton";
import Logo from "./Logo";
import UserProfile from "./UserProfile";

const navItems = [
  { href: "/", icon: <HiHome />, label: "Home" },
  { href: "/menu", icon: <FaPizzaSlice />, label: "Menu" },
  { href: "/services", icon: <FaServicestack />, label: "Services" },
  { href: "/contact", icon: <HiPhone />, label: "Contact" },
];

function Navigation({ user, cartItems }) {
  const [openNav, setOpenNav] = useState(false);
  const router = useRouter();
  const pathName = usePathname();

  return (
    <header className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 xl:px-32 lg:px-12 bg-cream-200 lg:py-6  shadow-md z-10">
      <Logo size="large" />
      <div
        className={`overlay ${openNav ? "" : "hidden"}`}
        onClick={() => setOpenNav((openNav) => !openNav)}
      ></div>

      <nav className="flex items-center gap-2 sm:gap-6 lg:gap-2">
        <div
          onClick={() => setOpenNav((openNav) => !openNav)}
          className="*:w-8 *:h-8 *:sm:w-10 *:sm:h-10 hover:text-orangered-100 trans lg:hidden"
        >
          <HiBars3BottomLeft />
        </div>
        <ul
          className={`
    list-none fixed top-0 left-0 z-50
    w-3/5 max-w-[50vw] h-screen px-4 pt-16
    bg-nav border-r-8 border-brown
    flex flex-col space-y-4
    transition-transform duration-300 origin-left
    ${openNav ? "scale-x-100" : "scale-x-0"}

    lg:static lg:z-0 lg:w-auto lg:max-w-none
    lg:h-auto lg:p-0 lg:flex-row lg:flex lg:items-center
    lg:space-y-0 lg:gap-8
    lg:bg-cream-200 lg:border-none
    lg:scale-x-100
  `}
        >
          <div
            onClick={() => setOpenNav((open) => !open)}
            className="absolute top-4 right-4  w-fit *:w-6 *:h-6 bg-brown rounded-xs *:text-cream-200 *:hover:bg-orangered-200 trans lg:hidden p-0.5 sm:text-brown "
          >
            <HiMiniXMark />
          </div>

          {navItems.map(({ href, icon, label }) => (
            <li
              key={href}
              className={`nav-list ${
                pathName === href
                  ? "bg-brown lg:bg-transparent lg:before:w-full"
                  : ""
              }`}
              onClick={() => setOpenNav((openNav) => !openNav)}
            >
              <Link
                href={href}
                className="flex items-center gap-2 text-base md:text-lg"
              >
                <span className="text-cream-200 lg:text-brown">{icon}</span>
                <span className="">{label}</span>
              </Link>
            </li>
          ))}

          <li>
            <Button
              onClick={() => {
                router.push("/menu");
                setOpenNav((open) => !open);
              }}
              type="gradient"
              icon={<HiArrowRight />}
            >
              Order Now
            </Button>
          </li>
        </ul>
        <div className="flex  items-center gap-3 sm:gap-4 ml-2 relative ">
          <CartButton cartItems={cartItems} />
          <UserProfile user={user} />
        </div>
      </nav>
    </header>
  );
}

export default Navigation;
