import AddAppointment from '@/admin/appointment/AddAppointment'
import { buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ClipboardPlus, FileText, Plus, Printer, ReceiptText } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getOPDList, searchOPDs } from './opdApiHandler'
import toast from 'react-hot-toast'
import { OPDs } from '@/types/type'
import CreatePrescriptionFormModel from './prescription/createPrescriptionFormModel'



const OPDLIST = () => {

  const [isAppointmentModel, setAppointmentModel] = useState<boolean>(false)
  const [OPD_list, setOPD_list] = useState<OPDs[]>([])

  // Model States
  const [isPrescriptionFormVisible, setPrescritionFormVisible] = useState<boolean>(false)

  const fetOPDlist = async () => {
    try {
      const data = await getOPDList()
      setOPD_list(data)

    } catch ({ message }: any) {
      toast.error(message)
    }
  }



  const onSerach = async (search: string) => {
    try {
      const data = await searchOPDs(search)
      setOPD_list(data)
    } catch ({ message }: any) {
      toast.error(message)
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

          <Link onClick={() => { setAppointmentModel(true) }} to={''} className={buttonVariants({
            variant: 'outline',
            size: 'sm',
            className: 'flex gap-x-1'
          })}>
            <Plus />
            Add Patient
          </Link>

        </div>
      </div>

      {/* search bar */}

      <div className='flex py-3 flex-col md:flex-row gap-y-4 md:items-center md:justify-between border-b border-gray-200'>

        <div className='flex gap-x-2'>
          <Input type='text' height='10px' placeholder='caseId , patient , doctor' onChange={(e) => { onSerach(e.target.value) }} />
          {/* use debounce to prevent api call */}
        </div>

        <div className='flex gap-x-2'>

          <FileText className='cursor-pointer text-gray-600' />
          <Printer className='cursor-pointer text-gray-600' />

        </div>
      </div>

      <Table className='my-10'>

        <TableHeader>
          <TableRow>
            <TableHead>OPD No.</TableHead>
            <TableHead>Patient Name</TableHead>
            <TableHead>Case ID</TableHead>
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
              <TableCell className="text-gray-900">{opd.id}</TableCell>
              <TableCell className='whitespace-nowrap'>{opd.appointment.patient.name}</TableCell>
              <TableCell>
                <Link
                  to={`../patient/${opd.patientId}/${opd.caseId}/visitdetails`}
                  className="font-medium text-blue-500 hover:text-blue-400 cursor-pointer"
                >
                  {opd.caseId}
                </Link>
              </TableCell>

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
                <ClipboardPlus className='cursor-pointer text-gray-600 w-5 h-5' onClick={() => setPrescritionFormVisible(true)} />
                <FileText className='cursor-pointer text-gray-600 w-5 h-5' />
                <Printer className='cursor-pointer text-gray-600 w-5 h-5' />
                <ReceiptText className='cursor-pointer text-gray-600 w-5 h-5' />
              </TableCell>

            </TableRow>
          })}

        </TableBody>
      </Table>

      {isAppointmentModel && <AddAppointment onClick={() => { setAppointmentModel(false); fetOPDlist() }} />}

      {/* Prescription Model */}

      {isPrescriptionFormVisible && (
        <CreatePrescriptionFormModel Submit={() => { }} isPending={true} 
        onClick={()=>setPrescritionFormVisible(false)}
        />
      )}
    </div>
  )
}

export default OPDLIST