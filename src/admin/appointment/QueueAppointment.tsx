import { buttonVariants } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Appointments } from '@/types/type'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { fetchAppointments, updateStatus } from './appointmentAPIhandler'
import { Loader } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const QueueAppointment = () => {

    const [appointments, setAppointments] = useState<Appointments[]>([])
    const [isPending, setPending] = useState<boolean>(false)
    const router = useNavigate()

    // onchange it updates the appointment

    const onUpdateStatus = async (id: number, status: string) => {
        try {

            setPending(true)
            const data = await updateStatus(id, status)
            toast.success(data.message)
            return router('/admin/appointment')

        } catch ({ message }: any) {
            toast.error(message)
        } finally {
            setPending(false)
        }
    }


    useEffect(() => {
        try {
            (async function () {
                const data = await fetchAppointments('pending')
                setAppointments(data)
            })() //IIFE

        } catch ({ message }: any) {
            toast.error(message)
        }
    }, [])

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
                        <TableHead>Shift</TableHead>
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

                    {appointments.map((appointment, index) => {
                        return <TableRow key={index}>
                            <TableCell className="font-medium">{appointment.patient.name}</TableCell>
                            <TableCell>{appointment.id}</TableCell>
                            <TableCell>{appointment.appointment_date}</TableCell>
                            <TableCell>{appointment.shift}</TableCell>
                            <TableCell>{appointment.patient.phone}</TableCell>
                            <TableCell>{appointment.patient.gender}</TableCell>
                            <TableCell>{appointment.doctor.name}</TableCell>
                            <TableCell>Online</TableCell>
                            <TableCell>{appointment.appointment_priority}</TableCell>
                            <TableCell>{appointment.alternative_address}</TableCell>
                            <TableCell>
                                <Select onValueChange={(value) => { onUpdateStatus(appointment.id, value) }}>
                                    <SelectTrigger className={buttonVariants({
                                        variant: 'outline',
                                        className: 'bg-yellow-400'
                                    })}>
                                        <SelectValue placeholder={appointment.status} /> {isPending && <Loader className='animate-spin' />}
                                    </SelectTrigger>

                                    <SelectContent className='z-[200]'>
                                        <SelectItem value="approved">Approve</SelectItem>
                                        <SelectItem value="cancelled">Cancel</SelectItem>
                                    </SelectContent>
                                </Select>
                            </TableCell>
                        </TableRow>
                    })}

                </TableBody>
            </Table>
            {appointments.length < 1 && <p className='font-bold text-lg text-gray-800'>No data found</p>}
        </section>
    )
}

export default QueueAppointment