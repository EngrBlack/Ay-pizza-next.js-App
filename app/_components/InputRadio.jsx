function InputRadio({
  label,
  icon,
  id,
  name,
  onChange,
  checked,
  value,
  className,
}) {
  return (
    <div className={`flex items-center cursor-pointer ${className}`}>
      <input
        type="radio"
        className="mr-2 accent-orangered-200 w-4 h-4 cursor-pointer"
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        checked={checked}
        required
      />

      <label
        htmlFor={id}
        className="flex items-center gap-2 tracking-wide text-sm lg:text-base cursor-pointer"
      >
        {icon}
        <span> {label}</span>
      </label>
    </div>
  );
}

export default InputRadio;
