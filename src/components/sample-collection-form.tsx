import { sampleCollectionSchema } from "@/formSchemas/sampleCollectionSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"
import Dialog from "./Dialog"
import { HTMLAttributes, useEffect, useState } from "react"
import { ScrollArea } from "./ui/scroll-area"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Loader } from "lucide-react"
import { Button } from "./ui/button"
import { staffs } from "@/types/staff/staff"
import { getStaffs } from "@/admin/humanresource/HRApiHandler"
import toast from "react-hot-toast"
import { RadiologySampleCollectionDet } from "@/types/radiology/radiology"
import { hospital_name } from "@/globalData"
import usePermission from "@/authz"
import { PathologySampleCollectionDet } from "@/types/pathology/pathology"


interface SampleCollectionFormProps extends HTMLAttributes<HTMLDivElement> {
    isPending: boolean
    Submit: (data: any) => void
    editDetails: RadiologySampleCollectionDet | PathologySampleCollectionDet
    Role: 'radiologist' | 'pathologist'
}


const SampleCollectionForm = ({ isPending, Submit, editDetails, Role, ...props }: SampleCollectionFormProps) => {

    const [staffs, setStaffs] = useState<staffs>({ data: [], total_pages: 0 })

    const { hasPermission, loadPermission } = usePermission()

    const { control, register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof sampleCollectionSchema>>({
        resolver: zodResolver(sampleCollectionSchema),
        defaultValues: editDetails
    })


    const fetchStaffs = async () => {
        try {
            const data = await getStaffs({ limit: 0, search: Role }) // getting only staffs
            setStaffs(data)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    useEffect(() => {
        fetchStaffs()
        loadPermission()
    }, [])



    return (
        <Dialog pageTitle='Sample Collection' {...props} className='sm:w-[400px] mx-auto'>
            <form onSubmit={handleSubmit(Submit)}>
                <ScrollArea className={'relative h-[50vh] w-full'}>
                    <div className="grid gap-5 mt-2 px-3 pb-5">

                        {/* Date */}

                        <div className="w-full flex flex-col gap-y-2">
                            <Label>Date</Label>
                            <Input type='date' {...register('date')} />
                            {errors.date && <p className='text-sm text-red-500'>{errors.date.message}</p>}
                        </div>


                        {/* staff */}
                        <div className="w-full flex flex-col gap-y-2">
                            <Controller control={control} name='staffId' render={({ field }) => {
                                return <>
                                    <Label>Sample Collected Person Name</Label>
                                    <Select value={field.value ? String(field.value) : undefined} onValueChange={(value) => { field.onChange(Number(value)) }}>
                                        <SelectTrigger >
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>

                                        <SelectContent className='z-[200]'>
                                            {staffs.data.map((staff) => {
                                                return <SelectItem key={staff.id} value={String(staff.id)}>{staff.name}</SelectItem>
                                            })}
                                        </SelectContent>
                                    </Select>
                                </>
                            }} />
                            {errors.staffId && <p className='text-sm text-red-500'>{errors.staffId.message}</p>}

                        </div>


                        {/* Center */}

                        <div className="w-full flex flex-col gap-y-2 ">
                            <Label>Center</Label>
                            <Input type='text' {...register('center')} defaultValue={hospital_name} />
                            {errors.center && <p className='text-sm text-red-500'>{errors.center.message}</p>}
                        </div>
                    </div>
                </ScrollArea>

                {(hasPermission('update', 'sample_collection') || hasPermission('create', 'sample_collection')) &&
                    <div className="flex mt-5 mb-2 p-3">
                        <Button type='submit' className='flex-1'>{editDetails ? 'Update' : 'Save Sample Collection'} {isPending && <Loader className='animate-spin' />}</Button>
                    </div>
                }

            </form>
        </Dialog>
    )
}

export default SampleCollectionForm