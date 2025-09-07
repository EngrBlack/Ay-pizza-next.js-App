"use client";

import Image from "next/image";
import Button from "./Button";
import { useRouter } from "next/navigation";

function HeroSection() {
  const router = useRouter();

  return (
    <section className="relative z-0 mt-[4rem] sm:mt-[5rem] lg:mt-[6rem]">
      <figure className="w-screen h-[calc(100vh-4.5rem)] sm:h-[calc(100vh-5.5rem)] lg:h-[calc(100vh-6.5rem)]  brightness-50">
        <Image
          width={2000}
          height={2000}
          src="/ay-pizza.jpg"
          alt=""
          className="w-full h-full filter-"
        />
      </figure>
      <div className="absolute z-10 top-1/2 -translate-y-1/2 px-4 lg:px-12 lg:py-12 sm:px-6 xl:px-32 py-8 mx-auto w-full text-cream-200 flex flex-col items-center gap-6 text-center ">
        <h1 className="font-black text-[42px] leading-[1.2] uppercase  w-[95%] mx-auto sm:text-6xl md:text-7xl lg:text-8xl text-shadow-lg">
          Welcome to <span className="font-pacifico">AY PIZZA</span>
        </h1>
        <p className="font-rowdies leading-[1.3] sm:text-lg md:text-2xl md:w-[90%] md:mx-auto">
          Here you create beautiful memories with loved ones by Ordering from
          our Restaurant. However,You are one step away from tasting our
          authentic and fantabulous tasty Pizza, with some handy Ice Cream and
          Milkshake to make your day Magical.
        </p>
        <p className="font-rowdies bg-orangered-200 py-1 px-4 rounded-md w-fit text-sm sm:text-base lg:text-lg">
          Please start placing your order right now...
        </p>
        <div className="flex items-center gap-4">
          <Button type="gradient" onClick={() => router.push("/menu")}>
            Explore Menu
          </Button>
          <Button type="primary" onClick={() => router.push("/menu")}>
            Order Now
          </Button>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
