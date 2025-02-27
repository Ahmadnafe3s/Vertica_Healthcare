import { HTMLAttributes, useEffect, useState } from 'react'
import { Label } from '../../components/ui/label'
import { Input } from '../../components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select'
import { Textarea } from '../../components/ui/textarea'
import { Button, buttonVariants } from '../../components/ui/button'
import { Loader } from 'lucide-react'
import { appointmentFormSchema } from '@/formSchemas/AppointmentFormSchema'
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router-dom'
import { Doctors, Patients } from '@/types/type'
import toast from 'react-hot-toast'
import { fetchDoctors, fetchPatients } from './appointmentAPIhandler'
import { filterDoctors } from '@/helpers/filterDoctors'
import { ScrollArea } from '@/components/ui/scroll-area'
import { currencySymbol } from '@/helpers/currencySymbol'
import { PaymentOptions } from '@/helpers/formSelectOptions'
import Dialog from '@/components/Dialog'
import { useDebouncedCallback } from 'use-debounce'



interface AddAppointmentProps extends HTMLAttributes<HTMLDivElement> {
    Submit: (formData: any) => void
    isPending: boolean
}



function AddAppointment({ Submit, isPending, ...props }: AddAppointmentProps) {


    const [patients, setPatients] = useState<Patients[]>([])
    const [doctors, setDoctors] = useState<Doctors[]>([])

    const { control, register, reset, setValue, watch, handleSubmit, formState: { errors } } = useForm<z.infer<typeof appointmentFormSchema>>({
        resolver: zodResolver(appointmentFormSchema)
    })


    const onSearch = useDebouncedCallback(async (value: string) => {
        try {
            const data = await fetchPatients(value)
            setPatients(data)
        } catch ({ message }: any) {
            toast.error(message)
        }
    },400)




    const setValues = (doctorId: string) => {
        const data = filterDoctors(doctors, +doctorId)
        if (!data) return null
        setValue('fees', data.staff.fees)
        setValue('shift', data.shift)
    }


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
    }, [watch('appointment_date'),])



    return (
        <Dialog pageTitle='Add Appointment' {...props}>
            <form onSubmit={handleSubmit(Submit)}>
                <div className='flex  gap-2 px-2.5'>
                    {/* Patient Section */}
                    <div>
                        <Controller name='patientId' control={control} render={({ field }) => {
                            return <Select value={field.value ? String(field.value) : undefined} onValueChange={(value) => { field.onChange(Number(value)) }}>
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
                <div className='h-px w-full bg-gray-200 my-3' />

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
                            <Input type='number' {...register('fees')} />
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
                                            <SelectItem value="urgent">Urgent</SelectItem>
                                            <SelectItem value="very urgent">Very Urgent</SelectItem>
                                            <SelectItem value="low">Low</SelectItem>
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
                                            {PaymentOptions.map((payment, i) => {
                                                return <SelectItem key={i} value={payment.value}>{payment.label}</SelectItem>
                                            })}
                                        </SelectContent>
                                    </Select>
                                </>
                            }} />
                            {errors.payment_mode && <p className='text-sm text-red-500'>{errors.payment_mode.message}</p>}
                        </div >

                        {/* Status */}

                        <div className="w-full flex flex-col gap-y-2">
                            <Controller control={control} name='status' render={({ field }) => {
                                return <>
                                    <Label>Status</Label>
                                    <Select value={field.value || ''} onValueChange={(value) => { field.onChange(value) }}>
                                        <SelectTrigger >
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>

                                        <SelectContent className='z-[200]'>
                                            <SelectItem value="approved">Approved</SelectItem>
                                            <SelectItem value="pending">Pending</SelectItem>
                                            <SelectItem value="cancelled">Cancel</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </>
                            }} />
                            {errors.status && <p className='text-sm text-red-500'>{errors.status.message}</p>}
                        </div >

                        <div className="w-full flex flex-col gap-y-2">
                            <Label>Discount Percentage</Label>
                            <Input type='number' {...register('discount')} />
                        </div>

                        <div className="w-full flex flex-col gap-y-2">
                            <Label>Alternative Address</Label>
                            <Input type='text' {...register('alternative_address')} />
                        </div>

                        <div className="w-full flex flex-col gap-y-2">
                            <Label>Reference</Label>
                            <Input type='text' {...register('reference')} />
                        </div>

                        <div className="w-full flex flex-col gap-y-2">
                            <Label>Previous Issue</Label>
                            <Input type='text' {...register('previous_medical_issue')} />
                        </div>

                        <div className="w-full flex flex-col gap-y-2 sm:col-span-2">
                            <Label>Message</Label>
                            <Textarea placeholder='write your messsage here' {...register('message')} />
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

export default AddAppointment