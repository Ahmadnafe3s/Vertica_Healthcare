import Dialog from "@/components/Dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { paymentFormSchema } from "@/formSchemas/paymentFormSchema"
import { currencySymbol } from "@/helpers/currencySymbol"
import { PaymentOptions } from "@/helpers/formSelectOptions"
import { paymentData } from "@/types/opd_section/payment"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader, X } from "lucide-react"
import { HTMLAttributes } from "react"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"


interface PaymentFormModelProps extends HTMLAttributes<HTMLDivElement> {
    Submit: (formData: z.infer<typeof paymentFormSchema>) => void;
    isPending: boolean,
    paymentDetails: paymentData
}


const PaymentFormModel = ({ Submit, isPending, paymentDetails, ...props }: PaymentFormModelProps) => {

    const { control, register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof paymentFormSchema>>({
        resolver: zodResolver(paymentFormSchema),
        defaultValues: paymentDetails
    })

    return (
        <Dialog pageTitle='Add Payment' {...props} className='sm:w-[400px] mx-auto'>
            <form onSubmit={handleSubmit(Submit)}>
                <ScrollArea className={'relative h-[50vh] w-full'}>
                    <div className="grid gap-5 mt-2 px-3 pb-5">

                        {/* Date */}

                        <div className="w-full flex flex-col gap-y-2">
                            <Label>Date</Label>
                            <Input type='date' {...register('date')} />
                            {errors.date && <p className='text-sm text-red-500'>{errors.date.message}</p>}
                        </div>


                        {/* Amount */}

                        <div className="w-full flex flex-col gap-y-2 ">
                            <Label>Amount {currencySymbol()}</Label>
                            <Input type='number' {...register('amount', { valueAsNumber: true })} defaultValue={0} />
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
                    <Button type='submit' className='flex-1'>{paymentDetails ? ('Update') : ('Save Payment')} {isPending && <Loader className='animate-spin' />}</Button>
                </div>
            </form>
        </Dialog>
    )


}

export default PaymentFormModel