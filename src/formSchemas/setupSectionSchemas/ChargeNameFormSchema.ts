import { z } from "zod";

export const chargeNameFormSchema = z.object({

    chargeTypeId: z.string()
        .min(1, { message: "Charge type is required" })
        .default(''),

    categoryId: z.string()
        .min(1, { message: "Charge category is required" })
        .default(''),

    name: z.string()
        .min(1, { message: "Name is required" }),

    unitId: z.string()
        .min(1, { message: "Unit is required" })
        .default(''),

    taxId: z.string()
        .min(1, { message: "Tax is required" })
        .default(''),

    tax_percentage: z.number(),

    standard_charge: z.number()
        .min(1, { message: 'Values should be atleast 1' })
        .default(0),

    tpa: z.number()
        .min(0, { message: 'Values should be atleast 0' })
        .default(0),

})