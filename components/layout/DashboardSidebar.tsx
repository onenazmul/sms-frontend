"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  User, 
  CreditCard, 
  FileText, 
  Home, 
  GraduationCap,
  LogOut 
} from "lucide-react";
import { signOut } from "next-auth/react";

const studentRoutes = [
  { label: "Overview", icon: Home, href: "/student" }, // Updated
  { label: "My Profile", icon: User, href: "/student/profile" }, // Updated
  { label: "Fees & Payments", icon: CreditCard, href: "/student/fees" },
  { label: "Exam Results", icon: FileText, href: "/student/results" },
];
export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full bg-slate-900 text-white w-64 px-3 py-4">
      <div className="mb-10 px-3 py-2">
        <h2 className="text-xl font-bold tracking-tight">Student Portal</h2>
      </div>
      <div className="space-y-1 flex-1">
        {studentRoutes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:bg-white/10 rounded-lg transition",
              pathname === route.href ? "bg-white/10 text-white" : "text-zinc-400"
            )}
          >
            <route.icon className="h-5 w-5 mr-3 text-primary" />
            {route.label}
          </Link>
        ))}
      </div>
      <button 
        onClick={() => signOut({ callbackUrl: "/" })}
        className="flex items-center p-3 text-zinc-400 hover:text-red-400 transition"
      >
        <LogOut className="h-5 w-5 mr-3" />
        Logout
      </button>
    </div>
  );
}