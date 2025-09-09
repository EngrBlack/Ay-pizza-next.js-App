"use client";

import Heading from "@/app/_components/Heading";
import InputGroup from "@/app/_components/InputGroup";
import Logo from "@/app/_components/Logo";
import SpinnerMini from "@/app/_components/SpinnerMini";
import { emailValid, passwordValid } from "@/app/_helper/helper";
import { signUp } from "@/app/_libs/authActions";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaPaperPlane } from "react-icons/fa6";
import { HiEnvelope, HiLockClosed, HiUser } from "react-icons/hi2";
import { motion } from "framer-motion";

function SignupForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit(data) {
    const { firstName, lastName, email, password } = data;
    const fullName = [firstName, lastName].join(" ");

    // Convert plain object to FormData for server action
    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("password", password);

    try {
      const res = await signUp(formData);

      if (res?.status === "success") {
        toast.success(
          "Account created successfully! Check your email to Confirm SignUp"
        );
        reset();
        router.push("/login");
      } else {
        toast.error(res?.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      toast.error(error.message || "An unexpected error occurred.");
    }
  }

  return (
    <div className="mb-8">
      <Heading>Create Account</Heading>
      <div className="flex flex-col gap-y-8 w-[95%] mx-auto md:flex-row md:gap-8 lg:w-[80%]">
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
            <h2 className="font-bold text-xl lg:text-2xl">Create Account</h2>
            <p className="text-brown-200 text-sm lg:text-base">
              Please register below with your account details
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            <InputGroup
              label="First Name"
              icon={<HiUser />}
              error={errors?.firstName?.message}
            >
              <input
                className="input"
                type="text"
                id="firstName"
                placeholder="First Name"
                {...register("firstName", {
                  required: "First name is required",
                })}
              />
            </InputGroup>

            <InputGroup
              label="Last Name"
              icon={<HiUser />}
              error={errors?.lastName?.message}
            >
              <input
                className="input"
                type="text"
                id="lastName"
                placeholder="Last Name"
                {...register("lastName", { required: "Last name is required" })}
              />
            </InputGroup>

            <InputGroup
              label="Email"
              icon={<HiEnvelope />}
              error={errors?.email?.message}
            >
              <input
                className="input"
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

            <InputGroup
              label="Confirm Password"
              icon={<HiLockClosed />}
              error={errors?.confirmPassword?.message}
            >
              <input
                className="input"
                type="password"
                id="confirmPassword"
                placeholder="Confirm Password"
                {...register("confirmPassword", {
                  required: "Confirm password is required",
                  validate: (value) =>
                    value === getValues("password") || "Passwords do not match",
                })}
              />
            </InputGroup>

            <button
              className="button w-full mt-6"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <SpinnerMini className="border-cream-200" />
                  <span>Creating..</span>
                </>
              ) : (
                <>
                  <span>Create</span>
                  <FaPaperPlane />
                </>
              )}
            </button>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="basis-[48%] md:basis-[45%] md:pt-[15%] flex flex-col gap-2 w-5/6 md:w-full mx-auto"
        >
          <h2 className="font-rowdies text-xl self-center mb-4">
            Already have an account?
          </h2>
          <button
            className="button mb-4 px-10"
            type="button"
            onClick={() => router.push("/login")}
          >
            Log In
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

export default SignupForm;
