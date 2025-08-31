import { HiArrowLeft } from "react-icons/hi2";
import Button from "../_components/Button";
import Link from "next/link";

export const metadata = {
  title: "Unauthorized Access",
};

function UnauthorizedPage() {
  return (
    <div className="bg-cream-200 text-brown min-h-screen ">
      <div className="flex flex-col min-h-screen items-center justify-center gap-3 lg:gap-4 text-center w-[90%] mx-auto">
        <h1 className="font-extrabold text-8xl lg:text-9xl text-brown-200">
          403
        </h1>
        <h2 className="text-2xl sm:text-3xl font-rowdies md:text-4xl lg:text-5xl">
          Unauthorized Access
        </h2>
        <p className="sm:text-lg text-brown-300">
          You do not have permission to access this page.
        </p>
        <Button type="danger" icon={<HiArrowLeft />}>
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    </div>
  );
}

export default UnauthorizedPage;
