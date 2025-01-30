import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { paymentFormSchema } from "@/formSchemas/paymentFormSchema"
import { currencySymbol } from "@/helpers/currencySymbol"
import { PaymentOptions } from "@/helpers/formSelectOptions"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader, X } from "lucide-react"
import { HTMLAttributes, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"


interface PaymentFormModelProps extends HTMLAttributes<HTMLDivElement> { }



const PaymentFormModel = ({ ...props }: PaymentFormModelProps) => {

    const [isPending, setPending] = useState<boolean>(false)

    const { control, register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof paymentFormSchema>>({
        resolver: zodResolver(paymentFormSchema)
    })


    const onSubmit = async (formData: z.infer<typeof paymentFormSchema>) => {
        console.log(formData);
    }



    return (
        <>
            <div {...props} className='fixed top-0 left-0 h-screen w-full transition-all z-[120]' style={{ background: '#0000009c' }}></div>

            <MaxWidthWrapper className='fixed h-auto  top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] z-[200] '>

                <form className=' bg-white rounded-md sm:w-[400px] mx-auto' onSubmit={handleSubmit(onSubmit)}>

                    {/* Header */}

                    <div className='flex justify-between p-3 col-span-full border-b border-gray-200'>
                        <p className='font-semibold text-lg text-white bg-primary py-1 px-4 rounded-xl'>Payment</p>
                        <div {...props}>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <X className='cursor-pointer' />
                                    </TooltipTrigger>
                                    <TooltipContent className="z-[200]">Close popup</TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
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


                            {/* Amount */}

                            <div className="w-full flex flex-col gap-y-2 ">
                                <Label>Amount {currencySymbol()}</Label>
                                <Input type='text' {...register('amount' , {valueAsNumber : true})} />
                                {errors.amount && <p className='text-sm text-red-500'>{errors.amount.message}</p>}
                            </div>

                            {/* Payment Mode */}

                            <div className="w-full flex flex-col gap-y-2">
                                <Controller control={control} name='payment_mode' render={({ field }) => {
                                    return <>
                                        <Label>Payment Mode</Label>
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

                            </div>


                            {/* Note */}

                            <div className="w-full flex flex-col gap-y-2 ">
                                <Label>Note</Label>
                                <Textarea  {...register('note')} placeholder="Write your message" />
                                {errors.note && <p className='text-sm text-red-500'>{errors.note.message}</p>}
                            </div>


                        </div>

                    </ScrollArea>

                    <div className="flex mt-5 mb-2 p-3 gap-x-2 sm:justify-end">
                        <Button type='submit' className='flex-1'>Save Payment {isPending && <Loader className='animate-spin' />}</Button>
                    </div>

                </form>
            </MaxWidthWrapper>
        </>
    )
}

export default PaymentFormModel