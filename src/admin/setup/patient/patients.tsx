import CustomPagination from "@/components/customPagination"
import EmptyList from "@/components/emptyList"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { SetupPatients } from "@/types/setupTypes/patients"
import { parseAsInteger, useQueryState } from "nuqs"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { Link } from "react-router-dom"
import { useDebouncedCallback } from "use-debounce"
import { getSetupPatinets } from "./APIHandlers"





const Patients = () => {


    // params
    const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))
    const [search, setSearch] = useQueryState('search')


    // API States
    const [patients, setPatients] = useState<SetupPatients>({ data: [], total_pages: 0 })




    const fetchPatients = async () => {
        try {
            const data = await getSetupPatinets({ page, limit: 10, search: search! })
            setPatients(data)

        } catch ({ message }: any) {
            toast.error(message)
        }
    }



    const onSearch = useDebouncedCallback(async (value: string) => {
        value ? setSearch(value) : setSearch(null)
        setPage(1)
    }, 400)


    useEffect(() => {
        fetchPatients()
    }, [page, search])


    return (

        <section className="flex flex-col gap-y-5 pt-5 pb-16">

            <div className="flex justify-between">
                <h1 className="text-lg font-semibold">Patients</h1>
                {/* <Button size='sm' onClick={() => { setChargeNameFormVisible(true) }}>
          <Plus /> Add Charge
        </Button> */}
            </div>

            <Separator />

            <div className="sm:w-48 space-y-1">
                <p className="text-sm text-gray-400">Search</p>
                <Input type="text" onChange={(e) => { onSearch(e.target.value) }} placeholder="name , category" />
            </div>

            <Separator />

            <div className="flex flex-col min-h-[70vh] gap-y-16">
                {/* child 1 */}
                <div className="flex-1">
                    <Table className="rounded-lg border dark:border-gray-800">
                        <TableHeader className='bg-zinc-100 dark:bg-gray-800'>
                            <TableRow >
                                <TableHead>Name</TableHead>
                                <TableHead>Guardian</TableHead>
                                <TableHead>DOB</TableHead>
                                <TableHead>Age</TableHead>
                                <TableHead>Gender</TableHead>
                                <TableHead>Blood Group</TableHead>
                                <TableHead>Phone</TableHead>
                                <TableHead>Email</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {patients?.data.map((patient) => {
                                return <TableRow key={patient.id}>
                                    <TableCell>
                                        <Link to={{ pathname: `/patient/profile/${patient.id}` }} className="text-blue-500 hover:text-blue-400 font-medium">{patient.name}</Link>
                                    </TableCell>
                                    <TableCell>{patient.guardian_name}</TableCell>
                                    <TableCell>{patient.dob}</TableCell>
                                    <TableCell>{patient.age}</TableCell>
                                    <TableCell>{patient.gender}</TableCell>
                                    <TableCell>{patient.blood_group}</TableCell>
                                    <TableCell>{patient.phone}</TableCell>
                                    <TableCell>{patient.email}</TableCell>
                                </TableRow>
                            })}
                        </TableBody>
                    </Table>


                    {/* On no data */}

                    <EmptyList length={patients.data.length} message="No patients found" />

                </div>

                {/* Pagination */}

                <CustomPagination
                    total_pages={patients?.total_pages}
                    currentPage={+page}
                    previous={(p) => setPage(p)}
                    goTo={(p) => setPage(p)}
                    next={(p) => setPage(p)}
                />
            </div>


            {/* Models */}

        </section >
    )
}





export default Patients