import LoginForm from "./LoginForm";

export const metadata = {
  title: "Login",
};

async function page() {
  return (
    <section className="bg-cream-200">
      <div className="px-4 lg:px-12 lg:py-12 sm:px-6 xl:px-32 py-8 mx-auto w-full">
        <LoginForm />
      </div>
    </section>
  );
}

export default page;
