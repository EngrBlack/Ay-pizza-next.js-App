"use client";

import { useState } from "react";
import DashboardSidebarNavigation from "./DashboardSidebarNavigation";
import DashboardHeader from "@/app/(dashboard)/DashboardHeader";

function AdminHeader({ user }) {
  const [isOpen, setIsOpen] = useState(false);
  const onOpen = () => setIsOpen((open) => !open);
  return (
    <>
      <DashboardHeader onOpen={onOpen} user={user} />
      <DashboardSidebarNavigation isOpen={isOpen} onOpen={onOpen} />
    </>
  );
}

export default AdminHeader;
