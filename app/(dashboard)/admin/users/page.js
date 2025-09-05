import UserList from "./UserList";
import { requireAdmin } from "@/app/_libs/authActions";
import UpdateUser from "./UpdateUser";
import { getAllUsers } from "@/app/_libs/userAction";

export const metadata = {
  title: "Admin User",
};

async function page() {
  await requireAdmin();

  const users = await getAllUsers();
  console.log(users);

  return (
    <section className="bg-cream-200 ">
      <div className="px-4 sm:px-6 py-4 sm:py-10 xl:px-10 lg:py-10 w-full tracking-wide bg-cream-200">
        <div className="flex items-center justify-between  mb-6 ">
          <h1 className="font-rowdies text-brown-300 text-2xl sm:text-3xl  ">
            Admins and Users
          </h1>
          <UpdateUser />
        </div>
        <div>
          <UserList users={users} />
        </div>
      </div>
    </section>
  );
}

export default page;
