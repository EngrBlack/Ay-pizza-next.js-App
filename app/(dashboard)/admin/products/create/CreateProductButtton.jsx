"use client";

import AdminButton from "@/app/_components/AdminButton";
import { useRouter } from "next/navigation";

function CreateProductButtton() {
  const router = useRouter();

  return (
    <AdminButton onClick={() => router.push("/admin/products/create")}>
      Add Product
    </AdminButton>
  );
}

export default CreateProductButtton;
