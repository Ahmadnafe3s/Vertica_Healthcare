import { buttonVariants } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import React from 'react'

const QueueAppointment = () => {

    let status  = 'pending'

    return (
        <section className='bg-slate-50'>

            <div className='flex flex-col border-b border-gray-200 py-3'>
                <h1 className='text-xl text-gray-900 font-semibold'>Queue Appointments</h1>
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
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>

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
                        <TableCell>
                            <Select onValueChange={(value) => { alert(value) }}>
                                <SelectTrigger className={buttonVariants({
                                    variant : 'outline',
                                    className : status === 'pending' ? 'bg-yellow-400' : 'bg-red-500'
                                })}>
                                    <SelectValue placeholder={status} />
                                </SelectTrigger>

                                <SelectContent className='z-[200]'>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="approved">Approve</SelectItem>
                                    <SelectItem value="cancel">Cancel</SelectItem>
                                </SelectContent>
                            </Select>
                        </TableCell>
                    </TableRow>

                </TableBody>
            </Table>
        </section>
    )
}

export default QueueAppointment