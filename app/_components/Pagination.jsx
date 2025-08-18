"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { HiArrowSmallLeft, HiArrowSmallRight } from "react-icons/hi2";

function Pagination({ field, count }) {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();

  const pageSize = Number(process.env.NEXT_PUBLIC_PAGE_SIZE);
  const pageCount = Math.ceil(count / pageSize);
  const currentPage = parseInt(searchParams.get(field) || "1", 10);

  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, count);

  function updatePage(newPage) {
    const params = new URLSearchParams(searchParams.toString());
    params.set(field, newPage);
    router.push(`${pathName}?${params.toString()}`, { scroll: false });
  }

  function handlePrevPage() {
    if (currentPage > 1) updatePage(currentPage - 1);
  }

  function handleNextPage() {
    if (currentPage < pageCount) updatePage(currentPage + 1);
  }

  return (
    <div className="flex items-center justify-between gap-4 md:gap-6 mt-6">
      <p className="text-brown-300 text-xs sm:text-base">
        Showing {start} to {end} out of {count}
      </p>
      <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
        <button
          className="pagination-button trans ease-in-out px-2.5 py-1.5 sm:py-2  lg:px-3.5"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          <HiArrowSmallLeft />
          <span> Previous</span>
        </button>
        <button
          className="pagination-button trans ease-in-out px-4 py-1.5 sm:py-2  lg:px-6"
          onClick={handleNextPage}
          disabled={currentPage === pageCount}
        >
          <span> Next</span>
          <HiArrowSmallRight />
        </button>
      </div>
    </div>
  );
}

export default Pagination;
