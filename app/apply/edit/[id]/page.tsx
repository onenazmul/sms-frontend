"use client";

import { useEffect, useState, use } from "react"; // Added 'use' for Next.js 15 params
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Save, ArrowLeft, Loader2, CalendarIcon } from "lucide-react";
import { toast } from "sonner";

import { admissionSchema, type AdmissionFormValues } from "@/lib/validations/admission";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function EditPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;
  
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // CRITICAL: You MUST provide defaultValues to satisfy TypeScript
  const form = useForm<AdmissionFormValues>({
    resolver: zodResolver(admissionSchema),
    defaultValues: {
      name: "",
      class_name: "",
      gender: "male",
      dob: new Date(), // Initialize with a Date object
      guardian_name: "",
      guardian_phone: "",
    }
  });

  useEffect(() => {
    async function load() {
      if (!id) return;
      try {
        const res = await fetch(`/api/admission/${id}`);
        const result = await res.json();
        
        if (res.ok && result.admission) {
          // Convert the API string into a real Date object
          const record = result.admission;
          form.reset({
            ...record,
            dob: record.dob ? new Date(record.dob) : new Date(),
          });
        }
      } catch (err) {
        toast.error("Failed to load application");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id, form]);

  async function onSubmit(values: AdmissionFormValues) {
    setUpdating(true);
    try {
      const res = await fetch(`/api/admission/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          ...values, 
          dob: format(values.dob, "yyyy-MM-dd") 
        }),
      });

      if (res.ok) {
        toast.success("Updated successfully");
        router.push(`/apply/success?id=${id}`);
      } else {
        toast.error("Update failed");
      }
    } catch (error) {
      toast.error("Connection error");
    } finally {
      setUpdating(false);
    }
  }

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Loader2 className="animate-spin h-10 w-10 text-primary" />
      <p className="mt-4 text-slate-500 font-medium">Fetching application data...</p>
    </div>
  );

  return (
    <div className="container mx-auto max-w-4xl py-12 px-4">
      <Button variant="ghost" onClick={() => router.back()} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>
      
      <Card className="border-none shadow-xl">
        <CardHeader className="bg-slate-900 text-white rounded-t-lg">
          <CardTitle className="text-center text-xl">Edit Application Details</CardTitle>
        </CardHeader>
        <CardContent className="pt-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

              {/* STUDENT INFO SECTION */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 border-b pb-2">
                  <div className="h-4 w-1 bg-blue-600 rounded-full" />
                  <h3 className="font-bold text-slate-800">Student Information</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl><Input {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  
                  <FormField control={form.control} name="class_name" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Applying Class</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select class" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Class 6">Class 6</SelectItem>
                          <SelectItem value="Class 7">Class 7</SelectItem>
                          <SelectItem value="Class 8">Class 8</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                  
                  <FormField control={form.control} name="dob" render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="mb-1">Date of Birth</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button variant="outline" className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                              {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar 
                            mode="single" 
                            selected={field.value} 
                            onSelect={field.onChange} 
                            disabled={(date) => date > new Date() || date < new Date("1990-01-01")} 
                            captionLayout="dropdown"
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="gender" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
              </div>

              {/* GUARDIAN INFO SECTION */}
              <div className="space-y-6 pt-4">
                <div className="flex items-center gap-2 border-b pb-2">
                  <div className="h-4 w-1 bg-blue-600 rounded-full" />
                  <h3 className="font-bold text-slate-800">Guardian Details</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField control={form.control} name="guardian_name" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Guardian Name</FormLabel>
                      <FormControl><Input {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="guardian_phone" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl><Input {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
              </div>

              <div className="pt-6">
                <Button type="submit" className="w-full h-12 text-lg font-bold bg-green-600 hover:bg-green-700" disabled={updating}>
                  {updating ? <Loader2 className="animate-spin mr-2" /> : <Save className="mr-2" />} 
                  Save Changes
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
// "use client";

// import { useEffect, useState } from "react";
// import { useRouter, useParams } from "next/navigation";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { format } from "date-fns";
// import { Save, ArrowLeft, Loader2, CalendarIcon } from "lucide-react";
// import { toast } from "sonner";

// import { admissionSchema, type AdmissionFormValues } from "@/lib/validations/admission";
// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// export default function EditPage() {
//   const router = useRouter();
//   const { id } = useParams();
//   const [loading, setLoading] = useState(true);
//   const [updating, setUpdating] = useState(false);

//   const form = useForm<AdmissionFormValues>({
//     resolver: zodResolver(admissionSchema),
//   });

//   useEffect(() => {
//     async function load() {
//       const res = await fetch(`/api/admission/${id}`);
//       const result = await res.json();
//       if (res.ok) {
//         form.reset({
//           ...result.admission,
//           dob: new Date(result.admission.dob), // Convert string to Date object
//         });
//       }
//       setLoading(false);
//     }
//     load();
//   }, [id, form]);

//   async function onSubmit(values: AdmissionFormValues) {
//     setUpdating(true);
//     const res = await fetch(`/api/admission/${id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ ...values, dob: format(values.dob, "yyyy-MM-dd") }),
//     });

//     if (res.ok) {
//       toast.success("Updated successfully");
//       router.push(`/apply/success?id=${id}`);
//     } else {
//       toast.error("Update failed");
//     }
//     setUpdating(false);
//   }

//   if (loading) return <div className="p-20 text-center"><Loader2 className="animate-spin mx-auto" /></div>;

//   return (
//     <div className="container mx-auto max-w-4xl py-12 px-4">
//       <Button variant="ghost" onClick={() => router.back()} className="mb-4"><ArrowLeft className="mr-2 h-4 w-4" /> Back</Button>
//       <Card>
//         <CardHeader><CardTitle className="text-center">Edit Application Details</CardTitle></CardHeader>
//         <CardContent>
//           <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

//                 {/* STUDENT INFO */}
//               <Card className="border-none shadow-sm ring-1 ring-slate-200">
//                 <CardHeader className="bg-slate-50/50 border-b">
//                   <CardTitle className="text-lg font-semibold">Student Information</CardTitle>
//                 </CardHeader>
//                 <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
//                   <FormField control={form.control} name="name" render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Student Name</FormLabel>
//                       <FormControl><Input placeholder="Full Name" {...field} /></FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )} />
                  
//                   <FormField control={form.control} name="class_name" render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Applying Class</FormLabel>
//                       <Select onValueChange={field.onChange} defaultValue={field.value}>
//                         <FormControl><SelectTrigger><SelectValue placeholder="Select class" /></SelectTrigger></FormControl>
//                         <SelectContent>
//                           <SelectItem value="Class 6">Class 6</SelectItem>
//                           <SelectItem value="Class 7">Class 7</SelectItem>
//                           <SelectItem value="Class 8">Class 8</SelectItem>
//                         </SelectContent>
//                       </Select>
//                       <FormMessage />
//                     </FormItem>
//                   )} />
                  
//                   <FormField control={form.control} name="dob" render={({ field }) => (
//                     <FormItem className="flex flex-col">
//                       <FormLabel className="mb-1">Date of Birth</FormLabel>
//                       <Popover>
//                         <PopoverTrigger asChild>
//                           <FormControl>
//                             <Button variant="outline" className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
//                               {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
//                               <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
//                             </Button>
//                           </FormControl>
//                         </PopoverTrigger>
//                         <PopoverContent className="w-auto p-0" align="start">
//                           <Calendar 
//                             mode="single" 
//                             selected={field.value} 
//                             onSelect={field.onChange} 
//                             disabled={(date) => date > new Date() || date < new Date("1990-01-01")} 
//                             captionLayout="dropdown-buttons"
//                             fromYear={2000}
//                             toYear={2026}
//                             initialFocus
//                           />
//                         </PopoverContent>
//                       </Popover>
//                       <FormMessage />
//                     </FormItem>
//                   )} />

//                   <FormField control={form.control} name="gender" render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Gender</FormLabel>
//                       <Select onValueChange={field.onChange} defaultValue={field.value}>
//                         <FormControl><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger></FormControl>
//                         <SelectContent>
//                           <SelectItem value="male">Male</SelectItem>
//                           <SelectItem value="female">Female</SelectItem>
//                         </SelectContent>
//                       </Select>
//                       <FormMessage />
//                     </FormItem>
//                   )} />
//                 </CardContent>
//               </Card>

//               {/* GUARDIAN INFO */}
//               <Card className="border-none shadow-sm ring-1 ring-slate-200">
//                 <CardHeader className="bg-slate-50/50 border-b">
//                   <CardTitle className="text-lg font-semibold">Guardian Details</CardTitle>
//                 </CardHeader>
//                 <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
//                   <FormField control={form.control} name="guardian_name" render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Guardian Name</FormLabel>
//                       <FormControl><Input placeholder="Father or Mother's Name" {...field} /></FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )} />
//                   <FormField control={form.control} name="guardian_phone" render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Guardian Phone Number</FormLabel>
//                       <FormControl><Input placeholder="017XXXXXXXX" {...field} /></FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )} />
//                 </CardContent>
//               </Card>

//               <Button type="submit" className="w-full" disabled={updating}>
//                 {updating ? <Loader2 className="animate-spin mr-2" /> : <Save className="mr-2" />} Save Changes
//               </Button>
//             </form>
//           </Form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }