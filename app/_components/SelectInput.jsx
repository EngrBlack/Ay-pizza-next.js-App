import { HiChevronUpDown } from "react-icons/hi2";

function SelectInput({
  icon = <HiChevronUpDown />,
  children,
  value,
  onChange,
  name,
  id,
  disabled,
  className,
}) {
  return (
    <div className="relative  w-full  border-1 border-brown-100 bg-white rounded transition-all duration-300 hover:border-brown-300 focus-within:border-brown-300 overflow-hidden text-brown-300 ">
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`appearance-none bg-cream-100 w-full pr-10 pl-3 py-2 h-10 text-brown-300 text-sm focus:outline-none cursor-pointer capitalize ${className}`}
        aria-label="Select option"
      >
        {children}
      </select>

      <div className="absolute inset-y-0 right-3 flex items-center text-brown pointer-events-none">
        {icon}
      </div>
    </div>
  );
}

export default SelectInput;
