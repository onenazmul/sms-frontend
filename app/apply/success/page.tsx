"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { format } from "date-fns";
import { CheckCircle2, Printer, Edit, Home, Loader2, CreditCard, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      router.push("/apply");
      return;
    }

    async function fetchData() {
      try {
        const res = await fetch(`/api/admission/${id}`);
        const result = await res.json();
        if (res.ok) setData(result.admission);
      } catch (e) {
        console.error("Failed to load");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id, router]);

  if (loading) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin" /></div>;
  if (!data) return <div className="text-center p-20">Application not found.</div>;

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Application Received!</h1>
          <p className="text-slate-500 mt-2">
            Your application for <strong>{data.class_name}</strong> has been submitted.
          </p>
        </div>

        {/* Receipt Card */}
        <Card className="border-none shadow-2xl bg-white overflow-hidden print:shadow-none print:border">
          <div className="text-center">
            <p>School Name</p>
          </div>
          <div className="bg-primary/5 p-6 border-b border-primary/10 flex justify-between items-center">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-primary font-bold">Application ID</p>
              <h2 className="text-xl font-mono font-bold text-slate-800">#00{data.id}</h2>
            </div>
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Date</p>
              <p className="text-sm font-medium">{format(new Date(data.created_at), "PP")}</p>
            </div>
          </div>

          <CardContent className="p-8 space-y-6">
            {/* Student Details Table */}
            <div className="grid grid-cols-2 gap-y-4 text-sm">
              <div>
                <p className="text-slate-400">Student Name</p>
                <p className="font-semibold text-slate-900">{data.name}</p>
              </div>
              <div className="text-right">
                <p className="text-slate-400">Gender</p>
                <p className="font-semibold capitalize text-slate-900">{data.gender}</p>
              </div>
              <div>
                <p className="text-slate-400">Date of Birth</p>
                <p className="font-semibold text-slate-900">
                   {data.dob ? format(new Date(data.dob), "PPP") : "N/A"}
                </p>
              </div>
              <div className="text-right">
                <p className="text-slate-400">Applied Class</p>
                <p className="font-semibold text-slate-900">{data.class_name}</p>
              </div>
              <div>
                <p className="text-slate-400">Guardian Name</p>
                <p className="font-semibold text-slate-900">
                   {data.guardian_name}
                </p>
              </div>
              <div className="text-right">
                <p className="text-slate-400">Guardian Phone</p>
                <p className="font-semibold text-slate-900">{data.guardian_phone}</p>
              </div>
            </div>

            <hr className="border-dashed" />

            {/* Fee/Payment Notice */}
            <div className="bg-amber-50 border border-amber-100 rounded-xl p-5">
              <h3 className="text-amber-800 font-bold flex items-center gap-2 mb-2">
                <CreditCard className="w-4 h-4" /> Final Step: Payment
              </h3>
              <p className="text-sm text-amber-700 leading-relaxed">
                To complete your admission, please pay the application fee. Once paid, your login credentials will be activated.
              </p>
              <div className="mt-4 flex items-center justify-between font-bold text-amber-900 text-lg">
                <span>Total Fee:</span>
                <span>৳ 500.00</span>
              </div>
            </div>

            {/* Actions (Hidden during print) */}
            <div className="flex flex-col gap-3 pt-4 print:hidden">
              <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700 h-14 text-lg">
                <CreditCard className="w-5 h-5 mr-2" /> Pay with bKash / Nagad
              </Button>
              
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => window.print()}>
                  <Printer className="w-4 h-4 mr-2" /> Print
                </Button>
                <Button variant="outline" className="flex-1" onClick={() => router.push(`/apply/edit/${data.id}`)}>
                  <Edit className="w-4 h-4 mr-2" /> Edit Application
                </Button>
              </div>

              <Button variant="ghost" className="w-full text-slate-400" onClick={() => router.push("/")}>
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
              </Button>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-slate-400 text-xs mt-8">
          A confirmation email has been sent to your guardian's contact number.
        </p>
      </div>
    </div>
  );
}

// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import { Copy, CheckCircle2, CreditCard, Lock } from "lucide-react";
// import { toast } from "sonner";
// import Navbar from "@/components/layout/Navbar";
// import Footer from "@/components/layout/Footer";

// export default function AdmissionSuccess() {
//   const router = useRouter();
//   const [account, setAccount] = useState<{user: string, pass: string} | null>(null);

//   useEffect(() => {
//     const data = localStorage.getItem("new_account");
//     if (data) setAccount(JSON.parse(data));
//     else router.push("/apply"); // Redirect back if no data found
//   }, [router]);

//   const copyToClipboard = (text: string, label: string) => {
//     navigator.clipboard.writeText(text);
//     toast.success(`${label} copied to clipboard`);
//   };

//   const handlePayment = async () => {
//     toast.loading("Redirecting to payment gateway...");
//     // Logic to call Laravel Payment API and redirect to Stripe/SSLCommerz
//     // window.location.href = result.payment_url;
//   };

//   if (!account) return null;

//   return (
//     <div className="min-h-screen flex flex-col bg-slate-50/50">
//           <Navbar />
//           <main className="flex-1">
//             <div className="container mx-auto max-w-2xl py-12">
//               <div className="text-center mb-8">
//                 <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
//                 <h1 className="text-3xl font-bold">Application Received!</h1>
//                 <p className="text-muted-foreground">Your account has been created successfully.</p>
//               </div>

//               <div className="grid gap-6">
//                 {/* Credentials Card */}
//                 <Card className="border-2 border-primary/20">
//                   <CardHeader>
//                     <CardTitle className="flex items-center gap-2">
//                       <Lock className="w-5 h-5" /> Login Credentials
//                     </CardTitle>
//                     <CardDescription>Save these details to check your admission status later.</CardDescription>
//                   </CardHeader>
//                   <CardContent className="space-y-4">
//                     <div className="flex items-center justify-between p-3 bg-muted rounded-lg border">
//                       <div>
//                         <p className="text-xs font-semibold uppercase text-muted-foreground">Username</p>
//                         <p className="font-mono text-lg">{account.user}</p>
//                       </div>
//                       <Button variant="ghost" size="icon" onClick={() => copyToClipboard(account.user, "Username")}>
//                         <Copy className="w-4 h-4" />
//                       </Button>
//                     </div>

//                     <div className="flex items-center justify-between p-3 bg-muted rounded-lg border">
//                       <div>
//                         <p className="text-xs font-semibold uppercase text-muted-foreground">Temporary Password</p>
//                         <p className="font-mono text-lg">{account.pass}</p>
//                       </div>
//                       <Button variant="ghost" size="icon" onClick={() => copyToClipboard(account.pass, "Password")}>
//                         <Copy className="w-4 h-4" />
//                       </Button>
//                     </div>
//                   </CardContent>
//                 </Card>

//                 {/* Payment Action */}
//                 <Alert className="bg-blue-50 border-blue-200">
//                   <CreditCard className="h-5 w-5 text-blue-600" />
//                   <AlertTitle className="text-blue-800">Final Step: Admission Fee</AlertTitle>
//                   <AlertDescription className="text-blue-700">
//                     To complete your application and download your ID/Receipt, please pay the <strong>500 BDT</strong> admission fee.
//                   </AlertDescription>
//                 </Alert>

//                 <Button size="lg" className="w-full text-lg h-14" onClick={handlePayment}>
//                   Pay Fee & Finalize Application
//                 </Button>
//               </div>
//             </div>
//         </main>
//       <Footer />
//     </div>
//   );
// }