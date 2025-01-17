import { z } from "zod";


export const createStaffFormSchema = z.object({

    role: z.string()
        .min(1, { message: "Role is required" })
        .default(''),

    designation: z.string()
        .min(1, { message: "Designation is required" })
        .default(''),

    department: z.string()
        .default('')
        .optional(),

    specialist: z.string()
        .optional(),


    fees: z
        .string()
        .optional()
        .refine((fees) => {
            if (fees === undefined || fees.trim() === "") {
                return true;
            }

            return +fees > 0;
        }, { message: 'Fees must be a positive number.' }),


    name: z.string()
        .min(1, { message: "Name is required" }),

    father_name: z.string()
        .min(1, { message: "Father name is required" }),

    mother_name: z.string()
        .min(1, { message: "Mother name is required" }),

    gender: z.string()
        .min(1, { message: "Gender name is required" })
        .default(''),

    marital_status: z.string()
        .default('')
        .optional(),

    blood_group: z.string()
        .default('')
        .optional(),

    dob: z.string()
        .min(1, { message: "DOB is required" }),

    date_of_joining: z.string()
        .optional(),

    phone: z.string()
        .optional(),

    emergency_contact: z.string()
        .optional(),

    email: z.string()
        .min(1, { message: "Email is required" })
        .email({ message: 'Invalid Email' }),


    image: z.instanceof(File)
        .optional()  // Makes the image field optional
        .refine((file) => file === undefined || file.size < 5 * 1024 * 1024, {
            message: 'File size should be less than 5MB',
        })
        .refine((file) => file === undefined || ['image/jpeg', 'image/png'].includes(file.type), {
            message: 'Only JPEG and PNG images are allowed',
        }),

    current_address: z.string().optional(),

    permanent_address: z.string().optional(),

    qualification: z.string().optional(),

    work_experience: z.string().optional(),

    note: z.string().optional(),

    PAN: z.string().optional(),

    national_identification_number: z.string().optional(),

    local_identification_number: z.string().optional(),

})