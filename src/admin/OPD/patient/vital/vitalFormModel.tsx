import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { vitalFormSchema } from '@/formSchemas/vitalFormSchema'
import { Vitals } from '@/helpers/formSelectOptions'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader, X } from 'lucide-react'
import { HTMLAttributes, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { createVital } from '../../opdApiHandler'
import { useParams } from 'react-router-dom'


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
        <>
            <div {...props} className='fixed top-0 left-0 h-screen w-full transition-all z-[120]' style={{ background: '#0000009c' }}></div>

            <MaxWidthWrapper className='fixed h-auto  top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] z-[200] '>

                <form className=' bg-white rounded-md sm:w-[400px] mx-auto' onSubmit={handleSubmit(onSubmit)}>

                    {/* Header */}

                    <div className='flex justify-between p-3 col-span-full border-b border-gray-200'>
                        <p className='font-semibold text-xl text-white bg-green-500 py-1 px-4 rounded-xl'>Vitals</p>
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
            </MaxWidthWrapper>
        </>
    )
}

export default VitalFormModel