import { buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { currencyFormat } from '@/lib/utils'
import { Eye, FileText, ListMinus, Pencil, Plus, Printer, ReceiptIndianRupee } from 'lucide-react'
import { Link } from 'react-router-dom'

const Bill = () => {
    return (
        <>
            <div className='my-2 flex flex-col'>

                {/* top bar */}
                <div className='flex py-3 flex-col md:flex-row gap-y-2 md:items-center md:justify-between border-b border-gray-200'>
                    <h1 className='font-semibold tracking-tight'>Pharmacy Bill</h1>
                    <div className='flex gap-x-2 overflow-x-auto'>

                        <Link to={''} className={buttonVariants({
                            variant: 'outline',
                            size: 'sm',
                            className: 'flex gap-x-1'
                        })}>
                            <Plus />
                            Generate Bill
                        </Link>


                        <Link to={{ pathname: '/admin/pharmacy/medicines' }} className={buttonVariants({
                            variant: 'outline',
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


                <Table className='my-10'>

                    <TableHeader>
                        <TableRow>
                            <TableHead>Bill No.</TableHead>
                            <TableHead>Case ID</TableHead>
                            <TableHead>Patient Name</TableHead>
                            <TableHead>Doctor Name</TableHead>
                            <TableHead>Discount%</TableHead>
                            <TableHead>Total</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>

                        <TableRow>
                            <TableCell className="font-medium">PHARM4568</TableCell>
                            <TableCell>7859</TableCell>
                            <TableCell>Meraj Khan</TableCell>
                            <TableCell>Dr. Saurabh joshi</TableCell>
                            <TableCell>5</TableCell>
                            <TableCell>{currencyFormat(125)}</TableCell>
                            <TableCell className='flex gap-2'>
                                <Pencil className='cursor-pointer text-gray-600 w-5 h-5' />
                                <ReceiptIndianRupee className='cursor-pointer text-gray-600 w-5 h-5' />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">PHARM4568</TableCell>
                            <TableCell>7859</TableCell>
                            <TableCell>Meraj Khan</TableCell>
                            <TableCell>Dr. Saurabh joshi</TableCell>
                            <TableCell>5</TableCell>
                            <TableCell>{currencyFormat(125)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">PHARM4568</TableCell>
                            <TableCell>7859</TableCell>
                            <TableCell>Meraj Khan</TableCell>
                            <TableCell>Dr. Saurabh joshi</TableCell>
                            <TableCell>5</TableCell>
                            <TableCell>{currencyFormat(125)}</TableCell>
                        </TableRow>


                    </TableBody>
                </Table>

            </div>
        </>

    )
}

export default Bill