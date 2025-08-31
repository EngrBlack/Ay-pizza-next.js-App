"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  HiArrowLeftEndOnRectangle,
  HiArrowRightEndOnRectangle,
  HiMiniMoon,
  HiMiniUserGroup,
  HiOutlineInformationCircle,
  HiUser,
} from "react-icons/hi2";
import { useOutsideClick } from "../_hooks/useOutsideClick";
import { logOut } from "../_libs/authActions";

const linkData = [
  { href: "/profile", icon: <HiUser />, label: "My Account" },
  {
    href: "/profile/order-history",
    icon: <HiOutlineInformationCircle />,
    label: "Order History",
  },
];

function ProfileNavigation({ onCloseNav, user }) {
  const ref = useOutsideClick(onCloseNav, true);
  const router = useRouter();

  async function handleLogOut() {
    onCloseNav();
    const res = await logOut();

    if (res.status === "success") {
      toast.success("Logged out successfully");
      router.push("/");
    } else {
      toast.error(res.message || "Something went wrong");
    }
  }

  return (
    <ul
      ref={ref}
      className="absolute z-30 top-14 right-[2px] lg:top-18
    bg-cream-200 text-sm sm:text-base w-fit p-2.5  flex flex-col gap-2 shadow-xl rounded-xs trans border-2 border-cream-100 "
    >
      {linkData.map(({ href, icon, label }) => (
        <li key={label} onClick={onCloseNav}>
          <Link
            href={href}
            className="flex items-center gap-2 hover:bg-brown hover:text-cream-200 rounded-xs py-1.5 px-2 pr-5 md:pr-12  whitespace-nowrap"
          >
            {icon} <span>{label}</span>
          </Link>
        </li>
      ))}
      {user?.role === "admin" && (
        <li onClick={onCloseNav}>
          <Link
            href="/admin"
            className="flex items-center gap-2 hover:bg-brown hover:text-cream-200 rounded-xs py-1.5 px-2 pr-5 md:pr-12  whitespace-nowrap"
          >
            <HiMiniUserGroup /> <span>Admin</span>
          </Link>
        </li>
      )}

      {user?.email || user?.name ? (
        <button
          onClick={handleLogOut}
          className="flex items-center gap-2 hover:bg-brown hover:text-cream-200 rounded-xs py-1.5 px-2 pr-5 md:pr-12 whitespace-nowrap w-full"
        >
          <HiArrowLeftEndOnRectangle /> <span>Logout</span>
        </button>
      ) : (
        <li onClick={onCloseNav}>
          <Link
            href="/login"
            className="flex items-center gap-2 hover:bg-brown hover:text-cream-200 rounded-xs py-1.5 px-2 pr-5 md:pr-12  whitespace-nowrap"
          >
            <HiArrowRightEndOnRectangle /> <span>Login</span>
          </Link>
        </li>
      )}

      <li>
        <button
          onClick={onCloseNav}
          className="w-full flex items-center gap-2 hover:bg-brown hover:text-cream-200  rounded-xs py-1.5 px-2 pr-5 outline-0 trans"
        >
          <HiMiniMoon />
          <span> DarkMode</span>
        </button>
      </li>
    </ul>
  );
}

export default ProfileNavigation;
