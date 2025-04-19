import { HTMLAttributes, useEffect, useState } from 'react'
import { Label } from '../../components/ui/label'
import { Input } from '../../components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select'
import { Textarea } from '../../components/ui/textarea'
import { Button } from '../../components/ui/button'
import { Loader } from 'lucide-react'
import { patientAppointmentFormSchema } from '@/formSchemas/AppointmentFormSchema'
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Doctors } from '@/types/type'
import toast from 'react-hot-toast'
import { filterDoctors } from '@/helpers/filterDoctors'
import { ScrollArea } from '@/components/ui/scroll-area'
import { currencySymbol } from '@/helpers/currencySymbol'
import Dialog from '@/components/Dialog'
import { fetchDoctors } from '@/pages/appointment/appointmentAPIhandler'



interface CreatePatientAppointmentProps extends HTMLAttributes<HTMLDivElement> {
    Submit: (formData: any) => void
    isPending: boolean
}



function CreatePatientAppointment({ Submit, isPending, ...props }: CreatePatientAppointmentProps) {

    const [doctors, setDoctors] = useState<Doctors[]>([])


    const { control, register, reset, setValue, watch, handleSubmit, formState: { errors } } = useForm<z.infer<typeof patientAppointmentFormSchema>>({
        resolver: zodResolver(patientAppointmentFormSchema)
    })



    const setValues = (doctorId: string) => {
        const data = filterDoctors(doctors, +doctorId)
        if (!data) return null
        setValue('fees', data.staff.fees)
        setValue('shift', data.shift)
    }


    // for calculating price
    useEffect(() => {
        const total = watch('fees')
        setValue('net_amount', total)
    }, [watch('fees')])


    useEffect(() => {
        try {
            (async function () {
                const appointmentDate = watch('appointment_date') as string
                if (appointmentDate) {
                    const data = await fetchDoctors(appointmentDate)
                    setDoctors(data)
                }
            })() //IIFE

        } catch ({ message }: any) {
            toast.error(message)
        }
    }, [watch('appointment_date')])



    return (
        <Dialog pageTitle='Add Appointment' {...props}>
            <form onSubmit={handleSubmit(Submit)}>
                {/* <div className='flex  gap-2 px-2.5'>

                    <div>
                        <Controller name='patientId' control={control} render={({ field }) => {
                            return <Select value={field.value ? String(field.value) : undefined} onValueChange={(value) => { field.onChange(Number(value)) }} defaultValue={'1'}>
                                <SelectTrigger className='sm:w-[300px] w-40'>
                                    <SelectValue placeholder="Search" />
                                </SelectTrigger>

                                <SelectContent className='z-[200]'>
                                    <Input type='search' className='w-full' placeholder='search patient' onChange={(e) => { onSearch(e.target.value) }} />
                                    {patients.map((patient, i) => {
                                        return <SelectItem key={i} value={String(patient.id)}>{`${patient.name} (${patient.id})`}</SelectItem>
                                    })}
                                </SelectContent>
                            </Select>
                        }} />
                        {errors.patientId && <p className='text-sm text-red-500'>{errors.patientId.message}</p>}
                    </div>
                    <div>
                        <Link to={{ pathname: '/registerPatient' }} className={buttonVariants(
                            {
                                variant: 'outline',
                                size: 'sm'
                            }
                        )}>New Patient</Link>
                    </div>
                </div>
                <div className='h-px w-full bg-gray-200 my-3' /> */}

                {/* grid for fields */}


                <ScrollArea className='h-[60vh] sm:h-[55vh]'>

                    <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-5 px-2.5">

                        {/* Appointment date */}

                        <div className="w-full flex flex-col gap-y-2">
                            <Label>Appointment Date</Label>
                            <Input type='date' {...register('appointment_date')} />
                            {errors.appointment_date && <p className='text-sm text-red-500'>{errors.appointment_date.message}</p>}
                        </div>


                        {/* doctors */}

                        <div className="w-full flex flex-col gap-y-2">
                            <Controller control={control} name='doctorId' render={({ field }) => {

                                return <>
                                    <Label>Doctor</Label>
                                    <Select value={field.value ? String(field.value) : undefined} onValueChange={(value) => { setValues(value); field.onChange(Number(value)) }}>
                                        <SelectTrigger >
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>

                                        <SelectContent className='z-[200]'>
                                            {doctors?.map((doctor, index) => {
                                                return <SelectItem key={index} value={String(doctor.staff.id)}>
                                                    {doctor.staff.name} <span className='text-sm text-gray-600'>{`(${doctor.staff.specialist})`}</span>
                                                </SelectItem>
                                            })}
                                        </SelectContent>
                                    </Select>
                                </>
                            }} />
                            {errors.doctorId && <p className='text-sm text-red-500'>{errors.doctorId.message}</p>}
                        </div>


                        {/* fees */}

                        <div className="w-full flex flex-col gap-y-2">
                            <Label>Doctor Fees {currencySymbol()}</Label>
                            <Input type='number' {...register('fees', { valueAsNumber: true })} defaultValue={0} />
                            {errors.fees && <p className='text-sm text-red-500'>{errors.fees.message}</p>}
                        </div>


                        {/* shift */}

                        <div className="w-full flex flex-col gap-y-2">
                            <Label>Shift</Label>
                            <Input {...register('shift')} disabled />
                            {errors.shift && <p className='text-sm text-red-500'>{errors.shift.message}</p>}
                        </div>


                        {/* Appointment priority */}

                        <div className="w-full flex flex-col gap-y-2">
                            <Controller control={control} name='appointment_priority' render={({ field }) => {
                                return <>
                                    <Label>Appointment priority</Label>
                                    <Select value={field.value || ''} onValueChange={(value) => { field.onChange(value) }}>
                                        <SelectTrigger >
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>

                                        <SelectContent className='z-[200]'>
                                            <SelectItem value="Urgent">Urgent</SelectItem>
                                            <SelectItem value="Very Urgent">Very Urgent</SelectItem>
                                            <SelectItem value="Low">Low</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </>
                            }} />
                            {errors.appointment_priority && <p className='text-sm text-red-500'>{errors.appointment_priority.message}</p>}
                        </div>

                        {/* symptom type */}

                        <div className="w-full flex flex-col gap-y-2">
                            <Label>Symptom Type</Label>
                            <Input type='text' {...register('symptom_type')} />
                            {errors.symptom_type && <p className='text-sm text-red-500'>{errors.symptom_type.message}</p>}
                        </div>

                        {/* Description */}

                        <div className="w-full flex flex-col gap-y-2 sm:col-span-2">
                            <Label>Symptom Description</Label>
                            <Textarea placeholder='write your symptoms here' {...register('symptom_description')} />
                            {errors.symptom_description && <p className='text-sm text-red-500'>{errors.symptom_description.message}</p>}
                        </div>


                        {/* Alternative Address */}

                        <div className="w-full flex flex-col gap-y-2">
                            <Label>Alternative Address</Label>
                            <Input type='text' {...register('alternative_address')} />
                            {errors.alternative_address && <p className='text-sm text-red-500'>{errors.alternative_address.message}</p>}
                        </div>

                        {/* Reference */}

                        <div className="w-full flex flex-col gap-y-2">
                            <Label>Reference</Label>
                            <Input type='text' {...register('reference')} />
                            {errors.reference && <p className='text-sm text-red-500'>{errors.reference.message}</p>}
                        </div>

                        {/* Previous issue */}

                        <div className="w-full flex flex-col gap-y-2">
                            <Label>Previous Issue</Label>
                            <Input type='text' {...register('previous_medical_issue')} />
                            {errors.previous_medical_issue && <p className='text-sm text-red-500'>{errors.previous_medical_issue.message}</p>}
                        </div>

                        {/* message */}

                        <div className="w-full flex flex-col gap-y-2">
                            <Label>Message</Label>
                            <Input type='text' placeholder='write your messsage here' {...register('message')} />
                            {errors.message && <p className='text-sm text-red-500'>{errors.message.message}</p>}
                        </div>

                        {/* net amount */}

                        <div className="w-full flex flex-col gap-y-2">
                            <Label>Net Amount {currencySymbol()}</Label>
                            <Input type='number' {...register('net_amount', { valueAsNumber: true })} defaultValue={0} disabled />
                            {errors.net_amount && <p className='text-sm text-red-500'>{errors.net_amount.message}</p>}
                        </div>

                    </div>
                </ScrollArea>

                <div className="flex mt-5 mb-2 gap-x-2 sm:justify-end px-2.5">
                    <Button type='button' variant={'ghost'} onClick={() => reset()} >Reset</Button>
                    <Button type='submit' className='flex-1 sm:flex-none' >Save Appointment {isPending && <Loader className='animate-spin' />}</Button>
                </div>

            </form>
        </Dialog>
    )
}

export default CreatePatientAppointment