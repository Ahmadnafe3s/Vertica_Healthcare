import Dialog from '@/components/Dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { authSelector } from '@/features/auth/authSlice'
import { appointmentFormSchema, patientAppointmentSchema } from '@/formSchemas/AppointmentFormSchema'
import { calculateAmount } from '@/helpers/calculateAmount'
import { currencySymbol } from '@/helpers/currencySymbol'
import { filterDoctors } from '@/helpers/filterDoctors'
import { PaymentOptions } from '@/helpers/formSelectOptions'
import { useAppSelector } from '@/hooks'
import { cn } from '@/lib/utils'
import usePatient from '@/patient/profile/handlers'
import RegisterPatient from '@/patient/register/patient-signup'
import { AppointmentApi } from '@/services/appointment-api'
import { OtherApi } from '@/services/other-api'
import { Doctors, Patients } from '@/types/type'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader, UserRound } from 'lucide-react'
import { HTMLAttributes, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useDebouncedCallback } from 'use-debounce'
import { z } from 'zod'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select'
import { Textarea } from '../../components/ui/textarea'



interface AddAppointmentProps extends HTMLAttributes<HTMLDivElement> {
    Submit: (formData: any) => void
    isPending: boolean
    onNewPatient?: () => void
}


function AddAppointment({ Submit, isPending, onNewPatient, ...props }: AddAppointmentProps) {

    const [patients, setPatients] = useState<Patients[]>([])
    const [doctors, setDoctors] = useState<Doctors[]>([])
    const { user } = useAppSelector(authSelector)
    const { handlePatient, isPending: isPatientPending, form, setForm } = usePatient()

    const SCHEMA = user?.role === 'patient' ? patientAppointmentSchema : appointmentFormSchema

    const { control, register, reset, setValue, watch, handleSubmit, formState: { errors } } = useForm<z.infer<typeof SCHEMA>>({
        resolver: zodResolver(SCHEMA)
    })


    const onSearch = useDebouncedCallback(async (value: string) => {
        try {
            const data = await OtherApi.getPatients(value)
            setPatients(data)
        } catch ({ message }: any) { toast.error(message) }
    }, 400)


    const setValues = (doctorId: string) => {
        const data = filterDoctors(doctors, +doctorId)
        if (!data) return null
        setValue('fees', data.staff.fees)
        setValue('shift', data.shift)
    }


    // for calculating price
    useEffect(() => {
        const total = +watch('fees')
        const discount = +watch('discount') || 0
        const net_amount = calculateAmount(total, 0, discount).net_amount
        setValue('net_amount', net_amount)
    }, [watch('fees'), watch('discount')])


    useEffect(() => {
        try {
            (async function () {
                const appointmentDate = watch('appointment_date') as string
                if (appointmentDate) {
                    const data = await AppointmentApi.getDoctors(appointmentDate)
                    setDoctors(data)
                }
            })() //IIFE

        } catch ({ message }: any) {
            toast.error(message)
        }
    }, [watch('appointment_date')])


    useEffect(() => {
        if (user?.role === 'patient') {
            setValue('patientId', user?.id)
        }
    }, [])



    return (
        <>
            <Dialog pageTitle='Add Appointment' {...props}>
                <form onSubmit={handleSubmit(Submit)}>
                    {user?.role !== 'patient' && (
                        <>
                            <div className='flex items-center gap-2 px-2.5'>
                                {/* Patient Section */}
                                <div>
                                    <Controller name='patientId' control={control} render={({ field }) => {
                                        return <Select value={field.value ? String(field.value) : undefined} onValueChange={(value) => { field.onChange(value) }}>
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
                                    <Button type='button' size='sm' onClick={() => setForm(true)}>New Patient <UserRound /></Button>
                                </div>
                            </div>


                            <Separator className='my-3' />
                        </>
                    )}


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
                                        <Select value={field.value ? String(field.value) : undefined} onValueChange={(value) => { setValues(value); field.onChange(value) }}>
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
                                <Input type='number' {...register('fees')} defaultValue={0} />
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

                            {user?.role !== 'patient' && (
                                <>
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

                                    <div className={cn('w-full flex flex-col gap-y-2')}>
                                        <Controller control={control} name='status' render={({ field }) => {
                                            return <>
                                                <Label>Status</Label>
                                                <Select value={field.value || ''} onValueChange={(value) => { field.onChange(value) }} >
                                                    <SelectTrigger >
                                                        <SelectValue placeholder="Select" />
                                                    </SelectTrigger>

                                                    <SelectContent className='z-[200]'>
                                                        <SelectItem value="Approved">Approved</SelectItem>
                                                        <SelectItem value="Pending">Pending</SelectItem>
                                                        <SelectItem value="Cancelled">Cancel</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </>
                                        }} />
                                        {errors.status && <p className='text-sm text-red-500'>{errors.status.message}</p>}
                                    </div >

                                    {/* Discount */}

                                    <div className="w-full flex flex-col gap-y-2">
                                        <Label>Discount %</Label>
                                        <Input type='number' {...register('discount')} />
                                        {errors.discount && <p className='text-sm text-red-500'>{errors.discount.message}</p>}
                                    </div>
                                </>
                            )}

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
                                <Input type='number' {...register('net_amount')} defaultValue={0} disabled />
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

            {/* form modal */}

            {form && (
                <RegisterPatient
                    isPending={isPatientPending}
                    Submit={(v) => { handlePatient(v) }}
                    onClick={() => { setForm(false) }}
                />
            )}
        </>
    )
}

export default AddAppointment