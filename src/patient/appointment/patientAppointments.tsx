import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { cn, currencyFormat } from '@/lib/utils'
import { Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { currencySymbol } from '@/helpers/currencySymbol'
import { Appointment, AppointmentDetails } from '@/types/appointment/appointment'
import LoaderModel from '@/components/loader'
import { appointmentFormSchema } from '@/formSchemas/AppointmentFormSchema'
import { z } from 'zod'
import { useDebouncedCallback } from 'use-debounce'
import CustomPagination from '@/components/customPagination'
import { useQueryState, parseAsInteger } from 'nuqs'
import { useAppSelector } from '@/hooks'
import { authSelector } from '@/features/auth/authSlice'
import CreatePatientAppointment from './createPatientAppointment'
import { Separator } from '@/components/ui/separator'
import { createAppointment, fetchAppointments, getAppointmentDetails } from '@/pages/appointment/appointmentAPIhandler'
import AppointmentListPDF from '@/pages/appointment/print/AppointmnetListPDF'
import AppointmentPDF from '@/pages/appointment/print/AppointmnetPDF'
import AppointmentDetailsModel from '@/pages/appointment/appointmentDetailsModel'




const PatientAppointments = () => {

    // user session
    const session = useAppSelector(authSelector)

    // params
    const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))
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


    // API States
    const [Appointments, setAppointments] = useState<Appointment>({ data: [], total_pages: 0 })
    const [AppointmentDetails, setAppointmentDetails] = useState<AppointmentDetails | undefined>(undefined)


    //fetching appointments list
    const getAppointments = async () => {
        try {
            const data = await fetchAppointments({
                page,
                limit: 10,
                search: search!, // if search will have value then data will get accordingly
            })
            setAppointments(data)
        } catch ({ message }:any) {
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
            toast.error(message);
        } finally { setModel((rest) => ({ ...rest, loader: false })) }
    }



    const onSearch = useDebouncedCallback(async (value: string) => {
        value ? (setSearch(value)) : (setSearch(null))
        setPage(1) // always should execute
    }, 400)


    // performing only insert
    const handleSubmit = async (formData: z.infer<typeof appointmentFormSchema>) => {
        try {
            setPending(true)
            const data = await createAppointment({ ...formData, patientId: session.user?.id! })
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
                <div className='flex flex-row gap-y-2 py-3 justify-between'>
                    <h1 className='font-semibold tracking-tight'>Appointments</h1>

                    <div>
                        <Button type='button' size={'sm'}
                            onClick={() => { setModel((prev) => ({ ...prev, addAppointmentForm: true })) }} >
                            <Plus /> Appointment
                        </Button>
                    </div>
                </div>

                <Separator />

                {/* search bar */}

                <div className='flex py-3 flex-col md:flex-row gap-y-4 md:items-center md:justify-between'>

                    <div className='flex gap-x-2 sm:w-[300px]'>
                        <Input type='text' height='10px' placeholder='search' defaultValue={search!} onChange={(e) => { onSearch(e.target.value) }} />
                    </div>

                    <div className='flex gap-x-2'>
                        {/* printing appointments list */}
                        <AppointmentListPDF appointments={Appointments['data']} />
                    </div>
                </div>

                <Separator />

                <div className="flex flex-col gap-y-5 min-h-[75vh] mb-16">
                    <div className="flex-1">
                        <Table className="border rounded-lg my-10 dark:border-gray-800">
                            <TableHeader className='bg-slate-100 dark:bg-gray-900'>
                                <TableRow>
                                    <TableHead>Appointment No</TableHead>
                                    <TableHead>Appointment Date</TableHead>
                                    <TableHead>Shift</TableHead>
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
                                            setModel((reset) => {
                                                return {
                                                    ...reset,
                                                    appointmentDetails: true
                                                }
                                            })
                                        }}>
                                            {appointment.id}
                                        </TableCell>
                                        <TableCell>{appointment.appointment_date}</TableCell>
                                        <TableCell>{appointment.shift}</TableCell>
                                        <TableCell>{appointment.doctor.name}</TableCell>
                                        <TableCell>{appointment.appointment_priority}</TableCell>
                                        <TableCell>{appointment.alternative_address}</TableCell>
                                        <TableCell>{currencyFormat(+appointment.fees)}</TableCell>
                                        <TableCell>{appointment.discount}%</TableCell>
                                        <TableCell>{currencyFormat(appointment.net_amount)}</TableCell>
                                        <TableCell className='flex items-end space-x-2 px-2'>

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


                                            {/* DELETE
                                            <CustomTooltip message='DELETE'>
                                                <Trash className="w-4 cursor-pointer  text-gray-600" onClick={async () => {
                                                    setModel((prev) => ({ ...prev, alert: true }))
                                                    itemID.current = appointment.id
                                                }} />
                                            </CustomTooltip> */}

                                            {/* Print Appointment */}
                                            <AppointmentPDF appointmentId={appointment.id} onPending={(v) => setModel({ ...model, loader: v })} />

                                        </TableCell>
                                        <TableCell>
                                            <span className={cn('text-white py-1 px-3 block rounded-md group-hover:hidden', appointment.status === 'Approved' ? 'bg-green-500' : appointment.status === 'Pending' ? 'bg-yellow-500' : 'bg-red-500')}>{appointment.status}</span>
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
                        previous={(p) => setPage(p)}
                        goTo={(p) => setPage(p)}
                        next={(p) => setPage(p)}
                    />
                </div>

            </div>



            {/* appointment form model */}

            {
                model.addAppointmentForm && <CreatePatientAppointment
                    Submit={handleSubmit}
                    isPending={isPending}
                    onClick={() => {
                        setModel({ ...model, addAppointmentForm: false })
                    }}
                />
            }



            {/* Appointment details model */}

            {model.appointmentDetails && <AppointmentDetailsModel
                appointmentDetails={AppointmentDetails!}
                onClick={() => {
                    setModel({ ...model, appointmentDetails: false })
                }}
            />}


            {/* Alert Model
            {model.alert && <AlertModel
                isPending={isPending}
                cancel={() => {
                    setModel({ ...model, alert: false })
                }}
                continue={onDelete}
            />} */}


            {/* Loader model */}
            {model.loader && (
                <LoaderModel />
            )}
        </>

    )
}

export default PatientAppointments