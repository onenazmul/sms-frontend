"use client";

import { useState } from "react";
import { 
  LayoutDashboard, Users, UserPlus, BookOpen, 
  Settings, LogOut, Search, Moon, Sun, Menu, Bell
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/admin" },
  { icon: UserPlus, label: "Admissions", href: "/admin/admissions" },
  { icon: Users, label: "Students", href: "/admin/students" },
  { icon: BookOpen, label: "Academic Setup", href: "/admin/academic" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* --- DESKTOP SIDEBAR --- */}
      <aside className={cn(
        "hidden md:flex flex-col border-r bg-white dark:bg-slate-900 transition-all duration-300 sticky top-0 h-screen",
        isSidebarOpen ? "w-64" : "w-20"
      )}>
        <SidebarContent isOpen={isSidebarOpen} />
      </aside>

      {/* --- MAIN PANEL --- */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* TOPBAR */}
        <header className="h-16 border-b bg-white dark:bg-slate-900 flex items-center justify-between px-4 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            {/* Desktop Toggle */}
            <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!isSidebarOpen)} className="hidden md:flex">
              <Menu className="h-5 w-5" />
            </Button>
            
            {/* Mobile Toggle */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-72">
                <SidebarContent isOpen={true} />
              </SheetContent>
            </Sheet>

            <h2 className="font-semibold text-lg hidden sm:block">Dashboard Overview</h2>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 flex-1 justify-end">
            <div className="relative max-w-sm w-full hidden lg:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search records..." className="pl-9 h-9" />
            </div>
            <Button variant="ghost" size="icon"><Bell className="h-5 w-5" /></Button>
            <Button variant="ghost" size="icon"><Moon className="h-5 w-5" /></Button>
          </div>
        </header>

        {/* CONTENT AREA */}
        <main className="p-4 md:p-8 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}

function SidebarContent({ isOpen }: { isOpen: boolean }) {
  return (
    <div className="flex flex-col h-full">
      {/* Top Part */}
      <div className="h-16 flex items-center px-6 gap-3 border-b">
        <div className="w-8 h-8 bg-primary rounded flex items-center justify-center text-white font-bold">G</div>
        {isOpen && <span className="font-bold text-lg tracking-tight">Gemini SMS</span>}
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <Button key={item.label} variant="ghost" className={cn(
            "w-full justify-start gap-3 h-11",
            !isOpen && "justify-center px-0"
          )}>
            <item.icon className="h-5 w-5 text-slate-500" />
            {isOpen && <span>{item.label}</span>}
          </Button>
        ))}
      </nav>

      {/* Bottom Part (Profile) */}
      <div className="p-4 border-t space-y-2">
        <div className={cn("flex items-center gap-3 p-2", !isOpen && "justify-center")}>
          <Avatar className="h-9 w-9 border">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
          {isOpen && (
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-semibold truncate">Admin User</p>
              <p className="text-xs text-muted-foreground truncate">admin@gemini.com</p>
            </div>
          )}
        </div>
        <Button variant="ghost" className={cn("w-full justify-start gap-3 text-red-500 hover:text-red-600 hover:bg-red-50", !isOpen && "justify-center")}>
          <LogOut className="h-5 w-5" />
          {isOpen && <span>Logout</span>}
        </Button>
      </div>
    </div>
  );
}