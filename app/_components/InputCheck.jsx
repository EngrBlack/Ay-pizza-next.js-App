function InputCheck({
  label,
  icon,
  id,
  name,
  onChange,
  checked,
  className,
  required = false,
}) {
  return (
    <div className={`flex items-center gap-2 w-fit ${className}`}>
      <input
        type="checkbox"
        className="mr-2 accent-orangered-100 w-4 h-4 cursor-pointer"
        id={id}
        name={name}
        onChange={onChange}
        checked={checked}
        required={required}
      />

      <label
        htmlFor={id}
        className="flex items-center gap-2 text-brown-300 font-rowdies tracking-wide text-sm lg:text-base whitespace-nowrap"
      >
        {icon}
        <span> {label}</span>
      </label>
    </div>
  );
}

export default InputCheck;
