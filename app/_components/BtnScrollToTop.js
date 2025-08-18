"use client";

import { useEffect, useState } from "react";
import { HiArrowUp } from "react-icons/hi2";

function handleScroll() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
}

function BtnScrollToTop() {
  const [showBtn, setShowBtn] = useState(false);

  useEffect(function () {
    const backTop = function () {
      if (window.scrollY >= "100") setShowBtn(true);
      else setShowBtn(false);
    };
    window.addEventListener("scroll", backTop);

    return () => window.removeEventListener("scroll", backTop);
  }, []);

  return (
    <>
      {showBtn && (
        <button
          onClick={handleScroll}
          className="fixed bottom-16 right-6 md:bottom-18 md:right-10 p-2 md:p-4 text-xl border-4 bg-amber-700/80 border-amber-950/80 hover:border-brown rounded-full text-cream-100 hover:bg-orangered-100 trans"
        >
          <HiArrowUp />
        </button>
      )}
    </>
  );
}

export default BtnScrollToTop;
