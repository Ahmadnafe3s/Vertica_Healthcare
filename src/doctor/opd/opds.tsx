import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ClipboardPlus, SearchX, Syringe } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useDebouncedCallback } from 'use-debounce'
import { parseAsInteger, useQueryState } from 'nuqs'
import CustomPagination from '@/components/customPagination'
import PrintDoctorOpds from './print/print'
import OpdBillPDF from '@/admin/OPD/pdf/bill'
import LoaderModel from '@/components/loader'
import CustomTooltip from '@/components/customTooltip'
import CreatePrescriptionFormModel from '@/admin/OPD/prescription/createPrescriptionFormModel'
import { createPrescriptionFormSchema } from '@/formSchemas/createPrescriptionFormSchema'
import { z } from 'zod'
import { prescriptionDetail } from '@/types/opd_section/prescription'
import { createPrescription, deletePrescription, getOPDs, getPrescriptionDetails, updatePrescription } from '@/admin/OPD/opdApiHandler'
import PrescriptionDetailsModel from '@/admin/OPD/prescription/prescriptionDetailsModel'
import AlertModel from '@/components/alertModel'
import { OPDs } from '@/types/opd_section/opd'





const DoctorOpds = () => {

  //credentials
  const opdId = useRef<string>('')
  const patientId = useRef<number>()

  // Query params
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))
  const [search, setSearch] = useQueryState('search')

  // loading state
  const [isLoading, setLoading] = useState<{ inline: boolean, model: boolean }>({
    inline: false,
    model: false
  })


  // Model States
  const [model, setModel] = useState<{ prescriptionForm: boolean, appointmentForm: boolean, alert: boolean, prescriptionDetails: boolean, print: boolean }>({
    prescriptionForm: false,
    appointmentForm: false,
    prescriptionDetails: false,
    alert: false,
    print: false
  })


  // API states
  const [opds, setOpds] = useState<OPDs>({ data: [], total_pages: 0 })
  const [prescDetails, setPrescDetails] = useState<prescriptionDetail>()


  // fetching opd Details
  const fetchOPDs = async () => {
    try {
      const data = await getOPDs({ page, limit: 10, search: search! })
      setOpds(data)
    } catch ({ message }: any) {
      toast.error(message)
    }
  }


  // handling prescription
  const handleSubmit = async (formData: z.infer<typeof createPrescriptionFormSchema>) => {
    try {
      let data;
      setLoading(prev => ({ ...prev, inline: true }))
      prescDetails ? (
        data = await updatePrescription(prescDetails.id, formData),
        setPrescDetails(undefined)
      )
        :
        (data = await createPrescription(opdId.current, 2, formData))
      toast.success(data.message)
      fetchOPDs()
      setModel(prev => ({ ...prev, prescriptionForm: false }))
    } catch ({ message }: any) {
      toast.error(message)
    } finally {
      setLoading(prev => ({ ...prev, inline: false }))
    }
  }



  // fetching prescription details
  const fetchPrescriptionDetails = async (id: number) => {
    try {
      setLoading(prev => ({ ...prev, model: true }))
      const data = await getPrescriptionDetails(id)
      setPrescDetails(data)
    } catch ({ message }: any) {
      toast.error(message)
    } finally {
      setLoading(prev => ({ ...prev, model: false }))
    }
  }



  // deleting prescription

  const onDelete = async () => {
    try {
      setLoading(prev => ({ ...prev, inline: true }))
      const data = await deletePrescription(prescDetails?.id!)
      toast.success(data.message)
      fetchOPDs()
    } catch ({ message }: any) {
      toast.error(message)
    } finally {
      setLoading(prev => ({ ...prev, inline: false }))
      setModel(prev => ({ ...prev, alert: false }))
      setPrescDetails(undefined)
    }
  }


  // searching list
  const onSerach = useDebouncedCallback(async (value: string) => {
    value ? setSearch(value) : setSearch(null)
    setPage(1)
  }, 400)



  useEffect(() => {
    fetchOPDs()
  }, [page, search])


  return (
    <div className='my-2 flex flex-col'>

      {/* top bar */}

      <div className='flex py-3 flex-row gap-y-2 items-center justify-between border-b border-gray-200'>
        <h1 className='font-semibold tracking-tight'>OPD List</h1>
        {/* <div className='flex gap-x-2 overflow-x-auto'>
          <Button size="sm"
          ><ScrollText />Cumulative Report</Button>
        </div> */}
      </div>

      {/* search bar */}

      <div className='flex py-3 flex-row gap-y-4 items-center justify-between border-b border-gray-200'>

        <div className='flex gap-x-2'>
          {/* use debounce to prevent api call */}
          <Input type='text' height='10px' placeholder='opdId , patient , date' onChange={(e) => { onSerach(e.target.value) }} defaultValue={search!} />
        </div>

        <div>
          {/* will print all list */}
          <PrintDoctorOpds opds={opds['data']} />
        </div>
      </div>


      {/* pagination */}
      <section className="flex flex-col mb-16 gap-y-5 min-h-[75vh]">
        <div className="flex-1 space-y-5">
          <Table className="border rounded-lg my-10">
            <TableHeader className='bg-gray-100 '>
              <TableRow>
                <TableHead>OPD No.</TableHead>
                <TableHead>Appointment Date</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Reference</TableHead>
                <TableHead>Symptom Type</TableHead>
                <TableHead>Previous medical Issue</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>


            <TableBody>

              {opds.data.map((opd, i) => {
                return <TableRow key={i}>
                  <TableCell>
                    <Link to={`/admin/opd/patient/${opd.patientId}/${opd.id}`}
                      className="font-medium text-blue-500 hover:text-blue-400 cursor-pointer">
                      {opd.id}
                    </Link>
                  </TableCell>
                  <TableCell>{opd.appointment.appointment_date}</TableCell>
                  <TableCell>{opd.patient.name}</TableCell>
                  <TableCell>{opd.patient.gender}</TableCell>
                  <TableCell>{opd.appointment.reference}</TableCell>
                  <TableCell>{opd.appointment.symptom_type}</TableCell>
                  <TableCell>{opd.appointment.previous_medical_issue}</TableCell>
                  <TableCell className='flex space-x-2'>
                    {opd.prescriptions?.id ?
                      (
                        <CustomTooltip message='prescription'>
                          <Syringe className='cursor-pointer text-gray-600 w-5 h-5'
                            onClick={async () => {
                              await fetchPrescriptionDetails(opd.prescriptions.id!)
                              setModel(prev => ({ ...prev, prescriptionDetails: true }))
                            }}
                          />
                        </CustomTooltip>
                      )
                      :
                      (
                        <CustomTooltip message='Add prescription'>
                          <ClipboardPlus className='cursor-pointer text-gray-600 w-5 h-5'
                            onClick={() => { opdId.current = opd.id; patientId.current = opd.patientId; setModel(prev => ({ ...prev, prescriptionForm: true })) }}
                          />
                        </CustomTooltip>
                      )
                    }
                    <OpdBillPDF opdId={opd.id} onPending={(v) => setLoading(prev => ({ ...prev, model: v }))} />
                  </TableCell>

                </TableRow>
              })}
            </TableBody>
          </Table>
          {/* error on emply list */}

          {opds.data.length < 1 && <h1 className='text-gray-900 mt-4 sm:mt-1 font-semibold text-lg flex items-center gap-1'>No data found <SearchX className='h-5 w-5' /></h1>}
        </div>


        {/* pagination buttons */}
        <section>
          <CustomPagination
            total_pages={opds?.total_pages!}
            currentPage={page}
            previous={(p) => setPage(p)}
            goTo={(p) => setPage(p)}
            next={(p) => setPage(p)}
          />
        </section>
      </section>


      {/* loading model */}

      {isLoading.model && <LoaderModel />}

      {/* prescription details */}

      {
        model.prescriptionForm && (
          <CreatePrescriptionFormModel Submit={handleSubmit} isPending={isLoading.inline}
            prescDetails={prescDetails!}
            onClick={() => { setModel(prev => ({ ...prev, prescriptionForm: false })); setPrescDetails(undefined) }}
          />
        )
      }


      {/* prescription detais */}

      {model.prescriptionDetails && (
        <PrescriptionDetailsModel
          prescriptionDetails={prescDetails!}
          onClick={() => { setModel(prev => ({ ...prev, prescriptionDetails: false })); setPrescDetails(undefined) }}
          Delete={() => setModel(prev => ({ ...prev, prescriptionDetails: false, alert: true }))}
          Edit={() => setModel(prev => ({ ...prev, prescriptionDetails: false, prescriptionForm: true }))}
        />
      )}


      {/* Alert model */}

      {model.alert && (
        <AlertModel
          cancel={() => { setModel(prev => ({ ...prev, alert: false })); setPrescDetails(undefined) }}
          continue={onDelete}
          isPending={isLoading.inline}
        />
      )}

    </div >
  )
}



export default DoctorOpds