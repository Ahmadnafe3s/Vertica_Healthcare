import { z } from "zod";

export const paymentFormSchema = z.object({
    date: z.string()
        .min(1, { message: 'Date is required' }),

    amount: z.number()
        .min(1, { message: 'Amount should be atleast 1' }),

    payment_mode: z.string()
        .min(1, { message: 'Payment mode is required' })
        .default(''),

    note: z.string()
        .optional()
})