import { getPayments } from "@/pages/OPD/opdApiHandler"
import CustomPagination from "@/components/customPagination"
import EmptyList from "@/components/emptyList"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { currencySymbol } from "@/helpers/currencySymbol"
import { currencyFormat } from "@/lib/utils"
import { Payment } from "@/types/opd_section/payment"
import { parseAsInteger, useQueryState } from "nuqs"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useParams } from "react-router-dom"
import { useDebouncedCallback } from 'use-debounce'





const PatientOpdPayments = () => {

    // Query params
    const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))
    const [search, setSearch] = useQueryState('search')

    // route params
    const { opdId } = useParams()


    // API States
    const [payments, setPayments] = useState<Payment>({ data: [], total_pages: 0 })


    // Fetching list
    const fetchPayments = async () => {
        try {
            const data = await getPayments({ opdId: opdId!, page, limit: 10, search: search! })
            setPayments(data)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    //useDebouncedCallback prevent unnecessary api calls
    const onSearch = useDebouncedCallback((search: string) => {
        search ? setSearch(search) : setSearch(null)
        setPage(1)
    }, 500)



    // fetching list initially on load
    useEffect(() => {
        fetchPayments()
    }, [page, search])

    return (

        <section className="flex flex-col gap-y-5 pb-10">
            <div className="flex justify-between items-center">
                <h1 className="text-lg font-semibold">Payments</h1>
                <div className="sm:w-48 space-y-1">
                    <Input type="text" onChange={(e) => { onSearch(e.target.value) }} placeholder="transaction id , date" defaultValue={search!} />
                </div>
            </div>

            <Separator />

            {/* pagination */}

            <div className="flex flex-col mb-16 gap-y-10 min-h-[70vh]">
                <div className="flex-1">
                    <Table className="rounded-lg border dark:border-gray-800">
                        <TableHeader className="bg-zinc-100 dark:bg-gray-900">
                            <TableRow>
                                <TableHead>Transaction ID</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Payment Mode</TableHead>
                                <TableHead>Paid Amount {currencySymbol()}</TableHead>
                                <TableHead>Note</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {payments.data.map((payment, i) => {
                                return <TableRow key={i}>
                                    <TableCell className="font-semibold">{payment.id}</TableCell>
                                    <TableCell >{payment.date}</TableCell>
                                    <TableCell >{payment.payment_mode}</TableCell>
                                    <TableCell >{currencyFormat(payment.amount)}</TableCell>
                                    <TableCell >{payment.note}</TableCell>
                                </TableRow>
                            })}
                        </TableBody>
                    </Table>

                    {/* error on emply list */}
                    <EmptyList length={payments.data.length} />

                </div>

                {/* pagination buttons */}
                <section>
                    <CustomPagination
                        total_pages={payments?.total_pages!}
                        currentPage={page}
                        previous={(p) => setPage(p)}
                        goTo={(p) => setPage(p)}
                        next={(p) => setPage(p)}
                    />
                </section>
            </div>
        </section>
    )
}




export default PatientOpdPayments