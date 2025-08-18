"use client";

import Image from "next/image";
import { useState } from "react";
import { HiBars3BottomLeft } from "react-icons/hi2";
import ProfileNavigation from "../_components/ProfileNavigation";
import SearchBar from "../_components/SearchBar";

function Navigation({ onOpen }) {
  return (
    <header className="grid grid-cols-[min-content_1fr_min-content] gap-6  px-4 sm:px-6 py-3 sm:py-4 xl:px-10  bg-cream-200 lg:py-6  shadow-md z-10 w-full ">
      <div
        onClick={onOpen}
        className="*:w-8 *:h-8 *:sm:w-10 *:sm:h-10 hover:text-orangered-100 trans "
      >
        <HiBars3BottomLeft />
      </div>
      <SearchBar />

      <User />
    </header>
  );
}

export default Navigation;

function User() {
  const [isOpen, setIsOpen] = useState(false);
  const onCloseNav = () => setIsOpen((open) => !open);

  return (
    <>
      <div
        onClick={onCloseNav}
        className="justify-self-end overflow-hidden border-2 border-orangered-200 rounded-full w-10 aspect-square "
      >
        <Image
          src="/user.jpg"
          width={20}
          height={20}
          alt="user"
          className="object-fill w-full h-full"
        />
      </div>
      {isOpen && <ProfileNavigation onCloseNav={onCloseNav} />}
    </>
  );
}
