"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Printer, CheckCircle, Globe, Phone, Mail, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

export default function AdmissionReceipt() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  const portalInfo = {
    name: "GEMINI SMS",
    tagline: "Empowering Modern Education",
    website: "www.geminisms.com",
    phone: "+880 1234-567890",
    email: "support@geminisms.com",
  };

  useEffect(() => {
    const savedData = localStorage.getItem("new_account");
    if (savedData) {
      setData(JSON.parse(savedData));
      setLoading(false);
    } else {
      router.push("/apply");
    }
  }, [router]);

  if (loading || !data) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="min-h-screen bg-slate-100 py-10 print:bg-white print:py-0">
      <div className="max-w-4xl mx-auto mb-6 flex justify-between px-4 print:hidden">
        <Button variant="ghost" onClick={() => router.push("/")}>Home</Button>
        <Button onClick={() => window.print()} className="bg-primary">
          <Printer className="w-4 h-4 mr-2" /> Print Receipt
        </Button>
      </div>

      <div className="max-w-[800px] mx-auto bg-white shadow-xl border p-8 print:shadow-none print:border-none">
        {/* Header */}
        <div className="flex justify-between items-center border-b-2 border-primary pb-6 mb-6">
          <div className="flex gap-4 items-center">
            <div className="w-16 h-16 bg-primary text-white flex items-center justify-center rounded-full font-bold text-xl">G</div>
            <div>
              <h1 className="text-2xl font-black">{portalInfo.name}</h1>
              <p className="text-xs text-primary font-bold uppercase tracking-widest">{portalInfo.tagline}</p>
            </div>
          </div>
          <div className="text-right text-[10px] text-slate-500 space-y-1">
            <p>{portalInfo.website}</p>
            <p>{portalInfo.phone}</p>
            <p>{portalInfo.email}</p>
          </div>
        </div>

        <div className="bg-slate-900 py-2 text-center mb-8">
          <h3 className="font-bold text-white uppercase text-xs tracking-[0.3em]">Admission Payment Receipt</h3>
        </div>

        {/* Data Sections */}
        <div className="grid grid-cols-4 gap-8 mb-8">
          <div className="col-span-3 space-y-6">
            <section>
              <h4 className="text-xs font-black uppercase text-primary border-b mb-3">Student Information</h4>
              <div className="grid grid-cols-2 gap-y-2 text-sm">
                <p><span className="text-slate-500">Name:</span> <span className="font-bold">{data.student_name}</span></p>
                <p><span className="text-slate-500">Class:</span> <span className="font-bold">{data.class_name}</span></p>
                <p><span className="text-slate-500">Gender:</span> <span className="font-bold uppercase">{data.gender}</span></p>
                <p>
                    <span className="text-slate-500">DOB:</span>{" "}
                    <span className="font-bold">
                        {data.dob ? format(new Date(data.dob), "PP") : "N/A"}
                    </span>
                </p>
                <p><span className="text-slate-500">Stay Type:</span> <span className="font-bold uppercase">{data.stay_type}</span></p>
              </div>
            </section>

            <section>
              <h4 className="text-xs font-black uppercase text-primary border-b mb-3">Guardian Information</h4>
              <div className="grid grid-cols-2 gap-y-2 text-sm">
                <p><span className="text-slate-500">Father:</span> <span className="font-medium">{data.father_name}</span></p>
                <p><span className="text-slate-500">Mother:</span> <span className="font-medium">{data.mother_name}</span></p>
                <p className="col-span-2"><span className="text-slate-500">Phone:</span> <span className="font-medium">{data.guardian_phone}</span></p>
              </div>
            </section>
          </div>

          <div className="flex flex-col items-center">
             <div className="w-32 h-40 bg-slate-100 border rounded overflow-hidden flex items-center justify-center">
               {data.student_photo ? (
                 <img src={data.student_photo} alt="Student" className="w-full h-full object-cover" />
               ) : (
                 <span className="text-[10px] text-slate-400 uppercase font-bold text-center p-2">Photo Placeholder</span>
               )}
             </div>
          </div>
        </div>

        {/* Payment & Access Box */}
        <div className="grid grid-cols-2 gap-8 mb-12">
          <div className="bg-slate-50 p-4 rounded-lg border">
            <h4 className="text-[10px] font-black uppercase text-slate-400 mb-3">Transaction Summary</h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between"><span>Amount Paid:</span> <span className="font-bold text-green-700">500.00 BDT</span></div>
              <div className="flex justify-between"><span>Trx ID:</span> <span className="font-mono text-xs font-bold uppercase">{data.payment.trx_id}</span></div>
              <div className="flex justify-between"><span>Date:</span> <span className="text-xs">{format(new Date(data.payment.date), "PP")}</span></div>
            </div>
          </div>

          <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
            <h4 className="text-[10px] font-black uppercase text-primary/60 mb-3">Portal Access</h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between"><span>Username:</span> <span className="font-mono font-bold text-primary">{data.user}</span></div>
              <div className="flex justify-between"><span>Password:</span> <span className="font-mono font-bold text-primary">{data.pass}</span></div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-end mt-20 pt-10 border-t border-dashed">
          <div className="text-center w-48 border-t border-slate-300 pt-2 text-[10px] font-bold text-slate-500 uppercase">Student's Signature</div>
          <div className="text-center w-48 border-t border-slate-300 pt-2 text-[10px] font-bold text-slate-500 uppercase">
            <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-1 opacity-50" />
            Digital Verification Seal
          </div>
        </div>
      </div>
    </div>
  );
 }
// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { Printer, Download, CheckCircle, Globe, Phone, Mail, Loader2 } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { format } from "date-fns";

// export default function AdmissionReceipt() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(true);
//   const [data, setData] = useState<any>(null);

//   // --- CONFIGURATION: SCHOOL/PORTAL DETAILS ---
//   const portalInfo = {
//     name: "GEMINI SMS",
//     tagline: "Empowering Modern Education",
//     subName: "Advanced School Management System",
//     website: "www.geminisms.com",
//     phone: "+880 1234-567890",
//     email: "support@geminisms.com",
//     address: "Dhaka, Bangladesh"
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         // --- OPTION A: REAL API (Uncomment when ready) ---
//         /*
//         const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/receipt/${id}`);
//         const result = await res.json();
//         setData(result);
//         */

//         // --- OPTION B: MOCK DATA (Current) ---
//         const savedAccount = JSON.parse(localStorage.getItem("new_account") || "{}");
        
//         const mockData = {
//           student: {
//             name: "Nazmul Hossain",
//             class: "Class 10",
//             gender: "Male",
//             dob: "2010-01-12",
//             stay_type: "Residential",
//             photo_url: null, // Placeholder
//           },
//           guardian: {
//             father: "Md. Abdur Rahman",
//             mother: "Fatema Khatun",
//             name: "Md. Abdur Rahman",
//             contact: "01712-345678"
//           },
//           payment: {
//             amount: "500.00",
//             currency: "BDT",
//             date: new Date().toISOString(),
//             method: "bKash Online",
//             trx_id: "TRX-GEMINI-" + Math.random().toString(36).toUpperCase().substring(2, 10),
//           },
//           credentials: {
//             username: savedAccount.user || "STU-PENDING",
//             password: savedAccount.pass || "********"
//           }
//         };

//         setData(mockData);
//       } catch (error) {
//         console.error("Failed to load receipt:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [router]);

//   const handlePrint = () => window.print();

//   if (loading) return (
//     <div className="h-screen flex items-center justify-center">
//       <Loader2 className="animate-spin h-8 w-8 text-primary" />
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-slate-100 py-10 print:bg-white print:py-0">
      
//       {/* Action Bar */}
//       <div className="max-w-4xl mx-auto mb-6 flex justify-between items-center px-4 print:hidden">
//         <Button variant="ghost" onClick={() => router.back()}>← Back</Button>
//         <div className="flex gap-2">
//           <Button onClick={handlePrint} className="bg-primary">
//             <Printer className="w-4 h-4 mr-2" /> Print Receipt
//           </Button>
//         </div>
//       </div>

//       {/* Receipt Layout */}
//       <div className="max-w-[800px] mx-auto bg-white shadow-xl border border-slate-200 p-8 print:shadow-none print:border-none">
        
//         {/* Header */}
//         <div className="flex justify-between items-center border-b-2 border-primary pb-6 mb-6">
//           <div className="flex gap-4 items-center">
//             <div className="w-16 h-16 bg-primary text-white flex items-center justify-center rounded-full font-bold text-xl">
//               G
//             </div>
//             <div>
//               <h1 className="text-2xl font-black text-slate-900 leading-none">{portalInfo.name}</h1>
//               <p className="text-xs text-primary font-bold uppercase tracking-widest mt-1">{portalInfo.tagline}</p>
//               <h2 className="text-sm font-medium text-slate-500 mt-1">{portalInfo.subName}</h2>
//             </div>
//           </div>
//           <div className="text-right text-[10px] text-slate-500 space-y-1">
//             <p className="flex items-center justify-end gap-1"><Globe className="w-3 h-3"/> {portalInfo.website}</p>
//             <p className="flex items-center justify-end gap-1"><Phone className="w-3 h-3"/> {portalInfo.phone}</p>
//             <p className="flex items-center justify-end gap-1"><Mail className="w-3 h-3"/> {portalInfo.email}</p>
//           </div>
//         </div>

