import { maskId } from "@/app/_helper/helper";
import { HiEllipsisVertical } from "react-icons/hi2";
import UserGroupedButton from "./UserGroupedButton";

function User({ user }) {
  return (
    <>
      <div>{maskId(user?.id, 8)}</div>
      <div className=" flex items-center gap-4">
        <figure className="w-10 aspect-square rounded-full overflow-hidden">
          <img
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
        <UserGroupedButton user={user} />
      </div>
    </>
  );
}

export default User;
