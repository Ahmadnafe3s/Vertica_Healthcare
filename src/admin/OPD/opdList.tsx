import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ClipboardPlus, FileText, Plus, Printer, ReceiptText, Syringe } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { createPrescription, deletePrescription, getOPDList, getPrescriptionDetails, searchOPDs, updatePrescription } from './opdApiHandler'
import toast from 'react-hot-toast'
import CreatePrescriptionFormModel from './prescription/createPrescriptionFormModel'
import { OPDs } from '@/types/opd_section/opd'
import { createPrescriptionFormSchema } from '@/formSchemas/createPrescriptionFormSchema'
import { boolean, z } from 'zod'
import CustomTooltip from '@/components/customTooltip'
import LoaderModel from '@/components/loader'
import PrescriptionDetailsModel from './prescription/prescriptionDetailsModel'
import { prescriptionDetail } from '@/types/opd_section/prescription'
import AlertModel from '@/components/alertModel'
import { useDebouncedCallback } from 'use-debounce'




const OPDLIST = () => {

  const opdId = useRef<string>('')

  // loaders
  const [isLoading, setLoading] = useState<{ inline: boolean, model: boolean }>({
    inline: false,
    model: false
  })

  // API states
  const [OPD_list, setOPD_list] = useState<OPDs[]>([])
  const [prescDetails, setPrescDetails] = useState<prescriptionDetail>()

  // Model States
  const [model, setModel] = useState<{ prescriptionForm: boolean, appointmentForm: boolean, prescriptionDetails: boolean, alert: boolean }>({
    prescriptionForm: false,
    appointmentForm: false,
    prescriptionDetails: false,
    alert: false
  })


  const fetOPDlist = async () => {
    try {
      const data = await getOPDList()
      setOPD_list(data)

    } catch ({ message }: any) {
      toast.error(message)
    }
  }



  const onSerach = useDebouncedCallback(async (search: string) => {
    try {
      const data = await searchOPDs(search)
      setOPD_list(data)
    } catch ({ message }: any) {
      toast.error(message)
    }
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
        (data = await createPrescription(opdId.current, formData))
      toast.success(data.message)
      fetOPDlist()
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
      fetOPDlist()
    } catch ({ message }: any) {
      toast.error(message)
    } finally {
      setLoading(prev => ({ ...prev, inline: false }))
      setModel(prev => ({ ...prev, alert: false }))
      setPrescDetails(undefined)
    }
  }



  useEffect(() => {
    fetOPDlist()
  }, [])


  return (
    <div className='my-2 flex flex-col'>

      {/* top bar */}

      <div className='flex py-3 flex-col md:flex-row gap-y-2 md:items-center md:justify-between border-b border-gray-200'>
        <h1 className='font-semibold tracking-tight'>OPD - out patient list</h1>
        <div className='flex gap-x-2 overflow-x-auto'>

          <Button size="sm"
            onClick={() => setModel(prev => ({ ...prev, appointmentForm: true }))}
          ><Plus />Add Patient</Button>

        </div>
      </div>

      {/* search bar */}

      <div className='flex py-3 flex-col md:flex-row gap-y-4 md:items-center md:justify-between border-b border-gray-200'>

        <div className='flex gap-x-2'>
          <Input type='text' height='10px' placeholder='opdId , patient , doctor' onChange={(e) => { onSerach(e.target.value) }} />
          {/* use debounce to prevent api call */}
        </div>

        <div className='flex gap-x-2'>

          <FileText className='cursor-pointer text-gray-600' />
          <Printer className='cursor-pointer text-gray-600' />

        </div>
      </div>


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
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>

          {OPD_list.map((opd, i) => {
            return <TableRow key={i}>
              <TableCell>
                <Link to={`../patient/${opd.patientId}/${opd.id}/visitdetails`}
                  className="font-medium text-blue-500 hover:text-blue-400 cursor-pointer">
                  {opd.id}
                </Link>
              </TableCell>
              <TableCell className='whitespace-nowrap'>{opd.appointment.patient.name}</TableCell>
              <TableCell>{opd.appointment.appointment_date}</TableCell>
              <TableCell>
                <Link className='text-blue-500 font-medium whitespace-nowrap' to={{ pathname: `/admin/profile/staff/${opd.appointment.doctor.id}` }}>
                  {opd.appointment.doctor.name}
                </Link>
              </TableCell>

              <TableCell>{opd.appointment.reference}</TableCell>
              <TableCell>{opd.appointment.symptom_type}</TableCell>
              <TableCell>{opd.appointment.previous_medical_issue}</TableCell>

              <TableCell className='flex gap-x-2 items-center'>
                {opd.prescriptions?.id ?
                  (
                    <CustomTooltip message='prescription'>
                      <Syringe className='cursor-pointer text-gray-600 w-5 h-5'
                        onClick={async () => {
                          await fetchPrescriptionDetails(opd.prescriptions.id)
                          setModel(prev => ({ ...prev, prescriptionDetails: true }))
                        }}
                      />
                    </CustomTooltip>
                  )
                  :
                  (
                    <CustomTooltip message='Add prescription'>
                      <ClipboardPlus className='cursor-pointer text-gray-600 w-5 h-5'
                        onClick={() => { opdId.current = opd.id; setModel(prev => ({ ...prev, prescriptionForm: true })) }}
                      />
                    </CustomTooltip>
                  )
                }
                <FileText className='cursor-pointer text-gray-600 w-5 h-5' />
                <Printer className='cursor-pointer text-gray-600 w-5 h-5' />
                <ReceiptText className='cursor-pointer text-gray-600 w-5 h-5' />
              </TableCell>

            </TableRow>
          })}
        </TableBody>
      </Table>


      {/* {isAppointmentModel && <AddAppointment onClick={() => { setAppointmentModel(false); }} />} */}

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