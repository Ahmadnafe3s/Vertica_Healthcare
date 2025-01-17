import { HTMLAttributes, useEffect, useState } from 'react'
import MaxWidthWrapper from '../../components/MaxWidthWrapper'
import { Label } from '../../components/ui/label'
import { Input } from '../../components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select'
import { Textarea } from '../../components/ui/textarea'
import { Button, buttonVariants } from '../../components/ui/button'
import { Loader, X } from 'lucide-react'
import { appointmentFormSchema } from '@/formSchemas/AppointmentFormSchema'
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router-dom'
import { Doctors, Patients } from '@/types/type'
import toast from 'react-hot-toast'
import { createAppointment, fetchDoctors, fetchPatients } from './appointmentAPIhandler'
import { filterDoctors } from '@/helpers/filterDoctors'


interface AddAppointmentProps extends HTMLAttributes<HTMLDivElement> { }



function AddAppointment({ ...props }: AddAppointmentProps) {


    const [patients, setPatients] = useState<Patients[]>([])
    const [doctors, setDoctors] = useState<Doctors[]>([])
    const [isPending, setPending] = useState<boolean>()

    const { control, register, reset, setValue, watch, handleSubmit, formState: { errors } } = useForm<z.infer<typeof appointmentFormSchema>>({
        resolver: zodResolver(appointmentFormSchema)
    })


    const onSearch = async (value: string) => {
        try {
            const data = await fetchPatients(value)
            setPatients(data)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }



    const onSubmit = async (formData: z.infer<typeof appointmentFormSchema>) => {
        try {
            setPending(true)
            const data = await createAppointment(formData)
            toast.success(data.message)
        } catch ({ message }: any) {
            toast.error(message)
        } finally {
            setPending(false)
        }
    }



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
        <>
            <div {...props} className='fixed top-0 left-0 h-screen w-full transition-all z-[120]' style={{ background: '#0000009c' }}></div>

            <MaxWidthWrapper className='fixed h-auto max-h-[90vh] overflow-y-auto  top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] z-[200] '>

                <form className='p-3 bg-white rounded-md' onSubmit={handleSubmit(onSubmit)}>

                    <div>
                        <div className='flex justify-between pt-2 pb-3 border-b border-gray-200 col-span-full'>
                            <p className='font-semibold text-xl'>Add Appointment</p>
                            <div {...props}>
                                <X className='cursor-pointer' />
                            </div>
                        </div>

                        <div className='flex  gap-2 mt-4'>
                            <div>

                                {/* Patient Section */}

                                <Controller name='patientId' control={control} render={({ field }) => {
                                    return <Select value={field.value || ''} onValueChange={(value) => { field.onChange(value) }}>
                                        <SelectTrigger className='sm:w-[300px] w-40'>
                                            <SelectValue placeholder="Search" />
                                        </SelectTrigger>

                                        <SelectContent className='z-[200]'>
                                            <Input type='search' className='w-full' placeholder='search patient' onChange={(e) => { onSearch(e.target.value) }} />
                                            {patients.map((patient, i) => {
                                                return <SelectItem key={i} value={patient.id.toString()}>{`${patient.name} (${patient.id})`}</SelectItem>
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
                    </div>

                    {/* grid for fields */}

                    <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-5">

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
                                    <Select value={field.value || ''} onValueChange={(value) => { setValues(value); field.onChange(value) }}>
                                        <SelectTrigger >
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>

                                        <SelectContent className='z-[200]'>
                                            {doctors?.map((doctor, index) => {
                                                return <SelectItem key={index} value={doctor.staff.id.toString()}>
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
                            <Label>Doctor Fees$</Label>
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

                    <div className="flex mt-5 mb-2 gap-x-2 sm:justify-end">
                        <Button type='button' variant={'ghost'} size={'sm'} onClick={() => reset()} >Reset</Button>
                        <Button type='submit' size={'sm'}>Save Appointment {isPending && <Loader className='animate-spin' />}</Button>
                    </div>

                </form>
            </MaxWidthWrapper>
        </>
    )
}

export default AddAppointment