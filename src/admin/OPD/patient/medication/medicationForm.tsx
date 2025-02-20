import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { medicationFormSchema } from '@/formSchemas/medicationFormSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader } from 'lucide-react'
import { HTMLAttributes, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { medicines } from '@/types/pharmacy/pharmacy'
import { getMedicineList } from '@/admin/pharmacy/pharmacyApiHandler'
import { medicineCategory } from '@/types/setupTypes/pharmacy'
import { getMedicineCategories } from '@/admin/setup/pharmacy/apiHandler'
import Dialog from '@/components/Dialog'
import { medicationDetail } from '@/types/opd_section/medication'



interface MedicationFormProps extends HTMLAttributes<HTMLDivElement> {
    medicationDetails: medicationDetail
    isPending: boolean
    Submit: (formData: any) => void
}


const MedicationForm = ({ Submit, isPending, medicationDetails, ...props }: MedicationFormProps) => {


    // API states
    const [categories, setCategories] = useState<medicineCategory[]>([])
    const [medicines, setMedicines] = useState<medicines[]>([])


    const { control, register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof medicationFormSchema>>({
        resolver: zodResolver(medicationFormSchema),
        defaultValues: {
            ...medicationDetails,
            medicineId: String(medicationDetails?.medicineId),
            category: medicationDetails?.medicine.category.name
        }
    })


    const handleCategoryChange = async (value: string) => {
        try {
            const data = await getMedicineList(value)
            setMedicines(data)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    const fetchMedicineCategories = async () => {
        try {
            const data = await getMedicineCategories()
            setCategories(data)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    useEffect(() => {
        fetchMedicineCategories()
        if (medicationDetails) handleCategoryChange(medicationDetails.medicine.category.name) // for edit mode
    }, [])



    return (
        <Dialog pageTitle={'Medictaion'} {...props} className='sm:w-[400px] mx-auto'>
            <form onSubmit={handleSubmit(Submit)}>

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


                        {/* Catgeory */}

                        <div className="w-full flex flex-col gap-y-2">
                            <Controller control={control} name='category' render={({ field }) => {
                                return <>
                                    <Label>Medicine Category</Label>
                                    <Select value={field.value || ''} onValueChange={(value) => { handleCategoryChange(value); field.onChange(value) }}>
                                        <SelectTrigger >
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>

                                        <SelectContent className='z-[200]'>
                                            {categories.map((category) => (
                                                <SelectItem key={category.id} value={category.name}>{category.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </>
                            }} />
                            {errors.category && <p className='text-sm text-red-500'>{errors.category.message}</p>}

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
                    <Button type='submit' className='flex-1'>{medicationDetails ? 'Update' : 'Save Medicine'} {isPending && <Loader className='animate-spin' />}</Button>
                </div>

            </form>
        </Dialog>
    )
}

export default MedicationForm