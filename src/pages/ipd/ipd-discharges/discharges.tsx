import AlertModel from "@/components/alertModel"
import CustomPagination from "@/components/customPagination"
import EmptyList from "@/components/emptyList"
import ProtectedTable from "@/components/protected-table"
import TableActions from "@/components/table-actions"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { page_limit } from "@/globalData"
import useDischarge from "@/pages/discharge/discharge-handlers"
import { parseAsInteger, useQueryState } from "nuqs"
import { useEffect } from "react"
import { useDebouncedCallback } from "use-debounce"


export const IpdDischarges = () => {

    const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))
    const [search, setSearch] = useQueryState('search')

    const { onDelete, fetchDischarges, discharges, confirmationProps } = useDischarge({ page, limit: page_limit, search, section: 'iPD' })

    const onSearch = useDebouncedCallback((value: string) => {
        value ? setSearch(value) : setSearch(null)
        setPage(1)
    })

    useEffect(() => {
        fetchDischarges()
    }, [])


    return (
        <>
            <section className="flex flex-col gap-y-5">

                <div className="flex justify-between">
                    <h1 className="text-lg text-gray-800 dark:text-white font-semibold">Medication</h1>
                    <div className="sm:w-48 space-y-1">
                        <p className="text-sm text-gray-700 dark:text-gray-300">Search by keyword</p>
                        <Input type="text" onChange={(e) => { onSearch(e.target.value) }} defaultValue={search!} />
                    </div>
                </div>

                <Separator />

                {/* pagination */}
                <section className="flex flex-col gap-y-5 min-h-[60vh]">
                    <div className="flex-1">
                        <ProtectedTable
                            module="IpdDischarge"
                            renderTable={(show, canUpdate, canDelete) => (
                                <Table className="rounded-lg border dark:border-gray-800">
                                    <TableHeader className="bg-zinc-100 dark:bg-gray-900">
                                        <TableRow>
                                            <TableHead>Discharge Date</TableHead>
                                            <TableHead>Patient Name</TableHead>
                                            <TableHead>Discharge Type</TableHead>
                                            <TableHead>Reffered Doctor</TableHead>
                                            <TableHead>Billi</TableHead>
                                            <TableHead>Time</TableHead>
                                            <TableHead>Dose</TableHead>
                                            {show && <TableHead>Action</TableHead>}
                                        </TableRow>
                                    </TableHeader>

                                    <TableBody>
                                        {discharges.data.map((discharge, i) => {
                                            return <TableRow key={i}>
                                                <TableCell >{discharge.Discharge?.discharge_date}</TableCell>
                                                <TableCell>{discharge.patient.name}</TableCell>
                                                <TableCell >{discharge.Discharge?.discharge_type}</TableCell>
                                                <TableCell >{discharge.Discharge?.discharge_date}</TableCell>
                                                <TableCell >{discharge.Discharge?.doctor}</TableCell>
                                                <TableCell >{discharge.Discharge?.billingStatus}</TableCell>
                                                <TableCell >{discharge.Discharge?.discharge_note}</TableCell>
                                                <TableActions
                                                    show={show}
                                                    canUpdate={canUpdate}
                                                    canDelete={canDelete}
                                                    onDelete={() => onDelete(discharge.Discharge?.id!)}
                                                    exclude={{ edit: true }}
                                                />
                                            </TableRow>
                                        })}
                                    </TableBody>
                                </Table>
                            )}
                        />

                        <EmptyList length={discharges.data.length} message="No medications found" />
                    </div>

                    {/* pagination buttons */}
                    <section>
                        <CustomPagination
                            total_pages={discharges?.total_pages!}
                            currentPage={page}
                            previous={(p) => setPage(p)}
                            goTo={(p) => setPage(p)}
                            next={(p) => setPage(p)}
                        />
                    </section>
                </section>
            </section>

            {/* Alert Model */}

            {
                confirmationProps.isOpen && <AlertModel
                    cancel={() => { confirmationProps.onCancel() }}
                    continue={() => { confirmationProps.onConfirm() }}
                />
            }

        </>
    )
}

export default IpdDischarges