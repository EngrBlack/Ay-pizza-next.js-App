import Image from "next/image";
import { useState } from "react";
import ProfileNavigation from "./ProfileNavigation";

function UserProfile({ user }) {
  const [isOpen, setIsOpen] = useState(false);
  const onCloseNav = () => setIsOpen((open) => !open);

  return (
    <>
      {user?.email || user?.fullName ? (
        <div
          onClick={onCloseNav}
          className="flex items-center gap-2 font-rowdies cursor-pointer"
        >
          <div className="overflow-hidden relative border-2 border-orangered-200 rounded-full w-10 aspect-square ">
            <Image
              src={user?.image || "/user.jpg"}
              fill
              alt="user"
              className="object-fill w-full h-full"
            />
          </div>
          <p>
            {user?.fullName
              .split(" ")
              .map((name) => name.at(0))
              .join("")}
          </p>
        </div>
      ) : (
        <div
          onClick={onCloseNav}
          className="overflow-hidden border-2 border-orangered-200 rounded-full w-10 aspect-square "
        >
          <Image
            src="/user.jpg"
            width={20}
            height={20}
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
