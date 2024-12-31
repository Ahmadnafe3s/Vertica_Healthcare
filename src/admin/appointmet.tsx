import AddAppointment from '@/components/AddAppointment'
import { buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { currencyFormat } from '@/lib/utils'
import { FileText, ListMinus, Plus, Printer } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const AdminAppointment = () => {

    const [isAppointmentModel, setAppointmentModel] = useState<boolean>(false)

    return (
        <>
            <div className='my-2 flex flex-col'>

                {/* top bar */}
                <div className='flex py-3 flex-col md:flex-row gap-y-2 md:items-center md:justify-between border-b border-gray-200'>
                    <h1 className='font-semibold tracking-tight'>Appointment Details</h1>
                    <div className='flex gap-x-2 overflow-x-auto'>

                        <Link onClick={() => { setAppointmentModel(true) }} to={''} className={buttonVariants({
                            variant: 'outline',
                            size: 'sm',
                            className: 'flex gap-x-1'
                        })}>
                            <Plus />
                            Appointment
                        </Link>

                        {/* <Link to={''} className={buttonVariants({
                            variant: 'outline',
                            size: 'sm',
                            className: 'flex gap-x-1'
                        })}>
                            <ListMinus />
                            Doctor wise
                        </Link> */}

                        <Link to={{pathname : '/admin/QueueAppointment'}} className={buttonVariants({
                            variant: 'outline',
                            size: 'sm',
                            className: 'flex gap-x-1'
                        })}>
                            <ListMinus />
                            Queue
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
                            <TableHead>Patient Name</TableHead>
                            <TableHead>Appointment No</TableHead>
                            <TableHead>Appointment Date</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead>Gender</TableHead>
                            <TableHead>Doctor</TableHead>
                            <TableHead>Source</TableHead>
                            <TableHead>Priority</TableHead>
                            <TableHead>Alternative Address</TableHead>
                            <TableHead>Discount%</TableHead>
                            <TableHead>Fees</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>

                        <TableRow>
                            <TableCell className="font-medium">Rahul</TableCell>
                            <TableCell>123123</TableCell>
                            <TableCell>30/12/2024</TableCell>
                            <TableCell>989963254</TableCell>
                            <TableCell>Male</TableCell>
                            <TableCell>Dr. Saurabh joshi</TableCell>
                            <TableCell>Online</TableCell>
                            <TableCell>Urgent</TableCell>
                            <TableCell>New market tulsipur</TableCell>
                            <TableCell>5</TableCell>
                            <TableCell>{currencyFormat(125)}</TableCell>
                            <TableCell className='bg-green-600 text-white p-2'>Success</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">Amit</TableCell>
                            <TableCell>123123</TableCell>
                            <TableCell>30/12/2024</TableCell>
                            <TableCell>989963254</TableCell>
                            <TableCell>Male</TableCell>
                            <TableCell>Dr. Saurabh joshi</TableCell>
                            <TableCell>Online</TableCell>
                            <TableCell>Urgent</TableCell>
                            <TableCell>New market tulsipur</TableCell>
                            <TableCell>5</TableCell>
                            <TableCell>{currencyFormat(125)}</TableCell>
                            <TableCell className='bg-red-600 text-white p-2'>Rejected</TableCell>
                        </TableRow>

                    </TableBody>
                </Table>

            </div>
            {isAppointmentModel && <AddAppointment onClick={() => { setAppointmentModel(false) }} />}
        </>

    )
}

export default AdminAppointment