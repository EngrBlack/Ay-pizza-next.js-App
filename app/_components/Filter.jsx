"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import SelectInput from "./SelectInput";
import { HiFunnel } from "react-icons/hi2";

function Filter({ field, options = [], onChange }) {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();

  const activeValue = searchParams.get(field) || options?.at(0)?.value;

  function handleFilter(value) {
    if (value === activeValue) return;

    if (onChange) {
      // ✅ use callback mode if provided
      onChange(value);
    } else {
      // ✅ fallback to router mode
      const params = new URLSearchParams(searchParams.toString());
      params.set(field, value);
      router.push(`${pathName}?${params.toString()}`, { scroll: false });
    }
  }

  return (
    <SelectInput
      icon={<HiFunnel />}
      value={activeValue}
      onChange={(e) => handleFilter(e.target.value)}
    >
      {options.map((option) => (
        <option
          key={option.label}
          value={option.value}
          className={
            option.value === activeValue
              ? "bg-brown-300 text-cream-200"
              : "text-brown-300"
          }
        >
          {option.label}
        </option>
      ))}
    </SelectInput>
  );
}

export default Filter;
