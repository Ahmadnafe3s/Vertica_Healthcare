import { z } from "zod";

export const AddMedicinesFormSchema = z.object({
    name: z.string()
        .min(1, { message: 'Medicine Name is required' }),

    category: z.string()
        .min(1, { message: 'Select medicine category' })
        .default(''),

    company: z.string()
        .optional(),

    composition: z.string()
        .optional(),

    group: z.string()
        .optional(),

    unit: z.string()
        .min(1, { message: 'Select medicine unit' })
        .default(''),

    min_level: z.string()
        .optional(),

    reorder_level: z.string()
        .optional(),

    tax: z.string()
        .optional(),

    packing: z.string()
        .min(1, { message: 'Packing field is required' }),

    vat: z.string()
        .optional(),

    rack_no: z.string()
        .optional(),

    note: z.string()
        .optional(),
})