import { formatCurrency } from "../_helper/helper";

function Stat({ data }) {
  const { icon, name, value, textColor, bgColor } = data;

  return (
    <div className="flex items-center gap-2 md:gap-3 border-2 border-cream-100 rounded shadow-md px-2 py-3 md:px-4 md:py-5">
      <span className={`text-[40px] p-2 rounded-full ${textColor} ${bgColor} `}>
        {icon}
      </span>
      <div className="flex flex-col gap-1">
        <p className="font-rowdies uppercase text-sm sm:text-base ">{name}</p>
        <h2 className="font-semibold text-lg md:text-2xl ">
          {formatCurrency(value)}
        </h2>
      </div>
    </div>
  );
}

export default Stat;
