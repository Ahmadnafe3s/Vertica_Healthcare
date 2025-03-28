import { fetchPatients } from "@/admin/appointment/appointmentAPIhandler"
import { getMedicineCategories } from "@/admin/setup/pharmacy/apiHandler"
import CustomTooltip from "@/components/customTooltip"
import Dialog from "@/components/Dialog"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { currencySymbol } from "@/helpers/currencySymbol"
import { medicineCategory } from "@/types/setupTypes/pharmacy"
import { Patients } from "@/types/type"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader, Plus, X } from "lucide-react"
import { HTMLAttributes, useEffect, useState } from "react"
import { Controller, useFieldArray, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { Link } from "react-router-dom"
import { z } from "zod"
import { calculateAmount } from "@/helpers/calculateAmount"
import { useDebouncedCallback } from "use-debounce"
import { getStaffs } from "@/admin/humanresource/HRApiHandler"
import { staffs } from "@/types/staff/staff"
import { Separator } from "@/components/ui/separator"
import { createRadiologyBillSchema, RadiologyBillDefaultValues } from "@/formSchemas/createRadiologyBill"
import { RadiologyTestNameDetailsType, RadiologyTestNameType } from "@/types/setupTypes/radiology"
import { getRadiologyTestDetails, getRadiologyTests } from "../setup/radiology/ApiHandlers"



interface CreatePharmacyBillProps extends HTMLAttributes<HTMLDivElement> {
  Submit: (formData: any) => void
  isPending: boolean
}




const CreateRadiologyBill = ({ Submit, isPending, ...props }: CreatePharmacyBillProps) => {

  // form hook
  const { control, register, reset, setValue, watch, handleSubmit, formState: { errors } } = useForm<z.infer<typeof createRadiologyBillSchema>>({
    resolver: zodResolver(createRadiologyBillSchema),
    defaultValues: RadiologyBillDefaultValues
  })


  const { fields: TestFields, append: AddTest, remove: RemoveTest } = useFieldArray({
    name: 'tests',
    control
  })


  //will watch all fields
  // const items = useWatch({ name: 'items', control })


  // API states
  const [patients, setPatients] = useState<Patients[]>([])
  const [doctors, setDoctors] = useState<staffs>({ data: [], total_pages: 0 })
  const [medCategories, setMedCategories] = useState<medicineCategory[]>([])
  const [tests, setTests] = useState<RadiologyTestNameType>({ data: [], total_pages: 0 })



  const onPatientSearch = useDebouncedCallback(async (value: string) => {
    try {
      const data = await fetchPatients(value)
      setPatients(data)
    } catch ({ message }: any) {
      toast.error(message)
    }
  }, 400)



  const fetchRadiologyTests = async () => {
    try {
      const data = await getRadiologyTests({ page: 1, limit: 0 })
      setTests(data)
    } catch ({ message }: any) {
      toast.error(message)
    }
  }


  // fetching and binding medicines


  // working from here


  const handleTestNameChange = async (testNameId: number, i: number) => {
    try {
      const data = await getRadiologyTestDetails(testNameId)
      setValue(`tests.${i}.reportDays`, data.reportDays)
      const date = new Date(data.reportDate).toISOString().split('T')[0]
      setValue(`tests.${i}.reportDate`, date)
    } catch ({ message }: any) {
      toast.error(message)
    }
  }


  //fetching and binding batches
  // const handleMedicineChange = async (i: number, medicineId: number) => {
  //   try {
  //     const data = await getMedicinesBatches(medicineId)
  //     setBatches(prev => ({ ...prev, [i]: data }))
  //   } catch ({ message }: any) {
  //     toast.error(message)
  //   }
  // }


  // const handleBatchChange = async (i: number, batchId: number) => {
  //   try {
  //     const data = await getMedicinesBatchDetails(batchId)
  //     setValue(`items.${i}.salePrice`, Number(data.purchaseMedicine.sale_price))
  //     setValue(`items.${i}.tax`, Number(data.purchaseMedicine.tax))
  //     setMedStocks(prev => ({ ...prev, [i]: data.quantity }))
  //   } catch ({ message }: any) {
  //     toast.error(message)
  //   }
  // }


  // for calculating amount
  // const onQuantityChange = (i: number, qty: number) => {

  //   const Total = (qty * watch(`items.${i}.salePrice`))

  //   const Tax = watch(`items.${i}.tax`)

  //   //for specific fields
  //   const amount = calculateAmount(Total, Tax, 0).net_amount
  //   setValue(`items.${i}.amount`, amount)

  // }


  // fetching doctors

  const getDoctors = async () => {
    try {
      const data = await getStaffs({ limit: 0, search: 'doctor' }) // getting only doctors
      setDoctors(data)
    } catch ({ message }: any) {
      toast.error(message)
    }
  }


  // Appends fields
  const appendMedicine = () => {
    // addMedicine()
  }


  // calculating price from all fields
  // useEffect(() => {
  //   const discount = watch('discount')
  //   const comulativeTotal = items?.reduce((sum, item) => (sum + item?.amount), 0)
  //   const net_amount = calculateAmount(comulativeTotal, 0, discount).net_amount // tax is zero here coz we have already calculated tax
  //   setValue(`net_amount`, net_amount)
  // }, [items, watch('discount')])


  useEffect(() => {
    fetchRadiologyTests()
    getDoctors()
  }, [])



  return (
    <Dialog pageTitle='Pharmacy Bill' {...props}>
      <form onSubmit={handleSubmit(Submit)}>
        <div className='flex  gap-2 px-2.5'>
          {/* Patient Section */}
          <div>
            <Controller name='patientId' control={control} render={({ field }) => {
              return <Select value={field.value ? String(field.value) : undefined} onValueChange={(value) => { field.onChange(Number(value)) }}>
                <SelectTrigger className='sm:w-[300px] w-40'>
                  <SelectValue placeholder="Search" />
                </SelectTrigger>

                <SelectContent className='z-[200]'>
                  <Input type='search' className='w-full' placeholder='search patient' onChange={(e) => { onPatientSearch(e.target.value) }} />
                  {patients.map((patient, i) => {
                    return <SelectItem key={i} value={String(patient.id)}>{`${patient.name} (${patient.id})`}</SelectItem>
                  })}
                </SelectContent>
              </Select>
            }} />
            {errors.patientId && <p className='text-sm text-red-500'>{errors.patientId.message}</p>}
          </div>
          <div>
            <Link to={{ pathname: '/registerPatient' }} className={buttonVariants(
              {
                variant: 'outline',
                size: 'sm'
              }
            )}>New Patient</Link>
          </div>
        </div>

        <Separator className="my-2" />

        {/* grid for fields */}


        <ScrollArea className='h-[60vh] sm:h-[55vh]'>

          <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-5 mb-8 px-2.5">

            {/* Tests field array */}

            {TestFields.map((test, index) => {

              return <section key={test.id} className="sm:col-span-full mt-2 p-2 rounded-md grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 border-2 border-dashed border-gray-200 dark:border-gray-700">

                {/* Test Name */}

                <div className="w-full flex flex-col gap-y-2">
                  <Controller control={control} name={`tests.${index}.testNameId`} render={({ field }) => {
                    return <>
                      <Label>Test Name</Label>
                      <Select value={field.value ? String(field.value) : undefined} onValueChange={(value) => { /*handleTestNameChange(index, Number(value));*/ field.onChange(Number(value)) }}>
                        <SelectTrigger >
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>

                        <SelectContent className='z-[200]'>
                          {tests.data.map((test) => {
                            return <SelectItem key={test.id} value={String(test.id)}>{test.name}</SelectItem>
                          })}
                        </SelectContent>
                      </Select>
                    </>
                  }} />
                  {errors.tests?.[index]?.testNameId && <p className='text-sm text-red-500'>{errors.tests?.[index].testNameId?.message}</p>}
                </div>


                {/* Report Days */}

                <div className="w-full flex flex-col gap-y-2">
                  <Label>Report Days</Label>
                  <Input type='number' {...register(`tests.${index}.reportDays`)} disabled />
                  {errors.tests?.[index]?.reportDays && <p className='text-sm text-red-500'>{errors.tests?.[index].reportDays?.message}</p>}
                </div>

                {/* Report Date */}

                <div className="w-full flex flex-col gap-y-2">
                  <Label>Report Date</Label>
                  <Input type='date' {...register(`tests.${index}.reportDate`)} />
                  {errors.tests?.[index]?.reportDate && <p className='text-sm text-red-500'>{errors.tests?.[index].reportDate?.message}</p>}
                </div>


                {/* Tax */}

                <div className="w-full flex flex-col gap-y-2">
                  <Label>Tax %</Label>
                  <Input type='number' {...register(`tests.${index}.tax`, { valueAsNumber: true })} defaultValue={0} disabled />
                  {errors.tests?.[index]?.tax && <p className='text-sm text-red-500'>{errors.tests?.[index].tax?.message}</p>}
                </div>

                {/* Amount */}

                <div className="w-full flex flex-col gap-y-2">
                  <Label>Amount {currencySymbol()}</Label>
                  <Input type="number" {...register(`tests.${index}.amount`, { valueAsNumber: true })} defaultValue={0} disabled />
                  {errors.tests?.[index]?.amount && <p className='text-sm text-red-500'>{errors.tests?.[index].amount?.message}</p>}
                </div>


                {/* Button to remove fields */}

                {TestFields.length !== 1 &&
                  <div className="h-full flex items-center gap-x-2 justify-center mt-3 sm:mt-1">
                    <CustomTooltip message="Remove">
                      <div className="p-1 bg-red-500 rounded-full text-white mt-2 sm:mt-4">
                        <X className="w-4 h-4 cursor-pointer" onClick={() => { RemoveTest(index) }} />
                      </div>
                    </CustomTooltip>
                  </div>
                }

              </section>

            })}


            {/* Button for Addding fields */}

            {!false && <div className="col-span-full flex justify-end mr-2">
              <CustomTooltip message="Add more fields">
                <div className="p-1 bg-slate-500 rounded-full text-white">
                  <Plus className="w-4 h-4 cursor-pointer" onClick={appendMedicine} />
                </div>
              </CustomTooltip>
            </div>}



            {/* Date */}

            <div className="w-full flex flex-col gap-y-2">
              <Label>Billing Date</Label>
              <Input type="date" {...register('date')} />
              {errors.date && <p className='text-sm text-red-500'>{errors.date.message}</p>}
            </div>


            {/* hospital doctor */}

            <div className="w-full flex flex-col gap-y-2">
              <Label>Hospital Doctor</Label>
              <Select onValueChange={(value) => { setValue(`doctor`, value) }}>
                <SelectTrigger >
                  <SelectValue placeholder="Select" />
                </SelectTrigger>

                <SelectContent className='z-[200]'>
                  {doctors.data?.map((doctor) => {
                    return <SelectItem key={doctor.id} value={doctor.name}> {doctor.name} </SelectItem>
                  })}
                </SelectContent>
              </Select>
            </div>


            {/* Doctor */}

            <div className="w-full flex flex-col gap-y-2">
              <Label>Doctor</Label>
              <Input type='text' {...register('doctor')} />
              {errors.doctor && <p className='text-sm text-red-500'>{errors.doctor.message}</p>}
            </div>


            {/* opdId */}

            <div className="w-full flex flex-col gap-y-2">
              <Label>OPD ID</Label>
              <Input type='text' {...register('opdId')} />
              {errors.opdId && <p className='text-sm text-red-500'>{errors.opdId.message}</p>}
            </div>

            {/* Discount */}

            <div className="w-full flex flex-col gap-y-2">
              <Label>Discount%</Label>
              <Input type='number' {...register('discount', { valueAsNumber: true })} defaultValue={0} />
              {errors.discount && <p className='text-sm text-red-500'>{errors.discount.message}</p>}
            </div>

            {/* Net Amount */}
            <div className="w-full flex flex-col gap-y-2">
              <Label>Net Amount {currencySymbol()}</Label>
              <Input type='number' {...register('net_amount', { valueAsNumber: true })} defaultValue={0} />
              {errors.net_amount && <p className='text-sm text-red-500'>{errors.net_amount.message}</p>}
            </div>


            {/* Note */}
            <div className="w-full flex flex-col gap-y-2 sm:col-span-2">
              <Label>Note</Label>
              <Textarea placeholder='write your messsage here' {...register('note')} />
            </div>

          </div>
        </ScrollArea>

        <div className="flex mt-5 mb-2 gap-x-2 sm:justify-end px-2.5">
          <Button type='button' variant={'ghost'} onClick={() => { reset() }} >Reset</Button>
          <Button type='submit' className='flex-1 sm:flex-none' >Save Bill {isPending && <Loader className='animate-spin' />}</Button>
        </div>

      </form>
    </Dialog>
  )
}




export default CreateRadiologyBill