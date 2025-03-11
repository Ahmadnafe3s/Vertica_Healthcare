import { fetchDoctors } from "@/admin/appointment/appointmentAPIhandler"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { operationFormSchema } from "@/formSchemas/addOperationFormSchema"
import { Doctors } from "@/types/type"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader, X } from "lucide-react"
import { HTMLAttributes, useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { z } from "zod"
import { operationCategoryType, operationNameType } from "@/types/setupTypes/setupOpeartion"
import { getOperationCategories, getOperationNames } from "@/admin/setup/operation/operationsAPIhandlers"
import Dialog from "@/components/Dialog"
import { operationDetailsType } from "@/types/opd_section/operationType"


interface OperationFormProps extends HTMLAttributes<HTMLDivElement> {
    operationDetails: operationDetailsType | undefined,
    Submit: (formData: any) => void
    isPending: boolean
}

const OperationForm = ({ Submit, isPending, operationDetails: details, ...props }: OperationFormProps) => {

    // API State
    const [options, setOptions] = useState<{ doctors: Doctors[], operationCategories: operationCategoryType[], operationNames: operationNameType[] }>({
        doctors: [],
        operationCategories: [],
        operationNames: []
    })


    const { register, reset, watch, handleSubmit, control, formState: { errors } } = useForm<z.infer<typeof operationFormSchema>>({
        resolver: zodResolver(operationFormSchema),
        defaultValues: {
            categoryId: String(details?.categoryId),
            oprNameId: String(details?.oprNameId),
            date: details?.date,
            doctorId: String(details?.doctorId),
            assistant_1: details?.assistant_1,
            assistant_2: details?.assistant_2,
            ot_technician: details?.ot_technician,
            ot_assistant: details?.ot_assistant,
            anesthetist: details?.anesthetist,
            anesthesia_type: details?.anesthesia_type,
            note: details?.note,
            result: details?.result
        }
    })


    // fetching categories list

    const fethctOperationCategories = async () => {
        try {
            const data = await getOperationCategories()
            setOptions((rest) => {
                return {
                    ...rest,
                    operationCategories: data
                }
            })
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    const handleCategoryChange = async (categoryId: number) => {
        try {
            const data = await getOperationNames(categoryId)
            setOptions((rest) => {
                return {
                    ...rest,
                    operationNames: data
                }
            })
        } catch ({ message }: any) {
            toast.error(message)
        }
    }



    const fetchDoctorsList = async () => {
        try {
            const data = await fetchDoctors()
            setOptions((rest) => {
                return {
                    ...rest,
                    doctors: data
                }
            })

        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    useEffect(() => {
        fetchDoctorsList()
        fethctOperationCategories()
        if (details) handleCategoryChange(details.categoryId) // fetching data on edit mode
    }, [])


    return (
        <Dialog pageTitle="Operation" {...props} className="sm:w-[500px] mx-auto">
            <form onSubmit={handleSubmit(Submit)}>
                <ScrollArea className='h-[60vh]'>

                    <div className="grid gap-5 sm:grid-cols-2 mt-5 px-4 pb-5">

                        {/* Category */}

                        <div className="w-full flex flex-col gap-y-2">
                            <Controller control={control} name='categoryId' render={({ field }) => {
                                return <>
                                    <Label>Category</Label>
                                    <Select value={field.value || ''} onValueChange={(value) => { handleCategoryChange(Number(value)); field.onChange(value) }}>
                                        <SelectTrigger >
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>

                                        <SelectContent className='z-[200]'>
                                            {options.operationCategories.map((category, i) => {
                                                return <SelectItem key={i} value={String(category.id)}>{category.name}</SelectItem>
                                            })}
                                        </SelectContent>
                                    </Select>
                                </>
                            }} />
                            {errors.categoryId && <p className='text-sm text-red-500'>{errors.categoryId.message}</p>}

                        </div>


                        {/*Operation name */}

                        <div className="w-full flex flex-col gap-y-2">
                            <Controller control={control} name='oprNameId' render={({ field }) => {
                                return <>
                                    <Label>Operation Name</Label>
                                    <Select value={field.value || ''} onValueChange={(value) => { field.onChange(value) }}>
                                        <SelectTrigger >
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>

                                        <SelectContent className='z-[200]'>
                                            {options.operationNames.map((name, i) => {
                                                return <SelectItem key={i} value={String(name.id)}>{name.name}</SelectItem>
                                            })}
                                        </SelectContent>
                                    </Select>
                                </>
                            }} />
                            {errors.oprNameId && <p className='text-sm text-red-500'>{errors.oprNameId.message}</p>}

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
                                            {options.doctors.map((doctor, i) => {
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
                    <Button type='submit' className='flex-1'>{details ? 'Update' : 'Save'} {isPending && <Loader className='animate-spin' />}</Button>
                </div>
            </form>
        </Dialog>
    )
}

export default OperationForm