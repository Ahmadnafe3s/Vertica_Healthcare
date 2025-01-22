import AddAppointment from '@/admin/appointment/AddAppointment'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { cn, currencyFormat } from '@/lib/utils'
import { Appointments } from '@/types/type'
import { FileText, ListMinus, Plus, Printer } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { deleteAppointment, fetchAppointments, searchAppointment } from './appointmentAPIhandler'
import AppointmentDetailsModel from './appointmentDetailsModel'
import AlertModel from '@/components/alertModel'

const AdminAppointment = () => {

    const [model, setModel] = useState<{ appointmentDetails: boolean, addAppointmentForm: boolean, alert: boolean }>({
        appointmentDetails: false,
        addAppointmentForm: false,
        alert: false
    })

    const id = useRef<number>()

    const [Appointments, setAppointments] = useState<Appointments[]>([])


    const getAppointmentsList = async () => {
        try {
            const data = await fetchAppointments()
            setAppointments(data)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    const onSearch = async (value: string) => {
        try {
            const data = await searchAppointment(value)
            setAppointments(data)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    const onDelete = async () => {
        try {
            const data = await deleteAppointment(Number(id.current))
            toast.success(data.message)
            getAppointmentsList()
        } catch ({ message }: any) {
            toast.error(message)
        } finally {
            setModel((reset) => {
                return {
                    ...reset,
                    alert: false,
                    appointmentDetails: false
                }
            })
        }
    }


    useEffect(() => {
        getAppointmentsList();
    }, [])


    return (

        <>
            <div className='my-2 flex flex-col'>

                {/* top bar */}
                <div className='flex py-3 flex-col md:flex-row gap-y-2 md:items-center md:justify-between border-b border-gray-200'>
                    <h1 className='font-semibold tracking-tight'>Appointment Details</h1>
                    <div className='flex gap-x-2 overflow-x-auto'>


                        <Button type='button' size={'sm'} variant={'outline'}
                            onClick={() => {
                                setModel((reset) => {
                                    return {
                                        ...reset,
                                        addAppointmentForm: true
                                    }
                                })
                            }} >
                            <Plus /> Appointment
                        </Button>

                        
                        

                        <Link to={{ pathname: '/admin/QueueAppointment' }} className={buttonVariants({
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
                        <Input type='text' height='10px' placeholder='search' onChange={(e) => { onSearch(e.target.value) }} />
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
                            <TableHead>Shift</TableHead>
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
                        {Appointments.map((appointment, index) => {
                            return <TableRow key={index} className='cursor-pointer'
                                onClick={() => {
                                    id.current = appointment.id;
                                    setModel((reset) => {
                                        return {
                                            ...reset,
                                            appointmentDetails: true
                                        }
                                    })
                                }}>
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
                                <TableCell>{appointment.discount}</TableCell>
                                <TableCell>{currencyFormat(+appointment.fees)}</TableCell>
                                <TableCell>
                                    <span className={cn('bg-green-600 text-white py-1 px-3 rounded-md', { 'bg-red-500': appointment.status === 'cancelled' })}>{appointment.status}</span>
                                </TableCell>
                            </TableRow>
                        })}
                    </TableBody>
                </Table>

                {/* if no data will be recive */}

                {Appointments.length < 1 && <p className='font-bold text-lg text-gray-800'>No data found</p>}
            </div>



            {/* appointment form model */}

            {
                model.addAppointmentForm && <AddAppointment
                    onClick={() => {
                        getAppointmentsList();
                        setModel((reset) => {
                            return {
                                ...reset,
                                addAppointmentForm: false
                            }
                        })
                    }}
                />
            }



            {/* Appointment details model */}

            {model.appointmentDetails && <AppointmentDetailsModel

                onDelete={() => {
                    setModel((reset) => {
                        return {
                            ...reset,
                            alert: true
                        }
                    })
                }}

                onClick={() => {
                    setModel((reset) => {
                        return {
                            ...reset,
                            appointmentDetails: false
                        }
                    })
                }}
                ID={Number(id.current)}
            />}

            {/* Alert Model */}

            {model.alert && <AlertModel
                cancel={() => {
                    setModel((reset) => {
                        return {
                            ...reset,
                            alert: false
                        }
                    })
                }}
                continue={() => { onDelete(); }}
            />}
        </>

    )
}

export default AdminAppointment