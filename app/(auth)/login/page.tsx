"use client";

import { signIn, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Link from 'next/link';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect Logic: Shared by both initial page load and successful login
  const handleRedirect = (role?: string) => {
    if (role === "admin") {
      router.replace("/admin");
    } else if (role === "teacher") {
      router.replace("/teacher");
    } else {
      router.replace("/student");
    }
  };

  useEffect(() => {
    // If already logged in, redirect based on role
    if (status === "authenticated" && session?.user?.role) {
      handleRedirect(session.user.role);
    }
  }, [status, session, router]);

  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="animate-spin h-8 w-8 text-primary" />
      </div>
    );
  }

  // Prevent flickering the form if already authenticated
  if (status === "authenticated") return null;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false, // We handle redirection manually
    });

    if (result?.error) {
      toast.error("Invalid Login! Please check your email and password.");
      setLoading(false);
    } else {
      toast.success("Login Successful!");
      // The useEffect above will trigger once the session updates, 
      // but we can also trigger a refresh or manual redirect here.
      router.refresh(); 
    }
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-center font-bold">School Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Email Address</label>
              <Input name="email" type="email" placeholder="email@website.com" required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
              <Input name="password" type="password" required />
            </div>
            <Button type="submit" className="w-full h-11" disabled={loading}>
              {loading ? <Loader2 className="animate-spin h-5 w-5" /> : "Sign In"}
            </Button>
          </form>
          <div className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account? <Link href="/apply" className="text-primary hover:underline">Apply for Admission</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}