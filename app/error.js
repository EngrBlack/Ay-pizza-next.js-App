"use client";

import { useEffect } from "react";
import Button from "@/app/_components/Button";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col gap-4 items-center justify-center container text-center w-5/6 mx-auto">
      <h2 className="font-bold text-2xl md:text-3xl">Something went wrong!</h2>
      <p className="border bg-brown text-cream-200 p-4 rounded">
        {error.message}
      </p>

      <div className="mt-4">
        <Button type="danger" onClick={() => reset()}>
          Try again
        </Button>
      </div>
    </div>
  );
}
