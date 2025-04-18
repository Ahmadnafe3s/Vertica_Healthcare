import { buttonVariants } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Loader } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchAppointments, updateStatus } from './appointmentAPIhandler'
import toast from 'react-hot-toast'
import { Appointment } from '@/types/appointment/appointment'
import { useQueryState, parseAsInteger } from 'nuqs'
import CustomPagination from '@/components/customPagination'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { useDebouncedCallback } from 'use-debounce'
import EmptyList from '@/components/emptyList'

const CancelledAppointments = () => {

    // params
    const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))
    const [search, setSearch] = useQueryState('search')

    // api states
    const [appointments, setAppointments] = useState<Appointment>({ data: [], total_pages: 1 })
    const [isPending, setPending] = useState<boolean>(false)
    const router = useNavigate()

    // onchange it updates the appointment
    const onUpdateStatus = async (id: string, status: string) => {
        try {
            setPending(true)
            const data = await updateStatus(id, status)
            toast.success(data.message)
            return router('..')
        } catch ({ message }: any) {
            toast.error(message)
        } finally { setPending(false) }
    }


    const onSearch = useDebouncedCallback(async (value: string) => {
        value ? (setSearch(value)) : (setSearch(null))
        setPage(1) // always should execute
    }, 400)


    useEffect(() => {
        try {
            (async function () {
                const data = await fetchAppointments({ page: +page, status: 'cancelled', search: search! })
                setAppointments(data)
            })() //IIFE

        } catch ({ message }: any) {
            toast.error(message)
        }
    }, [page, search])

    return (
        <section className='bg-slate-50 dark:bg-gray-950'>

            <div className='flex flex-col py-3 gap-y-3'>
                <h1 className='text-xl text-gray-900 dark:text-white font-semibold'>Cancelled Appointments</h1>
                <Separator />
                <div className='flex gap-x-2 w-[180px]'>
                    <Input type='text' height='10px' placeholder='search' defaultValue={search!} onChange={(e) => { onSearch(e.target.value) }} />
                </div>
            </div>

            <Separator />


            <div className="flex flex-col mb-16 min-h-[75vh]">
                <div className="flex-1">
                    <Table className='rounded-lg border dark:border-gray-800 my-10'>
                        <TableHeader className='bg-slate-100 dark:bg-gray-900'>
                            <TableRow>
                                <TableHead>Appointment No</TableHead>
                                <TableHead>Patient Name</TableHead>
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

                            {appointments.data.map((appointment, index) => {
                                return <TableRow key={index}>
                                    <TableCell className="font-medium">{appointment.id}</TableCell>
                                    <TableCell >{appointment.patient.name}</TableCell>
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
                                                size: 'sm',
                                                className: 'bg-red-500 text-white'
                                            })}>
                                                <SelectValue placeholder={appointment.status} /> {isPending && <Loader className='animate-spin' />}
                                            </SelectTrigger>

                                            <SelectContent align='end' className='z-[200]'>
                                                <SelectItem value="Approved">Approved</SelectItem>
                                                <SelectItem value="Pending">Pending</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </TableCell>
                                </TableRow>
                            })}

                        </TableBody>
                    </Table>
                    <EmptyList length={appointments.data.length} message='No cancelled appointments found' />
                </div>

                {/* pagination */}
                <section>
                    <CustomPagination
                        total_pages={appointments?.total_pages}
                        currentPage={+page}
                        previous={(p) => setPage(p)}
                        goTo={(p) => setPage(p)}
                        next={(p) => setPage(p)}
                    />
                </section>
            </div>
        </section>
    )
}

export default CancelledAppointments