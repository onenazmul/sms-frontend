"use client";

import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function StudentDashboard() {
  const { data: session } = useSession();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Welcome back, {session?.user?.name}!</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader><CardTitle>Status</CardTitle></CardHeader>
          <CardContent><p className="text-green-600 font-bold">Approved Student</p></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Pending Fees</CardTitle></CardHeader>
          <CardContent><p className="text-red-600 font-bold">500 BDT</p></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Current Class</CardTitle></CardHeader>
          <CardContent><p>Class 10</p></CardContent>
        </Card>
      </div>
    </div>
  );
}