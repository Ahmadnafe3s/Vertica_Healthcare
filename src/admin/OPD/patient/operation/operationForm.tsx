import { fetchDoctors } from "@/admin/appointment/appointmentAPIhandler"
import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { operationFormSchema } from "@/formSchemas/addOperationFormSchema"
import { OPERATION_CATEGORIES } from "@/helpers/formSelectOptions"
import { getOperationsOptions, operationOptions } from "@/helpers/getOprationsOptions"
import { Doctors } from "@/types/type"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader, X } from "lucide-react"
import { HTMLAttributes, useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { z } from "zod"
import { createOperation, getOperation_Details, updateOperation } from "../../opdApiHandler"
import { useParams } from "react-router-dom"

interface OperationFormProps extends HTMLAttributes<HTMLDivElement> {
    ID: string | null
}

const OperationForm = ({ ID, ...props }: OperationFormProps) => {

    const { patientId, caseId } = useParams()

    const [isPending, setPending] = useState<boolean>(false)

    const [OPTIONS, SET_OPTIONS] = useState<{ doctors: Doctors[] }>({
        doctors: []
    })


    const { register, reset, watch, setValue, handleSubmit, control, formState: { errors } } = useForm<z.infer<typeof operationFormSchema>>({
        resolver: zodResolver(operationFormSchema)
    })


    const onSubmit = async (formData: z.infer<typeof operationFormSchema>) => {

        try {
            setPending(true)
            let data;
            if (ID) {
                data = await updateOperation(ID, formData)
            } else {
                data = await createOperation(Number(patientId), Number(caseId), formData)
            }

            toast.success(data.message)
        } catch ({ message }: any) {
            toast.error(message)
        } finally {
            setPending(false)
        }
    }



    const fetchDoctorsList = async () => {
        try {
            const data = await fetchDoctors()
            SET_OPTIONS((rest) => {
                return {
                    ...rest,
                    doctors: data
                }
            })

        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    // setting values on update

    const setValuesTOform = async () => {
        try {

            if (!ID) return null // for protecting unecessary API call

            const data = await getOperation_Details(String(ID))

            setValue('category', data.category)
            setValue('name', data.name)
            setValue('date', data.date)
            setValue('doctorId', String(data.doctorId))
            setValue('assistant_1', data.assistant_1)
            setValue('assistant_2', data.assistant_2)
            setValue('anesthetist', data.anesthetist)
            setValue('anesthesia_type', data.anesthesia_type)
            setValue('ot_technician', data.ot_technician)
            setValue('ot_assistant', data.ot_assistant)
            setValue('note', data.note)
            setValue('result', data.result)

        } catch ({ message }: any) {
            toast.error(message)
        }
    }



    useEffect(() => {
        fetchDoctorsList()
        setValuesTOform()
    }, [watch('category')])


    return (
        <>
            <div {...props} className='fixed top-0 left-0 h-screen w-full transition-all z-[120]' style={{ background: '#0000009c' }}></div>

            <MaxWidthWrapper className='fixed h-auto  top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] z-[200] '>

                <form className=' bg-white rounded-md sm:w-[600px] mx-auto' onSubmit={handleSubmit(onSubmit)}>

                    {/* Header */}

                    <div className='flex justify-between p-3 col-span-full border-b border-gray-200'>
                        <p className='font-semibold text-sm sm:text-lg text-white bg-primary py-1 px-4 rounded-xl'>Operation</p>
                        <div {...props}>
                            <X className='cursor-pointer' />
                        </div>
                    </div>


                    {/* mainGrid */}

                    <ScrollArea className='h-[60vh]'>

                        <div className="grid gap-5 sm:grid-cols-2 mt-5 px-3 pb-5">

                            {/* Category */}

                            <div className="w-full flex flex-col gap-y-2">
                                <Controller control={control} name='category' render={({ field }) => {
                                    return <>
                                        <Label>Category</Label>
                                        <Select value={field.value || ''} onValueChange={(value) => { field.onChange(value) }}>
                                            <SelectTrigger >
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>

                                            <SelectContent className='z-[200]'>
                                                {OPERATION_CATEGORIES.map((category, i) => {
                                                    return <SelectItem key={i} value={category.value}>{category.label}</SelectItem>
                                                })}
                                            </SelectContent>
                                        </Select>
                                    </>
                                }} />
                                {errors.category && <p className='text-sm text-red-500'>{errors.category.message}</p>}

                            </div>


                            {/*Operation name */}

                            <div className="w-full flex flex-col gap-y-2">
                                <Controller control={control} name='name' render={({ field }) => {
                                    return <>
                                        <Label>Operation Name</Label>
                                        <Select value={field.value || ''} onValueChange={(value) => { field.onChange(value) }}>
                                            <SelectTrigger >
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>

                                            <SelectContent className='z-[200]'>
                                                {getOperationsOptions(watch('category')).map((operation, i) => {
                                                    return <SelectItem key={i} value={operation.value}>{operation.label}</SelectItem>
                                                })}
                                            </SelectContent>
                                        </Select>
                                    </>
                                }} />
                                {errors.name && <p className='text-sm text-red-500'>{errors.name.message}</p>}

                            </div>


                            {/* Date */}

                            <div className="w-full flex flex-col gap-y-2">
                                <Label>Date</Label>
                                <Input type='datetime-local' {...register('date')} />
                                {errors.date && <p className='text-sm text-red-500'>{errors.date.message}</p>}
                            </div>


                            {/* Doctor */}

                            <div className="w-full flex flex-col gap-y-2">
                                <Controller control={control} name='doctorId' render={({ field }) => {
                                    return <>
                                        <Label>Consultant Doctor</Label>
                                        <Select value={field.value || ''} onValueChange={(value) => { field.onChange(value) }}>
                                            <SelectTrigger >
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>

                                            <SelectContent className='z-[200]'>
                                                {OPTIONS.doctors.map((doctor, i) => {
                                                    return <SelectItem key={i} value={String(doctor.staff.id)}>{doctor.staff.name}</SelectItem>
                                                })}
                                            </SelectContent>
                                        </Select>
                                    </>
                                }} />
                                {errors.doctorId && <p className='text-sm text-red-500'>{errors.doctorId.message}</p>}

                            </div>


                            {/* Assistant Consultant 1 */}

                            <div className="w-full flex flex-col gap-y-2 ">
                                <Label>Assistant Consultant 1</Label>
                                <Input type='text' {...register('assistant_1')} />
                                {errors.assistant_1 && <p className='text-sm text-red-500'>{errors.assistant_1.message}</p>}
                            </div>


                            {/* Assistant Consultant 2 */}

                            <div className="w-full flex flex-col gap-y-2 ">
                                <Label>Assistant Consultant 2</Label>
                                <Input type='text' {...register('assistant_2')} />
                                {errors.assistant_2 && <p className='text-sm text-red-500'>{errors.assistant_2.message}</p>}
                            </div>


                            {/* Anesthetist */}

                            <div className="w-full flex flex-col gap-y-2 ">
                                <Label>Anesthetist</Label>
                                <Input type='text' {...register('anesthetist')} />
                                {errors.anesthetist && <p className='text-sm text-red-500'>{errors.anesthetist.message}</p>}
                            </div>


                            {/* Anesthetist type */}

                            <div className="w-full flex flex-col gap-y-2 ">
                                <Label>Anesthesia Type</Label>
                                <Input type='text' {...register('anesthesia_type')} />
                                {errors.anesthesia_type && <p className='text-sm text-red-500'>{errors.anesthesia_type.message}</p>}
                            </div>


                            {/* OT Technician */}

                            <div className="w-full flex flex-col gap-y-2 ">
                                <Label>OT Technician</Label>
                                <Input type='text' {...register('ot_technician')} />
                                {errors.ot_technician && <p className='text-sm text-red-500'>{errors.ot_technician.message}</p>}
                            </div>

                            {/* OT Assistant */}

                            <div className="w-full flex flex-col gap-y-2 ">
                                <Label>OT Assistant</Label>
                                <Input type='text' {...register('ot_assistant')} />
                                {errors.ot_assistant && <p className='text-sm text-red-500'>{errors.ot_assistant.message}</p>}
                            </div>


                            {/* Note */}

                            <div className="w-full flex flex-col gap-y-2 ">
                                <Label>Note</Label>
                                <Input type='text' {...register('note')} />
                                {errors.note && <p className='text-sm text-red-500'>{errors.note.message}</p>}
                            </div>


                            {/* Result */}

                            <div className="w-full flex flex-col gap-y-2 ">
                                <Label>Result</Label>
                                <Input type='text' {...register('result')} />
                                {errors.result && <p className='text-sm text-red-500'>{errors.result.message}</p>}
                            </div>


                        </div>

                    </ScrollArea>

                    <div className="flex mt-5 mb-2 p-3 gap-x-2 sm:justify-end">
                        <Button variant='outline' onClick={() => reset()}>Reset</Button>
                        <Button type='submit' className='flex-1'>{ID ? 'Update' : 'Save'} {isPending && <Loader className='animate-spin' />}</Button>
                    </div>

                </form>
            </MaxWidthWrapper>
        </>
    )
}

export default OperationForm