import Heading from "@/app/_components/Heading";
import WishItem from "./WishItem";

function Wishlist() {
  return (
    <section className="mx-auto w-full md:w-[90%]">
      <div className="text-center">
        <Heading>WishList</Heading>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4  lg:gap-6 ">
        {Array.from({ length: 6 }, (_, i) => (
          <WishItem key={i} />
        ))}
      </div>
    </section>
  );
}

export default Wishlist;
