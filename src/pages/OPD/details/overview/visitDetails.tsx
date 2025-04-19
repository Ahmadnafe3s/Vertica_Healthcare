import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { Calendar, Clock, UserRound } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { currencySymbol } from "@/helpers/currencySymbol";
import { currencyFormat } from "@/lib/utils";
import { opdDetails } from "@/types/opd_section/opd";
import PermissionProtectedAction from "@/components/permission-protected-actions";
import { getOPD_Details } from "../../opdApiHandler";




const VisitDetails = () => {

    const { opdId } = useParams()
    const [OPD_DETAILS, set_OPD_DETAILS] = useState<opdDetails>()


    const fetchOpdDetails = async () => {
        try {
            const data = await getOPD_Details(opdId!)
            set_OPD_DETAILS(data)
            console.log(data);

        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    useEffect(() => {
        fetchOpdDetails()
    }, [])



    return (

        // main grid
        <section className="grid lg:grid-cols-2 pb-10 gap-8">

            {/*  grid col 1 */}

            <div className="grid sm:grid-cols-2 gap-2">

                {/* patient name / image */}

                <div className="sm:col-span-2 flex space-x-2 items-center mb-3">

                    {OPD_DETAILS?.appointment?.patient?.image ?
                        (<div className='w-20 h-20'>
                            <img src={OPD_DETAILS.appointment.patient.image!} alt="staff img" className='object-cover h-full w-full rounded-full' />
                        </div>)
                        :
                        (<div className='p-3 bg-red-500 rounded-full'>
                            <UserRound className='w-10 h-10 text-white' />
                        </div>)
                    }

                    <div className=''>
                        <p className='font-semibold text-lg text-gray-900 dark:text-white'>{OPD_DETAILS?.appointment?.patient.name}</p>
                        <p className='text-sm text-gray-500'>ID : {OPD_DETAILS?.appointment?.patient.id}</p>
                    </div>
                </div>


                {/* patient Details */}

                <div className='space-y-1  p-2  ring-1 ring-gray-200 dark:ring-gray-700 rounded-sm'>
                    <p className='text-gray-700 dark:text-neutral-300'>Gender</p>
                    <p className='font-semibold'>{OPD_DETAILS?.appointment?.patient.gender}</p>
                </div>

                <div className='space-y-1  p-2  ring-1 ring-gray-200 dark:ring-gray-700 rounded-sm'>
                    <p className='text-gray-700 dark:text-neutral-300'>Guardian Name</p>
                    <p className='font-semibold'>{OPD_DETAILS?.appointment?.patient.guardian_name}</p>
                </div>

                <div className='space-y-1  p-2  ring-1 ring-gray-200 dark:ring-gray-700 rounded-sm'>
                    <p className='text-gray-700 dark:text-neutral-300'>Age</p>
                    <p className='font-semibold'>{OPD_DETAILS?.appointment?.patient.age}</p>
                </div>

                <div className='space-y-1  p-2  ring-1 ring-gray-200 dark:ring-gray-700 rounded-sm'>
                    <p className='text-gray-700 dark:text-neutral-300'>Blood Group</p>
                    <p className='font-semibold'>{OPD_DETAILS?.appointment?.patient.blood_group}</p>
                </div>

                <div className='space-y-1  p-2  ring-1 ring-gray-200 dark:ring-gray-700 rounded-sm'>
                    <p className='text-gray-700 dark:text-neutral-300'>Aadhar</p>
                    <p className='font-semibold'>{OPD_DETAILS?.appointment?.patient.aadhar}</p>
                </div>

                <div className='space-y-1  p-2  ring-1 ring-gray-200 dark:ring-gray-700 rounded-sm'>
                    <p className='text-gray-700 dark:text-neutral-300'>Phone</p>
                    <p className='font-semibold'>{OPD_DETAILS?.appointment?.patient.phone}</p>
                </div>

                <div className='space-y-1  p-2  ring-1 ring-gray-200 dark:ring-gray-700 rounded-sm'>
                    <p className='text-gray-700 dark:text-neutral-300'>Address</p>
                    <p className='font-semibold'>{OPD_DETAILS?.appointment?.patient.address}</p>
                </div>

                <div className='space-y-1  p-2  ring-1 ring-gray-200 dark:ring-gray-700 rounded-sm'>
                    <p className='text-gray-700 dark:text-neutral-300'>Alergies</p>
                    <p className='font-semibold'>{OPD_DETAILS?.appointment?.patient.alergies}</p>
                </div>

                <Separator className="sm:col-span-full my-8" />


                {/* Case Details */}

                <div className='space-y-1 p-2  ring-1 ring-gray-200 dark:ring-gray-700 rounded-sm'>
                    <p className='text-gray-700 dark:text-neutral-300'>OPD No.</p>
                    <p className='font-semibold'>{OPD_DETAILS?.id}</p>
                </div>

                <Separator className="sm:col-span-full my-8" />


                {/* Vital section */}

                <h1 className="sm:col-span-full font-semibold text-gray-800 dark:text-neutral-100">Vitals</h1>

                {/* Can be add Vitals Here */}

                {OPD_DETAILS?.Vitals?.map((measure, i) => {
                    return <div key={i} className='space-y-1 flex justify-between p-2  ring-1 ring-gray-200 dark:ring-gray-700 rounded-sm'>
                        <div>
                            <p className='text-gray-700 dark:text-gray-300'>{measure.vital?.name}</p>
                            <p className='font-semibold'>{measure?.value}</p>
                        </div>
                        <div>
                            <p className='text-gray-700 dark:text-gray-300'>Date</p>
                            <p className="text-sm text-gray-500">{measure?.date}</p>
                        </div>
                    </div>
                })}


                <Separator className="sm:col-span-full my-8" />

                {/* Symptoms */}

                <h1 className="sm:col-span-full font-semibold text-gray-800 dark:text-neutral-100">Symptoms</h1>
                <p className="text-sm text-gray-500 sm:col-span-full">{OPD_DETAILS?.appointment?.symptom_description}</p>

                <Separator className="sm:col-span-full my-8" />

                {/* Doctors */}

                <h1 className="sm:col-span-full font-semibold text-gray-800 dark:text-neutral-100">Consultant</h1>

                <div className="sm:col-span-full flex space-x-2 items-center">
                    <div className='w-16 h-16'>
                        <img src={OPD_DETAILS?.appointment?.doctor.image ? OPD_DETAILS?.appointment?.doctor.image : OPD_DETAILS?.appointment?.doctor.gender === 'male' ? '/user.png' : '/female_user.png'} alt="staff img" className='object-cover h-full w-full rounded-lg' />
                    </div>

                    <div className=''>
                        <p className='font-semibold text-lg text-gray-900 dark:text-white'>{OPD_DETAILS?.appointment?.doctor.name}</p>
                        <p className='text-sm text-gray-500'>ID : {OPD_DETAILS?.appointment?.doctor.id}</p>
                    </div>

                </div>

                <Separator className="sm:col-span-full my-8" />


                {/* Timeline */}

                <h1 className="sm:col-span-full font-semibold mb-2 text-gray-800 dark:text-neutral-100">Timeline</h1>

                {OPD_DETAILS?.timelines?.length! > 0 ? (<ul className="sm:col-span-full relative before:absolute space-y-5 before:w-1 w-64 sm:w-[400px] mx-auto gap-3 before:h-full before:bg-gray-300 before:top-0 before:block">


                    {OPD_DETAILS?.timelines?.map((timeline, i) => {
                        return <li className="space-y-4" key={i}>

                            {/* Time section */}
                            <span className="relative  text-sm my-2 -top-1 bg-slate-500 -left-[10%] sm:-left-[8%] text-white py-1 px-3 rounded-md">{timeline.date}</span>

                            <div className="relative flex items-center space-x-3 -ml-3 z-10">

                                {/* Calendor section */}
                                <div className="p-1.5 bg-slate-500 rounded-full ">
                                    <span ><Calendar className="w-4 h-4 text-white" /></span>
                                </div>

                                <div className="space-y-2 flex-1 border-2 border-dashed border-gray-200 dark:border-gray-500 p-2 rounded-lg">

                                    <p className=" font-semibold text-gray-800 dark:text-neutral-100">{timeline.title}</p>

                                    <Separator />
                                    {/* Description */}
                                    <p className="text-sm text-gray-700 dark:text-neutral-400">{timeline.description}</p>

                                </div>
                            </div>
                        </li>
                    })}

                    {/* Static Secttion */}

                    <li className="relative flex items-center space-x-2 -ml-3 z-10">
                        <div className="p-1.5 bg-slate-400 rounded-full">
                            <Clock className="w-4 h-4 text-white" />
                        </div>
                    </li>
                </ul>)
                    :
                    // error message
                    <h1 className="text-sm text-gray-600">No data found</h1>
                }

                <Separator className="sm:col-span-full my-8 lg:hidden" />

            </div>







            {/* grid col 2 */}

            <div className="flex flex-col gap-2 overflow-x-auto">

                {/* Medication */}

                <PermissionProtectedAction action="view" module="medication">
                    <h1 className="font-semibold text-gray-800 dark:text-neutral-100 mb-2">Medication</h1>

                    <Table className="rounded-lg border dark:border-gray-800 w-full">
                        <TableHeader className="bg-slate-100 dark:bg-slate-900 ">
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Medicine Name</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Dose</TableHead>
                                <TableHead>Time</TableHead>
                                <TableHead>Note</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {OPD_DETAILS?.medications?.map((medication, i) => (
                                <TableRow key={i}>
                                    <TableCell className="text-gray-800 dark:text-neutral-100 whitespace-nowrap">{medication.date}</TableCell>
                                    <TableCell>{medication?.medicine.name}</TableCell>
                                    <TableCell>{medication?.category.name}</TableCell>
                                    <TableCell>{medication.dose}</TableCell>
                                    <TableCell>{medication.time}</TableCell>
                                    <TableCell className="text-gray-600 dark:text-gray-400">{medication.note}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>


                    {OPD_DETAILS?.medications?.length! < 1 && <p className="text-sm text-gray-600">No data found</p>}

                    <Separator className="sm:col-span-full my-8" />

                </PermissionProtectedAction>

                {/* Operation */}

                <PermissionProtectedAction action="view" module="operation">
                    <h1 className="font-semibold text-gray-800 dark:text-neutral-100 mb-2">Operation</h1>

                    <Table className="rounded-lg border dark:border-gray-800">
                        <TableHeader className="bg-slate-100 dark:bg-slate-900 ">
                            <TableRow>
                                <TableHead>Reference No</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Operation Name</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>OT Technician</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {OPD_DETAILS?.Operations?.map((operation, i) => {
                                return <TableRow key={i}>
                                    <TableCell className="text-gray-700">{operation.id}</TableCell>
                                    <TableCell className="text-sm">{operation.date}</TableCell>
                                    <TableCell>{operation.operationName.name}</TableCell>
                                    <TableCell>{operation.operationCategory.name}</TableCell>
                                    <TableCell>{operation.ot_technician}</TableCell>
                                </TableRow>
                            })}
                        </TableBody>
                    </Table>

                    {OPD_DETAILS?.Operations?.length! < 1 && <p className="text-sm text-gray-600">No data found</p>}

                    <Separator className="sm:col-span-full my-8" />
                </PermissionProtectedAction>


                {/* Charges */}

                <PermissionProtectedAction action="view" module="charges">
                    <h1 className="font-semibold text-gray-800 dark:text-neutral-100 mb-2">Charges</h1>

                    <Table className="rounded-lg border dark:border-gray-800">
                        <TableHeader className="bg-slate-100 dark:bg-slate-900">
                            <TableRow>
                                <TableHead>Charge Date</TableHead>
                                <TableHead>Charge Name</TableHead>
                                <TableHead>Std Charge {currencySymbol()}</TableHead>
                                <TableHead>TPA {currencySymbol()}</TableHead>
                                <TableHead>Net Amount {currencySymbol()}</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {OPD_DETAILS?.charges?.map((charge, i) => {
                                return <TableRow key={i}>
                                    <TableCell className="whitespace-nowrap">{charge.date}</TableCell>
                                    <TableCell>{charge.chargeNames.name}</TableCell>
                                    <TableCell>{currencyFormat(charge.standard_charge)}</TableCell>
                                    <TableCell>{currencyFormat(charge.tpa)}</TableCell>
                                    <TableCell>{currencyFormat(charge.net_amount)}</TableCell>
                                </TableRow>
                            })}
                        </TableBody>
                    </Table>

                    {OPD_DETAILS?.charges?.length! < 1 && <p className="text-sm text-gray-600">No data found</p>}

                    <Separator className="sm:col-span-full my-8" />
                </PermissionProtectedAction>


                {/* Payments */}

                <PermissionProtectedAction action="view" module="payments">
                    <h1 className="font-semibold text-gray-800 dark:text-neutral-100 mb-2">Payments</h1>

                    <Table className="rounded-lg border dark:border-gray-800">
                        <TableHeader className="bg-slate-100 dark:bg-slate-900">
                            <TableRow>
                                <TableHead>Transaction ID</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Payment Mode</TableHead>
                                <TableHead>Paid Amount {currencySymbol()}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {OPD_DETAILS?.Payments?.map((payment) => {
                                return <TableRow key={payment.id}>
                                    <TableCell className="font-semibold">{payment.id}</TableCell>
                                    <TableCell className="whitespace-nowrap">{payment.date}</TableCell>
                                    <TableCell >{payment.payment_mode}</TableCell>
                                    <TableCell >{currencyFormat(payment.amount)}</TableCell>
                                </TableRow>
                            })}
                        </TableBody>
                    </Table>

                    {OPD_DETAILS?.Payments?.length! < 1 && <p className="text-sm text-gray-600">No data found</p>}
                </PermissionProtectedAction>
            </div>
        </section>
    )
}

export default VisitDetails