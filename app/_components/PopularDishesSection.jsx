import DishesCard from "./DishesCard";
import Heading from "./Heading";

const dataList = [
  { name: "Pizzas", image: "/pizza-1.jpg" },
  { name: "Side Dishes", image: "/chicken-chips.jpg" },
  { name: "Burger", image: "/burger.jpg" },
  { name: "Ice Cream ", image: "/icecream-2.jpg" },
  { name: "MilkShakes", image: "/milkshake-1.jpg" },
  { name: "Drinks", image: "/drinks.jpg" },
];

function PopularDishesSection() {
  return (
    <section className="bg-cream-200">
      <div className="px-4 lg:px-12 lg:py-20 sm:px-6 xl:px-32 py-16 mx-auto w-full">
        <div className="text-center">
          <Heading>Our Popular Dishes</Heading>
          <p className="font-rowdies w-[98%] mx-auto leading-[1.2] -mt-5 md:-mt-6 md:text-lg">
            Explore our most loved, metriculous dishes with authentic flavour
            and fresh ingredients
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-2 md:gap-4 pt-12  px-4 place-items-center">
          {dataList.map((data) => (
            <DishesCard data={data} key={data.name} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default PopularDishesSection;
