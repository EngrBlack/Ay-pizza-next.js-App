import { requireAdmin } from "@/app/_libs/authActions";
import { getAllUsers } from "@/app/_libs/userAction";
import UserAdminHeading from "./UserAdminHeading";
import UserList from "./UserList";

export const metadata = {
  title: "Admin User",
};

async function page({ searchParams }) {
  await requireAdmin();
  // const users = await getAllUsers();

  // SORT-BY
  const sorted = searchParams?.sortedBy || "role-asc";
  const [field, direction] = sorted?.split("-");
  const sortBy = { field, direction };

  //PAGINATION
  const currentPage = Number(searchParams?.page) || 1;
  const { data: users, count } = await getAllUsers(sortBy, currentPage);

  return (
    <section className="bg-cream-200 ">
      <div className="px-4 sm:px-6 py-4 sm:py-10 xl:px-10 lg:py-10 w-full tracking-wide bg-cream-200">
        <UserAdminHeading />
        <UserList users={users} count={count} />
      </div>
    </section>
  );
}

export default page;
