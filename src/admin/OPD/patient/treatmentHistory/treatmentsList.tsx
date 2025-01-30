import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { OPDs } from "@/types/type"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { getOPDlistBYpatient } from "../../opdApiHandler"
import { Link, useParams } from "react-router-dom"


const TreatmentsList = () => {

  const { patientId } = useParams()

  const [OPD_LIST, SET_OPD_LIST] = useState<OPDs[]>()


  async function onSearch(date: string) {
    try {
      const data = await getOPDlistBYpatient(Number(patientId), date)  //patientId is static (date is for filterng)
      SET_OPD_LIST(data)
    } catch ({ message }: any) {
      toast.error(message)
    }
  }

  const fetchOPDlist = async () => {
    try {
      const data = await getOPDlistBYpatient(Number(patientId))
      SET_OPD_LIST(data)
    } catch ({ message }: any) {
      toast.error(message)
    }
  }


  useEffect(() => {
    fetchOPDlist()
  }, [])


  return (
    <section className="flex flex-col gap-y-5">

      <div className="flex justify-between">
        <h1 className="text-lg text-gray-800 font-semibold">Charges</h1>
      </div>

      <Separator />

      <div className="sm:w-48 space-y-1">
        <p className="text-sm text-gray-700">Search by date</p>
        <Input type="date" onChange={(e) => { onSearch(e.target.value) }} />
      </div>


      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Case Id</TableHead>
            <TableHead>Patient Name</TableHead>
            <TableHead>Appointment Date</TableHead>
            <TableHead>Consultant</TableHead>
            <TableHead>Reference</TableHead>
            <TableHead>Symptom Type</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {OPD_LIST?.map((opd, i) => {
            return <TableRow key={i}>
              <TableCell>
                <Link className="text-blue-500 hover:text-blue-400 font-semibold" to={{ pathname: `/admin/OPD/patient/${opd.patientId}/${opd.caseId}/visitdetails` }}>{opd.caseId}</Link>
              </TableCell>
              <TableCell>{opd.appointment.patient.name}</TableCell>
              <TableCell>{opd.appointment.appointment_date}</TableCell>
              <TableCell>{opd.appointment.doctor.name}</TableCell>
              <TableCell>{opd.appointment.reference}</TableCell>
              <TableCell>{opd.appointment.symptom_type}</TableCell>
            </TableRow>
          })}
        </TableBody>
      </Table>
    </section>
  )
}

export default TreatmentsList