import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { currencyFormat } from '@/lib/utils'
import toast from 'react-hot-toast'
import { useEffect, useState } from 'react'
import { pharmacyBillDetail, pharmacyBills } from '@/types/pharmacy/pharmacy'
import LoaderModel from '@/components/loader'
import { useQueryState, parseAsInteger } from 'nuqs'
import CustomPagination from '@/components/customPagination'
import { useDebouncedCallback } from 'use-debounce'
import PharmacyBillDetailsModal from '@/admin/pharmacy/pharmacyBill/pharmacyBillDetailsModal'
import { getPharmacyBillDetails, getPharmacyBills } from '@/admin/pharmacy/pharmacyApiHandler'
import PrintPharmacyBills from '@/admin/pharmacy/pharmacyBill/printBill/printPharmacyBills'
import PrintPharmacyBill from '@/admin/pharmacy/pharmacyBill/printBill/printPharmacyBill'
import { Separator } from '@/components/ui/separator'




const PatientPharmacyBills = () => {

    // query params
    const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))
    const [search, setSearch] = useQueryState('search')

    //model states
    const [billDetailsModal, setBillDetailsModal] = useState<boolean>(false)


    // loading states
    const [isLodaing, setLoading] = useState<boolean>(false)

    // API states
    const [pharmBills, setPharmBills] = useState<pharmacyBills>({ data: [], total_pages: 0 })
    const [pharmBillDetails, setPharmBillDetails] = useState<pharmacyBillDetail>()




    // list of bills
    const fetchParmacyBills = async () => {
        try {
            // adjust limit accordingly
            const data = await getPharmacyBills({ page, limit: 10, search: search! }) // here search only will have value when we will search anything
            setPharmBills(data)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    const onSearch = useDebouncedCallback((value: string) => {
        value ? (setSearch(value)) : setSearch(null)
        setPage(1)
    }, 400)


    // bill deatils
    const fetchPharmacyBillDetails = async (id: string) => {
        try {
            setLoading(true)
            const data = await getPharmacyBillDetails(id)
            setPharmBillDetails(data)
        } catch ({ message }: any) {
            toast.error(message)
        } finally { setLoading((false)) }
    }



    useEffect(() => {
        fetchParmacyBills()
    }, [page, search])


    return (
        <>
            <div className='my-2 flex flex-col pb-10'>

                {/* top bar */}
                <div className='flex py-3 flex-col md:flex-row gap-y-2 md:items-center md:justify-between'>
                    <h1 className='font-semibold tracking-tight'>Pharmacy Bill</h1>
                </div>

                {/* search bar */}

                <Separator />

                <div className='flex py-3 flex-col md:flex-row gap-y-4 md:items-center md:justify-between'>

                    <div className='flex gap-x-2'>
                        <Input type='text' height='10px' placeholder='Bill No. , Date' onChange={(e) => { onSearch(e.target.value) }} defaultValue={search!} />
                    </div>

                    <div className='flex gap-x-2'>
                        <PrintPharmacyBills PharmacyBills={pharmBills['data']} />
                    </div>
                </div>

                <Separator />

                <div className="flex flex-col pb-16 gap-y-10 min-h-[82vh]">
                    <div className="flex-1 space-y-3">
                        <Table className='border rounded-lg my-10 dark:border-gray-800'>
                            <TableHeader className='bg-slate-100 dark:bg-gray-900'>
                                <TableRow>
                                    <TableHead>Bill No.</TableHead>
                                    <TableHead>Invoice Date</TableHead>
                                    <TableHead>OPD ID</TableHead>
                                    <TableHead>Doctor Name</TableHead>
                                    <TableHead>Discount%</TableHead>
                                    <TableHead>Total</TableHead>
                                    <TableHead>Action</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {pharmBills.data.map((bill) => (
                                    <TableRow key={bill.id}>
                                        <TableCell
                                            className='text-blue-500 hover:text-blue-400 cursor-pointer font-medium'
                                            onClick={async () => {
                                                await fetchPharmacyBillDetails(bill.id)
                                                setBillDetailsModal(true)
                                            }}
                                        >{bill.id}
                                        </TableCell>
                                        <TableCell>{bill.date}</TableCell>
                                        <TableCell>{bill.opdId}</TableCell>
                                        <TableCell>{bill.doctor}</TableCell>
                                        <TableCell>{bill.discount} %</TableCell>
                                        <TableCell>{currencyFormat(bill.net_amount)}</TableCell>
                                        <TableCell className='flex space-x-2'>

                                            {/* Print Bill */}

                                            <PrintPharmacyBill Id={bill.id} onPending={(v) => setLoading(v)} />

                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        {pharmBills.data.length < 1 && <p className='font-medium text-lg text-gray-600'>No data found</p>}
                    </div>

                    {/* pagination buttons */}

                    <section>
                        <CustomPagination
                            total_pages={pharmBills?.total_pages!}
                            currentPage={page}
                            next={(p) => setPage(p)}
                            goTo={(p) => setPage(p)}
                            previous={(p) => setPage(p)}
                        />
                    </section>
                </div>
            </div >


            {/* Models */}

            {billDetailsModal && (
                <PharmacyBillDetailsModal
                    details={pharmBillDetails!}
                    onClick={() => {
                        setBillDetailsModal(false)
                    }}
                />
            )}

            {isLodaing && <LoaderModel />}

        </>

    )
}




export default PatientPharmacyBills