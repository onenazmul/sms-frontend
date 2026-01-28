"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
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
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function AdmissionPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [classes, setClasses] = useState<{id: string, name: string}[]>([]);

  const form = useForm<AdmissionFormValues>({
    resolver: zodResolver(admissionSchema) as any, 
    defaultValues: {
      class_name: "",
      student_name: "",
      gender: "male",
      dob: new Date() as any, 
      stay_type: "home",
      father_name: "",
      mother_name: "",
      guardian_name: "",
      guardian_occupation: "",
      guardian_phone: "",
      guardian_email: "",
      upozilla: "",
      union_pourosova: "",
      ward: "",
      village_moholla: "",
    },
  });

  useEffect(() => {
    setClasses([
      { id: "1", name: "Class 6" },
      { id: "2", name: "Class 7" },
      { id: "3", name: "Class 8" },
    ]);
  }, []);

  // async function onSubmit(data: AdmissionFormValues) {
  //   setLoading(true);
  //   try {
      //switch to live later
      // Inside onSubmit(data) in production:
      //const formData = new FormData();

      // 1. Loop through all form values and append to FormData
      // Object.entries(data).forEach(([key, value]) => {
      //   if (value instanceof FileList) {
      //     formData.append(key, value[0]); // Attach the file
      //   } else if (value instanceof Date) {
      //     formData.append(key, value.toISOString().split('T')[0]); // Format date for SQL
      //   } else {
      //     formData.append(key, value as string);
      //   }
      // });

      // 2. Send to Laravel
      // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admissions`, {
      //   method: "POST",
      //   body: formData, // Send as FormData to handle files
      //   headers: {
      //     "Accept": "application/json",
      //     // "X-Tenant": window.location.hostname (if using Multi-tenancy)
      //   },
      // });

      // const result = await response.json();

      // if (response.ok) {
      //   // Store the REAL credentials returned by Laravel
      //   localStorage.setItem("new_account", JSON.stringify({
      //     user: result.student_id,
      //     pass: result.temporary_password
      //   }));
      //   router.push("/apply/success");
      // } else {
      //   throw new Error(result.message || "Failed to submit");
      // }
      //switch to live later end

      // 1. MOCK DATA GENERATION (Since API is not ready)
  //     const mockStudentId = `STU-${Math.floor(100000 + Math.random() * 900000)}`;
  //     const mockPassword = Math.random().toString(36).slice(-8).toUpperCase();

  //     // 2. SAVE TO LOCALSTORAGE
  //     localStorage.setItem("new_account", JSON.stringify({
  //       user: mockStudentId,
  //       pass: mockPassword
  //     }));

  //     // 3. SIMULATE NETWORK DELAY
  //     await new Promise(resolve => setTimeout(resolve, 2000));
      
  //     toast.success("Application submitted successfully!");
  //     router.push("/apply/success");
  //   } catch (error) {
  //     toast.error("Submission failed. Please check your data.");
  //   } finally {
  //     setLoading(false);
  //   }
  // }


      async function onSubmit(data: AdmissionFormValues) {
      setLoading(true);
      try {
        // 1. Generate Mock Credentials
        const mockStudentId = `STU-${Math.floor(100000 + Math.random() * 900000)}`;
        const mockPassword = Math.random().toString(36).slice(-8).toUpperCase();

        // 2. Prepare Data for LocalStorage (converting non-serializable fields)
        const submissionData = {
          ...data,
          user: mockStudentId,
          pass: mockPassword,
          //dob: data.dob.toISOString(), // Convert Date to string
          dob: data.dob instanceof Date ? data.dob.toISOString() : new Date().toISOString(),
          student_photo: data.student_photo?.[0] ? URL.createObjectURL(data.student_photo[0]) : null, // Temporary preview URL
          payment: {
            amount: "500.00",
            date: new Date().toISOString(),
            trx_id: "TRX-" + Math.random().toString(36).toUpperCase().substring(2, 10),
            method: "bKash Online"
          }
        };

        // 3. Save to LocalStorage
        localStorage.setItem("new_account", JSON.stringify(submissionData));

        // 4. Simulate Network Delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        toast.success("Application submitted successfully!");
        router.push("/apply/success");
      } catch (error) {
        toast.error("Submission failed. Please check your data.");
      } finally {
        setLoading(false);
      }
    }
  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50">
      <Navbar />
      <main className="flex-1">
        <div className="container mx-auto max-w-4xl py-10 px-4">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight">Admission Form</h1>
            <p className="text-muted-foreground">Please fill in all the details accurately.</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* 1. Student Information */}
              <Card>
                <CardHeader><CardTitle>Student Information</CardTitle></CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField control={form.control} name="student_name" render={({ field }) => (
                    <FormItem><FormLabel>Student Name</FormLabel><FormControl><Input placeholder="Full Name" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="class_name" render={({ field }) => (
                    <FormItem><FormLabel>Applying Class</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Select class" /></SelectTrigger></FormControl>
                        <SelectContent>{classes.map(c => <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>)}</SelectContent>
                      </Select>
                    <FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="gender" render={({ field }) => (
                    <FormItem><FormLabel>Gender</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger></FormControl>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                    <FormMessage /></FormItem>
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
                          <Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date > new Date() || date < new Date("1900-01-01")} initialFocus />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="stay_type" render={({ field }) => (
                    <FormItem><FormLabel>Stay Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger></FormControl>
                        <SelectContent>
                          <SelectItem value="home">Home (Day Scholar)</SelectItem>
                          <SelectItem value="boarding">Boarding (Residential)</SelectItem>
                        </SelectContent>
                      </Select>
                    <FormMessage /></FormItem>
                  )} />
                </CardContent>
              </Card>

              {/* 2. Guardian Information */}
              <Card>
                <CardHeader><CardTitle>Guardian Details</CardTitle></CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField control={form.control} name="father_name" render={({ field }) => (
                    <FormItem><FormLabel>Father's Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="mother_name" render={({ field }) => (
                    <FormItem><FormLabel>Mother's Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="guardian_name" render={({ field }) => (
                    <FormItem><FormLabel>Guardian Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="guardian_occupation" render={({ field }) => (
                    <FormItem><FormLabel>Guardian Occupation</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="guardian_phone" render={({ field }) => (
                    <FormItem><FormLabel>Guardian Phone</FormLabel><FormControl><Input placeholder="017XXXXXXXX" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="guardian_email" render={({ field }) => (
                    <FormItem><FormLabel>Guardian Email (Optional)</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                </CardContent>
              </Card>

              {/* 3. Address Information */}
              <Card>
                <CardHeader><CardTitle>Detailed Address</CardTitle></CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField control={form.control} name="upozilla" render={({ field }) => (
                    <FormItem><FormLabel>Upozilla</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="union_pourosova" render={({ field }) => (
                    <FormItem><FormLabel>Union / Pourosova</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="ward" render={({ field }) => (
                    <FormItem><FormLabel>Ward No.</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="village_moholla" render={({ field }) => (
                    <FormItem><FormLabel>Village / Moholla</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                </CardContent>
              </Card>

              {/* 4. Documents */}
              <Card>
                <CardHeader><CardTitle>Required Documents</CardTitle></CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField control={form.control} name="student_photo" render={({ field: { value, onChange, ...field } }) => (
                    <FormItem><FormLabel>Student Photo</FormLabel><FormControl><Input type="file" accept="image/*" onChange={(e) => onChange(e.target.files)} {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="birth_certificate" render={({ field: { value, onChange, ...field } }) => (
                    <FormItem><FormLabel>Birth Certificate</FormLabel><FormControl><Input type="file" accept=".pdf,image/*" onChange={(e) => onChange(e.target.files)} {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                </CardContent>
              </Card>

              <Button type="submit" className="w-full h-12 text-lg" disabled={loading}>
                {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...</> : "Submit Application"}
              </Button>
            </form>
          </Form>
        </div>
      </main>
      <Footer />
    </div>
  );
}