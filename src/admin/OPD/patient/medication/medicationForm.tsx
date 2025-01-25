import { searchMedicine } from '@/admin/pharmacy/pharmacyApiHandler'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { medicationFormSchema } from '@/formSchemas/medicationFormSchema'
import { categories } from '@/helpers/formSelectOptions'
import { MedicineList } from '@/types/type'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader, X } from 'lucide-react'
import { HTMLAttributes, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { createMedication } from '../../opdApiHandler'
import { useParams } from 'react-router-dom'

interface MedicationFormProps extends HTMLAttributes<HTMLDivElement> {
    ID: number
}

const MedicationForm = ({ ID, ...props }: MedicationFormProps) => {

    const [isPending, setPending] = useState<boolean>(false)
    const [medicines, setMedicines] = useState<MedicineList[]>([])
    const { caseId } = useParams()

    const { control, register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof medicationFormSchema>>({
        resolver: zodResolver(medicationFormSchema)
    })


    const fetchMedicinesList = async (value: string) => {
        try {
            const data = await searchMedicine(value)
            setMedicines(data)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    async function onSubmit(formData: z.infer<typeof medicationFormSchema>) {
        try {
            setPending(true)
            const data = await createMedication(Number(caseId), formData)
            toast.success(data.message)

        } catch ({ message }: any) {
            toast.error(message)
        } finally {
            setPending(true)
        }
    }

    return (
        <>
            <div {...props} className='fixed top-0 left-0 h-screen w-full transition-all z-[120]' style={{ background: '#0000009c' }}></div>

            <MaxWidthWrapper className='fixed h-auto  top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] z-[200] '>

                <form className=' bg-white rounded-md w-[300px] sm:w-[400px] mx-auto' onSubmit={handleSubmit(onSubmit)}>

                    {/* Header */}

                    <div className='flex justify-between p-3 rounded-t-lg  col-span-full'>
                        <p className='font-semibold text-xl rounded-xl py-1 px-4 bg-green-500 text-white'>Medication</p>
                        <div {...props}>
                            <X className='cursor-pointer' />
                        </div>
                    </div>


                    {/* mainGrid */}

                    <ScrollArea className='h-[50vh]'>

                        <div className="grid gap-5 mt-5 px-3 pb-5">

                            {/* Date */}

                            <div className="w-full flex flex-col gap-y-2">
                                <Label>Date</Label>
                                <Input type='date' {...register('date')} />
                                {errors.date && <p className='text-sm text-red-500'>{errors.date.message}</p>}
                            </div>


                            {/* Time */}

                            <div className="w-full flex flex-col gap-y-2 ">
                                <Label>Time</Label>
                                <Input type='time' {...register('time')} />
                                {errors.time && <p className='text-sm text-red-500'>{errors.time.message}</p>}
                            </div>


                            {/* category Not part of form (only used for get medicines by category) */}

                            <div className="w-full flex flex-col gap-y-2">
                                <Label>Medicine Category</Label>
                                <Select onValueChange={(value) => fetchMedicinesList(value)} >
                                    <SelectTrigger >
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>

                                    <SelectContent className='z-[200]'>
                                        {categories.map((options, index) => {
                                            return <SelectItem key={index} value={options.value}>{options.label}</SelectItem>
                                        })}
                                    </SelectContent>
                                </Select>
                            </div>



                            {/* Medicine */}

                            <div className="w-full flex flex-col gap-y-2">
                                <Controller control={control} name='medicineId' render={({ field }) => {
                                    return <>
                                        <Label>Medicine Name</Label>
                                        <Select value={field.value || ''} onValueChange={(value) => { field.onChange(value) }}>
                                            <SelectTrigger >
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>

                                            <SelectContent className='z-[200]'>
                                                {medicines.map((medicine, i) => {
                                                    return <SelectItem key={i} value={String(medicine.id)}>{medicine.name}</SelectItem>
                                                })}
                                            </SelectContent>
                                        </Select>
                                    </>
                                }} />
                                {errors.medicineId && <p className='text-sm text-red-500'>{errors.medicineId.message}</p>}

                            </div>


                            {/* dose */}

                            <div className="w-full flex flex-col gap-y-2 ">
                                <Label>Dose</Label>
                                <Input type='text' {...register('dose')} />
                                {errors.dose && <p className='text-sm text-red-500'>{errors.dose.message}</p>}
                            </div>


                            {/* Note */}

                            <div className="w-full flex flex-col gap-y-2 ">
                                <Label>Note</Label>
                                <Input type='text' {...register('note')} />
                                {errors.note && <p className='text-sm text-red-500'>{errors.note.message}</p>}
                            </div>

                        </div>

                    </ScrollArea>

                    <div className="flex mt-5 mb-2 p-3">
                        <Button type='submit' className='flex-1'>{ID ? 'Update' : 'Save Medicine'} {isPending && <Loader className='animate-spin' />}</Button>
                    </div>

                </form>
            </MaxWidthWrapper>
        </>
    )
}

export default MedicationForm