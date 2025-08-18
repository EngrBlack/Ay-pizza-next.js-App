"use client";

import { useState } from "react";
import DashboardSidebarNavigation from "./DashboardSidebarNavigation";
import DashboardHeader from "@/app/(dashboard)/DashboardHeader";

function AdminHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const onOpen = () => setIsOpen((open) => !open);
  return (
    <>
      <DashboardHeader onOpen={onOpen} />
      <DashboardSidebarNavigation isOpen={isOpen} onOpen={onOpen} />
    </>
  );
}

export default AdminHeader;
