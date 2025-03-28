import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { Link, useParams } from "react-router-dom"
import { OPDs } from "@/types/opd_section/opd"
import { useQueryState, parseAsInteger } from "nuqs"
import CustomPagination from "@/components/customPagination"
import { getOPDs, getTreatmentHistory } from "../../opdApiHandler"


const TreatmentsList = () => {

  // patient id
  const { patientId } = useParams()

  // query params
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))
  const [search, setSearch] = useQueryState('search')

  const [OPD_LIST, SET_OPD_LIST] = useState<OPDs>({ data: [], total_pages: 0 })


  async function onSearch(date: string) {
    date ? setSearch(date) : setSearch(null)
    setPage(1)
  }

  const fetchOPDs = async () => {
    try {
      const data = await getTreatmentHistory({ page, limit: 10, date: search! }, +patientId!)
      SET_OPD_LIST(data)
    } catch ({ message }: any) {
      toast.error(message)
    }
  }


  useEffect(() => {
    fetchOPDs()
  }, [page, search])


  return (
    <section className="flex flex-col gap-y-5">

      <div className="flex justify-between">
        <h1 className="text-lg text-gray-800 dark:text-gray-100 font-semibold">Treatment History</h1>
      </div>

      <Separator />

      <div className="sm:w-48 space-y-1">
        <p className="text-sm text-gray-700 dark:text-gray-300">Search by date</p>
        <Input type="date" onChange={(e) => { onSearch(e.target.value) }} />
      </div>

      <div className="flex flex-col space-y-5 min-h-[60vh]">
        <div className="flex-1">
          <Table className="rounded-lg border dark:border-gray-800">
            <TableHeader className="bg-zinc-100 dark:bg-gray-900">
              <TableRow>
                <TableHead>OPD ID</TableHead>
                <TableHead>Appointment Date</TableHead>
                <TableHead>Consultant</TableHead>
                <TableHead>Reference</TableHead>
                <TableHead>Symptom Type</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {OPD_LIST?.data.map((opd, i) => {
                return <TableRow key={i}>
                  <TableCell>
                    <Link className="text-blue-500 hover:text-blue-400 font-semibold" to={{ pathname: `/admin/OPD/patient/${opd.patientId}/${opd.id}` }}>{opd.id}</Link>
                  </TableCell>
                  <TableCell>{opd.appointment.appointment_date}</TableCell>
                  <TableCell>{opd.appointment.doctor.name}</TableCell>
                  <TableCell>{opd.appointment.reference}</TableCell>
                  <TableCell>{opd.appointment.symptom_type}</TableCell>
                </TableRow>
              })}
            </TableBody>
          </Table>

          {/* if error */}

          {OPD_LIST?.data.length < 1 && <p className="mt-4 text-gray-500">No data found</p>}
        </div>

        <CustomPagination
          currentPage={page}
          total_pages={OPD_LIST.total_pages}
          previous={(p) => setPage(p)}
          goTo={(p) => setPage(p)}
          next={(p) => setPage(p)}
        />

      </div>

    </section>
  )
}

export default TreatmentsList