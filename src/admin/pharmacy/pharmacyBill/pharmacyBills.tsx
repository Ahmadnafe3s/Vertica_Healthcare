import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { currencyFormat } from '@/lib/utils'
import { FileText, ListMinus, Pencil, Plus, Printer, ReceiptIndianRupee, Trash } from 'lucide-react'
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



const Bill = () => {

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
    const [pharmBills, setPharmBills] = useState<pharmacyBills[]>([])
    const [pharmBillDetails, setPharmBillDetails] = useState<pharmacyBillDetail>()


    // list of bills
    const fetchParmacyBills = async () => {
        try {
            const data = await getPharmacyBills()
            setPharmBills(data)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


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
    }, [])


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

                        <Link to={'../medicines'} className={buttonVariants({
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
                        <Input type='text' height='10px' placeholder='search' />
                    </div>

                    <div className='flex gap-x-2'>

                        <FileText className='cursor-pointer text-gray-600' />
                        <Printer className='cursor-pointer text-gray-600' />

                    </div>
                </div>


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
                        {pharmBills.map((bill) => (
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
                                <TableCell className=''>
                                    {/* DELETE  */}
                                    <CustomTooltip message='DELETE'>
                                        <Trash className="w-4 cursor-pointer  text-gray-600" onClick={async () => {
                                            itemID.current = bill.id
                                            setModel(prev => ({ ...prev, alert: true }))
                                        }} />
                                    </CustomTooltip>

                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div >

            {pharmBills.length < 1 && <p className='font-medium text-lg text-gray-600'>No data found</p>}

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