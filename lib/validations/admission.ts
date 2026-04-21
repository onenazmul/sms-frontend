import * as z from "zod";

export const admissionSchema = z.object({
  // Required fields in UI
  class_name: z.string().min(1, "Please select a class"),
  name: z.string().min(3, "Name must be at least 3 characters"),
  gender: z.enum(["male", "female"]),
  dob: z.any().refine((val) => val instanceof Date && !isNaN(val.getTime()), {
    message: "Please enter a valid date",
  }),
  // dob: z.preprocess((arg) => {
  //   if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
  // }, z.date({ required_error: "DOB is required" })),
  //dob: z.iso.date(), //z.date({ required_error: "Date of birth is required" }),
  guardian_name: z.string().min(3, "Guardian name is required"),
  guardian_phone: z.string().regex(/^01[3-9]\d{8}$/, "Invalid Bangladeshi number"),
  
  // Optional/Hidden fields (to match your API's expected structure)
  stay_type: z.string().optional(),
  father_name: z.string().optional(),
  mother_name: z.string().optional(),
  guardian_occupation: z.string().optional(),
  guardian_email: z.string().email().optional().or(z.literal("")),
  upozilla: z.string().optional(),
  union_pourosova: z.string().optional(),
  ward: z.string().optional(),
  village_moholla: z.string().optional(),
});

export type AdmissionFormValues = z.infer<typeof admissionSchema>;



// import * as z from "zod";

// export const admissionSchema = z.object({
//   // Student Information
//   class_name: z.string().min(1, "Please select a class"),
//   name: z.string().min(3, "Name must be at least 3 characters"),
//   gender: z.enum(["male", "female"]),
//   dob: z.coerce.date().refine((val) => !isNaN(val.getTime()), {
//     message: "Date of birth is required",
//   }),
//   stay_type: z.enum(["home", "boarding"]),

//   // Guardian Information
//   father_name: z.string().min(3, "Father's name is required"),
//   mother_name: z.string().min(3, "Mother's name is required"),
//   guardian_name: z.string().min(3, "Guardian's name is required"),
//   guardian_occupation: z.string().min(2, "Occupation is required"),
//   guardian_phone: z
//     .string()
//     .regex(/^01[3-9]\d{8}$/, "Invalid Bangladeshi number (e.g. 01712345678)"),
//   guardian_email: z.string().email().optional().or(z.literal("")),

//   // Address
//   upozilla: z.string().min(1, "Upozilla is required"),
//   union_pourosova: z.string().min(1, "Union/Pourosova is required"),
//   ward: z.string().min(1, "Ward is required"),
//   village_moholla: z.string().min(1, "Village/Moholla is required"),

//   // Documents
//   // student_photo: z.any()
//   //   .refine((files) => files?.length === 1, "Student photo is required"),
//   // birth_certificate: z.any()
//   //   .refine((files) => files?.length === 1, "Birth certificate is required"),
// });

// export type AdmissionFormValues = z.infer<typeof admissionSchema>;