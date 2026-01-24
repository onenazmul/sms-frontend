import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { MobileHeader } from "@/components/layout/MobileHeader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:flex-col md:fixed md:inset-y-0 z-50">
        <DashboardSidebar />
      </div>

      {/* Main Content Area */}
      <div className="md:pl-64 flex flex-col w-full">
        <MobileHeader />
        <main className="flex-1 overflow-y-auto p-8 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}