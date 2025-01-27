import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { timelineFormSchema } from "@/formSchemas/timelineFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, X } from "lucide-react";
import { HTMLAttributes, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { createTimeline, getTimelineDetails, updateTimeine } from "../../opdApiHandler";
import { useParams } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";


interface TimelineFormModelProps extends HTMLAttributes<HTMLDivElement> {
    ID: number
}


const TimelineFormModel = ({ ID, ...props }: TimelineFormModelProps) => {

    const { caseId, patientId } = useParams()

    const [isPending, setPending] = useState<boolean>()

    const { register, reset, setValue, handleSubmit, formState: { errors } } = useForm<z.infer<typeof timelineFormSchema>>({
        resolver: zodResolver(timelineFormSchema)
    })


    const onSubmit = async (formData: z.infer<typeof timelineFormSchema>) => {
        try {

            setPending(true)

            let data;

            if (ID) {
                data = await updateTimeine(Number(ID), formData)
            } else {
                data = await createTimeline(Number(caseId), Number(patientId), formData)
            }

            toast.success(data.message)

        } catch ({ message }: any) {
            toast.error(message)
        } finally {
            setPending(false)
        }
    }



    const setValuesTOform = async () => {
        try {
            if (!ID) return null
            const data = await getTimelineDetails(ID)
            setValue('title', data.title)
            setValue('description', data.description)
            setValue('date', data.date)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }



    useEffect(() => {
        setValuesTOform()
    }, [])



    return (
        <>
            <div {...props} className='fixed top-0 left-0 h-screen w-full transition-all z-[120]' style={{ background: '#0000009c' }}></div>

            <MaxWidthWrapper className='fixed h-auto  top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] z-[200] '>

                <form className=' bg-white rounded-md sm:w-[400px] mx-auto' onSubmit={handleSubmit(onSubmit)}>

                    {/* Header */}

                    <div className='flex justify-between p-3 col-span-full border-b border-gray-200'>
                        <p className='font-semibold text-sm sm:text-lg text-white bg-primary py-1 px-4 rounded-xl'>Timeline</p>
                        <div {...props}>
                            <X className='cursor-pointer' />
                        </div>
                    </div>


                    {/* mainGrid */}

                    <ScrollArea className='h-[50vh]'>

                        <div className="grid gap-5 mt-5 px-3 pb-5">


                            {/* Title */}

                            <div className="w-full flex flex-col gap-y-2 ">
                                <Label>Title</Label>
                                <Input type='text' {...register('title')} />
                                {errors.title && <p className='text-sm text-red-500'>{errors.title.message}</p>}
                            </div>


                            {/* Date */}

                            <div className="w-full flex flex-col gap-y-2 ">
                                <Label>Date</Label>
                                <Input type='datetime-local' {...register('date')} />
                                {errors.date && <p className='text-sm text-red-500'>{errors.date.message}</p>}
                            </div>


                            {/* Description */}

                            <div className="w-full flex flex-col gap-y-2 ">
                                <Label>Description</Label>
                                <Textarea  {...register('description')} />
                                {errors.description && <p className='text-sm text-red-500'>{errors.description.message}</p>}
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

export default TimelineFormModel