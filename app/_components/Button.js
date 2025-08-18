const variant = {
  primary:
    "border-brown bg-cream-200 text-brown hover:bg-brown hover:text-cream-200 ",
  danger:
    "bg-orangered-100 border-none text-cream-200 hover:bg-orangered-200  py-2 ",
  secondary: "border-cream-200 bg-brown hover:bg-cream-200 hover:text-brown ",
  gradient: "gradient border-none text-cream-200 ",
};

function Button({
  icon,
  children,
  onClick,
  position = "left",
  type = "primary",
  width,
  className,
}) {
  return (
    <button
      onClick={onClick}
      className={`
    flex items-center justify-center  gap-2 w-fit  px-2.5 py-1.5 sm:py-2  lg:px-3.5  text-[0.8rem] font-medium outline-0 rounded-sm cursor-pointer border shadow-xl trans
    hover:-translate-y-0.5 active:translate-y-0 active:shadow-lg md:text-[15px]  ${className} ${
        variant[type]
      } ${width === "full" ? "w-full font-semibold " : ""}
  `}
    >
      {position === "left" ? (
        <>
          {icon}
          <span className="whitespace-nowrap">{children}</span>
        </>
      ) : (
        <>
          <span className="whitespace-nowrap">{children}</span>
          {icon}
        </>
      )}
    </button>
  );
}

export default Button;
