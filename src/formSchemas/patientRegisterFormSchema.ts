import { z } from 'zod'


export const patientRegistrationSchema = z.object({

    name: z.string()
        .min(1, { message: 'Patient name is required' })
        .max(25, { message: 'Patient name must be less than 25 characters' }),


    guardian_name: z.string()
        .min(1, { message: 'Guardian name is required' })
        .max(25, { message: 'Guardian name must be less than 25 characters' }),


    gender: z.enum(['male', 'female', 'other', ""], {
        errorMap: () => ({ message: "Please select valid gender" })
    }),


    dob: z.string()
        .min(1, { message: 'Date of birth is required' })
    ,


    age: z.string()
        .min(1, { message: 'Age is required' })
    ,


    blood_group: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", ""],
        { errorMap: () => ({ message: 'Please select your blood group' }) }
    ),


    marital_status: z.enum(["married", "single", "widowed", "separated", "not specified", ""],
        {
            errorMap: () => ({ message: 'Please select marital status' })
        }
    ),


    image: z.instanceof(File)
        .optional()  // Makes the image field optional
        .refine((file) => file === undefined || file.size < 5 * 1024 * 1024, {
            message: 'File size should be less than 5MB',
        })
        .refine((file) => file === undefined || ['image/jpeg', 'image/png'].includes(file.type), {
            message: 'Only JPEG and PNG images are allowed',
        }),


    phone: z.string({ required_error: 'Phone number is required' })
        .min(10, { message: 'Phone number must be 10 numbers' })
        .max(10, { message: 'Phone number should less than be 10 numbers' })
    ,


    email: z.string()
        .min(1, { message: 'Email is required' })
        .email({ message: 'Enter valid email' }),


    password: z.string()
        .min(8, { message: 'Password must be at least 8 characters' })
        .max(15, { message: 'Password should be less than 15 characters' }),


    alergies: z.string().optional(),


    aadhar: z.string().max(16)
        .optional(),


    address: z.string()
        .min(1, { message: 'Address is required' })
        .max(70)
})



export const DefaultValues = {
    patient_name: '',
    guardian_name: '',
    dob: '',
    age: '',
    image: undefined,
    phone: '',
    email: '',
    password: '',
    alergies: '',
    aadhar: '',
    address: ''
};


