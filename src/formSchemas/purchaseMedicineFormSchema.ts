import { z } from 'zod'


export const PurchaseMedicineFormSchema = z.object({
    category: z.string()
        .min(1, { message: 'Medicine category is required' })
        .default(''),

    name: z.string()
        .min(1, { message: 'Medicine name is required' })
        .default(''),

    supplier_name: z.string()
        .min(1, { message: 'Supplier name is required' }),

    batch_no: z.string()
        .min(1, { message: 'Batch no is required' }),

    expiry_date: z.string()
        .min(1, { message: 'Expiry date is required' }),

    MRP: z.string()
        .min(1, { message: 'MRP is required' }),

    sale_price: z.string().optional(),

    packing_quantity: z.string().optional(),

    quantity: z.string()
        .min(1, { message: 'Quantity is required' }),

    purchase_price: z.string()
        .min(1, { message: 'Purchase price is required' }),

    tax: z.number().default(0),

    discount: z.number().default(0),

    amount: z.number().optional().default(0),

    total_amount: z.number().optional().default(0),

    payment_mode: z.string()
        .min(1, { message: 'Select payment mode' }),

    note: z.string().optional(),
})
