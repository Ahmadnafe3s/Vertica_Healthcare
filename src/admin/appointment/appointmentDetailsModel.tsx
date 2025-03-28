import { HTMLAttributes } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { CalendarDays, Cross, PersonStanding } from 'lucide-react'
import { cn, currencyFormat } from '@/lib/utils'
import { AppointmentDetails } from '@/types/appointment/appointment'
import Dialog from '@/components/Dialog'
import { currencySymbol } from '@/helpers/currencySymbol'


interface AppointmentDetailsModelProps extends HTMLAttributes<HTMLDivElement> {
    appointmentDetails: AppointmentDetails
}


const AppointmentDetailsModel = ({ appointmentDetails, ...props }: AppointmentDetailsModelProps) => {


    return (
        <Dialog pageTitle='Appointment Details' {...props}>
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
                                <p className='font-semibold text-lg text-gray-900 dark:text-white'>{appointmentDetails?.appointment_date}</p>
                                <p className='text-sm text-gray-500'>Appointment Date</p>
                            </div>
                        </div>

                        <div className="sm:col-span-2 grid grid-cols-2 gap-2">

                            <div className='space-y-1 dark:border-gray-700 p-2 border-2 border-spacing-2 border-dashed border-gray-200 rounded-md'>
                                <p className='text-gray-700 dark:text-neutral-300 text-sm'>Appointment No.</p>
                                <p className='font-semibold'>{appointmentDetails?.id}</p>
                            </div>

                            <div className='space-y-1 dark:border-gray-700 p-2 border-2 border-spacing-2 border-dashed border-gray-200 rounded-md'>
                                <p className='text-gray-700  dark:text-neutral-300'>Status</p>
                                <p className={cn('text-white rounded-md bg-green-600 w-fit px-2 font-semibold',
                                    { 'bg-red-500': appointmentDetails?.status === 'Cancelled', 'bg-yellow-500': appointmentDetails?.status === 'Pending' })}>
                                    {appointmentDetails?.status}
                                </p>
                            </div>

                        </div>


                        <div className="col-span-full grid sm:grid-cols-3 gap-2">
                            <div className='space-y-1 p-2  ring-1 ring-gray-200 dark:ring-gray-700'>
                                <p className='text-gray-700 dark:text-neutral-300'>Shift</p>
                                <p className='text-sm'>{appointmentDetails?.shift}</p>
                            </div>

                            <div className='space-y-1 p-2  ring-1 ring-gray-200 dark:ring-gray-700'>
                                <p className='text-gray-700 dark:text-neutral-300'>Priority</p>
                                <p className='text-sm'>{appointmentDetails?.appointment_priority}</p>
                            </div>

                            <div className='space-y-1 p-2  ring-1 ring-gray-200 dark:ring-gray-700'>
                                <p className='text-gray-700 dark:text-neutral-300'>Symptom Type</p>
                                <p className='text-sm'>{appointmentDetails?.symptom_type}</p>
                            </div>

                            <div className='space-y-1 p-2  ring-1 ring-gray-200 dark:ring-gray-700'>
                                <p className='text-gray-700 dark:text-neutral-300'>Description</p>
                                <p className='text-sm'>{appointmentDetails?.symptom_description}</p>
                            </div>

                            <div className='space-y-1 p-2  ring-1 ring-gray-200 dark:ring-gray-700'>
                                <p className='text-gray-700 dark:text-neutral-300'>Reference</p>
                                <p className='text-sm'>{appointmentDetails?.reference}</p>
                            </div>

                            <div className='space-y-1 p-2  ring-1 ring-gray-200 dark:ring-gray-700'>
                                <p className='text-gray-700 dark:text-neutral-300'>Previous Issue</p>
                                <p className='text-sm'>{appointmentDetails?.previous_medical_issue}</p>
                            </div>

                            <div className='space-y-1 p-2  ring-1 ring-gray-200 dark:ring-gray-700'>
                                <p className='text-gray-700 dark:text-neutral-300'>Payment Mode</p>
                                <p className='text-sm'>{appointmentDetails?.payment_mode}</p>
                            </div>

                            <div className='space-y-1 p-2  ring-1 ring-gray-200 dark:ring-gray-700'>
                                <p className='text-gray-700 dark:text-neutral-300'>Alternative Address</p>
                                <p className='text-sm'>{appointmentDetails?.alternative_address}</p>
                            </div>

                            <div className='space-y-1 p-2  ring-1 ring-gray-200 dark:ring-gray-700'>
                                <p className='text-gray-700 dark:text-neutral-300'>Message</p>
                                <p className='text-sm'>{appointmentDetails?.message}</p>
                            </div>

                            <div className='space-y-1 p-2  ring-1 ring-gray-200 dark:ring-gray-700'>
                                <p className='text-gray-700 dark:text-neutral-300'>Fees</p>
                                <p className='text-sm'>{currencyFormat(Number(appointmentDetails?.fees))}</p>
                            </div>

                            <div className='space-y-1 p-2  ring-1 ring-gray-200 dark:ring-gray-700'>
                                <p className='text-gray-700 dark:text-neutral-300'>Discount</p>
                                <p className='text-sm'>{appointmentDetails?.discount}%</p>
                            </div>

                            <div className='space-y-1 p-2  ring-1 ring-gray-200 dark:ring-gray-700'>
                                <p className='text-gray-700 dark:text-neutral-300'>Net Amount {currencySymbol()}</p>
                                <p className='text-sm'>{currencyFormat(appointmentDetails?.net_amount)}</p>
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
                                <p className='font-semibold text-lg text-gray-900 dark:text-white'>{appointmentDetails?.patient.name}</p>
                                <p className='text-sm text-gray-500'>Patient</p>
                            </div>
                        </div>

                        <div className='space-y-1  p-2  ring-1 ring-gray-200 dark:ring-gray-800'>
                            <p className='text-gray-700 dark:text-neutral-400'>Patient ID</p>
                            <p className='text-sm'>{appointmentDetails?.patientId}</p>
                        </div>

                        <div className='space-y-1  p-2  ring-1 ring-gray-200 dark:ring-gray-800'>
                            <p className='text-gray-700 dark:text-neutral-400'>Age</p>
                            <p className='text-sm'>{appointmentDetails?.patient.age}</p>
                        </div>

                        <div className='space-y-1  p-2  ring-1 ring-gray-200 dark:ring-gray-800'>
                            <p className='text-gray-700 dark:text-neutral-400'>Email</p>
                            <p className='text-sm'>{appointmentDetails?.patient.email}</p>
                        </div>

                        <div className='space-y-1  p-2  ring-1 ring-gray-200 dark:ring-gray-800'>
                            <p className='text-gray-700 dark:text-neutral-400'>Phone</p>
                            <p className='text-sm'>{appointmentDetails?.patient.phone}</p>
                        </div>

                        <div className='space-y-1  p-2  ring-1 ring-gray-200 dark:ring-gray-800'>
                            <p className='text-gray-700 dark:text-neutral-400'>Gender</p>
                            <p className='text-sm'>{appointmentDetails?.patient.gender}</p>
                        </div>

                        <div className='space-y-1  p-2  ring-1 ring-gray-200 dark:ring-gray-800'>
                            <p className='text-gray-700 dark:text-neutral-400'>Blood Group</p>
                            <p className='text-sm'>{appointmentDetails?.patient.blood_group}</p>
                        </div>

                        <div className='space-y-1  p-2  ring-1 ring-gray-200 dark:ring-gray-800'>
                            <p className='text-gray-700 dark:text-neutral-400'>Address</p>
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
                                    <p className='font-semibold text-lg text-gray-900 dark:text-white'>{appointmentDetails?.doctor.name}</p>
                                    <p className='text-sm text-gray-500 '>Doctor</p>
                                </div>
                            </div>

                            <div className='space-y-1 dark:ring-gray-800 p-2  ring-1 ring-gray-200'>
                                <p className='text-gray-700 dark:text-neutral-300'>Doctor ID</p>
                                <p className='text-sm'>{appointmentDetails?.doctorId}</p>
                            </div>

                            <div className='space-y-1 dark:ring-gray-800 p-2  ring-1 ring-gray-200'>
                                <p className='text-gray-700 dark:text-neutral-300'>Department</p>
                                <p className='text-sm'>{appointmentDetails?.doctor.department}</p>
                            </div>

                            <div className='space-y-1 dark:ring-gray-800 p-2  ring-1 ring-gray-200'>
                                <p className='text-gray-700 dark:text-neutral-300'>specialist</p>
                                <p className='text-sm'>{appointmentDetails?.doctor.specialist}</p>
                            </div>

                            <div className='space-y-1 dark:ring-gray-800 p-2  ring-1 ring-gray-200'>
                                <p className='text-gray-700 dark:text-neutral-300'>Gender</p>
                                <p className='text-sm'>{appointmentDetails?.doctor.gender}</p>
                            </div>

                            <div className='space-y-1 dark:ring-gray-800 p-2  ring-1 ring-gray-200'>
                                <p className='text-gray-700 dark:text-neutral-300'>Phone</p>
                                <p className='text-sm'>{appointmentDetails?.doctor.phone}</p>
                            </div>


                        </div>
                    </div>
                </div>

                {/* <div className="h-14 bg-gradient-to-t from-white z-30 w-full absolute bottom-0" /> */}
            </ScrollArea>
        </Dialog>
    )
}

export default AppointmentDetailsModel