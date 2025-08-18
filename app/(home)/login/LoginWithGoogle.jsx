import { loginWithGoogle } from "@/app/_libs/authActions";

function LoginWithGoogle() {
  return (
    <form action={loginWithGoogle}>
      <button className="font-bold flex items-center justify-center gap-4 text:base sm:text-lg border border-brown-200   py-2.5  w-full rounded mt-4 bg-cream-100 hover:shadow-md active:shadow-sm  hover:-translate-y-0.5 active:-translate-y-0 trans ">
        <img
          src="https://authjs.dev/img/providers/google.svg"
          alt="Google logo"
          height="24"
          width="24"
        />
        <span>Continue with Google</span>
      </button>
    </form>
  );
}

export default LoginWithGoogle;
