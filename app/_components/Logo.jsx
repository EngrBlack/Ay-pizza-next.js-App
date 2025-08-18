import Image from "next/image";
import Link from "next/link";

function Logo({ size = "large", color = "text-bg-brown" }) {
  return (
    <Link href="/" className="flex gap-2 items-center">
      <Image
        src="/pizza.png"
        alt="pizza-logo"
        width={48}
        height={48}
        className={`aspect-square  ${
          size === "large" ? "w-8 sm:w-10 md:w-12" : "w-8 md:w-10 "
        }`}
      />
      <span
        className={`font-pacifico  font-bold uppercase ${color} ${
          size === "large"
            ? "text-base sm:text-xl md:text-2xl"
            : " text-lg md:text-xl "
        } `}
      >
        AY PIZZA
      </span>
    </Link>
  );
}

export default Logo;
