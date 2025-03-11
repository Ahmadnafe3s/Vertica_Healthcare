import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { currencyFormat } from '@/lib/utils'
import { ListMinus, Plus, Trash } from 'lucide-react'
import { Link } from 'react-router-dom'
import CreatePharmacyBill from './createPharmacyBill'
import toast from 'react-hot-toast'
import { createPharmacyBill, deletePharmacyBill, getPharmacyBillDetails, getPharmacyBills } from '../pharmacyApiHandler'
import { createPharmacyBillSchema } from '@/formSchemas/createPharmBillSchema'
import { z } from 'zod'
import { useEffect, useRef, useState } from 'react'
import { pharmacyBillDetail, pharmacyBills } from '@/types/pharmacy/pharmacy'
import CustomTooltip from '@/components/customTooltip'
import PharmacyBillDetailsModal from './pharmacyBillDetailsModal'
import LoaderModel from '@/components/loader'
import AlertModel from '@/components/alertModel'
import { useQueryState, parseAsInteger } from 'nuqs'
import CustomPagination from '@/components/customPagination'
import { useDebouncedCallback } from 'use-debounce'
import PrintPharmacyBill from './printBill/printPharmacyBill'
import PrintPharmacyBills from './printBill/printPharmacyBills'



const Bill = () => {

    // query params
    const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))
    const [search, setSearch] = useQueryState('search')


    // credential
    const itemID = useRef('')

    //model states
    const [model, setModel] = useState<{ createPharmacyBill: boolean, alert: boolean, billDetails: boolean }>({
        createPharmacyBill: false,
        alert: false,
        billDetails: false
    })

    // loading states
    const [isLodaing, setLoading] = useState<{ inline: boolean, model: boolean }>({
        inline: false,
        model: false,
    })

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
            setLoading(prev => ({ ...prev, model: true }))
            const data = await getPharmacyBillDetails(id)
            setPharmBillDetails(data)
        } catch ({ message }: any) {
            toast.error(message)
        } finally {
            setLoading(prev => ({ ...prev, model: false }))
        }
    }


    // handling form data
    const handleSubmit = async (formData: z.infer<typeof createPharmacyBillSchema>) => {
        try {
            setLoading(pre => ({ ...pre, inline: true }))
            const data = await createPharmacyBill(formData)
            toast.success(data.message)
            setModel(prev => ({ ...prev, createPharmacyBill: false }))
            fetchParmacyBills()
        } catch ({ message }: any) {
            toast.error(message)
        } finally {
            setLoading(pre => ({ ...pre, inline: false }))
        }
    }


    // deleting a particular bill
    const onDelete = async () => {
        try {
            setLoading(pre => ({ ...pre, inline: false }))
            const data = await deletePharmacyBill(itemID.current)
            toast.success(data.message)
            fetchParmacyBills()
        } catch ({ message }: any) {
            toast.error(message)
        } finally {
            setLoading(pre => ({ ...pre, inline: false }))
            setModel(prev => ({ ...prev, alert: false }))
        }
    }


    useEffect(() => {
        fetchParmacyBills()
    }, [page, search])


    return (
        <>
            <div className='my-2 flex flex-col'>

                {/* top bar */}
                <div className='flex py-3 flex-col md:flex-row gap-y-2 md:items-center md:justify-between border-b border-gray-200'>
                    <h1 className='font-semibold tracking-tight'>Pharmacy Bill</h1>
                    <div className='flex gap-x-2 overflow-x-auto'>

                        <Button
                            size={'sm'}
                            onClick={() => setModel(prev => ({ ...prev, createPharmacyBill: true }))}
                        > <Plus /> Generate Bill</Button>

                        <Link to={'medicines'} className={buttonVariants({
                            variant: 'default',
                            size: 'sm',
                            className: 'flex gap-x-1'
                        })}>
                            <ListMinus />
                            Medicines
                        </Link>

                    </div>
                </div>

                {/* search bar */}

                <div className='flex py-3 flex-col md:flex-row gap-y-4 md:items-center md:justify-between border-b border-gray-200'>

                    <div className='flex gap-x-2'>
                        <Input type='text' height='10px' placeholder='Bill No. , Date , Patient' onChange={(e) => { onSearch(e.target.value) }} defaultValue={search!} />
                    </div>

                    <div className='flex gap-x-2'>
                        <PrintPharmacyBills PharmacyBills={pharmBills['data']} />
                    </div>
                </div>

                <div className="flex flex-col pb-16 gap-y-10 min-h-[80vh]">
                    <div className="flex-1 space-y-3">
                        <Table className='border rounded-lg my-10'>
                            <TableHeader className='bg-slate-100'>
                                <TableRow>
                                    <TableHead>Bill No.</TableHead>
                                    <TableHead>Invoice Date</TableHead>
                                    <TableHead>OPD ID</TableHead>
                                    <TableHead>Patient Name</TableHead>
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
                                                setModel(prev => ({ ...prev, billDetails: true }))
                                            }}
                                        >{bill.id}
                                        </TableCell>
                                        <TableCell>{bill.date}</TableCell>
                                        <TableCell>{bill.opdId}</TableCell>
                                        <TableCell>{bill.patient.name}</TableCell>
                                        <TableCell>{bill.doctor}</TableCell>
                                        <TableCell>{bill.discount} %</TableCell>
                                        <TableCell>{currencyFormat(bill.net_amount)}</TableCell>
                                        <TableCell className='flex space-x-2'>
                                            {/* DELETE  */}
                                            <CustomTooltip message='DELETE'>
                                                <Trash className="w-4 cursor-pointer  text-gray-600" onClick={async () => {
                                                    itemID.current = bill.id
                                                    setModel(prev => ({ ...prev, alert: true }))
                                                }} />
                                            </CustomTooltip>

                                            {/* Print Bill */}

                                            <PrintPharmacyBill Id={bill.id} onPending={(v) => setLoading({ ...isLodaing, model: v })} />

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

            {model.createPharmacyBill && (
                < CreatePharmacyBill
                    Submit={handleSubmit}
                    isPending={isLodaing.inline}
                    onClick={() => { setModel(prev => ({ ...prev, createPharmacyBill: false })) }}
                />
            )}

            {model.billDetails && (
                <PharmacyBillDetailsModal
                    details={pharmBillDetails!}
                    onClick={() => {
                        setModel(prev => ({ ...prev, billDetails: false }))
                    }}
                />
            )}

            {isLodaing.model && <LoaderModel />}

            {model.alert && (
                <AlertModel
                    continue={onDelete}
                    cancel={() => setModel(prev => ({ ...prev, alert: false }))}
                    isPending={isLodaing.inline}
                />
            )}
        </>

    )
}

export default Bill