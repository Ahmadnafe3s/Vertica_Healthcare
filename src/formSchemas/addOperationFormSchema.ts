import { z } from "zod";

export const operationFormSchema = z.object({
    category: z.string()
        .min(1, "Category is required")
        .default(''),

    name: z.string()
        .min(1, "Name is required")
        .default(''),

    date: z.string()
        .min(1, "Date is required"),

    doctorId: z.string()
        .min(1, "Doctor is required")
        .default(''),

    assistant_1: z.string()
        .optional(),

    assistant_2: z.string()
        .optional(),

    anesthetist: z.string()
        .optional(),

    anesthesia_type: z.string()
        .optional(),

    ot_technician: z.string()
        .optional(),

    ot_assistant: z.string()
        .optional(),

    note: z.string()
        .optional(),

    result: z.string()
        .optional(),
})