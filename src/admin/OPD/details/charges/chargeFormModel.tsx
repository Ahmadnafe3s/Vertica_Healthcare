import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { chargeFormSchema, valuesASdefault } from "@/formSchemas/chargeFormSchema"
import { calculateAmount } from "@/helpers/calculateAmount"
import { currencySymbol } from "@/helpers/currencySymbol"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader, Plus, X } from "lucide-react"
import { HTMLAttributes, useEffect, useState } from "react"
import { Controller, useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"
import toast from "react-hot-toast"
import { getChargeCategories, getChargeNameDetails, getChargeNames, getChargeTypes } from "@/admin/setup/hospital-charges/chargesAPIhandlers"
import { Charge_Type_Interface } from "@/admin/setup/hospital-charges/chargeType/chargeTypes"
import { categoryType } from "@/admin/setup/hospital-charges/chargesCategory/categoryList"
import { chargeNamesType } from "@/types/setupTypes/chargeName"
import { ChargeDetailsType } from "@/types/opd_section/charges"
import Dialog from "@/components/Dialog"


interface ChargeFormModelProps extends HTMLAttributes<HTMLDivElement> {
    chargeDetails: ChargeDetailsType;
    isPending: boolean;
    Submit: (formData: z.infer<typeof chargeFormSchema>) => void
}


const ChargeFormModel = ({ Submit, isPending, chargeDetails, ...props }: ChargeFormModelProps) => {

    const [INDEX, SET_INDEX] = useState<number>(0)

    // API states
    const [types, setTypes] = useState<Charge_Type_Interface[]>([])
    const [categories, setCategories] = useState<{ [key: number]: categoryType[] }>()
    const [names, setNames] = useState<{ [key: number]: chargeNamesType }>()



    const { register, control, watch, reset, setValue, handleSubmit, formState: { errors } } = useForm<z.infer<typeof chargeFormSchema>>({
        resolver: zodResolver(chargeFormSchema),
        defaultValues: chargeDetails ? {
            charge: [{
                categoryId: String(chargeDetails?.categoryId),
                chargeTypeId: String(chargeDetails?.chargeTypeId),
                chargeNameId: String(chargeDetails?.chargeNameId),
                standard_charge: chargeDetails?.standard_charge,
                tpa: chargeDetails?.tpa,
                date: chargeDetails?.date,
                tax: chargeDetails?.tax,
                discount: chargeDetails?.discount,
                total: chargeDetails?.total,
                net_amount: chargeDetails?.net_amount,
            }]
        } : valuesASdefault  // default one Array field if not edit mode
    })


    const { fields, append: AppendChargeField, remove: RemoveChargeField } = useFieldArray({
        name: 'charge',
        control
    })


    const AppendFields = () => {
        AppendChargeField({
            chargeTypeId: '',
            categoryId: '',
            chargeNameId: '',
            standard_charge: 0,
            tpa: 0,
            date: '',
            total: 0,
            tax: 0,
            discount: 0,
            net_amount: 0
        })
    }


    // Binding options to form

    const fetchChargeTypes = async () => {
        try {
            const data = await getChargeTypes('opd')
            setTypes(data)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    // getting category options based upon chargeType
    const handleTypeChange = async (index: number, chargeTypeId: number) => {
        try {
            const data = await getChargeCategories(Number(chargeTypeId))
            setCategories((rest) => {
                return {
                    ...rest,
                    [index]: data
                }
            })
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    // getting charge Names options based upon chargeCategory
    const handleCategoryChange = async (index: number, categoryId: string) => {
        try {
            const data = await getChargeNames({ page: 1, limit: 100, search: categoryId })
            setNames((rest) => {
                return {
                    ...rest,
                    [index]: data
                }
            })
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    // fetching chargeName details and binding into form
    const handleChargeNameChange = async (index: number, id: number) => {
        try {
            const data = await getChargeNameDetails(id)
            setValue(`charge.${index}.standard_charge`, Number(data?.standard_charge))
            setValue(`charge.${index}.tpa`, Number(data?.tpa))
            setValue(`charge.${index}.tax`, Number(data?.tax_percentage))
            SET_INDEX(index)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    useEffect(() => {
        fetchChargeTypes()
        // on edit mode this will work
        if (chargeDetails) {
            handleTypeChange(0, chargeDetails.chargeTypeId) // cause we can update one index Array field at a time so index will always 0
            handleCategoryChange(0, String(chargeDetails.categoryId))
        }
    }, [])


    // returning sum of amount and tpa and trigger useEffect (for specific array element (fields))
    const chargeAmounts = (watch(`charge.${INDEX}.standard_charge`) + watch(`charge.${INDEX}.tpa`));


    // This hook i have used to calculate and bind amount to form
    useEffect(() => {
        const total = chargeAmounts
        const Amount = calculateAmount(total, watch(`charge.${INDEX}.tax`)!, watch(`charge.${INDEX}.discount`))
        setValue(`charge.${INDEX}.total`, Amount.total)
        setValue(`charge.${INDEX}.net_amount`, Amount.net_amount)

    }, [chargeAmounts, watch(`charge.${INDEX}.discount`)])



    return (
        <Dialog pageTitle="Charges" {...props}>
            <form onSubmit={handleSubmit(Submit)}>
                <ScrollArea className='h-[60vh] sm:h-[55vh]'>

                    <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-5 px-2.5" onSubmit={handleSubmit(Submit)}>

                        {fields.map((charge, index) => {

                            return <section key={charge.id} onClick={() => SET_INDEX(index)} className="sm:col-span-full mt-2 p-2 rounded-md grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2  items-center border-2 border-dashed border-gray-200">

                                {/* Cahrge Type */}

                                <div className="w-full flex flex-col gap-y-2">
                                    <Controller control={control} name={`charge.${index}.chargeTypeId`} render={({ field }) => {
                                        return <>
                                            <Label>Charge Type</Label>
                                            <Select value={field.value || ''} onValueChange={(value) => { handleTypeChange(index, Number(value)); field.onChange(value) }}>
                                                <SelectTrigger >
                                                    <SelectValue placeholder="Select" />
                                                </SelectTrigger>

                                                <SelectContent className='z-[200]'>
                                                    {types.map((type, index) => {
                                                        return <SelectItem key={index} value={String(type.id)}>{type.charge_type}</SelectItem>
                                                    })}
                                                </SelectContent>
                                            </Select>
                                        </>
                                    }} />
                                    {errors.charge?.[index]?.chargeTypeId && <p className='text-sm text-red-500'>{errors.charge?.[index].chargeTypeId?.message}</p>}
                                </div>



                                {/* Charge Category */}

                                <div className="w-full flex flex-col gap-y-2">
                                    <Controller control={control} name={`charge.${index}.categoryId`} render={({ field }) => {
                                        const Categories = categories?.[index] || []; // Get categories specific to the current field index getting from the object key
                                        return <>
                                            <Label>Charge Category</Label>
                                            <Select value={field.value || ''} onValueChange={(value) => { handleCategoryChange(index, value); field.onChange(value) }}>
                                                <SelectTrigger >
                                                    <SelectValue placeholder="Select" />
                                                </SelectTrigger>

                                                <SelectContent className='z-[200]'>
                                                    {Categories.map((category, index) => {
                                                        return <SelectItem key={index} value={String(category.id)}>{category.category}</SelectItem>
                                                    })}
                                                </SelectContent>
                                            </Select>
                                        </>
                                    }} />
                                    {errors.charge?.[index]?.categoryId && <p className='text-sm text-red-500'>{errors.charge?.[index].categoryId?.message}</p>}
                                </div>


                                {/* Charge Name */}

                                <div className="w-full flex flex-col gap-y-2">
                                    <Controller control={control} name={`charge.${index}.chargeNameId`} render={({ field }) => {
                                        const ChargeNames = names?.[index]?.data || []
                                        return <>
                                            <Label>Charge Name</Label>
                                            <Select value={field.value || ''} onValueChange={(value) => { handleChargeNameChange(index, Number(value)); field.onChange(value) }}>
                                                <SelectTrigger >
                                                    <SelectValue placeholder="Select" />
                                                </SelectTrigger>

                                                <SelectContent className='z-[200]'>
                                                    {ChargeNames.map((chargeName) => {
                                                        return <SelectItem key={chargeName.id} value={String(chargeName.id)}>{chargeName.name}</SelectItem>
                                                    })}
                                                </SelectContent>
                                            </Select>
                                        </>
                                    }} />
                                    {errors.charge?.[index]?.chargeNameId && <p className='text-sm text-red-500'>{errors.charge?.[index]?.chargeNameId?.message}</p>}
                                </div>


                                {/* Standard Charge */}

                                <div className="w-full flex flex-col gap-y-2">
                                    <Label>Standard Charge {currencySymbol()}</Label>
                                    <Input type='number' {...register(`charge.${index}.standard_charge`, { valueAsNumber: true })} /> {/*assigning values automatically */}
                                    {errors?.charge?.[index]?.standard_charge && <p className='text-sm text-red-500'>{errors?.charge?.[index]?.standard_charge.message}</p>}
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
                                    <Input type="number" {...register(`charge.${index}.tax`, { valueAsNumber: true })} disabled />
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
                                        <TooltipProvider delayDuration={200}>
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

                        {!chargeDetails && <div className="col-span-full flex justify-end mr-2">
                            <TooltipProvider delayDuration={200}>
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

                <div className="flex mt-5 mb-2 gap-x-2 sm:justify-end px-2.5">
                    <Button type='button' variant={'ghost'} onClick={() => reset()} >Reset</Button>
                    <Button type='submit' className='flex-1 sm:flex-none' >{chargeDetails ? ('Update') : ('Save Charges')} {isPending && <Loader className='animate-spin' />}</Button>
                </div>
            </form>
        </Dialog>
    )
}

export default ChargeFormModel