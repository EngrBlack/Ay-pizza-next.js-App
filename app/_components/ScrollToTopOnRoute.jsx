"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

function ScrollToTopOnRoute() {
  const pathName = usePathname();

  useEffect(
    function () {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    },
    [pathName]
  );

  return null;
}

export default ScrollToTopOnRoute;
