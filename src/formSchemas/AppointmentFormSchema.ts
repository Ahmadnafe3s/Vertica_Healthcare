import { z } from 'zod'


export const appointmentFormSchema = z.object({
    patientId: z.number()
        .min(1, { message: 'Please select a patient' }).default(0),

    doctorId: z.number()
        .min(1, { message: 'Please select a doctor' }).default(0),

    fees: z.number()
        .min(1, { message: 'Fees cannot be 0' })
        .default(0),

    shift: z.string()
        .min(1, { message: 'Please select shift' }).default(''),

    appointment_date: z.string()
        .min(1, { message: 'Please enetr valid date' })
        .refine(date => {
            const inputDate = new Date(date);
            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);

            return inputDate >= currentDate;  // if input date is equal or greater than should not happen annything
        }, { message: 'Appointment date cannot be in the past' }),

    appointment_priority: z.string()
        .min(1, { message: 'Please select priority' }).default(''),

    symptom_type: z.string()
        .min(1, { message: 'Please enter your symptom' }),

    symptom_description: z.string().optional(),

    payment_mode: z.string()
        .min(1, { message: 'Please select payment mode' }).default(''),


    status: z.string()
        .min(1, { message: 'Please select status' }).default(''),

    discount: z.number()
        .optional()
        .default(0),

    alternative_address: z.string().optional(),

    reference: z.string().optional(),

    previous_medical_issue: z.string().optional(),

    message: z.string().optional(),

    net_amount: z.number()
        .min(1, { message: 'Net amount cannot be 0' })
        .default(0)

})