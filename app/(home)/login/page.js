import { redirect } from "next/navigation";
import LoginForm from "./LoginForm";
import { auth } from "@/app/_libs/auth";

export const metadata = {
  title: "Login",
};

async function page() {
  const session = await auth();

  if (session) {
    return redirect("/");
  }

  return (
    <section className="bg-cream-200">
      <div className="px-4 lg:px-12 lg:py-12 sm:px-6 xl:px-32 py-8 mx-auto w-full">
        <LoginForm />
      </div>
    </section>
  );
}

export default page;
