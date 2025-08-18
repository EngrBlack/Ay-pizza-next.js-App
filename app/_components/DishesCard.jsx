function DishesCard({ data }) {
  const { name, image } = data;

  return (
    <div className=" group hover:shadow-2xl  w-68 aspect-square rounded-full relative trans">
      <div className="flex flex-col items-center gap-0.5 text-center absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
        <figure className="rounded-full overflow-hidden w-40 aspect-square mx-auto border-4 border-orangered-100 ">
          <img
            src={image}
            alt=""
            className="object-cover w-full h-full group-hover:scale-110 group-hover:brightness-75 trans"
          />
        </figure>
        <p className="font-rowdies text-lg mt-2">{name}</p>
        <button className="text-sm text-orangered-100 group-hover:text-cream-200 group-hover:bg-orangered-100 hover:bg-orangered-200 py-1 px-2 rounded trans">
          Order Now
        </button>
      </div>
    </div>
  );
}

export default DishesCard;
