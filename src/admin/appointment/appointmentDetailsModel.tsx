import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { HTMLAttributes, useEffect, useState } from 'react'
import { fetchAppointmentDetails } from './appointmentAPIhandler'
import { AppointmentDetails } from '@/types/type'
import { ScrollArea } from '@/components/ui/scroll-area'
import { CalendarDays, Cross, PersonStanding, Printer, Trash, X } from 'lucide-react'
import { cn, currencyFormat } from '@/lib/utils'
import toast from 'react-hot-toast'


interface AppointmentDetailsModelProps extends HTMLAttributes<HTMLDivElement> {
    ID: number;
    onDelete: () => void
}


const AppointmentDetailsModel = ({ onDelete, ID, ...props }: AppointmentDetailsModelProps) => {

    const [appointmentDetails, setAppointmentDetails] = useState<AppointmentDetails>()


    useEffect(() => {
        try {
            (async function fetchData() {
                const data = await fetchAppointmentDetails(ID)
                setAppointmentDetails(data)
            })() //IIFE
        } catch ({ message }: any) {
            toast.error(message)
        }
    }, [])



    return (
        <>
            <div {...props} className='fixed top-0 left-0 h-screen w-full transition-all z-[120]' style={{ background: '#0000009c' }}></div>

            <MaxWidthWrapper className='fixed h-auto top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] z-[200] '>

                <div className='bg-white rounded-lg pb-2'>

                    {/* hearder */}

                    <div className='flex justify-between items-center p-3'>

                        <h1 className=' text-sm sm:text-lg font-semibold text-white bg-primary py-1 px-4 rounded-xl'>Appointment Details</h1>

                        <div className='flex gap-x-4'>
                            <Printer className='cursor-pointer  active:scale-95 text-gray-800 w-5' />
                            <Trash className='cursor-pointer  active:scale-95 text-red-500 w-5'
                                onClick={onDelete}
                            />
                            <div {...props}>
                                <X className='cursor-pointer  active:scale-95 w-5' />
                            </div>
                        </div>

                    </div>

                    <ScrollArea className='relative pt-3 h-[75vh] sm:h-[60vh] w-full'>

                        <div className="grid lg:grid-cols-2 gap-x-4 gap-y-8 px-2.5 pb-14">


                            {/* grid col-1 */}

                            <div className='gap-2 grid sm:grid-cols-2 lg:grid-cols-4 sm:col-span-full'>

                                {/* Appointment details */}

                                <div className="flex items-center gap-2 sm:col-span-2 mb-4">
                                    <div className='p-3 bg-yellow-500 rounded-full'>
                                        <CalendarDays className='w-10 h-10 text-white' />
                                    </div>
                                    <div className=''>
                                        <p className='font-semibold text-lg text-gray-900'>{appointmentDetails?.appointment_date}</p>
                                        <p className='text-sm text-gray-500'>Appointment Date</p>
                                    </div>
                                </div>

                                <div className="sm:col-span-2 grid grid-cols-2 gap-2">

                                    <div className='space-y-1 bg-white p-2 border-2 border-spacing-2 border-dashed border-gray-200 rounded-md'>
                                        <p className='text-gray-700 text-sm'>Appointment No.</p>
                                        <p className='font-semibold'>{appointmentDetails?.id}</p>
                                    </div>

                                    <div className='space-y-1 bg-white p-2 border-2 border-spacing-2 border-dashed border-gray-200 rounded-md'>
                                        <p className='text-gray-700 '>Status</p>
                                        <p className={cn('text-white rounded-md bg-green-600 w-fit px-2 font-semibold',
                                            { 'bg-red-500': appointmentDetails?.status === 'cancelled', 'bg-yellow-500': appointmentDetails?.status === 'pending' })}>
                                            {appointmentDetails?.status}
                                        </p>
                                    </div>

                                </div>


                                <div className="col-span-full grid sm:grid-cols-3 gap-2">
                                    <div className='space-y-1 bg-white p-2  ring-1 ring-gray-200'>
                                        <p className='text-gray-700'>Shift</p>
                                        <p className='text-sm'>{appointmentDetails?.shift}</p>
                                    </div>

                                    <div className='space-y-1 bg-white p-2  ring-1 ring-gray-200'>
                                        <p className='text-gray-700'>Priority</p>
                                        <p className='text-sm'>{appointmentDetails?.appointment_priority}</p>
                                    </div>

                                    <div className='space-y-1 bg-white p-2  ring-1 ring-gray-200'>
                                        <p className='text-gray-700'>Fees</p>
                                        <p className='text-sm'>{currencyFormat(Number(appointmentDetails?.fees))}</p>
                                    </div>

                                    <div className='space-y-1 bg-white p-2  ring-1 ring-gray-200'>
                                        <p className='text-gray-700'>Symptom Type</p>
                                        <p className='text-sm'>{appointmentDetails?.symptom_type}</p>
                                    </div>

                                    <div className='space-y-1 bg-white p-2  ring-1 ring-gray-200'>
                                        <p className='text-gray-700'>Description</p>
                                        <p className='text-sm'>{appointmentDetails?.symptom_description}</p>
                                    </div>

                                    <div className='space-y-1 bg-white p-2  ring-1 ring-gray-200'>
                                        <p className='text-gray-700'>Reference</p>
                                        <p className='text-sm'>{appointmentDetails?.reference}</p>
                                    </div>

                                    <div className='space-y-1 bg-white p-2  ring-1 ring-gray-200'>
                                        <p className='text-gray-700'>Previous Issue</p>
                                        <p className='text-sm'>{appointmentDetails?.previous_medical_issue}</p>
                                    </div>

                                    <div className='space-y-1 bg-white p-2  ring-1 ring-gray-200'>
                                        <p className='text-gray-700'>Payment Mode</p>
                                        <p className='text-sm'>{appointmentDetails?.payment_mode}</p>
                                    </div>

                                    <div className='space-y-1 bg-white p-2  ring-1 ring-gray-200'>
                                        <p className='text-gray-700'>Discount</p>
                                        <p className='text-sm'>{appointmentDetails?.discount}%</p>
                                    </div>

                                    <div className='space-y-1 bg-white p-2  ring-1 ring-gray-200'>
                                        <p className='text-gray-700'>Alternative Address</p>
                                        <p className='text-sm'>{appointmentDetails?.alternative_address}</p>
                                    </div>

                                    <div className='space-y-1 bg-white p-2  ring-1 ring-gray-200'>
                                        <p className='text-gray-700'>Message</p>
                                        <p className='text-sm'>{appointmentDetails?.message}</p>
                                    </div>
                                </div>

                            </div>




                            {/* grid col-2 */}

                            <div className='gap-2 grid sm:grid-cols-2'>

                                {/* patient details */}

                                <div className="flex items-center gap-2 col-span-full mb-4">
                                    <div className='p-3 bg-green-500 rounded-full'>
                                        <PersonStanding className='w-10 h-10 text-white' />
                                    </div>
                                    <div className=''>
                                        <p className='font-semibold text-lg text-gray-900'>{appointmentDetails?.patient.name}</p>
                                        <p className='text-sm text-gray-500 '>Patient</p>
                                    </div>
                                </div>

                                <div className='space-y-1 bg-white p-2  ring-1 ring-gray-200'>
                                    <p className='text-gray-700'>Patient ID</p>
                                    <p className='text-sm'>{appointmentDetails?.patientId}</p>
                                </div>

                                <div className='space-y-1 bg-white p-2  ring-1 ring-gray-200'>
                                    <p className='text-gray-700'>Age</p>
                                    <p className='text-sm'>{appointmentDetails?.patient.age}</p>
                                </div>

                                <div className='space-y-1 bg-white p-2  ring-1 ring-gray-200'>
                                    <p className='text-gray-700'>Email</p>
                                    <p className='text-sm'>{appointmentDetails?.patient.email}</p>
                                </div>

                                <div className='space-y-1 bg-white p-2  ring-1 ring-gray-200'>
                                    <p className='text-gray-700'>Phone</p>
                                    <p className='text-sm'>{appointmentDetails?.patient.phone}</p>
                                </div>

                                <div className='space-y-1 bg-white p-2  ring-1 ring-gray-200'>
                                    <p className='text-gray-700'>Gender</p>
                                    <p className='text-sm'>{appointmentDetails?.patient.gender}</p>
                                </div>

                                <div className='space-y-1 bg-white p-2  ring-1 ring-gray-200'>
                                    <p className='text-gray-700'>Blood Group</p>
                                    <p className='text-sm'>{appointmentDetails?.patient.blood_group}</p>
                                </div>

                                <div className='space-y-1 bg-white p-2  ring-1 ring-gray-200'>
                                    <p className='text-gray-700'>Address</p>
                                    <p className='text-sm'>{appointmentDetails?.patient.address}</p>
                                </div>

                            </div>



                            {/* grid col-3 */}

                            <div>
                                <div className='gap-2 grid sm:grid-cols-2'>

                                    {/* Doctor details */}

                                    <div className="flex items-center gap-2 col-span-full mb-4">
                                        <div className='p-3 bg-red-500 rounded-full'>
                                            <Cross className='w-10 h-10 text-white' />
                                        </div>
                                        <div className=''>
                                            <p className='font-semibold text-lg text-gray-900'>{appointmentDetails?.doctor.name}</p>
                                            <p className='text-sm text-gray-500 '>Doctor</p>
                                        </div>
                                    </div>

                                    <div className='space-y-1 bg-white p-2  ring-1 ring-gray-200'>
                                        <p className='text-gray-700'>Doctor ID</p>
                                        <p className='text-sm'>{appointmentDetails?.doctorId}</p>
                                    </div>

                                    <div className='space-y-1 bg-white p-2  ring-1 ring-gray-200'>
                                        <p className='text-gray-700'>Department</p>
                                        <p className='text-sm'>{appointmentDetails?.doctor.department}</p>
                                    </div>

                                    <div className='space-y-1 bg-white p-2  ring-1 ring-gray-200'>
                                        <p className='text-gray-700'>specialist</p>
                                        <p className='text-sm'>{appointmentDetails?.doctor.specialist}</p>
                                    </div>

                                    <div className='space-y-1 bg-white p-2  ring-1 ring-gray-200'>
                                        <p className='text-gray-700'>Gender</p>
                                        <p className='text-sm'>{appointmentDetails?.doctor.gender}</p>
                                    </div>

                                    <div className='space-y-1 bg-white p-2  ring-1 ring-gray-200'>
                                        <p className='text-gray-700'>Phone</p>
                                        <p className='text-sm'>{appointmentDetails?.doctor.phone}</p>
                                    </div>


                                </div>
                            </div>
                        </div>

                        {/* <div className="h-14 bg-gradient-to-t from-white z-30 w-full absolute bottom-0" /> */}
                    </ScrollArea>
                </div >
            </MaxWidthWrapper >



        </>
    )
}

export default AppointmentDetailsModel