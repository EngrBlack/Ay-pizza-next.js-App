"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import SelectInput from "./SelectInput";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";

function SortBy({ field, options }) {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();

  const activeValue = searchParams?.get(field) ?? options?.at(0)?.value;

  function handleSortBy(value) {
    const params = new URLSearchParams(searchParams.toString());
    params.set(field, value);
    router.push(`${pathName}?${params.toString()}`, { scroll: false });
  }

  return (
    <SelectInput
      value={activeValue}
      onChange={(e) => handleSortBy(e.target.value)}
      icon={<HiOutlineAdjustmentsHorizontal />}
    >
      {options.map((option) => (
        <option
          value={option.value}
          key={option.label}
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

export default SortBy;
