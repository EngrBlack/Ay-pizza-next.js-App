import { getCurrentUser } from "@/app/_libs/authActions";
import UserProfileDetails from "./UserProfileDetails";
import { auth } from "@/app/_libs/auth";

export const metadata = { title: "Profile" };

async function page() {
  const session = await auth();
  const user = session?.user;
  console.log(user);

  return (
    <section className="bg-cream-200">
      <div className="px-4  lg:px-12 lg:py-12 sm:px-6 xl:px-32 py-8 mx-auto w-full">
        <UserProfileDetails user={user} />
      </div>
    </section>
  );
}

export default page;
