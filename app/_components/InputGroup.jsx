"use client";

import { useState } from "react";
import { HiEye, HiEyeSlash } from "react-icons/hi2";

function InputGroup({ error, children, label, icon }) {
  const [showPassword, setShowPassword] = useState(false);

  function handleToggle() {
    setShowPassword((prev) => !prev);
  }

  // Clone the input element passed in as children and override its type if it's password
  const clonedChild =
    children?.props.type === "password"
      ? {
          ...children,
          props: {
            ...children.props,
            type: showPassword ? "text" : "password",
          },
        }
      : children;

  return (
    <div className="flex flex-col gap-0.5 w-full">
      {label && (
        <label
          htmlFor={children.props.id}
          className="flex items-center text-brown-300 gap-1 font-rowdies font-light text-sm lg:text-base"
        >
          {icon}
          <span>{label}</span>
        </label>
      )}
      <div className="w-full relative">
        {clonedChild}
        {children.props.type === "password" && (
          <span onClick={handleToggle} className="cursor-pointer">
            {showPassword ? (
              <HiEyeSlash className="absolute top-1/2 -translate-y-1/2 right-3 text-xl text-brown-100" />
            ) : (
              <HiEye className="absolute top-1/2 -translate-y-1/2 right-3 text-xl text-brown-200" />
            )}
          </span>
        )}
      </div>
      {error && <small className="text-orangered-100">{error}</small>}
    </div>
  );
}

export default InputGroup;
