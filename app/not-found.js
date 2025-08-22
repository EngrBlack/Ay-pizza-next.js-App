import Link from "next/link";
import { HiArrowLeft } from "react-icons/hi2";
import "./globals.css";

export default function NotFound() {
  return (
    <div className="flex flex-col gap-3 text-center  mx-auto sm:w-5/6 px-6 py-16 xl:px-32 lg:px-12 ">
      <h1 className="text-brown-200 text-9xl font-bold">404</h1>
      <h3 className="text-brown font-semibold text-2xl">
        The page you requested was not found.
      </h3>
      <p className="w-5/6 self-center">
        Sorry, The page you were looking for could not be found, this page may
        have been removed, name changed or temporarily not available.
      </p>

      <Link
        href="/"
        className="
        my-4
              bg-orangered-100 border-none text-cream-200 hover:bg-orangered-200 font-semibold  text-sm max-w-fit self-center
        flex items-center gap-2 border px-2.5 py-1.5 rounded-sm 
        lg:px-3.5 lg:py-2 trans"
      >
        <HiArrowLeft />
        Go to Home Page
      </Link>
    </div>
  );
}
