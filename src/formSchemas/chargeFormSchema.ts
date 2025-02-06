import { z } from "zod";

const charges = z.object({
    chargeTypeId: z.string()
        .min(1, { message: 'Select charge type' })
        .default(''),

    categoryId: z.string()
        .min(1, { message: 'Select charge category' })
        .default(''),

    chargeNameId: z.string()
        .min(1, { message: 'Select charge name' }),

    standard_charge: z.number()
        .int()
        .min(1, 'Amount must be at least 1'),

    tpa: z.number()
        .int()
        .default(0),

    date: z.string()
        .min(1, { message: 'Date is required' }),

    total: z.number()
        .int()
        .min(1, 'Total amount must be at least 1'),

    tax: z.number()
        .int()
        .min(0, 'Tax amount must be at least 0'),

    discount: z.number()
        .int()
        .min(0, 'Tax amount must be at least 0'),

    net_amount: z.number()
        .int()
        .min(1, 'Net amount must be at least 1'),
})



export const chargeFormSchema = z.object({

    charge: z.array(charges),

})




export const valuesASdefault = {
    total: 0,
    tax: 0,
    discount: 0,
    net_amount: 0,
    charge: [{
        charge_type: '',
        category: '',
        name: '',
        amount: 0,
        tpa: 0,
        date: '',
        total: 0,
        tax: 0,
        discount: 0,
        net_amount: 0
    }]
}