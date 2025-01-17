import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { HTMLAttributes, useEffect, useState } from 'react'
import { fetchAppointmentDetails } from './appointmentAPIhandler'
import { AppointmentDetails } from '@/types/type'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Printer, Trash, X } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
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

            <MaxWidthWrapper className='fixed h-auto max-h-[90vh] top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] z-[200] '>

                <div className='bg-white rounded-lg'>

                    {/* hearder */}

                    <div className='flex justify-between bg-zinc-200 items-center p-2 rounded-t-lg'>

                        <h1 className=' text-xl font-semibold '>Appointment Details</h1>

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

                        <div className="grid lg:grid-cols-2 gap-y-3 px-2.5 pb-10">

                            {/* grid col-1 */}

                            <div className='flex flex-col gap-4'>

                                {/* patient details */}

                                <div className="grid grid-cols-2">
                                    <p className='font-semibold text-gray-900'>Patient ID</p>
                                    <p className='text-gray-800'>{appointmentDetails?.patientId}</p>
                                </div>

                                <div className="grid grid-cols-2">
                                    <p className='font-semibold text-gray-900'>Patient Name</p>
                                    <p className='text-gray-800'>{appointmentDetails?.patient.name}</p>
                                </div>

                                <div className="grid grid-cols-2">
                                    <p className='font-semibold text-gray-900'>Age</p>
                                    <p className='text-gray-800'>{appointmentDetails?.patient.age}</p>
                                </div>

                                <div className="grid grid-cols-2">
                                    <p className='font-semibold text-gray-900'>Email</p>
                                    <p className='text-gray-800'>{appointmentDetails?.patient.email}</p>
                                </div>

                                <div className="grid grid-cols-2">
                                    <p className='font-semibold text-gray-900'>Phone</p>
                                    <p className='text-gray-800'>{appointmentDetails?.patient.phone}</p>
                                </div>

                                <div className="grid grid-cols-2">
                                    <p className='font-semibold text-gray-900'>Gender</p>
                                    <p className='text-gray-800'>{appointmentDetails?.patient.gender}</p>
                                </div>

                                <div className="grid grid-cols-2">
                                    <p className='font-semibold text-gray-900'>Blood Group</p>
                                    <p className='text-gray-800'>{appointmentDetails?.patient.blood_group}</p>
                                </div>

                                <div className="grid grid-cols-2">
                                    <p className='font-semibold text-gray-900'>Address</p>
                                    <p className='text-gray-800'>{appointmentDetails?.patient.address}</p>
                                </div>

                                <div className="grid grid-cols-2">
                                    <p className='font-semibold text-gray-900'>Alternative Address</p>
                                    <p className='text-gray-800'>{appointmentDetails?.alternative_address}</p>
                                </div>

                                {/* doctor details */}

                                <Separator />

                                <div className="grid grid-cols-2">
                                    <p className='font-semibold text-gray-900'>Doctor ID</p>
                                    <p className='text-gray-800'>{appointmentDetails?.doctorId}</p>
                                </div>

                                <div className="grid grid-cols-2">
                                    <p className='font-semibold text-gray-900'>Doctor Name</p>
                                    <p className='text-gray-800'>{appointmentDetails?.doctor.name}</p>
                                </div>

                                <div className="grid grid-cols-2">
                                    <p className='font-semibold text-gray-900'>Department</p>
                                    <p className='text-gray-800'>{appointmentDetails?.doctor.department}</p>
                                </div>


                                <div className="grid grid-cols-2">
                                    <p className='font-semibold text-gray-900'>Specialization</p>
                                    <p className='text-gray-800'>{appointmentDetails?.doctor.specialist}</p>
                                </div>

                                <div className="grid grid-cols-2">
                                    <p className='font-semibold text-gray-900'>Gender</p>
                                    <p className='text-gray-800'>{appointmentDetails?.doctor.gender}</p>
                                </div>

                                <div className="grid grid-cols-2">
                                    <p className='font-semibold text-gray-900'>Phone</p>
                                    <p className='text-gray-800'>{appointmentDetails?.doctor.phone}</p>
                                </div>
                            </div>


                            {/* grid col-2 */}

                            <div className="flex flex-col gap-4">
                                <Separator className='sm:hidden block' />

                                <div className="grid grid-cols-2">
                                    <p className='font-semibold text-gray-900'>Appointment No.</p>
                                    <p className='text-gray-800'>{appointmentDetails?.id}</p>
                                </div>

                                <div className="grid grid-cols-2">
                                    <p className='font-semibold text-gray-900'>Appointment Date</p>
                                    <p className='text-gray-800'>{appointmentDetails?.appointment_date}</p>
                                </div>

                                <div className="grid grid-cols-2">
                                    <p className='font-semibold text-gray-900'>Appointment Priority</p>
                                    <p className='text-gray-800'>{appointmentDetails?.appointment_priority}</p>
                                </div>

                                <div className="grid grid-cols-2">
                                    <p className='font-semibold text-gray-900'>Status</p>
                                    <p className={cn('text-white rounded-md bg-green-500 w-fit px-2 font-semibold',
                                        { 'bg-red-400 text-black': appointmentDetails?.status === 'cancelled', 'bg-yellow-500': appointmentDetails?.status === 'pending' })}>
                                        {appointmentDetails?.status}
                                    </p>
                                </div>

                                <div className="grid grid-cols-2">
                                    <p className='font-semibold text-gray-900'>Shift</p>
                                    <p className='text-gray-800'>{appointmentDetails?.shift}</p>
                                </div>

                                <div className="grid grid-cols-2">
                                    <p className='font-semibold text-gray-900'>Fees</p>
                                    <p className='text-gray-800'>{currencyFormat(Number(appointmentDetails?.fees))}</p>
                                </div>

                                <div className="grid grid-cols-2">
                                    <p className='font-semibold text-gray-900'>Payment Mode</p>
                                    <p className='text-gray-800'>{appointmentDetails?.payment_mode}</p>
                                </div>

                                <div className="grid grid-cols-2">
                                    <p className='font-semibold text-gray-900'>Previous Issue</p>
                                    <p className='text-gray-800'>{appointmentDetails?.previous_medical_issue}</p>
                                </div>

                                <div className="grid grid-cols-2">
                                    <p className='font-semibold text-gray-900'>Symptom Type</p>
                                    <p className='text-gray-800'>{appointmentDetails?.symptom_type}</p>
                                </div>

                                <div className="grid grid-cols-2">
                                    <p className='font-semibold text-gray-900'>Description</p>
                                    <p className='text-gray-800'>{appointmentDetails?.symptom_description}</p>
                                </div>

                                <div className="grid grid-cols-2">
                                    <p className='font-semibold text-gray-900'>Message</p>
                                    <p className='text-gray-800'>{appointmentDetails?.message}</p>
                                </div>

                            </div>
                        </div>

                        <div className="h-14 bg-gradient-to-t from-white z-30 w-full absolute bottom-0" />
                    </ScrollArea>
                </div>
            </MaxWidthWrapper>



        </>
    )
}

export default AppointmentDetailsModel