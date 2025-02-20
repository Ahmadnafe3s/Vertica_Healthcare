import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pencil, Plus, Trash } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import SetupVitalForm, { SetupVitalFormSchema } from "./setupVitalForm"
import { SetupVital } from "@/types/setupTypes/vital"
import toast from "react-hot-toast"
import { createSetupVital, deleteSetupVital, getSetupVitalDetails, getSetupVitals, updateSetupVital } from "./apiHandler"
import CustomTooltip from "@/components/customTooltip"
import { z } from "zod"
import LoaderModel from "@/components/loader"
import AlertModel from "@/components/alertModel"


const SetupVitals = () => {

    // credentials
    const itemID = useRef<number>(0)

    // Loaders
    const [loading, setloading] = useState<{ inline: boolean, model: boolean }>({ inline: false, model: false })

    // API states
    const [vitals, setVitals] = useState<SetupVital[]>([])
    const [vitalDetails, setVitalDetails] = useState<SetupVital>()


    // model states
    const [model, setModel] = useState<{ alert: boolean, setupVitalForm: boolean }>({
        alert: false,
        setupVitalForm: false
    })



    const handleSubmit = async (formData: z.infer<typeof SetupVitalFormSchema>) => {
        try {
            setloading(prev => ({ ...prev, inline: true }))
            let data;
            vitalDetails ? (data = await updateSetupVital(vitalDetails.id, formData),
                setVitalDetails(undefined))
                :
                data = await createSetupVital(formData)
            toast.success(data.message)
            fetchSetupVitals()
            setModel(prev => ({ ...prev, setupVitalForm: false }))
        } catch ({ message }: any) {
            toast.error(message)
        } finally { setloading(prev => ({ ...prev, inline: false })) }
    }



    const fetchSetupVitals = async () => {
        try {
            const data = await getSetupVitals()
            setVitals(data)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    const fetchVitalDetails = async (id: number) => {
        try {
            setloading(prev => ({ ...prev, model: true }))
            const data = await getSetupVitalDetails(id)
            setVitalDetails(data)
        } catch ({ message }: any) {
            toast.error(message)
        } finally { setloading(prev => ({ ...prev, model: false })) }
    }


    const onDelete = async () => {
        try {
            setloading(prev => ({ ...prev, inline: true }))
            const data = await deleteSetupVital(itemID.current)
            toast.success(data.message)
            fetchSetupVitals()
        } catch ({ message }: any) {
            toast.error(message)
        } finally {
            setloading(prev => ({ ...prev, inline: false }))
            setModel(prev => ({ ...prev, alert: false }))
        }
    }


    useEffect(() => {
        fetchSetupVitals()
    }, [])


    return (
        <section className="flex flex-col gap-y-5 pb-16 pt-5">

            <div className="flex justify-between">
                <h1 className="text-lg text-gray-800 font-semibold">Vitals</h1>
                <Button size='sm' onClick={() => setModel(rest => ({ ...rest, setupVitalForm: true }))}>
                    <Plus /> Add Vital
                </Button>
            </div>

            <Separator />


            <Table className='border rounded-lg'>
                <TableHeader className='bg-zinc-100'>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Reference Range</TableHead>
                        <TableHead>Unit</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {vitals.map((vital) => (
                        <TableRow>
                            <TableCell>{vital.name}</TableCell>
                            <TableCell>{vital.from} {'- ' + vital.to}</TableCell>
                            <TableCell>{vital.unit}</TableCell>
                            <TableCell className='flex space-x-2'>

                                {/* EDIT */}

                                <CustomTooltip message='EDIT'>
                                    <Pencil className="w-4 cursor-pointer  text-gray-600" onClick={async () => {
                                        await fetchVitalDetails(vital.id)
                                        setModel(prev => ({ ...prev, setupVitalForm: true }))
                                    }} />
                                </CustomTooltip>

                                {/* DELETE  */}

                                <CustomTooltip message='DELETE'>
                                    <Trash className="w-4 cursor-pointer  text-gray-600" onClick={async () => {
                                        setModel(prev => ({ ...prev, alert: true }))
                                        itemID.current = vital.id
                                    }} />
                                </CustomTooltip>

                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>


            {model.setupVitalForm && <SetupVitalForm
                setupVitalDetails={vitalDetails!}
                Submit={handleSubmit}
                isPending={loading.inline}
                onClick={() => { setModel(prev => ({ ...prev, setupVitalForm: false })); setVitalDetails(undefined) }}
            />}

            {/* loader model */}

            {loading.model && <LoaderModel />}

            {model.alert && (
                <AlertModel
                    cancel={() => setModel(prev => ({ ...prev, alert: false }))}
                    continue={onDelete}
                    isPending={loading.inline}
                />
            )}
        </section>

    )
}

export default SetupVitals