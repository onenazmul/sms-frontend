"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Copy, CheckCircle2, CreditCard, Lock } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function AdmissionSuccess() {
  const router = useRouter();
  const [account, setAccount] = useState<{user: string, pass: string} | null>(null);

  useEffect(() => {
    const data = localStorage.getItem("new_account");
    if (data) setAccount(JSON.parse(data));
    else router.push("/apply"); // Redirect back if no data found
  }, [router]);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard`);
  };

  const handlePayment = async () => {
    toast.loading("Redirecting to payment gateway...");
    // Logic to call Laravel Payment API and redirect to Stripe/SSLCommerz
    // window.location.href = result.payment_url;
  };

  if (!account) return null;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50">
          <Navbar />
          <main className="flex-1">
            <div className="container mx-auto max-w-2xl py-12">
              <div className="text-center mb-8">
                <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h1 className="text-3xl font-bold">Application Received!</h1>
                <p className="text-muted-foreground">Your account has been created successfully.</p>
              </div>

              <div className="grid gap-6">
                {/* Credentials Card */}
                <Card className="border-2 border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lock className="w-5 h-5" /> Login Credentials
                    </CardTitle>
                    <CardDescription>Save these details to check your admission status later.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg border">
                      <div>
                        <p className="text-xs font-semibold uppercase text-muted-foreground">Username</p>
                        <p className="font-mono text-lg">{account.user}</p>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => copyToClipboard(account.user, "Username")}>
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg border">
                      <div>
                        <p className="text-xs font-semibold uppercase text-muted-foreground">Temporary Password</p>
                        <p className="font-mono text-lg">{account.pass}</p>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => copyToClipboard(account.pass, "Password")}>
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Action */}
                <Alert className="bg-blue-50 border-blue-200">
                  <CreditCard className="h-5 w-5 text-blue-600" />
                  <AlertTitle className="text-blue-800">Final Step: Admission Fee</AlertTitle>
                  <AlertDescription className="text-blue-700">
                    To complete your application and download your ID/Receipt, please pay the <strong>500 BDT</strong> admission fee.
                  </AlertDescription>
                </Alert>

                <Button size="lg" className="w-full text-lg h-14" onClick={handlePayment}>
                  Pay Fee & Finalize Application
                </Button>
              </div>
            </div>
        </main>
      <Footer />
    </div>
  );
}