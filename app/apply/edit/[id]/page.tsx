"use client";

import { useEffect, useState } from "react";
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
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const form = useForm<AdmissionFormValues>({
    resolver: zodResolver(admissionSchema),
  });

  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/admission/${id}`);
      const result = await res.json();
      if (res.ok) {
        form.reset({
          ...result.admission,
          dob: new Date(result.admission.dob), // Convert string to Date object
        });
      }
      setLoading(false);
    }
    load();
  }, [id, form]);

  async function onSubmit(values: AdmissionFormValues) {
    setUpdating(true);
    const res = await fetch(`/api/admission/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...values, dob: format(values.dob, "yyyy-MM-dd") }),
    });

    if (res.ok) {
      toast.success("Updated successfully");
      router.push(`/apply/success?id=${id}`);
    } else {
      toast.error("Update failed");
    }
    setUpdating(false);
  }

  if (loading) return <div className="p-20 text-center"><Loader2 className="animate-spin mx-auto" /></div>;

  return (
    <div className="container mx-auto max-w-4xl py-12 px-4">
      <Button variant="ghost" onClick={() => router.back()} className="mb-4"><ArrowLeft className="mr-2 h-4 w-4" /> Back</Button>
      <Card>
        <CardHeader><CardTitle className="text-center">Edit Application Details</CardTitle></CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                {/* STUDENT INFO */}
              <Card className="border-none shadow-sm ring-1 ring-slate-200">
                <CardHeader className="bg-slate-50/50 border-b">
                  <CardTitle className="text-lg font-semibold">Student Information</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                  <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Student Name</FormLabel>
                      <FormControl><Input placeholder="Full Name" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  
                  <FormField control={form.control} name="class_name" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Applying Class</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Select class" /></SelectTrigger></FormControl>
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
                            captionLayout="dropdown-buttons"
                            fromYear={2000}
                            toYear={2026}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="gender" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger></FormControl>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                </CardContent>
              </Card>

              {/* GUARDIAN INFO */}
              <Card className="border-none shadow-sm ring-1 ring-slate-200">
                <CardHeader className="bg-slate-50/50 border-b">
                  <CardTitle className="text-lg font-semibold">Guardian Details</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                  <FormField control={form.control} name="guardian_name" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Guardian Name</FormLabel>
                      <FormControl><Input placeholder="Father or Mother's Name" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="guardian_phone" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Guardian Phone Number</FormLabel>
                      <FormControl><Input placeholder="017XXXXXXXX" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </CardContent>
              </Card>

              <Button type="submit" className="w-full" disabled={updating}>
                {updating ? <Loader2 className="animate-spin mr-2" /> : <Save className="mr-2" />} Save Changes
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}