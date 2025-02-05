import { z } from "zod";


const Medicine = z.object({
    category: z.string()
        .min(1, { message: 'Medicine category is required' })
        .default(''),

    medicineId: z.string()
        .min(1, { message: 'Medicine name is required' })
        .default(''),

    dose: z.string()
        .min(1, { message: 'Dose name is required' }),

    dose_interval: z.string()
        .min(1, { message: 'Dose interval is required' }),

    dose_duration: z.string()
        .optional(),

    instruction: z.string().optional()
})


export const createPrescriptionFormSchema = z.object({
    header_note: z.string()
        .optional(),

    category: z.string()
        .min(1, { message: 'Finding Category is required' })
        .default(''),

    name: z.string()
        .min(1, { message: 'Name is required' })
        .default(''),

    description: z.string()
        .optional(),

    medicine: z.array(Medicine)

})



export const valuesASdefault = {
    medicine: [{
        category: '',
        medicineId: '',
        dose: '',
        dose_interval: '',
        dose_duration: '',
        instruction: ''
    }]
}