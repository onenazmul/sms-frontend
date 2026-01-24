import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, GraduationCap, ShieldCheck, Users } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-4 text-center bg-slate-50">
          <div className="container mx-auto max-w-4xl">
            <h1 className="text-5xl font-extrabold tracking-tight lg:text-6xl mb-6">
              Empowering the Next Generation of <span className="text-primary">Leaders</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Welcome to our advanced School Management System. Seamlessly manage admissions, 
              payments, and academic results in one secure platform.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/apply">
                <Button size="lg" className="gap-2">
                  Apply for Admission <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline">Learn More</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Quick Features */}
        <section className="py-16 container mx-auto px-4 grid md:grid-cols-3 gap-8">
          <div className="p-6 border rounded-xl space-y-3 shadow-sm">
            <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
              <GraduationCap />
            </div>
            <h3 className="font-bold text-lg">Easy Admission</h3>
            <p className="text-sm text-muted-foreground">Apply online and get your student credentials instantly upon payment.</p>
          </div>
          <div className="p-6 border rounded-xl space-y-3 shadow-sm">
            <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
              <ShieldCheck />
            </div>
            <h3 className="font-bold text-lg">Secure Payments</h3>
            <p className="text-sm text-muted-foreground">Pay fees securely via SSLCommerz or Stripe and download instant receipts.</p>
          </div>
          <div className="p-6 border rounded-xl space-y-3 shadow-sm">
            <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">
              <Users />
            </div>
            <h3 className="font-bold text-lg">Student Portal</h3>
            <p className="text-sm text-muted-foreground">Access your results, attendance, and exam schedules from anywhere.</p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}