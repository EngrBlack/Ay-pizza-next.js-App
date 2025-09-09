"use client";

import { motion } from "framer-motion";
import Heading from "@/app/_components/Heading";
import InputGroup from "@/app/_components/InputGroup";
import Logo from "@/app/_components/Logo";
import { emailValid, passwordValid } from "@/app/_helper/helper";

import InputCheck from "@/app/_components/InputCheck";
import SpinnerMini from "@/app/_components/SpinnerMini";
import { signInWithCredentials } from "@/app/_libs/authActions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaPaperPlane } from "react-icons/fa6";
import { HiEnvelope, HiLockClosed } from "react-icons/hi2";
import LoginWithGoogle from "./LoginWithGoogle";

function LoginForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  async function onSubmit(data) {
    const { email, password } = data;

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    try {
      const res = await signInWithCredentials(formData);

      if (res?.status === "success") {
        toast.success("Login successfully!");
        reset();
        router.push("/menu");
      } else {
        toast.error("Invalid email or password, Please try again.");
      }
    } catch (error) {
      toast.error(error.message || "An unexpected error occurred.");
    }
  }

  return (
    <div className="mb-8">
      <Heading>Log In</Heading>
      <div className="flex flex-col gap-y-8  w-[95%] mx-auto md:flex-row md:gap-8 md:items-center lg:w-[80%]">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="grow-1 border rounded-sm border-brown-100 px-5 md:px-6 lg:px-8 py-8 sm:py-10 focus-within:border-brown-200 focus-within:shadow-xl trans"
        >
          <div className="w-fit mx-auto mb-4">
            <Logo />
          </div>
          <div className="flex flex-col gap-0.5 mb-4">
            <h2 className="font-bold text-xl lg:text-2xl">Login account</h2>
            <p className="text-brown-200 text-sm lg:text-base">
              Please login below your account details.
            </p>
          </div>

          <form
            action=""
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            <InputGroup
              label="Email"
              icon={<HiEnvelope />}
              error={errors?.email?.message}
            >
              <input
                className="input "
                name="email"
                type="email"
                id="email"
                placeholder="Enter Your Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: emailValid,
                    message: "Please enter a valid email address",
                  },
                })}
              />
            </InputGroup>
            <InputGroup
              label="Password"
              icon={<HiLockClosed />}
              error={errors?.password?.message}
            >
              <input
                className="input"
                name="password"
                type="password"
                id="password"
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value: passwordValid,
                    message:
                      "Password must be at least 8 characters, include upper & lower case letters, a number, and a special character",
                  },
                })}
              />
            </InputGroup>
            <div className="flex justify-between items-center mt-2">
              <InputCheck
                label="Stay logged in"
                className="*:last:-ml-2 *:last:text-brown-200"
              />
              <Link
                href="/forgot-password"
                className="text-orangered-100 text-sm font-bold hover:text-brown-300 hover:underline trans ease-in-out"
              >
                Forgot Password?
              </Link>
            </div>

            <button className=" button w-full mt-2">
              {isSubmitting ? (
                <>
                  <SpinnerMini className="border-cream-200" />
                  <span>Loging...</span>
                </>
              ) : (
                <>
                  <span>Log In</span>
                  <FaPaperPlane />
                </>
              )}
            </button>
          </form>

          <p className="text-center font-bold mt-4"> OR</p>
          <LoginWithGoogle />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="basis-[48%] md:basis-[45%] flex flex-col gap-2 w-5/6 md:w-full  mx-auto "
        >
          <h2 className="font-rowdies text-xl self-center mb-4">
            Don&apos;t have an account?
          </h2>
          <button
            className="button mb-4 
"
            type="submit"
            onClick={() => router.push("/signup")}
          >
            Create account
          </button>
          <h3 className="text-orangered-200 font-sans font-bold text-base lg:text-lg">
            Terms & Conditions
          </h3>
          <p className="text-sm lg:text-base leading-[1.6]">
            Your privacy and security are important to us. For more information
            on how we use your data, read our{" "}
            <span className="text-orangered-200 hover:text-brown hover:underline trans cursor-pointer">
              privacy policy.
            </span>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default LoginForm;
