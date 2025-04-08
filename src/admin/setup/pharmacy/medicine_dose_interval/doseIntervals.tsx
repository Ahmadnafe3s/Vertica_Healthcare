import { doseInterval } from '@/types/setupTypes/pharmacy'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { createDoseInterval, deleteDoseInterval, getDoseIntervals } from '../apiHandler'
import { z } from 'zod'
import DoseIntervalForm, { DoseIntervalFormSchema } from './doseIntervalForm'
import { Button } from '@/components/ui/button'
import { Plus, } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import AlertModel from '@/components/alertModel'
import EmptyList from '@/components/emptyList'
import { useConfirmation } from '@/hooks/useConfirmation'
import PermissionProtectedAction from '@/components/permission-protected-actions'
import PermissionTableActions from '@/components/permission-table-actions'



const DoseIntervals = () => {

    const { confirm, confirmationProps } = useConfirmation()

    // Loaders
    const [isPending, setPending] = useState<boolean>(false)

    const [form, setForm] = useState(false)

    // API States
    const [doseIntervals, setDoseIntervals] = useState<doseInterval[]>([])


    const handleSubmit = async (formData: z.infer<typeof DoseIntervalFormSchema>) => {
        try {
            setPending(true)
            const data = await createDoseInterval(formData)
            toast.success(data.message)
            setForm(false)
            fetchDoseIntervals()
        } catch ({ message }: any) {
            toast.error(message);
        } finally {
            setPending(false);
        }
    }


    const onDelete = async (id: number) => {
        try {
            const isConfirmed = await confirm()
            if (!isConfirmed) return null
            const data = await deleteDoseInterval(id)
            toast.success(data.message)
            fetchDoseIntervals()
        } catch ({ message }: any) {
            toast.error(message);
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
                <h1 className="text-lg font-semibold">Dose Intervals</h1>
                <PermissionProtectedAction action='create' module='dose_interval'>
                    <Button size='sm' onClick={() => setForm(true)}>
                        <Plus /> Add Interval
                    </Button>
                </PermissionProtectedAction>
            </div>

            <Separator />


            <Table className='rounded-lg border dark:border-gray-800'>
                <TableHeader className='bg-zinc-100 dark:bg-gray-800'>
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
                            <TableCell className='flex'>

                                <PermissionTableActions
                                    module='dose_interval'
                                    onDelete={() => onDelete(Interval.id)}
                                    exclude={{ edit: true }}
                                />

                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>


            <EmptyList length={doseIntervals.length} />


            {/* Models */}

            {form && (
                <DoseIntervalForm
                    Submit={handleSubmit}
                    isPending={isPending}
                    onClick={() => setForm(false)}
                />
            )}

            {confirmationProps.isOpen && (
                <AlertModel
                    continue={() => confirmationProps.onConfirm()}
                    cancel={() => confirmationProps.onCancel()}
                />
            )}
        </section>
    )
}

export default DoseIntervals