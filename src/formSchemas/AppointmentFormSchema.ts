import { z } from 'zod'


export const appointmentFormSchema = z.object({
    doctor: z.string()
        .min(1, { message: 'Please select a doctor' }).default(''),

    fees: z.string()
        .min(1, { message: 'Please enter fees' }),

    shift: z.string()
        .min(1, { message: 'Please select shift' }).default(''),

    appointment_date: z.string()
        .min(1, { message: 'Please enetr valid date' }),

    appointment_priority: z.string()
        .min(1, { message: 'Please select priority' }).default(''),

    symptom_type: z.string()
        .min(1, { message: 'Please enter your symptom' }),

    symptom_description: z.string().optional(),

    payment_mode: z.string()
        .min(1, { message: 'Please select payment mode' }).default(''),


    status: z.string()
        .min(1, { message: 'Please select status' }).default(''),

    discount: z.string()
        .min(1, { message: 'Please enter discount %' }),

    alternative_address: z.string().optional(),

    reference: z.string().optional(),

    previous_medical_issue: z.string().optional(),

    message: z.string().optional(),

})