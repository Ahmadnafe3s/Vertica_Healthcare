import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { categories, Companies, compositions, group, units } from '@/helpers/formSelectOptions'
import { AddMedicinesFormSchema } from '@/formSchemas/addMedicinesFormSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader, X } from 'lucide-react'
import { HTMLAttributes, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { createMedicine, getMedicinedetails, updateMedicine } from '../pharmacyApiHandler'
import { ScrollArea } from '@/components/ui/scroll-area'


interface AddMedicineFormModelProps extends HTMLAttributes<HTMLDivElement> {
    ID: number | undefined
}

const AddMedicineFormModel = ({ ID, ...props }: AddMedicineFormModelProps) => {

    const [isPending, setPending] = useState<boolean>(false)

    const { register, reset, setValue, handleSubmit, control, formState: { errors } } = useForm<z.infer<typeof AddMedicinesFormSchema>>(
        {
            resolver: zodResolver(AddMedicinesFormSchema)
        }
    )


    const onSubmit = async (formData: z.infer<typeof AddMedicinesFormSchema>) => {
        try {

            let data;
            setPending(true)
            if (ID) {
                data = await updateMedicine(ID, formData)
            } else {
                data = await createMedicine(formData)  // add data into database
            }
            toast.success(data.message)

        } catch ({ message }: any) {

            toast.error(message)

        } finally {
            setPending(false)
        }
    }


    useEffect(() => {
        try {
            (async function setValues() {
                if (!ID) return null
                const data = await getMedicinedetails(Number(ID))
                console.log(data);

                setValue('name', data.name)
                setValue('category', data.category)
                setValue('company', data.company)
                setValue('composition', data.composition)
                setValue('group', data.group)
                setValue('unit', data.unit)
                setValue('unit', data.unit)
                setValue('min_level', data.min_level)
                setValue('reorder_level', data.reorder_level)
                setValue('rack_no', data.rack_no)
                setValue('note', data.note)
            })()

        } catch ({ message }: any) {
            toast.error(message)
        }
    }, [])

    return (
        <>
            <div {...props} className='fixed top-0 left-0 h-screen w-full transition-all z-[120]' style={{ background: '#0000009c' }}></div>

            <MaxWidthWrapper className='fixed h-auto  top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] z-[200] '>

                <form className=' bg-white rounded-md' onSubmit={handleSubmit(onSubmit)}>

                    {/* Header */}

                    <div className='flex justify-between p-3 rounded-t-lg bg-orange-200  col-span-full'>
                        <p className='font-semibold text-xl'>Add Medicine</p>
                        <div {...props}>
                            <X className='cursor-pointer' />
                        </div>
                    </div>


                    {/* mainGrid */}

                    <ScrollArea className='h-[70vh] sm:h-[50vh]'>

                        <div className="grid md:grid-cols-3 gap-5 mt-5 px-3 pb-5">

                            {/* Name */}

                            <div className="w-full flex flex-col gap-y-2">
                                <Label>Medicine Name</Label>
                                <Input type='text' {...register('name')} />
                                {errors.name && <p className='text-sm text-red-500'>{errors.name.message}</p>}
                            </div>

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



                            {/* company */}

                            <div className="w-full flex flex-col gap-y-2">
                                <Controller control={control} name='company' render={({ field }) => {
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
                                {errors.company && <p className='text-sm text-red-500'>{errors.company.message}</p>}

                            </div>


                            {/* Composition */}

                            <div className="w-full flex flex-col gap-y-2">
                                <Controller control={control} name='composition' render={({ field }) => {
                                    return <>
                                        <Label>Composition</Label>
                                        <Select value={field.value || ''} onValueChange={(value) => { field.onChange(value) }}>
                                            <SelectTrigger >
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>

                                            <SelectContent className='z-[200]'>
                                                <SelectContent className='z-[200]'>
                                                    {compositions.map((options, index) => {
                                                        return <SelectItem key={index} value={options.value}>{options.label}</SelectItem>
                                                    })}
                                                </SelectContent>
                                            </SelectContent>
                                        </Select>
                                    </>
                                }} />
                                {errors.composition && <p className='text-sm text-red-500'>{errors.composition.message}</p>}
                            </div>


                            {/* Group */}

                            <div className="w-full flex flex-col gap-y-2">
                                <Controller control={control} name='group' render={({ field }) => {
                                    return <>
                                        <Label>Medicine Group</Label>
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
                                {errors.group && <p className='text-sm text-red-500'>{errors.group.message}</p>}
                            </div>


                            {/* unit */}


                            <div className="w-full flex flex-col gap-y-2">
                                <Controller control={control} name='unit' render={({ field }) => {
                                    return <>
                                        <Label>Unit</Label>
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
                                {errors.unit && <p className='text-sm text-red-500'>{errors.unit.message}</p>}
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
                    </ScrollArea>

                    <div className="flex mt-5 mb-2 p-3 gap-x-2 sm:justify-end">
                        <Button type='button'  variant={'outline'} onClick={() => { reset() }}>reset</Button>
                        <Button type='submit' className='flex-1 sm:flex-none' >{ID ? 'Update' : 'Save Medicine'} {isPending && <Loader className='animate-spin' />}</Button>
                    </div>

                </form>
            </MaxWidthWrapper>
        </>
    )
}

export default AddMedicineFormModel