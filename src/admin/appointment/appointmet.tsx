import AddAppointment from '@/admin/appointment/AddAppointment'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { cn, currencyFormat } from '@/lib/utils'
import { Ban, FileText, ListMinus, Plus, Printer, Trash } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { createAppointment, deleteAppointment, fetchAppointments, getAppointmentDetails } from './appointmentAPIhandler'
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
import { useQueryState, parseAsInteger } from 'nuqs'
import AppointmentPDF from './generatePDF/AppointmnetPDF'
import AppointmentListPDF from './generatePDF/AppointmnetListPDF'
import usePermission from '@/authz'
import { useConfirmation } from '@/hooks/useConfirmation'
import EmptyList from '@/components/emptyList'



const AdminAppointment = () => {

    // custom hooks
    const { loadPermission, hasPermission } = usePermission()
    const { confirm, confirmationProps } = useConfirmation()

    // params
    const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))
    const [search, setSearch] = useQueryState('search')

    // Pending states
    const [isPending, setPending] = useState<boolean>(false)

    // Model States
    const [model, setModel] = useState({ appointmentDetails: false, addAppointmentForm: false, loader: false })

    // API States
    const [Appointments, setAppointments] = useState<Appointment>({ data: [], total_pages: 0 })
    const [AppointmentDetails, setAppointmentDetails] = useState<AppointmentDetails | undefined>(undefined)


    //fetching appointments list
    const getAppointments = async () => {
        try {
            const data = await fetchAppointments({
                page,
                limit: 10,
                search: search! // if search will have value then data will get accordingly
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
        value ? (setSearch(value)) : (setSearch(null))
        setPage(1) // always should execute
    }, 400)


    const onDelete = async (id: string) => {
        try {
            const isConfirm = await confirm()
            if (!isConfirm) return null
            const data = await deleteAppointment(id)
            toast.success(data.message)
            getAppointments()
        } catch ({ message }: any) {
            toast.error(message)
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
        loadPermission()
    }, [page, search])


    return (

        <>
            <div className='my-2 flex flex-col'>

                {/* top bar */}
                <div className='flex py-3 flex-col md:flex-row gap-y-2 md:items-center md:justify-between border-b border-gray-200 dark:border-gray-800'>
                    <h1 className='font-semibold tracking-tight'>Appointments</h1>
                    <div className='flex gap-x-2 overflow-x-auto'>

                        {hasPermission('create', 'appointment') && (
                            <Button type='button' size={'sm'}
                                onClick={() => { setModel((prev) => ({ ...prev, addAppointmentForm: true })) }} >
                                <Plus /> Appointment
                            </Button>
                        )}

                        {hasPermission('view', 'queue') && (
                            <Link to={'queue'} className={buttonVariants({
                                variant: 'default', size: 'sm', className: 'flex gap-x-1'
                            })}>
                                <ListMinus /> Queue </Link>
                        )}

                        {hasPermission('view', 'cancelled') && (
                            <Link to={'cancelled'} className={buttonVariants({
                                variant: 'destructive', size: 'sm', className: 'flex gap-x-1'
                            })}><Ban /> Cancelled </Link>
                        )}

                    </div>
                </div>


                {/* search bar */}

                <div className='flex py-3 flex-col md:flex-row gap-y-4 md:items-center md:justify-between border-b border-gray-200 dark:border-gray-800'>

                    <div className='flex gap-x-2'>
                        <Input type='text' height='10px' placeholder='search' defaultValue={search!} onChange={(e) => { onSearch(e.target.value) }} />
                    </div>

                    <div className='flex gap-x-2'>
                        {/* printing appointments list */}
                        <AppointmentListPDF appointments={Appointments['data']} />
                    </div>
                </div>

                <div className="flex flex-col gap-y-5 min-h-[75vh] mb-16">
                    <div className="flex-1">
                        <Table className="border rounded-lg my-10 dark:border-gray-800">
                            <TableHeader className='bg-slate-100 dark:bg-gray-900'>
                                <TableRow>
                                    <TableHead>Appointment No</TableHead>
                                    <TableHead>Patient Name</TableHead>
                                    <TableHead>Appointment Date</TableHead>
                                    <TableHead>Shift</TableHead>
                                    <TableHead>Phone</TableHead>
                                    <TableHead>Gender</TableHead>
                                    <TableHead>Doctor</TableHead>
                                    <TableHead>Priority</TableHead>
                                    <TableHead>Alternative Address</TableHead>
                                    <TableHead>Fees {currencySymbol()}</TableHead>
                                    <TableHead>Discount%</TableHead>
                                    <TableHead>Net Amount {currencySymbol()}</TableHead>
                                    <TableHead>Action</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>


                            <TableBody>
                                {Appointments.data.map((appointment) => {
                                    return <TableRow key={appointment.id}>
                                        <TableCell className="font-semibold cursor-pointer text-blue-500 hover:text-blue-400" onClick={async () => {
                                            await fetchAppoinmentDetails(appointment.id)
                                            setModel({ ...model, appointmentDetails: true })
                                        }}>
                                            {appointment.id}
                                        </TableCell>
                                        <TableCell className='whitespace-nowrap'>{appointment.patient.name}</TableCell>
                                        <TableCell>{appointment.appointment_date}</TableCell>
                                        <TableCell>{appointment.shift}</TableCell>
                                        <TableCell>{appointment.patient.phone}</TableCell>
                                        <TableCell>{appointment.patient.gender}</TableCell>
                                        <TableCell>{appointment.doctor.name}</TableCell>
                                        <TableCell>{appointment.appointment_priority}</TableCell>
                                        <TableCell>{appointment.alternative_address}</TableCell>
                                        <TableCell>{currencyFormat(+appointment.fees)}</TableCell>
                                        <TableCell>{appointment.discount}%</TableCell>
                                        <TableCell>{currencyFormat(appointment.net_amount)}</TableCell>
                                        <TableCell >
                                            <div className='flex items-center space-x-2'>
                                                {/* DELETE  */}
                                                {hasPermission('delete', 'appointment') && (
                                                    <CustomTooltip message='DELETE'>
                                                        <Trash className="w-4 cursor-pointer  text-gray-600 dark:text-neutral-300" onClick={() => onDelete(appointment.id)} />
                                                    </CustomTooltip>
                                                )}

                                                {/* Print Appointment */}
                                                <AppointmentPDF appointmentId={appointment.id} onPending={(v) => setModel({ ...model, loader: v })} />
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <span className={cn('text-white py-1 px-3 block rounded-md group-hover:hidden', appointment.status === 'Approved' ? 'bg-green-500' : appointment.status === 'Pending' ? 'bg-yellow-500' : 'bg-red-500')}>{appointment.status}</span>
                                        </TableCell>
                                    </TableRow>
                                })}
                            </TableBody>
                        </Table>

                        {/* if no data will be recive */}
                        <EmptyList length={Appointments.data.length} message='No data found' />
                    </div>

                    {/* Pagination */}

                    <CustomPagination
                        total_pages={Appointments?.total_pages}
                        currentPage={+page}
                        previous={(p) => setPage(p)}
                        goTo={(p) => setPage(p)}
                        next={(p) => setPage(p)}
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
                onClick={() => setModel({ ...model, appointmentDetails: false })}
            />}


            {/* Alert Model */}
            {confirmationProps.isOpen && <AlertModel
                cancel={() => confirmationProps.onCancel()}
                continue={() => confirmationProps.onConfirm()}
            />}


            {/* Loader model */}
            {model.loader && (
                <LoaderModel />
            )}
        </>

    )
}

export default AdminAppointment