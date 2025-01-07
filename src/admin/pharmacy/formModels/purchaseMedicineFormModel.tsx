import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { PurchaseMedicineFormSchema } from '@/formSchemas/purchaseMedicineFormSchema'
import { categories } from '@/helpers/formSelectOptions'
import { X } from 'lucide-react'
import { HTMLAttributes } from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'


interface purchaseMedicineFormModelProps extends HTMLAttributes<HTMLDivElement> { }


const PurchaseMedicineFormModel = ({ ...props }: purchaseMedicineFormModelProps) => {

    const { handleSubmit, control, register, formState: { errors } } = useForm<z.infer<typeof PurchaseMedicineFormSchema>>()

    const { } = useFieldArray({
        control,
        name: 'medicines'
    })

    const onSubmit = () => { }

    return (
        <>
            <div {...props} className='fixed top-0 left-0 h-screen w-full transition-all z-[120]' style={{ background: '#0000009c' }}></div>

            <MaxWidthWrapper className='fixed h-auto max-h-[90vh] overflow-y-auto  top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] z-[200] '>

                <form className='p-3 bg-white rounded-md' onSubmit={handleSubmit(onSubmit)}>

                    {/* Header */}

                    <div className='flex justify-between pt-2 pb-3 border-b border-gray-200 col-span-full'>
                        <p className='font-semibold text-xl'>Add Appointment</p>
                        <div {...props}>
                            <X className='cursor-pointer' />
                        </div>
                    </div>


                    {/* mainGrid */}

                    <div className="grid md:grid-cols-3 gap-5 mt-5">

                        {/* category */}

                        <div className="w-full flex flex-col gap-y-2">
                            <Controller control={control} name='category' render={({ field }) => {
                                return <>
                                    <Label>Medicine Category</Label>
                                    <Select value={field.value || ''} onValueChange={(value) => { field.onChange(value) }}>
                                        <SelectTrigger >
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>

                                        <SelectContent className='z-[200]'>
                                            {categories.map((options, index) => {
                                                return <SelectItem key={index} value={options.value}>{options.label}</SelectItem>
                                            })}
                                        </SelectContent>

                                    </Select>
                                </>
                            }} />
                            {errors.category && <p className='text-sm text-red-500'>{errors.category.message}</p>}
                        </div>


                        {/* Name */}

                        <div className="w-full flex flex-col gap-y-2">
                            <Label>Medicine Name</Label>
                            <Input type='text' {...register('name')} />
                            {errors.name && <p className='text-sm text-red-500'>{errors.name.message}</p>}
                        </div>


                        {/* company */}

                        <div className="w-full flex flex-col gap-y-2">
                            <Controller control={control} name='' render={({ field }) => {
                                return <>
                                    <Label>Company</Label>
                                    <Select value={field.value || ''} onValueChange={(value) => { field.onChange(value) }}>
                                        <SelectTrigger >
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>

                                        <SelectContent className='z-[200]'>
                                            {Companies.map((options, index) => {
                                                return <SelectItem key={index} value={options.value}>{options.label}</SelectItem>
                                            })}
                                        </SelectContent>
                                    </Select>
                                </>
                            }} />
                        </div>


                        {/* Composition */}

                        <div className="w-full flex flex-col gap-y-2">
                            <Label>Medicine Composition</Label>
                            <Input type='text' {...register('composition')} />
                        </div>


                        {/* Group */}

                        <div className="w-full flex flex-col gap-y-2">
                            <Controller control={control} name='group' render={({ field }) => {
                                return <>
                                    <Label>Appointment priority</Label>
                                    <Select value={field.value || ''} onValueChange={(value) => { field.onChange(value) }}>
                                        <SelectTrigger >
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>

                                        <SelectContent className='z-[200]'>
                                            <SelectContent className='z-[200]'>
                                                {group.map((options, index) => {
                                                    return <SelectItem key={index} value={options.value}>{options.label}</SelectItem>
                                                })}
                                            </SelectContent>
                                        </SelectContent>
                                    </Select>
                                </>
                            }} />
                        </div>


                        {/* unit */}

                        <div className="w-full flex flex-col gap-y-2">
                            <Controller control={control} name='unit' render={({ field }) => {
                                return <>
                                    <Label>Appointment priority</Label>
                                    <Select value={field.value || ''} onValueChange={(value) => { field.onChange(value) }}>
                                        <SelectTrigger >
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>

                                        <SelectContent className='z-[200]'>
                                            <SelectContent className='z-[200]'>
                                                {units.map((options, index) => {
                                                    return <SelectItem key={index} value={options.value}>{options.label}</SelectItem>
                                                })}
                                            </SelectContent>
                                        </SelectContent>
                                    </Select>
                                </>
                            }} />
                        </div>


                        {/* min level */}

                        <div className="w-full flex flex-col gap-y-2 ">
                            <Label>Min Level</Label>
                            <Input type='number' {...register('min_level')} />
                        </div>


                        {/* reorder level */}

                        <div className="w-full flex flex-col gap-y-2 ">
                            <Label>Re-Order Level</Label>
                            <Input type='number' {...register('reorder_level')} />
                        </div>


                        {/* Tax */}

                        <div className="w-full flex flex-col gap-y-2 ">
                            <Label>Tax</Label>
                            <Input type='number' {...register('tax')} />
                        </div>

                        {/* Packing */}

                        <div className="w-full flex flex-col gap-y-2 ">
                            <Label>Packing</Label>
                            <Input type='number' {...register('packing')} />
                            {errors.packing && <p className='text-sm text-red-500'>{errors.packing.message}</p>}
                        </div>

                        {/* Vat */}

                        <div className="w-full flex flex-col gap-y-2 ">
                            <Label>VAT</Label>
                            <Input type='number' {...register('vat')} />
                        </div>


                        {/* Rack Number */}

                        <div className="w-full flex flex-col gap-y-2 ">
                            <Label>Rack No</Label>
                            <Input type='text' {...register('rack_no')} />
                        </div>

                        {/* Note */}

                        <div className="w-full flex flex-col gap-y-2 ">
                            <Label>Note</Label>
                            <Input type='text' {...register('note')} />
                        </div>

                    </div>
                    <div className="flex mt-5 mb-2 gap-x-2 sm:justify-end">
                        <Button type='button' size={'sm'} variant={'outline'} onClick={() => { reset() }}>reset</Button>
                        <Button type='submit' size={'sm'}>Save</Button>
                    </div>

                </form>
            </MaxWidthWrapper>
        </>
    )
}

export default PurchaseMedicineFormModel