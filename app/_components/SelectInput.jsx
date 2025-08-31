import { HiChevronUpDown } from "react-icons/hi2";
import { forwardRef } from "react";

const SelectInput = forwardRef(
  (
    {
      icon = <HiChevronUpDown />,
      children,
      name,
      id,
      disabled,
      className,
      defaultValue = "",
      error,
      ...rest
    },
    ref
  ) => {
    // Ensure we never pass `value` down accidentally
    const { value, ...otherProps } = rest;

    return (
      <div className="relative w-full">
        <div
          className={`relative w-full border-1 rounded transition-all duration-300 
          overflow-hidden text-brown-300
          ${
            error
              ? "border-red-500"
              : "border-brown-100 hover:border-brown-300 focus-within:border-brown-300"
          }
          `}
        >
          <select
            id={id}
            name={name}
            ref={ref}
            defaultValue={defaultValue}
            disabled={disabled}
            className={`appearance-none bg-cream-100 w-full pr-10 pl-3 py-2 h-10 text-brown-300 text-sm 
              focus:outline-none cursor-pointer capitalize ${className}`}
            aria-label="Select option"
            {...otherProps} // no `value` passed here
          >
            {children}
          </select>

          <div className="absolute inset-y-0 right-3 flex items-center text-brown pointer-events-none">
            {icon}
          </div>
        </div>
        {error && (
          <p className="mt-1 text-xs text-red-500 font-medium">{error}</p>
        )}
      </div>
    );
  }
);

SelectInput.displayName = "SelectInput";
export default SelectInput;
