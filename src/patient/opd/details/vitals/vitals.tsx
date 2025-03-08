import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, SearchX } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import groupedBYdate from "@/helpers/groupVitals";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { SetupVital } from "@/types/setupTypes/vital";
import { getSetupVitals } from "@/admin/setup/vitals/apiHandler";
import { VitalType } from "@/types/opd_section/vitals";
import { getVitals } from "@/admin/OPD/opdApiHandler";


const PatientOpdVitals = () => {


    const { opdId } = useParams()

    const [Vitals, setVitals] = useState<VitalType[]>([])
    const [setupVitals, setSetupVitals] = useState<SetupVital[]>([])


    const fetchVitals = async () => {
        try {
            const data = await getVitals(opdId!)
            setVitals(data)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    const fetchSetupVitals = async () => {
        try {
            const data = await getSetupVitals()
            setSetupVitals(data)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }




    // this handles filtering by date

    const onSearch = async (date: string) => {
        // try {
        //     const data = await searchVital(opdId!, date)
        //     SET_VITALS(data)
        // } catch ({ message }: any) {
        //     toast.error(message)
        // }
    }


    useEffect(() => {
        fetchVitals()
        fetchSetupVitals()
    }, [])


    return (
        <section className="flex flex-col gap-y-5 pb-10">

            <div className="flex justify-between items-center">
                <h1 className="text-lg text-gray-800 font-semibold">Vitals</h1>
                <div className="sm:w-48 space-y-1">
                    <Input type="date" className="h-9" onChange={(e) => { onSearch(e.target.value) }} />
                </div>
            </div>

            <Separator />

            <Table className="rounded-lg border">
                <TableHeader className="bg-zinc-100">
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Height (1-200 CM)</TableHead>
                        <TableHead>Weight (kg)</TableHead>
                        <TableHead>BP (mm Hg)</TableHead>
                        <TableHead>Temp (°C)</TableHead>
                        <TableHead>RR (breaths/min)</TableHead>
                        <TableHead>O2 Sat (%)</TableHead>
                        <TableHead>Blood Sugar (mg/dL)</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {groupedBYdate(Vitals).map((vital, i) => {
                        return (
                            <TableRow key={i}>
                                <TableCell>{vital.date}</TableCell>

                                {/* Render each specific value under its respective column */}

                                {setupVitals.map((measure) => {  // Vitals is from select options
                                    const detail = vital.measure.find((item) => item.vital.name === measure.name);

                                    return (
                                        <TableCell key={measure.name}>
                                            {detail ? (
                                                <div className="flex space-x-1 group">
                                                    <span>{detail.vital.name} {detail.value}</span>
                                                </div>
                                            )
                                                : ""} {/* Render the value or an empty string if missing */}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>


            {/* error on emply list */}

            {Vitals.length < 1 && <h1 className='text-gray-900 mt-4 sm:mt-1 font-semibold text-lg flex items-center gap-1'>No data found <SearchX className='h-5 w-5' /></h1>}

        </section>
    )
}


export default PatientOpdVitals