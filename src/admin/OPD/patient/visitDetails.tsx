import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { getOPD_Details } from "../opdApiHandler";
import { opdDetails } from "@/types/type";
import { UserRound } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";


const VisitDetails = () => {

    const { caseId } = useParams()
    const [OPD_DETAILS, set_OPD_DETAILS] = useState<opdDetails>()




    useEffect(() => {
        try {
            (async function fetchData() {
                const data = await getOPD_Details(Number(caseId))
                set_OPD_DETAILS(data)
                console.log(data);

            })() // IIFE
        } catch ({ message }: any) {
            toast.error(message)
        }
    }, [])




    return (

        // main grid
        <section className="grid lg:grid-cols-2 pb-10 gap-8">

            {/*  grid col 1 */}

            <div className="grid sm:grid-cols-2 gap-2">

                {/* patient name / image */}

                <div className="sm:col-span-2 flex space-x-2 items-center mb-3">

                    {OPD_DETAILS?.appointment.patient.image ?
                        (<div className='w-20 h-20'>
                            <img src={OPD_DETAILS?.appointment.patient.image!} alt="staff img" className='object-cover h-full w-full rounded-full' />
                        </div>)
                        :
                        (<div className='p-3 bg-red-500 rounded-full'>
                            <UserRound className='w-10 h-10 text-white' />
                        </div>)
                    }

                    <div className=''>
                        <p className='font-semibold text-lg text-gray-900'>{OPD_DETAILS?.appointment.patient.name}</p>
                        <p className='text-sm text-gray-500'>ID : {OPD_DETAILS?.appointment.patient.id}</p>
                    </div>
                </div>


                {/* patient Details */}

                <div className='space-y-1 bg-white p-2  ring-1 ring-gray-200 rounded-sm'>
                    <p className='text-gray-700'>Gender</p>
                    <p className='font-semibold'>{OPD_DETAILS?.appointment.patient.gender}</p>
                </div>

                <div className='space-y-1 bg-white p-2  ring-1 ring-gray-200 rounded-sm'>
                    <p className='text-gray-700'>Guardian Name</p>
                    <p className='font-semibold'>{OPD_DETAILS?.appointment.patient.guardian_name}</p>
                </div>

                <div className='space-y-1 bg-white p-2  ring-1 ring-gray-200 rounded-sm'>
                    <p className='text-gray-700'>Age</p>
                    <p className='font-semibold'>{OPD_DETAILS?.appointment.patient.age}</p>
                </div>

                <div className='space-y-1 bg-white p-2  ring-1 ring-gray-200 rounded-sm'>
                    <p className='text-gray-700'>Blood Group</p>
                    <p className='font-semibold'>{OPD_DETAILS?.appointment.patient.blood_group}</p>
                </div>

                <div className='space-y-1 bg-white p-2  ring-1 ring-gray-200 rounded-sm'>
                    <p className='text-gray-700'>Aadhar</p>
                    <p className='font-semibold'>{OPD_DETAILS?.appointment.patient.aadhar}</p>
                </div>

                <div className='space-y-1 bg-white p-2  ring-1 ring-gray-200 rounded-sm'>
                    <p className='text-gray-700'>Phone</p>
                    <p className='font-semibold'>{OPD_DETAILS?.appointment.patient.phone}</p>
                </div>

                <div className='space-y-1 bg-white p-2  ring-1 ring-gray-200 rounded-sm'>
                    <p className='text-gray-700'>Address</p>
                    <p className='font-semibold'>{OPD_DETAILS?.appointment.patient.address}</p>
                </div>

                <div className='space-y-1 bg-white p-2  ring-1 ring-gray-200 rounded-sm'>
                    <p className='text-gray-700'>Alergies</p>
                    <p className='font-semibold'>{OPD_DETAILS?.appointment.patient.alergies}</p>
                </div>

                <Separator className="sm:col-span-full my-8" />


                {/* Case Details */}

                <div className='space-y-1 bg-white p-2  ring-1 ring-gray-200 rounded-sm'>
                    <p className='text-gray-700'>OPD No.</p>
                    <p className='font-semibold'>{OPD_DETAILS?.id}</p>
                </div>

                <div className='space-y-1 bg-white p-2  ring-1 ring-gray-200 rounded-sm'>
                    <p className='text-gray-700'>Case ID</p>
                    <p className='font-semibold'>{OPD_DETAILS?.caseId}</p>
                </div>


                <Separator className="sm:col-span-full my-8" />


                {/* Vital section */}

                <h1 className="sm:col-span-full font-semibold text-gray-800">Vitals</h1>

                {/* Can be add Vitals Here */}

                {OPD_DETAILS?.Vitals.map((measure, i) => {
                    return <div key={i} className='space-y-1 flex justify-between bg-white p-2  ring-1 ring-gray-200 rounded-sm'>
                        <div>
                            <p className='text-gray-700'>{measure.name}</p>
                            <p className='font-semibold'>{measure.value}</p>
                        </div>
                        <div>
                            <p className='text-gray-700'>Date</p>
                            <p className="text-sm text-gray-500">{measure.date}</p>
                        </div>
                    </div>
                })}

                <Separator className="sm:col-span-full my-8" />

                {/* Prescription */}

                <h1 className="sm:col-span-full font-semibold text-gray-800">Findings</h1>


                <Separator className="sm:col-span-full my-8" />

                {/* Symptoms */}

                <h1 className="sm:col-span-full font-semibold text-gray-800">Symptoms</h1>
                <p className="text-sm text-gray-500 sm:col-span-full">{OPD_DETAILS?.appointment.symptom_description}</p>

                <Separator className="sm:col-span-full my-8" />

                {/* Doctors */}

                <h1 className="sm:col-span-full font-semibold text-gray-800">Consultant</h1>

                <div className="sm:col-span-full flex space-x-2 items-center">
                    <div className='w-16 h-16'>
                        <img src={OPD_DETAILS?.appointment.doctor.image ? OPD_DETAILS?.appointment.doctor.image : OPD_DETAILS?.appointment.doctor.gender === 'male' ? '/user.png' : '/female_user.png'} alt="staff img" className='object-cover h-full w-full rounded-lg' />
                    </div>

                    <div className=''>
                        <p className='font-semibold text-lg text-gray-900'>{OPD_DETAILS?.appointment.doctor.name}</p>
                        <p className='text-sm text-gray-500'>ID : {OPD_DETAILS?.appointment.doctor.id}</p>
                    </div>

                </div>

                <Separator className="sm:col-span-full my-8" />

                <h1 className="sm:col-span-full font-semibold text-gray-800">Timeline</h1>

                <Separator className="sm:col-span-full my-8 lg:hidden" />


            </div>


            {/* grid col 2 */}

            <div className="flex flex-col gap-2 overflow-x-auto">

                {/* Medication */}

                <h1 className="font-semibold text-gray-800 mb-2">Medication</h1>

                <Table className="w-full">
                    <TableHeader>
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
                        {OPD_DETAILS?.medication.map((medication, i) => (
                            <TableRow key={i}>
                                <TableCell className="text-gray-800 font-semibold">{medication.date}</TableCell>
                                <TableCell>{medication?.medicine.name}</TableCell>
                                <TableCell>{medication?.medicine.category}</TableCell>
                                <TableCell>{medication.dose}</TableCell>
                                <TableCell>{medication.time}</TableCell>
                                <TableCell className="text-gray-600">{medication.note}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                {OPD_DETAILS?.medication.length! < 1 && <p className="text-sm text-gray-600">No data found</p>}

                <Separator className="sm:col-span-full my-8" />

                {/* Operation */}

                <h1 className="font-semibold text-gray-800 mb-2">Operation</h1>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Reference No</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Operation Name</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>OT Technician</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {OPD_DETAILS?.Operation.map((operation, i) => {
                            return <TableRow key={i}>
                                <TableCell className="text-gray-700">{operation.id}</TableCell>
                                <TableCell className="text-sm">{operation.date}</TableCell>
                                <TableCell>{operation.name}</TableCell>
                                <TableCell>{operation.category}</TableCell>
                                <TableCell>{operation.ot_technician}</TableCell>
                            </TableRow>
                        })}
                    </TableBody>
                </Table>

                {OPD_DETAILS?.Operation.length! < 1 && <p className="text-sm text-gray-600">No data found</p>}


            </div>


        </section>
    )
}

export default VisitDetails