import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { PurchaseMedicineFormSchema } from '@/formSchemas/purchaseMedicineFormSchema'
import { calculateAmount } from '@/helpers/calculateAmount'
import { categories } from '@/helpers/formSelectOptions'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { createPurchase, searchMedicine } from '../pharmacyApiHandler'
import { MedicineList } from '@/types/type'
import { Textarea } from '@/components/ui/textarea'
import { currencySymbol } from '@/helpers/currencySymbol'

const PurchaseMedicineForm = () => {

    const [medicines, setMedicines] = useState<MedicineList[]>([])

    const { register, watch, control, handleSubmit, setValue, formState: { errors } } = useForm<z.infer<typeof PurchaseMedicineFormSchema>>({
        resolver: zodResolver(PurchaseMedicineFormSchema)
    })


    const fetchMedicinesList = async (value: string) => {
        try {
            const data = await searchMedicine(value)
            setMedicines(data)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }





    async function onSubmit(formData: z.infer<typeof PurchaseMedicineFormSchema>) {
        try {
            const data = await createPurchase(formData)
            toast.success(data.message)

        } catch ({ message }: any) {
            toast.error(message)
        }
    }




    useEffect(() => {

        const Amount = calculateAmount(+watch('quantity'), +watch('purchase_price'), +watch('tax')!, +watch('discount')!)

        setValue('amount', Amount.amount)
        setValue('total_amount', Amount.total_amount)


    }, [watch('tax'), watch('discount'), watch('quantity'), watch('purchase_price')])



    return (
        <section className='bg-slate-50 pt-5 pb-20'>
            <form className='p-5 grid  sm:grid-cols-2 lg:grid-cols-3 ring-1 ring-gray-200 rounded-lg gap-4' onSubmit={handleSubmit(onSubmit)}>

                {/* header */}
                <div className="col-span-full">
                    <h1 className='text-lg font-bold'>Purchase Medicine</h1>
                </div>

                {/* separator */}
                <div className="h-px bg-gray-200 col-span-full mt-3 mb-4" />


                {/* category */}

                <div className="w-full flex flex-col gap-y-2">
                    <Controller control={control} name='category' render={({ field }) => {
                        return <>
                            <Label>Category</Label>
                            <Select value={field.value || ''} onValueChange={(value) => { fetchMedicinesList(value); field.onChange(value) }}>
                                <SelectTrigger >
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>

                                <SelectContent className='z-[200]'>
                                    {categories?.map((category, index) => {
                                        return <SelectItem key={index} value={category.value}>{category.label}</SelectItem>
                                    })}
                                </SelectContent>
                            </Select>
                        </>
                    }} />
                    {errors.category && <p className='text-sm text-red-500'>{errors.category.message}</p>}
                </div>


                {/* medicine names */}

                <div className="w-full flex flex-col gap-y-2">
                    <Controller control={control} name='medicineId' render={({ field }) => {
                        return <>
                            <Label>Medicine Name</Label>
                            <Select value={field.value || ''} onValueChange={(value) => { field.onChange(value) }}>
                                <SelectTrigger >
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>

                                <SelectContent className='z-[200]'>
                                    {medicines?.map((medicine, index) => {
                                        return <SelectItem key={index} value={String(medicine.id)}>{medicine.name}</SelectItem>
                                    })}
                                </SelectContent>
                            </Select>
                        </>
                    }} />
                    {errors.medicineId && <p className='text-sm text-red-500'>{errors.medicineId.message}</p>}
                </div>


                {/* Supplier Name */}

                <div className="w-full flex flex-col gap-y-2">
                    <Label>Supplier Name</Label>
                    <Input type='text' {...register('supplier_name')} />
                    {errors.supplier_name && <p className='text-sm text-red-500'>{errors.supplier_name.message}</p>}
                </div>

                {/* batch No. */}

                <div className="w-full flex flex-col gap-y-2">
                    <Label>Batch No.</Label>
                    <Input type='number' {...register('batch_no')} />
                    {errors.batch_no && <p className='text-sm text-red-500'>{errors.batch_no.message}</p>}
                </div>


                {/* Expiry date */}

                <div className="w-full flex flex-col gap-y-2">
                    <Label>Purcahse Date</Label>
                    <Input type='date' {...register('purchase_date')} />
                    {errors.purchase_date && <p className='text-sm text-red-500'>{errors.purchase_date.message}</p>}
                </div>

                {/* Expiry date */}

                <div className="w-full flex flex-col gap-y-2">
                    <Label>Expiry Date</Label>
                    <Input type='date' {...register('expiry_date')} />
                    {errors.expiry_date && <p className='text-sm text-red-500'>{errors.expiry_date.message}</p>}
                </div>

                {/*MRP */}

                <div className="w-full flex flex-col gap-y-2">
                    <Label>MRP {currencySymbol()}</Label>
                    <Input type='number' step="0.01" {...register('MRP')} />
                    {errors.MRP && <p className='text-sm text-red-500'>{errors.MRP.message}</p>}
                </div>

                {/*Sale Price */}

                <div className="w-full flex flex-col gap-y-2">
                    <Label>Sale Price {currencySymbol()}</Label>
                    <Input type='number' {...register('sale_price')} />
                    {errors.sale_price && <p className='text-sm text-red-500'>{errors.sale_price.message}</p>}
                </div>

                {/*Packing Quantity */}

                <div className="w-full flex flex-col gap-y-2">
                    <Label>Packing Quantity</Label>
                    <Input type='number' {...register('packing_quantity')} />
                    {errors.packing_quantity && <p className='text-sm text-red-500'>{errors.packing_quantity.message}</p>}
                </div>


                {/* Quantity */}

                <div className="w-full flex flex-col gap-y-2">
                    <Label>Quantity</Label>
                    <Input type='number' {...register('quantity', { valueAsNumber: true })} />
                    {errors.quantity && <p className='text-sm text-red-500'>{errors.quantity.message}</p>}
                </div>


                {/* Purcahse Price */}

                <div className="w-full flex flex-col gap-y-2">
                    <Label>Purcahse Price {currencySymbol()}</Label>
                    <Input type='number' {...register('purchase_price')} />
                    {errors.purchase_price && <p className='text-sm text-red-500'>{errors.purchase_price.message}</p>}
                </div>

                {/*  Amount */}

                <div className="w-full flex flex-col gap-y-2">
                    <Label>Amount {currencySymbol()}</Label>
                    <Input type='number' {...register('amount')} disabled />
                    {errors.amount && <p className='text-sm text-red-500'>{errors.amount.message}</p>}
                </div>

                {/* Tax% */}

                <div className="w-full flex flex-col gap-y-2">
                    <Label>Tax%</Label>
                    <Input type='number' {...register('tax')} />
                    {errors.tax && <p className='text-sm text-red-500'>{errors.tax.message}</p>}
                </div>

                {/* Discount% */}

                <div className="w-full flex flex-col gap-y-2">
                    <Label>Discount%</Label>
                    <Input type='number' {...register('discount')} />
                    {errors.discount && <p className='text-sm text-red-500'>{errors.discount.message}</p>}
                </div>


                {/* Total Amount */}

                <div className="w-full flex flex-col gap-y-2">
                    <Label>Total Amount {currencySymbol()}</Label>
                    <Input type='number' {...register('total_amount')} disabled />
                    {errors.total_amount && <p className='text-sm text-red-500'>{errors.total_amount.message}</p>}
                </div>

                {/* Payment mode */}

                <div className="w-full flex flex-col gap-y-2">
                    <Controller control={control} name='payment_mode' render={({ field }) => {
                        return <>
                            <Label>Payment mode</Label>
                            <Select value={field.value || ''} onValueChange={(value) => { field.onChange(value) }}>
                                <SelectTrigger >
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>

                                <SelectContent className='z-[200]'>
                                    <SelectItem value="cash">Cash</SelectItem>
                                    <SelectItem value="to bank">Transfer to Bank</SelectItem>
                                    <SelectItem value="cheque">Cheque</SelectItem>
                                    <SelectItem value="upi">UPI</SelectItem>
                                    <SelectItem value="online">Online</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </>
                    }} />
                    {errors.payment_mode && <p className='text-sm text-red-500'>{errors.payment_mode.message}</p>}
                </div >


                <div className="w-full flex flex-col gap-y-2">
                    <Label>Note</Label>
                    <Textarea {...register('note')} placeholder='Write note here' />
                    {errors.note && <p className='text-sm text-red-500'>{errors.note.message}</p>}
                </div>

                <div className="col-span-full">
                    <Button type='submit' className='w-full sm:w-auto'>Save</Button>
                </div>

            </form>
        </section>
    )
}

export default PurchaseMedicineForm