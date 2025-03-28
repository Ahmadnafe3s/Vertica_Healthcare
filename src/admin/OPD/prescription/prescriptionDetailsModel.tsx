import CustomTooltip from "@/components/customTooltip"
import Dialog from "@/components/Dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { prescriptionDetail } from "@/types/opd_section/prescription"
import { Pencil, Syringe, Trash } from "lucide-react"
import { HTMLAttributes } from "react"

interface PrescriptionDetailsProps extends HTMLAttributes<HTMLDivElement> {
  prescriptionDetails: prescriptionDetail
  Edit: () => void
  Delete: () => void
}

const PrescriptionDetailsModel = ({ Edit, Delete, prescriptionDetails: details, ...props }: PrescriptionDetailsProps) => {



  return (
    <Dialog pageTitle="Prescription Details" {...props}>
      <ScrollArea className="h-[70vh] sm:h-[65vh]">
        {/* Grid 1 */}
        <section className="grid lg:grid-cols-2 px-2.5 space-y-4">

          {/*G-1 col-1 */}
          <div className="flex items-center gap-2">
            <div className='p-3 bg-red-500 rounded-full'>
              <Syringe className='w-10 h-10 text-white' />
            </div>
            <div>
              <h1 className='font-semibold text-lg'>Prescription</h1>
              <div className="flex items-center space-x-2">
                <p className="text-gray-400">ID : {details.id}</p>
                <CustomTooltip message="EDIT">
                  <Pencil className="cursor-pointer text-yellow-600 w-4 h-4" onClick={Edit} />
                </CustomTooltip>
                <CustomTooltip message="DELETE">
                  <Trash className="cursor-pointer text-red-600 w-4 h-4" onClick={Delete} />
                </CustomTooltip>
              </div>
            </div>
          </div>

          {/*G-1 col-2 */}

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <div className='space-y-1 p-2 border-2 border-spacing-2 border-dashed border-gray-200 dark:border-gray-800 rounded-md'>
              <p className='text-gray-700 dark:text-gray-400 text-sm'>OPD ID</p>
              <p className='font-semibold'>{details?.opdId}</p>
            </div>
            <div className='space-y-1 p-2 border-2 border-spacing-2 border-dashed border-gray-200 dark:border-gray-800 rounded-md'>
              <p className='text-gray-700 dark:text-gray-400 text-sm'>Appointment Date</p>
              <p className='font-semibold'>{details?.opd.appointment.appointment_date}</p>
            </div>
            <div className='space-y-1 p-2 border-2 border-spacing-2 border-dashed border-gray-200 dark:border-gray-800 rounded-md'>
              <p className='text-gray-700 dark:text-gray-400 text-sm'>Patient</p>
              <p className='font-semibold'>{details?.opd.appointment.patient.name}</p>
            </div>
            <div className='space-y-1 p-2 border-2 border-spacing-2 border-dashed border-gray-200 dark:border-gray-800 rounded-md'>
              <p className='text-gray-700 dark:text-gray-400 text-sm'>Cunsultant</p>
              <p className='font-semibold'>{details?.opd.appointment.doctor.name}</p>
            </div>
          </div>
        </section>


        {/* Grid 2 (flex here will not be allow table to scroll) */}

        <section className="grid space-y-8 px-2.5 mt-5 mb-16">
          {/* header note */}
          <div className="space-y-2">
            <h1 className="text-xl font-semibold">Header Note</h1>
            {details?.header_note ?
              (<p className="text-gray-400">{details?.header_note}</p>)
              :
              (<p className="text-gray-400">Header is not provided</p>)
            }
          </div>

          {/* Findings Table */}

          <Table className="rounded-lg border dark:border-gray-800">
            <TableHeader className="bg-gray-100 dark:bg-gray-900">
              <TableRow>
                <TableHead>Finding Name</TableHead>
                <TableHead>Finding Category</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {details?.prescFindings.map((prescription, i) => (
                <TableRow key={i}>
                  <TableCell>{prescription.findingName.name}</TableCell>
                  <TableCell>{prescription.findingCategory.name}</TableCell>
                  <TableCell>{prescription.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>


          {/* Medicines Table */}

          <Table className="rounded-lg border dark:border-gray-800">
            <TableHeader className="bg-gray-100 dark:bg-gray-900">
              <TableRow>
                <TableHead>Medicine Name</TableHead>
                <TableHead>Medicine Category</TableHead>
                <TableHead>Dose Interval</TableHead>
                <TableHead>Dose Duration</TableHead>
                <TableHead>Instruction</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {details?.prescMedicines.map((medicine, i) => (
                <TableRow key={i}>
                  <TableCell>{medicine.medicine.name}</TableCell>
                  <TableCell>{medicine.category.name}</TableCell>
                  <TableCell>{medicine.doseInterval.interval}</TableCell>
                  <TableCell>{medicine.doseDuration.duration}</TableCell>
                  <TableCell>{medicine.instruction}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

        </section>
      </ScrollArea>
    </Dialog >
  )
}

export default PrescriptionDetailsModel