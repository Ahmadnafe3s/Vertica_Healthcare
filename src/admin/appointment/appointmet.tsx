import AddAppointment from '@/admin/appointment/AddAppointment'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { cn, currencyFormat } from '@/lib/utils'
import { Ban, FileText, ListMinus, Plus, Printer, Trash } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { createAppointment, deleteAppointment, fetchAppointments, getAppointmentDetails, searchAppointment } from './appointmentAPIhandler'
import AppointmentDetailsModel from './appointmentDetailsModel'
import AlertModel from '@/components/alertModel'
import { currencySymbol } from '@/helpers/currencySymbol'
import { Appointment, AppointmentDetails } from '@/types/appointment/appointment'
import LoaderModel from '@/components/loader'
import { appointmentFormSchema } from '@/formSchemas/AppointmentFormSchema'
import { z } from 'zod'
import CustomTooltip from '@/components/customTooltip'
import { useDebouncedCallback } from 'use-debounce'
import CustomPagination from '@/components/customPagination'
import { useQueryState } from 'nuqs'


const AdminAppointment = () => {

    // params
    const [page, setPage] = useQueryState('page', { defaultValue: "1" })
    const [search, setSearch] = useQueryState('search')

    // Pending states
    const [isPending, setPending] = useState<boolean>(false)

    // Model States
    const [model, setModel] = useState<{ appointmentDetails: boolean, addAppointmentForm: boolean, alert: boolean, loader: boolean }>({
        appointmentDetails: false,
        addAppointmentForm: false,
        alert: false,
        loader: false
    })

    const itemID = useRef<string>()

    // API States
    const [Appointments, setAppointments] = useState<Appointment>({ data: [], total_pages: 0 })
    const [AppointmentDetails, setAppointmentDetails] = useState<AppointmentDetails | undefined>(undefined)



    const getAppointments = async () => {
        try {
            console.log(page);

            const data = await fetchAppointments({
                page: +page,
                limit: search ? 100 : 1,
                search: search!
            })
            setAppointments(data)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    // fetching appointment details

    const fetchAppoinmentDetails = async (id: string) => {
        try {
            setModel((rest) => ({ ...rest, loader: true }))
            const data = await getAppointmentDetails(id)
            setAppointmentDetails(data)
        } catch ({ message }: any) {
            toast.error(message)
        } finally { setModel((rest) => ({ ...rest, loader: false })) }
    }



    const onSearch = useDebouncedCallback(async (value: string) => {
        if (value) {
            setSearch(value)
            setPage('1')
            return null
        }
        setSearch(null)
        setPage("2")
    }, 400)


    const onDelete = async () => {
        try {
            setPending(true)
            const data = await deleteAppointment(itemID.current!)
            toast.success(data.message)
            getAppointments()
        } catch ({ message }: any) {
            toast.error(message)
        } finally {
            setPending(false)
            setModel((rest) => ({ ...rest, alert: false }))
        }
    }


    // performing only insert
    const handleSubmit = async (formData: z.infer<typeof appointmentFormSchema>) => {
        try {
            setPending(true)
            const data = await createAppointment(formData)
            toast.success(data.message)
            getAppointments()
            setModel((rest) => ({ ...rest, addAppointmentForm: false }))
        } catch ({ message }: any) {
            toast.error(message)
        } finally {
            setPending(false)
        }
    }


    useEffect(() => {
        getAppointments();
    }, [page, search])


    return (

        <>
            <div className='my-2 flex flex-col'>

                {/* top bar */}
                <div className='flex py-3 flex-col md:flex-row gap-y-2 md:items-center md:justify-between border-b border-gray-200'>
                    <h1 className='font-semibold tracking-tight'>Appointments</h1>
                    <div className='flex gap-x-2 overflow-x-auto'>

                        <Button type='button' size={'sm'}
                            onClick={() => { setModel((prev) => ({ ...prev, addAppointmentForm: true })) }} >
                            <Plus /> Appointment
                        </Button>

                        <Link to={'queue'} className={buttonVariants({
                            variant: 'default',
                            size: 'sm',
                            className: 'flex gap-x-1'
                        })}>
                            <ListMinus />
                            Queue
                        </Link>

                        <Link to={'cancelled'} className={buttonVariants({
                            variant: 'destructive',
                            size: 'sm',
                            className: 'flex gap-x-1'
                        })}>
                            <Ban />
                            Cancelled
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

                <div className="flex flex-col gap-y-5 min-h-[70vh]">
                    <div className="flex-1">
                        <Table className="border rounded-lg my-10">
                            <TableHeader className='bg-slate-100'>
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
                                    <TableHead>Discount%</TableHead>
                                    <TableHead>Fees {currencySymbol()}</TableHead>
                                    <TableHead>Action</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>


                            <TableBody>
                                {Appointments.data.map((appointment) => {
                                    return <TableRow key={appointment.id}>
                                        <TableCell className="font-semibold cursor-pointer text-blue-500 hover:text-blue-400" onClick={async () => {
                                            await fetchAppoinmentDetails(appointment.id)
                                            setModel((reset) => {
                                                return {
                                                    ...reset,
                                                    appointmentDetails: true
                                                }
                                            })
                                        }}>
                                            {appointment.id}
                                        </TableCell>
                                        <TableCell className='whitespace-nowrap'>{appointment.patient.name}</TableCell>
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
                                        <TableCell className='space-x-2 px-2'>

                                            {/* EDIT */}
                                            {/* <TooltipProvider delayDuration={200}>
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <Pencil className="w-4 cursor-pointer  text-gray-600" onClick={async () => {

                                                }} />
                                            </TooltipTrigger>
                                            <TooltipContent>Edit</TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider> */}


                                            {/* DELETE  */}
                                            <CustomTooltip message='DELETE'>
                                                <Trash className="w-4 cursor-pointer  text-gray-600" onClick={async () => {
                                                    setModel((prev) => ({ ...prev, alert: true }))
                                                    itemID.current = appointment.id
                                                }} />
                                            </CustomTooltip>

                                        </TableCell>
                                        <TableCell>
                                            <span className={cn('text-white py-1 px-3 block rounded-md group-hover:hidden', appointment.status === 'approved' ? 'bg-green-500' : appointment.status === 'pending' ? 'bg-yellow-500' : 'bg-red-500')}>{appointment.status}</span>
                                        </TableCell>
                                    </TableRow>
                                })}
                            </TableBody>
                        </Table>

                        {/* if no data will be recive */}
                        {Appointments.data.length < 1 && <p className='font-bold text-lg text-gray-800'>No data found</p>}
                    </div>

                    {/* Pagination */}

                    <CustomPagination
                        total_pages={Appointments?.total_pages}
                        currentPage={+page}
                        previous={(p) => setPage(String(p))}
                        goTo={(p) => setPage(String(p))}
                        next={(p) => setPage(String(p))}
                    />
                </div>


            </div>



            {/* appointment form model */}

            {
                model.addAppointmentForm && <AddAppointment
                    Submit={handleSubmit}
                    isPending={isPending}
                    onClick={() => {
                        getAppointments();
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
                appointmentDetails={AppointmentDetails!}
                onClick={() => {
                    setModel((reset) => {
                        return {
                            ...reset,
                            appointmentDetails: false
                        }
                    })
                }}
            />}


            {/* Alert Model */}
            {model.alert && <AlertModel
                isPending={isPending}
                cancel={() => {
                    setModel((reset) => {
                        return {
                            ...reset,
                            alert: false
                        }
                    })
                }}
                continue={onDelete}
            />}


            {/* Loader model */}
            {model.loader && (
                <LoaderModel />
            )}
        </>

    )
}

export default AdminAppointment