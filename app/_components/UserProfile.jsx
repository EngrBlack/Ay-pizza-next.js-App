import Image from "next/image";
import { useState } from "react";
import ProfileNavigation from "./ProfileNavigation";

function UserProfile({ session }) {
  const [isOpen, setIsOpen] = useState(false);
  const onCloseNav = () => setIsOpen((open) => !open);
  const user = session?.user;

  return (
    <>
      {user?.email || user?.name ? (
        <div
          onClick={onCloseNav}
          className="flex flex-col items-center  font-rowdies cursor-pointer"
        >
          <div className="overflow-hidden relative border-2 border-orangered-200 rounded-full w-6 sm:w-8 aspect-square ">
            <Image
              src={user?.image || "/user.jpg"}
              fill
              alt="user"
              className="object-fill w-full h-full"
            />
          </div>
          <p className="text-[10px] md:text-xs">
            {user?.name.split(" ").at(0)}
          </p>
        </div>
      ) : (
        <div
          onClick={onCloseNav}
          className="overflow-hidden relative border-2 border-orangered-200 rounded-full w-12 md:w-14 aspect-square "
        >
          <Image
            src={user?.image || "/user.jpg"}
            fill
            alt="user"
            className="object-fill w-full h-full"
          />
        </div>
      )}

      {isOpen && <ProfileNavigation onCloseNav={onCloseNav} user={user} />}
    </>
  );
}

export default UserProfile;
