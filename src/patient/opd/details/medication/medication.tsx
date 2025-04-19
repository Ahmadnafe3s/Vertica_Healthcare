import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useParams } from "react-router-dom"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { opdMedications } from "@/types/opd_section/medication"
import { useQueryState, parseAsInteger } from "nuqs"
import CustomPagination from "@/components/customPagination"
import { getMedications } from "@/pages/OPD/opdApiHandler"
import EmptyList from "@/components/emptyList"



const PatientOpdMedication = () => {

  // Query params
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))
  const [search, setSearch] = useQueryState('search')

  //credentials
  const { opdId } = useParams()


  // api states
  const [medications, setMedications] = useState<opdMedications>({ data: [], total_pages: 1 })



  const fetchMedications = async () => {
    try {
      const data = await getMedications({ opdId: opdId!, page, limit: 10, date: search! })
      setMedications(data)
    } catch ({ message }: any) {
      toast.error(message)
    }
  }


  const onSearch = (date: string) => {
    date ? setSearch(date) : setSearch(null)
    setPage(1)
  }


  useEffect(() => {
    fetchMedications()
  }, [page, search])

  return (
    <>
      <section className="flex flex-col gap-y-5 pb-10">

        <div className="flex justify-between items-center">
          <h1 className="text-lg font-semibold">Medication</h1>
          <div className="sm:w-48 space-y-1">
            <Input type="date" onChange={(e) => { onSearch(e.target.value) }} defaultValue={search!} />
          </div>
        </div>

        <Separator />

        {/* pagination */}
        <section className="flex flex-col gap-y-5 min-h-[70vh]">
          <div className="flex-1">
            <Table className="rounded-lg border dark:border-gray-800">
              <TableHeader className="bg-zinc-100 dark:bg-gray-900">
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Medicine Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Unit</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Dose</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {medications.data.map((medication, i) => {
                  return <TableRow key={i}>
                    <TableCell >{medication.date}</TableCell>
                    <TableCell>{medication.medicine.name}</TableCell>
                    <TableCell>{medication.category.name}</TableCell>
                    <TableCell>{medication.medicine.unit.name}</TableCell>
                    <TableCell>{medication.time}</TableCell>
                    <TableCell>{medication.dose}</TableCell>
                  </TableRow>
                })}
              </TableBody>
            </Table>

            {/* error on emply list */}

            <EmptyList length={medications.data.length} message="No mediciations found" />

          </div>

          {/* pagination buttons */}
          <section>
            <CustomPagination
              total_pages={medications?.total_pages!}
              currentPage={page}
              previous={(p) => setPage(p)}
              goTo={(p) => setPage(p)}
              next={(p) => setPage(p)}
            />
          </section>
        </section>
      </section>
    </>
  )
}



export default PatientOpdMedication