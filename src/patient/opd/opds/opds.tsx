import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { SearchX } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useDebouncedCallback } from 'use-debounce'
import { parseAsInteger, useQueryState } from 'nuqs'
import CustomPagination from '@/components/customPagination'
import { OPDs } from '@/types/opd_section/opd'
import PrintPatientOpds from './print/print'
import { getOPDs } from '@/admin/OPD/opdApiHandler'





const PatientOpds = () => {

  // Query params
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))
  const [search, setSearch] = useQueryState('search')


  // API states
  const [opds, setOpds] = useState<OPDs>({ data: [], total_pages: 0 })


  // fetching opd Details
  const fetchOPDs = async () => {
    try {
      const data = await getOPDs({ page, limit: 10, search: search! })
      setOpds(data)
    } catch ({ message }: any) {
      toast.error(message)
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
          <Input type='text' height='10px' placeholder='opdId , doctor , date' onChange={(e) => { onSerach(e.target.value) }} defaultValue={search!} />
        </div>

        <div>
          {/* will print all list */}
          <PrintPatientOpds opds={opds['data']} />
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
                <TableHead>Consultant</TableHead>
                <TableHead>Specialist</TableHead>
                <TableHead>Reference</TableHead>
                <TableHead>Symptom Type</TableHead>
                <TableHead>Previous medical Issue</TableHead>
              </TableRow>
            </TableHeader>


            <TableBody>

              {opds.data.map((opd, i) => {
                return <TableRow key={i}>
                  <TableCell>
                    <Link to={`details/${opd.id}`}
                      className="font-medium text-blue-500 hover:text-blue-400 cursor-pointer">
                      {opd.id}
                    </Link>
                  </TableCell>
                  <TableCell>{opd.appointment.appointment_date}</TableCell>
                  <TableCell>{opd.doctor.name}</TableCell>
                  <TableCell>{opd.doctor.specialist}</TableCell>
                  <TableCell>{opd.appointment.reference}</TableCell>
                  <TableCell>{opd.appointment.symptom_type}</TableCell>
                  <TableCell>{opd.appointment.previous_medical_issue}</TableCell>

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

    </div >
  )
}


export default PatientOpds