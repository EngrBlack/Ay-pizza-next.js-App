"use client";

import Heading from "@/app/_components/Heading";
import InputGroup from "@/app/_components/InputGroup";
import Logo from "@/app/_components/Logo";
import SpinnerMini from "@/app/_components/SpinnerMini";
import { emailValid } from "@/app/_helper/helper";
import { forgotPassword } from "@/app/_libs/authActions";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { HiEnvelope } from "react-icons/hi2";
import toast from "react-hot-toast"; // ✅ import toast here

function ForgotPasswordForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  async function onSubmit(data) {
    const { email } = data;

    const formData = new FormData();
    formData.append("email", email);

    try {
      const res = await forgotPassword(formData);

      if (res?.status === "success") {
        toast.success("Password reset link sent to your Email");
        reset(); // ✅ reset after successful submission
      } else {
        toast.error(res?.status || "Invalid email, Please try again.");
      }
    } catch (error) {
      toast.error(error.message || "An unexpected error occurred.");
    }
  }

  return (
    <div className="mb-8">
      <Heading>Forgot Password</Heading>
      <div className="flex flex-col gap-y-8  w-[95%] mx-auto md:flex-row md:gap-8 md:items-center lg:w-[80%]">
        <div className="grow-1 border rounded-sm border-brown-100 px-5 md:px-6 lg:px-8 py-8 sm:py-10 focus-within:border-brown-200 focus-within:shadow-xl trans">
          <div className="w-fit mx-auto mb-4">
            <Logo />
          </div>
          <div className="flex flex-col gap-0.5 mb-4">
            <h2 className="font-bold text-xl lg:text-2xl">
              Forgotten Password
            </h2>
            <p className="text-brown-200 text-sm lg:text-base">
              Please enter your email to retrieve your password.
            </p>
          </div>

          <form
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

            <button className="button w-full mt-6" type="submit">
              {isSubmitting ? (
                <>
                  <SpinnerMini className="border-cream-200" />
                  <span>Sending...</span>
                </>
              ) : (
                <span>Forgot Password</span>
              )}
            </button>
          </form>
        </div>

        <div className="basis-[48%] md:basis-[45%] flex flex-col gap-2 w-5/6 md:w-full  mx-auto ">
          <h2 className="font-rowdies text-xl self-center mb-4">
            Don&apos;t have an account?
          </h2>
          <button
            className="button mb-4"
            type="button"
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
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordForm;
