import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ClipboardPlus, SearchX, Syringe } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { createPrescription, deletePrescription, getOPDs, getPrescriptionDetails, updatePrescription } from './opdApiHandler'
import toast from 'react-hot-toast'
import CreatePrescriptionFormModel from './prescription/createPrescriptionFormModel'
import { OPDs, } from '@/types/opd_section/opd'
import { createPrescriptionFormSchema } from '@/formSchemas/createPrescriptionFormSchema'
import { z } from 'zod'
import CustomTooltip from '@/components/customTooltip'
import LoaderModel from '@/components/loader'
import PrescriptionDetailsModel from './prescription/prescriptionDetailsModel'
import { prescriptionDetail } from '@/types/opd_section/prescription'
import AlertModel from '@/components/alertModel'
import { useDebouncedCallback } from 'use-debounce'
import { parseAsInteger, useQueryState } from 'nuqs'
import CustomPagination from '@/components/customPagination'
import OpdBillPDF from './pdf/bill'
import OpdsPdf from './pdf/opds'
import usePermission from '@/authz'





const OPDLIST = () => {

  //utilities
  const opdId = useRef<string>('')
  const patientId = useRef(0)

  // my custom hook
  const { loadPermission, hasPermission } = usePermission()

  // Query params
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))
  const [search, setSearch] = useQueryState('search')

  // loaders
  const [isLoading, setLoading] = useState({ inline: false, model: false })

  // API states
  const [OPD_list, setOPD_list] = useState<OPDs>({ data: [], total_pages: 0 })
  const [prescDetails, setPrescDetails] = useState<prescriptionDetail>()


  // Model States
  const [model, setModel] = useState({ prescriptionForm: false, appointmentForm: false, prescriptionDetails: false, alert: false, print: false })


  // fetching opd Details
  const fetchOPDs = async () => {
    try {
      const data = await getOPDs({ search: search!, page, limit: 10 })
      setOPD_list(data)
    } catch ({ message }: any) {
      toast.error(message)
    }
  }



  // searching list
  const onSerach = useDebouncedCallback(async (value: string) => {
    value ? setSearch(value) : setSearch(null)
    setPage(1)
  }, 400)



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
        (data = await createPrescription(opdId.current, patientId.current, formData))
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


  useEffect(() => {
    fetchOPDs()
    loadPermission()
  }, [page, search])


  return (
    <div className='my-2 flex flex-col'>

      {/* top bar */}

      <div className='flex py-3 flex-col md:flex-row gap-y-2 md:items-center md:justify-between border-b border-gray-200'>
        <h1 className='font-semibold tracking-tight'>OPD - out patient list</h1>
        <div className='flex gap-x-2 overflow-x-auto'>

          {/* <Button size="sm"
            onClick={() => setModel(prev => ({ ...prev, appointmentForm: true }))}
          ><Plus />Add Patient</Button> */}

        </div>
      </div>

      {/* search bar */}

      <div className='flex py-3 flex-col md:flex-row gap-y-4 md:items-center md:justify-between border-b border-gray-200'>

        <div className='flex gap-x-2'>
          <Input type='text' height='10px' placeholder='opdId , patient , doctor' onChange={(e) => { onSerach(e.target.value) }} defaultValue={search!} />
          {/* use debounce to prevent api call */}
        </div>

        <div className='flex gap-x-2'>
          {/* will print all list */}
          <OpdsPdf opds={OPD_list['data']} />
        </div>
      </div>


      {/* pagination */}
      <section className="flex flex-col mb-16 gap-y-5 min-h-[75vh]">
        <div className="flex-1 space-y-5">
          <Table className="border rounded-lg my-10">
            <TableHeader className='bg-gray-100 '>
              <TableRow>
                <TableHead>OPD No.</TableHead>
                <TableHead>Patient Name</TableHead>
                <TableHead>Appointment Date</TableHead>
                <TableHead>Consultant</TableHead>
                <TableHead>Reference</TableHead>
                <TableHead>Symptom Type</TableHead>
                <TableHead>Previous medical Issue</TableHead>
                <TableHead className='print:hidden'>Action</TableHead>
              </TableRow>
            </TableHeader>


            <TableBody>

              {OPD_list?.data.map((opd, i) => {
                return <TableRow key={i}>
                  <TableCell>
                    <Link to={`./patient/${opd?.patientId}/${opd?.id}`}
                      className="font-medium text-blue-500 hover:text-blue-400 cursor-pointer">
                      {opd?.id}
                    </Link>
                  </TableCell>
                  <TableCell className='whitespace-nowrap'>{opd.patient?.name}</TableCell>
                  <TableCell>{opd.appointment.appointment_date}</TableCell>
                  <TableCell>
                    <Link className='text-blue-500 font-medium whitespace-nowrap' to={{ pathname: `/admin/profile/staff/${opd?.doctorId}` }}>
                      {opd.doctor?.name}
                    </Link>
                  </TableCell>

                  <TableCell>{opd.appointment.reference}</TableCell>
                  <TableCell>{opd.appointment.symptom_type}</TableCell>
                  <TableCell>{opd.appointment.previous_medical_issue}</TableCell>

                  <TableCell className='flex gap-x-2 items-center print:hidden'>
                    {opd.prescriptions?.id ?
                      <>
                        {hasPermission('view', 'prescription') && (
                          <CustomTooltip message='prescription'>
                            <Syringe className='cursor-pointer text-gray-600 w-5 h-5'
                              onClick={async () => {
                                await fetchPrescriptionDetails(opd.prescriptions.id)
                                setModel(prev => ({ ...prev, prescriptionDetails: true }))
                              }}
                            />
                          </CustomTooltip>
                        )}
                      </>
                      :
                      <>
                        {hasPermission('create', 'prescription') && (
                          <CustomTooltip message='Add prescription'>
                            <ClipboardPlus className='cursor-pointer text-gray-600 w-5 h-5'
                              onClick={() => { opdId.current = opd.id; patientId.current = opd.patientId; setModel(prev => ({ ...prev, prescriptionForm: true })) }}
                            />
                          </CustomTooltip>
                        )}
                      </>
                    }
                    {/* prints bill */}
                    <OpdBillPDF opdId={opd.id} onPending={(value) => setLoading({ ...isLoading, model: value })} />
                  </TableCell>

                </TableRow>
              })}
            </TableBody>
          </Table>
          {/* error on emply list */}

          {OPD_list.data.length < 1 && <h1 className='text-gray-900 mt-4 sm:mt-1 font-semibold text-lg flex items-center gap-1'>No data found <SearchX className='h-5 w-5' /></h1>}
        </div>


        {/* pagination buttons */}
        <section>
          <CustomPagination
            total_pages={OPD_list?.total_pages!}
            currentPage={page}
            previous={(p) => setPage(p)}
            goTo={(p) => setPage(p)}
            next={(p) => setPage(p)}
          />
        </section>
      </section>

      {/* {model.appointmentForm && <AddAppointment  onClick={() => {  }} />} */}

      {/* Prescription Model */}

      {
        model.prescriptionForm && (
          <CreatePrescriptionFormModel Submit={handleSubmit} isPending={isLoading.inline}
            prescDetails={prescDetails!}
            onClick={() => { setModel(prev => ({ ...prev, prescriptionForm: false })); setPrescDetails(undefined) }}
          />
        )
      }

      {/* Loader Model */}

      {isLoading.model && (<LoaderModel />)}


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

export default OPDLIST