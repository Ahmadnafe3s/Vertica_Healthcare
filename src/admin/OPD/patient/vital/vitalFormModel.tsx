import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { vitalFormSchema } from '@/formSchemas/vitalFormSchema'
import { Vitals } from '@/helpers/formSelectOptions'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader } from 'lucide-react'
import { HTMLAttributes, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { createVital } from '../../opdApiHandler'
import { useParams } from 'react-router-dom'
import Dialog from '@/components/Dialog'



interface VitalFormModelProps extends HTMLAttributes<HTMLDivElement> { }


const VitalFormModel = ({ ...props }: VitalFormModelProps) => {

    const { patientId, caseId } = useParams()

    const [isPending, setPending] = useState<boolean>(false)

    const { register, control, handleSubmit, formState: { errors } } = useForm<z.infer<typeof vitalFormSchema>>({
        resolver: zodResolver(vitalFormSchema)
    })


    const onSubmit = async (formData: z.infer<typeof vitalFormSchema>) => {
        try {
            console.log(patientId);

            setPending(true)
            const data = await createVital(Number(patientId), Number(caseId), formData)
            toast.success(data.message)
        } catch ({ message }: any) {
            toast.error(message)
        } finally {
            setPending(false)
        }
    }


    return (

        <Dialog pageTitle='Add Payment' {...props} className='sm:w-[400px] mx-auto'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <ScrollArea className={'relative h-[50vh] w-full'}>
                    <div className="grid gap-5 mt-5 px-3 pb-5 ">

                        {/* Date */}

                        <div className="w-full flex flex-col gap-y-2">
                            <Label>Date</Label>
                            <Input type='date' {...register('date')} />
                            {errors.date && <p className='text-sm text-red-500'>{errors.date.message}</p>}
                        </div>


                        {/* name */}

                        <div className="w-full flex flex-col gap-y-2">
                            <Controller control={control} name='name' render={({ field }) => {
                                return <>
                                    <Label>Vital Name</Label>
                                    <Select value={field.value || ''} onValueChange={(value) => { field.onChange(value) }}>
                                        <SelectTrigger >
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>

                                        <SelectContent className='z-[200]'>
                                            {Vitals.map((vital, i) => {
                                                return <SelectItem key={i} value={vital.value}>{vital.label}</SelectItem>
                                            })}
                                        </SelectContent>
                                    </Select>
                                </>
                            }} />
                            {errors.name && <p className='text-sm text-red-500'>{errors.name.message}</p>}

                        </div>

                        {/* Value */}

                        <div className="w-full flex flex-col gap-y-2 ">
                            <Label>Value</Label>
                            <Input type='text' {...register('value')} />
                            {errors.value && <p className='text-sm text-red-500'>{errors.value.message}</p>}
                        </div>
                    </div>
                </ScrollArea>
                <div className="flex mt-5 mb-2 p-3 gap-x-2 sm:justify-end">
                    <Button type='submit' className='flex-1'>Save Vitals {isPending && <Loader className='animate-spin' />}</Button>
                </div>
            </form>
        </Dialog>
    )
}

export default VitalFormModel