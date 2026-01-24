"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { DashboardSidebar } from "./DashboardSidebar";

export function MobileHeader() {
  return (
    <div className="md:hidden flex items-center p-4 border-b bg-white">
      <Sheet>
        <SheetTrigger>
          <Menu className="h-6 w-6" />
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64">
          <DashboardSidebar />
        </SheetContent>
      </Sheet>
      <span className="ml-4 font-bold">School Management</span>
    </div>
  );
}