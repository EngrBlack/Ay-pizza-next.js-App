"use client";
import { useEffect, useRef } from "react";

export function useOutsideClick(handler, capturing = false) {
  const ref = useRef();

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        handler(); // Close the modal
      }
    }

    document.addEventListener("click", handleClick, capturing);
    return () => {
      document.removeEventListener("click", handleClick, capturing);
    };
  }, [handler, capturing]);

  return ref;
}
