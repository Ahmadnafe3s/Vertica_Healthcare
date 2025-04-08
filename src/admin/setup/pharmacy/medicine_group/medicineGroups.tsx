import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Plus, } from 'lucide-react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import MedicineGroupFrom, { MedicineGroupFromSchema } from './medicineGroupFrom'
import { z } from 'zod'
import { createMedicineGroup, deleteMedicineGroup, geteMedicineGroups } from '../apiHandler'
import { medicineGroup } from '@/types/setupTypes/pharmacy'
import AlertModel from '@/components/alertModel'
import EmptyList from '@/components/emptyList'
import { useConfirmation } from '@/hooks/useConfirmation'
import PermissionProtectedAction from '@/components/permission-protected-actions'
import PermissionTableActions from '@/components/permission-table-actions'





const MedicineGroups = () => {

    const { confirm, confirmationProps } = useConfirmation()

    // Loaders
    const [isPending, setPending] = useState<boolean>(false)


    // model states
    const [isMedGroupFormVisible, setMedGroupFormVisible] = useState<boolean>(false)


    // API States
    const [medicineGroups, setMedicineGroups] = useState<medicineGroup[]>([])


    const handleSubmit = async (formData: z.infer<typeof MedicineGroupFromSchema>) => {
        try {
            setPending(true)
            const data = await createMedicineGroup(formData)
            toast.success(data.message)
            setMedGroupFormVisible(false)
            fetchMedicineGroups()
        } catch ({ message }: any) {
            toast.error(message);
        } finally {
            setPending(false);
        }
    }


    const fetchMedicineGroups = async () => {
        try {
            const data = await geteMedicineGroups()
            setMedicineGroups(data)
        } catch ({ message }: any) {
            toast.error(message);
        }
    }


    const onDelete = async (id: number) => {
        try {
            const isConfirmed = await confirm()
            if (!isConfirmed) return null
            const data = await deleteMedicineGroup(id)
            toast.success(data.message)
            fetchMedicineGroups()
        } catch ({ message }: any) {
            toast.error(message);
        }
    }


    useEffect(() => {
        fetchMedicineGroups()
    }, [])


    return (
        <section className="flex flex-col gap-y-5 pb-16">

            <div className="flex justify-between">
                <h1 className="text-lgfont-semibold">Groups</h1>
                <PermissionProtectedAction action='create' module='medicine_group'>
                    <Button size='sm' onClick={() => { setMedGroupFormVisible(true) }}>
                        <Plus /> Add Group
                    </Button>
                </PermissionProtectedAction>
            </div>

            <Separator />

            {/* <div className="sm:w-48 space-y-1">
             <p className="text-sm text-gray-700">Search</p>
             <Input type="text" onChange={(e) => { onSearch(e.target.value) }} placeholder="name , category" />
         </div> */}

            {/* <Separator /> */}

            <Table className='border rounded-lg dark:border-gray-800'>
                <TableHeader className='bg-zinc-100 dark:bg-gray-900'>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {medicineGroups.map((group) => (
                        <TableRow key={group.id}>
                            <TableCell>{group.id}</TableCell>
                            <TableCell>{group.name}</TableCell>
                            <TableCell className='flex'>

                                <PermissionTableActions
                                    module='medicine_group'
                                    onDelete={() => onDelete(group.id)}
                                    exclude={{ edit: true }}
                                />

                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>


            <EmptyList length={medicineGroups.length} />


            {/* Form model */}

            {isMedGroupFormVisible && (
                <MedicineGroupFrom
                    Submit={handleSubmit}
                    isPending={isPending}
                    onClick={() => {
                        setMedGroupFormVisible(false)
                    }}
                />
            )}

            {/* alert model */}

            {confirmationProps.isOpen && (
                <AlertModel
                    continue={() => confirmationProps.onConfirm()}
                    cancel={() => confirmationProps.onCancel()}
                />
            )}

        </section>
    )
}

export default MedicineGroups