//         <div className="bg-slate-900 py-2 text-center mb-8">
//           <h3 className="font-bold text-white uppercase text-xs tracking-[0.3em]">Admission Payment Receipt</h3>
//         </div>

//         {/* Info Grid */}
//         <div className="grid grid-cols-4 gap-8 mb-8">
//           <div className="col-span-3 space-y-6">
//             {/* Student Info */}
//             <section>
//               <h4 className="text-xs font-black uppercase text-primary border-b mb-3">Student Information</h4>
//               <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
//                 <p><span className="text-slate-500">Name:</span> <span className="font-bold">{data.student.name}</span></p>
//                 <p><span className="text-slate-500">Class:</span> <span className="font-bold">{data.student.class}</span></p>
//                 <p><span className="text-slate-500">Gender:</span> <span className="font-bold">{data.student.gender}</span></p>
//                 <p><span className="text-slate-500">DOB:</span> <span className="font-bold">{data.student.dob}</span></p>
//                 <p><span className="text-slate-500">Stay Type:</span> <span className="font-bold">{data.student.stay_type}</span></p>
//               </div>
//             </section>

//             {/* Guardian Info */}
//             <section>
//               <h4 className="text-xs font-black uppercase text-primary border-b mb-3">Guardian Information</h4>
//               <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
//                 <p><span className="text-slate-500">Father:</span> <span className="font-medium">{data.guardian.father}</span></p>
//                 <p><span className="text-slate-500">Mother:</span> <span className="font-medium">{data.guardian.mother}</span></p>
//                 <p className="col-span-2"><span className="text-slate-500">Guardian Contact:</span> <span className="font-medium">{data.guardian.contact}</span></p>
//               </div>
//             </section>
//           </div>

//           {/* Photo Placeholder */}
//           <div className="flex flex-col items-center">
//              <div className="w-32 h-40 bg-slate-50 border-2 border-slate-200 rounded flex items-center justify-center text-[10px] text-slate-400 text-center px-4 uppercase font-bold">
//                Passport Size Photo
//              </div>
//           </div>
//         </div>

//         {/* Payment and Credentials Table */}
//         <div className="grid grid-cols-2 gap-8 mb-12">
//           <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
//             <h4 className="text-[10px] font-black uppercase text-slate-400 mb-3 tracking-wider">Transaction Summary</h4>
//             <div className="space-y-2 text-sm">
//               <div className="flex justify-between"><span>Amount Paid:</span> <span className="font-bold text-green-700">{data.payment.amount} {data.payment.currency}</span></div>
//               <div className="flex justify-between"><span>Method:</span> <span className="font-medium">{data.payment.method}</span></div>
//               <div className="flex justify-between"><span>Trx ID:</span> <span className="font-mono text-xs font-bold uppercase">{data.payment.trx_id}</span></div>
//               <div className="flex justify-between"><span>Date:</span> <span className="text-xs">{format(new Date(data.payment.date), "PPpp")}</span></div>
//             </div>
//           </div>

//           <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
//             <h4 className="text-[10px] font-black uppercase text-primary/60 mb-3 tracking-wider">Portal Access</h4>
//             <div className="space-y-2 text-sm">
//               <div className="flex justify-between"><span>Username:</span> <span className="font-mono font-bold text-primary">{data.credentials.username}</span></div>
//               <div className="flex justify-between"><span>Password:</span> <span className="font-mono font-bold text-primary">{data.credentials.password}</span></div>
//               <p className="text-[9px] text-slate-400 italic mt-2 leading-tight">Change your password immediately after logging in for the first time.</p>
//             </div>
//           </div>
//         </div>

//         {/* Signatures */}
//         <div className="flex justify-between items-end mt-20 pt-10">
//           <div className="text-center w-48">
//             <div className="h-10"></div> {/* Space for manual sign */}
//             <div className="border-t border-slate-300 pt-2 text-[10px] font-bold uppercase text-slate-500">Student Signature</div>
//           </div>
//           <div className="text-center w-48">
//             <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-1 opacity-50" />
//             <div className="border-t border-slate-300 pt-2 text-[10px] font-bold uppercase text-slate-500">Authorized Digital Seal</div>
//           </div>
//         </div>

//         <div className="mt-12 text-center text-[9px] text-slate-400 border-t pt-4">
//           This is a system-generated receipt for <strong>{portalInfo.name}</strong>. No physical signature required for digital verification.
//         </div>
//       </div>

//       <style jsx global>{`
//         @media print {
//           @page { margin: 0; }
//           body { padding: 0; }
//           .print\:hidden { display: none !important; }
//         }
//       `}</style>
//     </div>
//   );
// }