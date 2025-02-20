import { doseInterval } from '@/types/setupTypes/pharmacy'
import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { createDoseInterval, deleteDoseInterval, getDoseIntervals } from '../apiHandler'
import { z } from 'zod'
import DoseIntervalForm, { DoseIntervalFormSchema } from './doseIntervalForm'
import { Button } from '@/components/ui/button'
import { Plus, Trash } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import AlertModel from '@/components/alertModel'
import CustomTooltip from '@/components/customTooltip'

const DoseIntervals = () => {

    // credentials
    const itemID = useRef<number>(0)


    // Loaders
    const [isPending, setPending] = useState<boolean>(false)


    // model states
    const [model, setModel] = useState<{ alert: boolean, doseIntervalForm: boolean }>({
        alert: false,
        doseIntervalForm: false
    })


    // API States
    const [doseIntervals, setDoseIntervals] = useState<doseInterval[]>([])



    const handleSubmit = async (formData: z.infer<typeof DoseIntervalFormSchema>) => {
        try {
            setPending(true)
            const data = await createDoseInterval(formData)
            toast.success(data.message)
            setModel({ ...model, doseIntervalForm: false })
            fetchDoseIntervals()
        } catch ({ message }: any) {
            toast.error(message);
        } finally {
            setPending(false);
        }
    }


    const onDelete = async () => {
        try {
            setPending(true)
            const data = await deleteDoseInterval(itemID.current)
            toast.success(data.message)
            fetchDoseIntervals()
        } catch ({ message }: any) {
            toast.error(message);
        } finally {
            setPending(false);
            setModel(rest => ({ ...rest, alert: false }))
        }
    }


    const fetchDoseIntervals = async () => {
        try {
            const data = await getDoseIntervals()
            setDoseIntervals(data)
        } catch ({ message }: any) {
            toast.error(message);
        }
    }


    useEffect(() => {
        fetchDoseIntervals()
    }, [])


    return (
        <section className="flex flex-col gap-y-5 pb-16">

            <div className="flex justify-between">
                <h1 className="text-lg text-gray-800 font-semibold">Dose Intervals</h1>
                <Button size='sm' onClick={() => setModel(rest => ({ ...rest, doseIntervalForm: true }))}>
                    <Plus /> Add Interval
                </Button>
            </div>

            <Separator />


            <Table className='rounded-lg border'>
                <TableHeader className='bg-zinc-100'>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Interval</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {doseIntervals.map((Interval) => (
                        <TableRow key={Interval.id}>
                            <TableCell>{Interval.id}</TableCell>
                            <TableCell>{Interval.interval}</TableCell>
                            <TableCell>
                                {/* DELETE  */}
                                <CustomTooltip message='DELETE'>
                                    <Trash className="w-4 cursor-pointer  text-gray-600" onClick={async () => {
                                        setModel(rest => ({ ...rest, alert: true }))
                                        itemID.current = Interval.id
                                    }} />
                                </CustomTooltip>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>


            {doseIntervals.length < 1 && <p className="text-gray-600">No data found</p>}


            {/* Models */}

            {model.doseIntervalForm && (
                <DoseIntervalForm
                    Submit={handleSubmit}
                    isPending={isPending}
                    onClick={() => setModel(rest => ({ ...rest, doseIntervalForm: false }))}
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

export default DoseIntervals