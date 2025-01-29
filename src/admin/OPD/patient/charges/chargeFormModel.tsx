import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { chargeFormSchema, valuesASdefault } from "@/formSchemas/chargeFormSchema"
import { calculateAmount } from "@/helpers/calculateAmount"
import { currencySymbol } from "@/helpers/currencySymbol"
import { CHARGE_TYPES, getChargeCategories, getChargeAmount, getChargeNames } from "@/helpers/getChargeOptions"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader, Plus, X } from "lucide-react"
import { HTMLAttributes, useEffect, useState } from "react"
import { Controller, useFieldArray, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { number, z } from "zod"
import { createCharges, getChargeDetails, updateCharge } from "../../opdApiHandler"
import { useParams } from "react-router-dom"


interface ChargeFormModelProps extends HTMLAttributes<HTMLDivElement> {
    ID: number
}


const ChargeFormModel = ({ ID, ...props }: ChargeFormModelProps) => {

    const [isPending, setPending] = useState<boolean>(false)
    const [INDEX, SET_INDEX] = useState<number>(0)
    const { caseId } = useParams()

    const { register, control, watch, reset, setValue, handleSubmit, formState: { errors } } = useForm<z.infer<typeof chargeFormSchema>>({
        resolver: zodResolver(chargeFormSchema),
        defaultValues: valuesASdefault
    })


    const { fields, append: AppendChargeField, remove: RemoveChargeField } = useFieldArray({
        name: 'charge',
        control
    })


    const AppendFields = () => {
        AppendChargeField({
            charge_type: '',
            category: '',
            name: '',
            amount: 0,
            tpa: 0,
            date: '',
            total: 0,
            tax: 0,
            discount: 0,
            net_amount: 0
        })
    }



    // Performing upsert
    const onSubmit = async (formData: z.infer<typeof chargeFormSchema>) => {
        try {
            setPending(true)
            let data;
            if (ID) {
                data = await updateCharge(ID, formData)
            } else {
                data = await createCharges(Number(caseId), formData)
            }
            toast.success(data.message)
        } catch ({ message }: any) {
            toast.error(message)
        } finally {
            setPending(false)
        }
    }



    // binding values dynamically to form

    const setAmount_and_tpa = (NID: string, index: number) => {
        const details = getChargeAmount(NID) // from helpers
        setValue(`charge.${index}.amount`, Number(details?.amount))
        setValue(`charge.${index}.tpa`, Number(details?.tpa))
        SET_INDEX(index)
    }


    // On edit mode
    const setValues_to_form = async () => {
        try {
            if (!ID) return null
            const data = await getChargeDetails(ID)
            setValue(`charge.${INDEX}.charge_type`, data.charge_type)
            setValue(`charge.${INDEX}.category`, data.category)
            setValue(`charge.${INDEX}.name`, data.name)
            setValue(`charge.${INDEX}.amount`, data.amount)
            setValue(`charge.${INDEX}.tpa`, data.tpa)
            setValue(`charge.${INDEX}.date`, data.date)
            setValue(`charge.${INDEX}.total`, data.total)
            setValue(`charge.${INDEX}.tax`, data.tax)
            setValue(`charge.${INDEX}.discount`, data.discount)
            setValue(`charge.${INDEX}.net_amount`, data.net_amount)

        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    // This hook i have used to  bind data to form on edit mode

    useEffect(() => {
        setValues_to_form()
    }, [watch(`charge.${INDEX}.name`)])


    // returning sum of amount and tpa and trigger useEffect
    const chargeAmounts = (watch(`charge.${INDEX}.amount`) + watch(`charge.${INDEX}.tpa`));


    // This hook i have used to calculate and bind amount to form
    useEffect(() => {

        const total = chargeAmounts  // calculating sum of amount + tpa from all fields  (ex [10,20,10])
        const Amount = calculateAmount(total, watch(`charge.${INDEX}.tax`)!, watch(`charge.${INDEX}.discount`))
        setValue(`charge.${INDEX}.total`, Amount.total)
        setValue(`charge.${INDEX}.net_amount`, Amount.net_amount)

    }, [chargeAmounts, watch(`charge.${INDEX}.tax`), watch(`charge.${INDEX}.discount`)])




    return (
        <>
            <div {...props} className='fixed top-0 left-0 h-screen w-full transition-all z-[120]' style={{ background: '#0000009c' }}></div>

            <MaxWidthWrapper className='fixed h-auto top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] z-[200] '>

                <form className='p-3 bg-white rounded-md' onSubmit={handleSubmit(onSubmit)}>

                    <div>
                        <div className='flex justify-between pt-2 pb-3 border-b border-gray-200 col-span-full'>
                            <p className='font-semibold text-xl text-white bg-primary py-1 px-4 rounded-xl'>Add Charges</p>
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
                    </div>


                    {/* grid for fields */}


                    <ScrollArea className='h-[60vh] sm:h-[55vh]'>

                        <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-5 p-1">


                            {fields.map((charge, index) => {

                                return <section key={charge.id} onClick={() => SET_INDEX(index)} className="sm:col-span-full mt-2 p-2 rounded-md grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2  items-center border-2 border-dashed border-gray-200">

                                    {/* Cahrge Type */}

                                    <div className="w-full flex flex-col gap-y-2">
                                        <Controller control={control} name={`charge.${index}.charge_type`} render={({ field }) => {
                                            return <>
                                                <Label>Charge Type</Label>
                                                <Select value={field.value || ''} onValueChange={(value) => { field.onChange(value) }}>
                                                    <SelectTrigger >
                                                        <SelectValue placeholder="Select" />
                                                    </SelectTrigger>

                                                    <SelectContent className='z-[200]'>
                                                        {CHARGE_TYPES?.map((type, index) => {
                                                            return <SelectItem key={index} value={type.value}>{type.label}</SelectItem>
                                                        })}
                                                    </SelectContent>
                                                </Select>
                                            </>
                                        }} />
                                        {errors.charge?.[index]?.charge_type && <p className='text-sm text-red-500'>{errors.charge?.[index].charge_type?.message}</p>}
                                    </div>



                                    {/* Charge Category */}

                                    <div className="w-full flex flex-col gap-y-2">
                                        <Controller control={control} name={`charge.${index}.category`} render={({ field }) => {
                                            return <>
                                                <Label>Charge Category</Label>
                                                <Select value={field.value || ''} onValueChange={(value) => { field.onChange(value) }}>
                                                    <SelectTrigger >
                                                        <SelectValue placeholder="Select" />
                                                    </SelectTrigger>

                                                    <SelectContent className='z-[200]'>
                                                        {getChargeCategories(watch(`charge.${index}.charge_type`))?.map((category, index) => {
                                                            return <SelectItem key={index} value={category.value}>{category.label}</SelectItem>
                                                        })}
                                                    </SelectContent>
                                                </Select>
                                            </>
                                        }} />
                                        {errors.charge?.[index]?.category && <p className='text-sm text-red-500'>{errors.charge?.[index].category?.message}</p>}
                                    </div>


                                    {/* Charge Name */}

                                    <div className="w-full flex flex-col gap-y-2">
                                        <Controller control={control} name={`charge.${index}.name`} render={({ field }) => {
                                            return <>
                                                <Label>Charge Name</Label>
                                                <Select value={field.value || ''} onValueChange={(value) => { setAmount_and_tpa(value, index); field.onChange(value) }}>
                                                    <SelectTrigger >
                                                        <SelectValue placeholder="Select" />
                                                    </SelectTrigger>

                                                    <SelectContent className='z-[200]'>
                                                        {getChargeNames(watch(`charge.${index}.category`)).map((type, index) => {
                                                            return <SelectItem key={index} value={type.value}>{type.label}</SelectItem>
                                                        })}
                                                    </SelectContent>
                                                </Select>
                                            </>
                                        }} />
                                        {errors.charge?.[index]?.name && <p className='text-sm text-red-500'>{errors.charge?.[index]?.name?.message}</p>}
                                    </div>


                                    {/* Standard Charge */}

                                    <div className="w-full flex flex-col gap-y-2">
                                        <Label>Standard Charge {currencySymbol()}</Label>
                                        <Input type='number' {...register(`charge.${index}.amount`, { valueAsNumber: true })} /> {/*assigning values automatically */}
                                        {errors?.charge?.[index]?.amount && <p className='text-sm text-red-500'>{errors?.charge?.[index]?.amount.message}</p>}
                                    </div>


                                    {/* TPA */}

                                    <div className="w-full flex flex-col gap-y-2">
                                        <Label>TPA Charge {currencySymbol()}</Label>
                                        <Input type='number' {...register(`charge.${index}.tpa`, { valueAsNumber: true })} />
                                        {errors?.charge?.[index]?.tpa && <p className='text-sm text-red-500'>{errors?.charge?.[index]?.tpa.message}</p>}
                                    </div>


                                    {/* Date */}

                                    <div className="w-full flex flex-col gap-y-2">
                                        <Label>Date</Label>
                                        <Input type='date' {...register(`charge.${index}.date`)} />
                                        {errors?.charge?.[index]?.date && <p className='text-sm text-red-500'>{errors?.charge?.[index]?.date.message}</p>}
                                    </div>


                                    {/* toatl amount */}

                                    <div className="w-full flex flex-col gap-y-2">
                                        <Label>Total Amount {currencySymbol()}</Label>
                                        <Input type='number' {...register(`charge.${index}.total`, { valueAsNumber: true })} disabled />
                                        {errors?.charge?.[index]?.total && <p className='text-sm text-red-500'>{errors?.charge?.[index]?.total.message}</p>}
                                    </div>


                                    {/* Tax */}

                                    <div className="w-full flex flex-col gap-y-2">
                                        <Label>Tax %</Label>
                                        <Input type="number" {...register(`charge.${index}.tax`, { valueAsNumber: true })} />
                                        {errors?.charge?.[index]?.tax && <p className='text-sm text-red-500'>{errors?.charge?.[index]?.tax.message}</p>}
                                    </div>



                                    {/* Discount % */}

                                    <div className="w-full flex flex-col gap-y-2">
                                        <Label>Discount %</Label>
                                        <Input type='number' {...register(`charge.${index}.discount`, { valueAsNumber: true })} />
                                        {errors?.charge?.[index]?.discount && <p className='text-sm text-red-500'>{errors?.charge?.[index]?.discount.message}</p>}
                                    </div>



                                    {/* Net AMount */}

                                    <div className="w-full flex flex-col gap-y-2">
                                        <Label>Net Amount {currencySymbol()}</Label>
                                        <Input type="number" {...register(`charge.${index}.net_amount`, { valueAsNumber: true })} />
                                        {errors?.charge?.[index]?.net_amount && <p className='text-sm text-red-500'>{errors?.charge?.[index]?.net_amount.message}</p>}
                                    </div>



                                    {/* Button to remove fields */}

                                    {fields.length !== 1 &&
                                        <div className="h-full flex items-center gap-x-2 col-span-2 justify-end sm:justify-normal">
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <div className="p-1 bg-red-500 rounded-full text-white mt-2 sm:mt-4">
                                                            <X className="w-4 h-4 cursor-pointer" onClick={() => { RemoveChargeField(index) }} />
                                                        </div>
                                                    </TooltipTrigger>
                                                    <TooltipContent className="z-[200]">Remove</TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        </div>
                                    }

                                </section>

                            })}


                            {/* Button for Addding fields */}

                            {!ID && <div className="col-span-full flex justify-end mr-2">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <div className="p-1 bg-slate-500 rounded-full text-white">
                                                <Plus className="w-4 h-4 cursor-pointer" onClick={AppendFields} />
                                            </div>
                                        </TooltipTrigger>
                                        <TooltipContent className="z-[200]">Add More Fields</TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>}


                        </div>
                    </ScrollArea>

                    <div className="flex mt-5 mb-2 gap-x-2 sm:justify-end">
                        <Button type='button' variant={'ghost'} onClick={() => reset()} >Reset</Button>
                        <Button type='submit' className='flex-1 sm:flex-none' >{ID ? ('Update') : ('Save Charges')} {isPending && <Loader className='animate-spin' />}</Button>
                    </div>

                </form>
            </MaxWidthWrapper>
        </>
    )
}

export default ChargeFormModel