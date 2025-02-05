import Dialog from "@/components/Dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MultiSelect } from "@/components/ui/multi-select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { createPrescriptionFormSchema, valuesASdefault } from "@/formSchemas/createPrescriptionFormSchema"
import { FINDING_CATEGORIES } from "@/helpers/getFindingOptions"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader, Plus, X } from "lucide-react"
import { HTMLAttributes } from "react"
import { Controller, useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"


interface PrescriptionFormModelProps extends HTMLAttributes<HTMLDivElement> {
    Submit: () => void;
    isPending: boolean
}

const frameworksList = [
    { value: "react", label: "React", },
    { value: "angular", label: "Angular", },
    { value: "vue", label: "Vue", },
    { value: "svelte", label: "Svelte", },
    { value: "ember", label: "Ember", },
];


const CreatePrescriptionFormModel = ({ isPending, Submit, ...props }: PrescriptionFormModelProps) => {

    const { control, handleSubmit, register, formState: { errors } } = useForm<z.infer<typeof createPrescriptionFormSchema>>({
        resolver: zodResolver(createPrescriptionFormSchema),
        defaultValues: valuesASdefault
    })

    const { fields: medicineFields, append: addMedicineFields, remove: removeMedicineFields } = useFieldArray({
        name: 'medicine',
        control
    })


    const onMedicineFields = () => {
        addMedicineFields(valuesASdefault.medicine)
    }


    return (
        <Dialog pageTitle="Add Prescription" {...props}>
            <form onSubmit={handleSubmit(Submit)}>
                <ScrollArea className={'relative h-[60vh] sm:h-[50vh] w-full'}>
                    <div className="grid lg:grid-cols-4 sm:grid-cols-3 gap-4 mt-1 px-3 pb-5 ">

                        {/* Header Note */}

                        <div className="w-full flex flex-col gap-y-2 sm:col-span-full">
                            <Label>Header Note</Label>
                            <Textarea  {...register('header_note')} placeholder="Write note here.." />
                            {errors.header_note && <p className='text-sm text-red-500'>{errors.header_note.message}</p>}
                        </div>


                        {/* Findings */}

                        <div className="w-full flex flex-col gap-y-2">
                            <Controller control={control} name='category' render={({ field }) => {
                                return <>
                                    <Label>Finding Category</Label>
                                    {/* <Select value={field.value || ''} onValueChange={(value) => { field.onChange(value) }}>
                                        <SelectTrigger >
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>

                                        <SelectContent className='z-[200]'>
                                            {FINDING_CATEGORIES.map((category, i) => {
                                                return <SelectItem key={i} value={category.value}>{category.label}</SelectItem>
                                            })}
                                        </SelectContent>
                                    </Select> */}
                                    <MultiSelect
                                        value={field.value || ''}
                                        options={FINDING_CATEGORIES}
                                        animation={2}
                                        variant="inverted"
                                        maxCount={3}
                                        onValueChange={(value)=>field.onChange(value)} />
                                </>
                            }} />
                            {errors.category && <p className='text-sm text-red-500'>{errors.category.message}</p>}

                        </div>


                        {/* Finding List */}

                        <div className="w-full flex flex-col gap-y-2">
                            <Controller control={control} name='name' render={({ field }) => {
                                return <>
                                    <Label>Finding List</Label>
                                    <Select value={field.value || ''} onValueChange={(value) => { field.onChange(value) }}>
                                        <SelectTrigger >
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>

                                        <SelectContent className='z-[200]'>
                                            {FINDING_CATEGORIES.map((category, i) => {
                                                return <SelectItem key={i} value={category.value}>{category.label}</SelectItem>
                                            })}
                                        </SelectContent>
                                    </Select>
                                </>
                            }} />
                            {errors.name && <p className='text-sm text-red-500'>{errors.name.message}</p>}
                        </div>

                        {/* Description */}

                        <div className="w-full flex flex-col gap-y-2">
                            <Label>Description</Label>
                            <Textarea {...register('description')} placeholder="Write descroption" />
                            {errors.description && <p className='text-sm text-red-500'>{errors.description.message}</p>}
                        </div>


                        {/* <div className="w-full flex flex-col gap-y-2 lg:col-span-2">
                            <Label>Description</Label>
                            <MultiSelect 
                                options={FINDING_CATEGORIES}
                                animation={2}
                                variant="inverted"
                                maxCount={3}
                                onValueChange={(value) => {
                                    console.log(value);
                                }} />
                        </div> */}





                        {/* Array section */}

                        {medicineFields.map((field, index) => {
                            return <section key={field.id} className="sm:col-span-full grid-cols-2 grid px-2 py-4 border-2 border-dashed border-gray-200 rounded-md gap-2 sm:grid-cols-5">

                                {/* Medicine Category */}

                                <div className="w-full flex flex-col gap-y-2">
                                    <Controller control={control} name={`medicine.${index}.category`} render={({ field }) => {
                                        return <>
                                            <Label>Medicine Category</Label>
                                            <Select value={field.value || ''} onValueChange={(value) => { field.onChange(value) }}>
                                                <SelectTrigger >
                                                    <SelectValue placeholder="Select" />
                                                </SelectTrigger>

                                                <SelectContent className='z-[200]'>
                                                    {FINDING_CATEGORIES.map((category, i) => {
                                                        return <SelectItem key={i} value={category.value}>{category.label}</SelectItem>
                                                    })}
                                                </SelectContent>
                                            </Select>
                                        </>
                                    }} />
                                    {errors.medicine?.[index]?.category && <p className='text-sm text-red-500'>{errors.medicine?.[index]?.category?.message}</p>}
                                </div>


                                {/* Medicine Name */}

                                <div className="w-full flex flex-col gap-y-2">
                                    <Controller control={control} name={`medicine.${index}.medicineId`} render={({ field }) => {
                                        return <>
                                            <Label>Medicine Name</Label>
                                            <Select value={field.value || ''} onValueChange={(value) => { field.onChange(value) }}>
                                                <SelectTrigger >
                                                    <SelectValue placeholder="Select" />
                                                </SelectTrigger>

                                                <SelectContent className='z-[200]'>
                                                    {FINDING_CATEGORIES.map((category, i) => {
                                                        return <SelectItem key={i} value={category.value}>{category.label}</SelectItem>
                                                    })}
                                                </SelectContent>
                                            </Select>
                                        </>
                                    }} />
                                    {errors.medicine?.[index]?.medicineId && <p className='text-sm text-red-500'>{errors.medicine?.[index]?.medicineId?.message}</p>}
                                </div>

                                {/* Dose */}

                                <div className="w-full flex flex-col gap-y-2 ">
                                    <Label>Dose</Label>
                                    <Input {...register(`medicine.${index}.dose`)} />
                                    {errors.medicine?.[index]?.dose && <p className='text-sm text-red-500'>{errors.medicine?.[index]?.dose.message}</p>}
                                </div>

                                {/* Dose Interval */}

                                <div className="w-full flex flex-col gap-y-2 ">
                                    <Label>Dose Interval</Label>
                                    <Input {...register(`medicine.${index}.dose_interval`)} />
                                    {errors.medicine?.[index]?.dose_interval && <p className='text-sm text-red-500'>{errors.medicine?.[index]?.dose_interval.message}</p>}
                                </div>

                                {/* Dose Duration */}

                                <div className="w-full flex flex-col gap-y-2 ">
                                    <Label>Dose Duration</Label>
                                    <Input {...register(`medicine.${index}.dose_duration`)} />
                                    {errors.medicine?.[index]?.dose_duration && <p className='text-sm text-red-500'>{errors.medicine?.[index]?.dose_duration.message}</p>}
                                </div>

                                {/* Instruction */}

                                <div className="w-full flex flex-col gap-y-2 ">
                                    <Label>Instruction</Label>
                                    <Input {...register(`medicine.${index}.instruction`)} />
                                    {errors.medicine?.[index]?.instruction && <p className='text-sm text-red-500'>{errors.medicine?.[index]?.instruction.message}</p>}
                                </div>

                                {/* Remove fields button */}

                                <div className="h-full flex items-center gap-x-2 col-span-full sm:col-span-1 justify-center sm:justify-normal">
                                    {medicineFields.length > 1 && <TooltipProvider delayDuration={200}>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <div className="p-1 bg-red-500 rounded-full text-white mt-2 sm:mt-4">
                                                    <X className="w-4 h-4 cursor-pointer" onClick={() => { removeMedicineFields(index) }} />
                                                </div>
                                            </TooltipTrigger>
                                            <TooltipContent className="z-[200]">Remove</TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>}
                                </div>
                            </section>
                        })}


                        {/* add more fiels button */}

                        <div className="h-full flex col-span-full justify-end mr-2">
                            <TooltipProvider delayDuration={200}>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <div className="p-1 bg-slate-500 rounded-full active:scale-90 text-white mt-2 sm:mt-4">
                                            <Plus className="w-4 h-4 cursor-pointer " onClick={onMedicineFields} />
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent className="z-[200]">Add more fields</TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>



                    </div>
                </ScrollArea>
                <div className="flex mt-5 p-3 gap-x-2 sm:justify-end">
                    <Button type='submit' className='flex-1 sm:flex-none'>Save Prescription {isPending && <Loader className='animate-spin' />}</Button>
                </div>
            </form>
        </Dialog>
    )
}

export default CreatePrescriptionFormModel