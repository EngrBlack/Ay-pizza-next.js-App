import { getUserProfile } from "@/app/_libs/checkoutActions";
import UserProfileDetails from "./UserProfileDetails";

export const metadata = { title: "My Profile" };

async function page() {
  const useProfile = await getUserProfile();
  console.log(useProfile);

  return (
    <section className="bg-cream-200">
      <div className="px-4  lg:px-12 lg:py-12 sm:px-6 xl:px-32 py-8 mx-auto w-full">
        <UserProfileDetails user={useProfile} />
      </div>
    </section>
  );
}

export default page;
