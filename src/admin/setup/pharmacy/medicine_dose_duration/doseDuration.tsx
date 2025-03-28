import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { doseDuration } from "@/types/setupTypes/pharmacy"
import { Plus, Trash } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import toast from "react-hot-toast"
import DoseDurationForm from "./doseDurationForm"
import { createDoseDuration, deleteDoseDuration, getDoseDurations } from "../apiHandler"
import AlertModel from "@/components/alertModel"
import CustomTooltip from "@/components/customTooltip"
import EmptyList from "@/components/emptyList"

const DoseDuration = () => {

    // credentials
    const itemID = useRef<number>(0)


    // Loaders
    const [isPending, setPending] = useState<boolean>(false)


    // model states
    const [model, setModel] = useState<{ alert: boolean, doseDurationForm: boolean }>({
        alert: false,
        doseDurationForm: false
    })


    // API States
    const [doseDurations, setDoseDurations] = useState<doseDuration[]>([])



    const handleSubmit = async (formData: any) => {
        try {
            setPending(true)
            const data = await createDoseDuration(formData)
            toast.success(data.message)
            setModel({ ...model, doseDurationForm: false })
            fetchDoseDurations()
        } catch ({ message }: any) {
            toast.error(message);
        } finally {
            setPending(false);
        }
    }


    const onDelete = async () => {
        try {
            setPending(true)
            const data = await deleteDoseDuration(itemID.current)
            toast.success(data.message)
            fetchDoseDurations()
        } catch ({ message }: any) {
            toast.error(message);
        } finally {
            setPending(false);
            setModel(rest => ({ ...rest, alert: false }))
        }
    }



    const fetchDoseDurations = async () => {
        try {
            const data = await getDoseDurations()
            setDoseDurations(data)
        } catch ({ message }: any) {
            toast.error(message);
        }
    }


    useEffect(() => {
        fetchDoseDurations()
    }, [])


    return (
        <section className="flex flex-col gap-y-5 pb-16">

            <div className="flex justify-between">
                <h1 className="text-lg font-semibold">Dose Durations</h1>
                <Button size='sm' onClick={() => setModel({ ...model, doseDurationForm: true })
                }>
                    <Plus /> Add Duration
                </Button>
            </div>

            <Separator />

            <Table className="rounded-lg border dark:border-gray-800">
                <TableHeader className='bg-zinc-100 dark:bg-gray-800'>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {doseDurations.map((doseDuration) => (
                        <TableRow key={doseDuration.id}>
                            <TableCell>{doseDuration.id}</TableCell>
                            <TableCell>{doseDuration.duration}</TableCell>
                            <TableCell>
                                {/* DELETE  */}
                                <CustomTooltip message="DELETE">
                                    <Trash className="w-4 cursor-pointer  text-gray-600 dark:text-gray-400" onClick={async () => {
                                        setModel(rest => ({ ...rest, alert: true }))
                                        itemID.current = doseDuration.id
                                    }} />
                                </CustomTooltip>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>


            <EmptyList length={doseDurations.length} />


            {/* Models */}

            {model.doseDurationForm && (
                <DoseDurationForm
                    isPending={isPending}
                    Submit={handleSubmit}
                    onClick={() => setModel(rest => ({ ...rest, doseDurationForm: false }))}
                />
            )}

            {model.alert && (
                <AlertModel
                    continue={onDelete}
                    isPending={isPending}
                    cancel={() => setModel(rest => ({ ...rest, alert: false }))}
                />
            )}

        </section>
    )
}

export default DoseDuration