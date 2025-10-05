import { maskId } from "@/app/_helper/helper";
import Image from "next/image";
import UserGroupedButton from "./UserGroupedButton";

function User({ user, onDeleteUser }) {
  return (
    <>
      <div>{maskId(user?.id, 8)}</div>
      <div className=" flex items-center gap-4">
        <figure className="w-10 aspect-square rounded-full relative overflow-hidden">
          <Image
            quality={40}
            fill
            src={user?.image || "/user.jpg"}
            alt={user?.fullName || ""}
            className="w-full h-full object-cover"
          />
        </figure>
        <span>{user?.fullName || "No Name"}</span>
      </div>
      <div>{user?.email}</div>
      <div
        className={` text-cream-200 rounded-full py-0.5 px-3 capitalize ${
          user?.role === "admin" ? "bg-brown " : "bg-brown-300"
        }`}
      >
        {user?.role}
      </div>
      <div>
        <UserGroupedButton user={user} onDeleteUser={onDeleteUser} />
      </div>
    </>
  );
}

export default User;
