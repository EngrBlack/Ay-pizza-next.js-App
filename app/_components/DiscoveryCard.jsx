import Image from "next/image";
import Button from "./Button";

function DiscoveryCard({ data, onClick }) {
  const { image, title, description, position } = data;
  return (
    <div
      className={`flex flex-col items-center gap-8 lg:gap-20 md:flex-row ${position}`}
    >
      <figure className="mx-auto w-[90%]  max-w-screen-sm aspect-[3/2] overflow-hidden rounded-md relative">
        <Image
          fill
          quality={80}
          src={image || ""}
          alt=""
          className="w-full h-full object-cover"
        />
      </figure>

      <div className="flex flex-col gap-4 lg:gap-6 items-center md:items-stretch text-center md:text-left  w-[95%] lg:w-[85%] mx-auto tracking-wide">
        <h2 className="font-pacifico text-2xl lg:text-4xl ">{title}</h2>
        <p className="w-full md:text-sm lg:text-base xl:text-lg  md:text-justify">
          {description}
        </p>
        <Button type="secondary" onClick={onClick}>
          Read More
        </Button>
      </div>
    </div>
  );
}

export default DiscoveryCard;
