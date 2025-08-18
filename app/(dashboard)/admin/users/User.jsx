import { HiEllipsisVertical } from "react-icons/hi2";

function User() {
  return (
    <>
      <div>...tu674</div>
      <div className=" flex items-center gap-4">
        <figure className="w-10 aspect-auto rounded-full overflow-hidden">
          <img src="/user.jpg" alt=" " className="w-full h-full object-cover" />
        </figure>
        <span>Gabriel Uchenna</span>
      </div>
      <div>gabrieluchenna@mail.com</div>
      <div className="bg-brown-300 text-cream-200 rounded-full py-0.5 px-3">
        Admin
      </div>
      <div>
        <HiEllipsisVertical />
      </div>
    </>
  );
}

export default User;
