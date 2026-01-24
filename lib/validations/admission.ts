import * as z from "zod";

export const admissionSchema = z.object({
  // Student Information
  class_name: z.string().min(1, "Please select a class"),
  student_name: z.string().min(3, "Name must be at least 3 characters"),
  gender: z.enum(["male", "female"]),
  dob: z.coerce.date().refine((val) => !isNaN(val.getTime()), {
    message: "Date of birth is required",
  }),
  stay_type: z.enum(["home", "boarding"]),

  // Guardian Information
  father_name: z.string().min(3, "Father's name is required"),
  mother_name: z.string().min(3, "Mother's name is required"),
  guardian_name: z.string().min(3, "Guardian's name is required"),
  guardian_occupation: z.string().min(2, "Occupation is required"),
  guardian_phone: z
    .string()
    .regex(/^01[3-9]\d{8}$/, "Invalid Bangladeshi number (e.g. 01712345678)"),
  guardian_email: z.string().email().optional().or(z.literal("")),

  // Address
  upozilla: z.string().min(1, "Upozilla is required"),
  union_pourosova: z.string().min(1, "Union/Pourosova is required"),
  ward: z.string().min(1, "Ward is required"),
  village_moholla: z.string().min(1, "Village/Moholla is required"),

  // Documents
  student_photo: z.any()
    .refine((files) => files?.length === 1, "Student photo is required"),
  birth_certificate: z.any()
    .refine((files) => files?.length === 1, "Birth certificate is required"),
});

export type AdmissionFormValues = z.infer<typeof admissionSchema>;