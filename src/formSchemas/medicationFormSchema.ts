import { z } from "zod";

export const medicationFormSchema = z.object({

    medicineId: z.string()
        .min(1, { message: "Medicine name is required" })
        .default(''),

    date: z.string()
        .min(1, { message: "Date is required" })
        .refine((date) => {
            const inputDate = new Date(date);
            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);

            return inputDate >= currentDate;  // if input date is equal or greater than should not happen annything
        }, { message: 'Date cannot be in the past' }),

    time: z.string()
        .min(1, { message: "Time is required" }),

    dose: z.string()
        .min(1, { message: "Dose is required" }),

    note: z.string()
        .optional()

})