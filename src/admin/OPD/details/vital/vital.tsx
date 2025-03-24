import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, SearchX, Trash } from "lucide-react";
import VitalFormModel from "./vitalFormModel";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { createVital, deleteVitals, getVitals, searchVital } from "../../opdApiHandler";
import groupedBYdate from "@/helpers/groupVitals";
import AlertModel from "@/components/alertModel";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { vitalFormSchema } from "@/formSchemas/vitalFormSchema";
import CustomTooltip from "@/components/customTooltip";
import { SetupVital } from "@/types/setupTypes/vital";
import { getSetupVitals } from "@/admin/setup/vitals/apiHandler";
import { VitalType } from "@/types/opd_section/vitals";
import usePermission from "@/authz";
import { useConfirmation } from "@/hooks/useConfirmation";


const Vital = () => {

    // custom hook
    const { hasPermission, loadPermission } = usePermission()
    const { confirm, confirmationProps } = useConfirmation()

    const { patientId, opdId } = useParams()

    const [VITALS, SET_VITALS] = useState<VitalType[]>([])
    const [setupVitals, setSetupVitals] = useState<SetupVital[]>([])

    // pending STate
    const [isPending, setPending] = useState<boolean>(false)


    // models State
    const [vitalForm, setVitalForm] = useState(false)


    // creating vital
    const handleSubmit = async (formData: z.infer<typeof vitalFormSchema>) => {
        try {
            setPending(true)
            const data = await createVital(Number(patientId), opdId!, formData)
            toast.success(data.message)
            setVitalForm(false)
            fetchVitalsList()
        } catch ({ message }: any) {
            toast.error(message)
        } finally {
            setPending(false)
        }
    }


    const fetchVitalsList = async () => {
        try {
            const data = await getVitals(opdId!)
            SET_VITALS(data)
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


    const onDelete = async (id: number) => {
        try {
            const isConfirm = await confirm()
            if (!isConfirm) return null
            const data = await deleteVitals(id)
            toast.success(data.message)
            fetchVitalsList()
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    // this handles filtering by date

    const onSearch = async (date: string) => {
        try {
            const data = await searchVital(opdId!, date)
            SET_VITALS(data)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    useEffect(() => {
        fetchVitalsList()
        fetchSetupVitals()
        loadPermission()
    }, [])


    return (
        <section className="flex flex-col gap-y-5">

            <div className="flex justify-between">
                <h1 className="text-lg text-gray-800 font-semibold">Vitals</h1>
                {hasPermission('create', 'vitals') && (
                    <Button size='sm' onClick={() => { setVitalForm(true) }}>
                        <Plus /> Add Vital
                    </Button>
                )}
            </div>

            <Separator />

            <div className="sm:w-48 space-y-1">
                <p className="text-sm text-gray-700">Search by date</p>
                <Input type="date" onChange={(e) => { onSearch(e.target.value) }} />
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
                    {groupedBYdate(VITALS).map((vital, i) => {
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
                                                    {hasPermission('delete', 'vitals') && (
                                                        <CustomTooltip message="DELETE">
                                                            <Trash className="w-3 text-gray-700 active:scale-95 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                                                                onClick={() => onDelete(detail.id)}
                                                            />
                                                        </CustomTooltip>
                                                    )}
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

            {VITALS.length < 1 && <h1 className='text-gray-900 mt-4 sm:mt-1 font-semibold text-lg flex items-center gap-1'>No data found <SearchX className='h-5 w-5' /></h1>}

            {/* model */}

            {vitalForm && <VitalFormModel
                vitalOptions={setupVitals}
                Submit={handleSubmit}
                isPending={isPending}
                onClick={() => setVitalForm(false)}
            />}


            {/* Alert model */}

            {confirmationProps.isOpen && <AlertModel
                cancel={() => confirmationProps.onCancel()}
                continue={() => confirmationProps.onConfirm()}
            />}

        </section>
    )
}

export default Vital