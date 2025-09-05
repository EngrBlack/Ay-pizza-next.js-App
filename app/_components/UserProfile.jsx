import Image from "next/image";
import { useState } from "react";
import ProfileNavigation from "./ProfileNavigation";

function UserProfile({ user }) {
  const [isOpen, setIsOpen] = useState(false);
  const onCloseNav = () => setIsOpen((open) => !open);

  return (
    <>
      {user?.email || user?.name ? (
        <div
          onClick={onCloseNav}
          className="flex flex-col items-center  font-rowdies cursor-pointer"
        >
          <div className="overflow-hidden relative border-2 border-brown-300 rounded-full w-8 sm:w-10 aspect-square ">
            <Image
              src={user?.image || "/user.jpg"}
              fill
              alt="user"
              className="object-cover w-full h-full"
            />
          </div>
          <p className="text-[10px] md:text-xs">
            {user?.fullName.split(" ").at(0)}
          </p>
        </div>
      ) : (
        <div
          onClick={onCloseNav}
          className="flex flex-col items-center  font-rowdies cursor-pointer"
        >
          <div className="overflow-hidden relative border-2 border-brown-300 rounded-full w-6 sm:w-8 aspect-square ">
            <Image
              src={user?.image || "/user.jpg"}
              fill
              alt="user"
              className="object-cover w-full h-full"
            />
          </div>
          <p className="text-[10px] md:text-xs">Login</p>
        </div>
      )}

      {isOpen && <ProfileNavigation onCloseNav={onCloseNav} user={user} />}
    </>
  );
}

export default UserProfile;
