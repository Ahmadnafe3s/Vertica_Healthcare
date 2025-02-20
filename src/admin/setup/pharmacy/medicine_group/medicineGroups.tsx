import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Plus, Trash } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import MedicineGroupFrom, { MedicineGroupFromSchema } from './medicineGroupFrom'
import { z } from 'zod'
import { createMedicineGroup, deleteMedicineGroup, geteMedicineGroups } from '../apiHandler'
import { medicineGroup } from '@/types/setupTypes/pharmacy'
import AlertModel from '@/components/alertModel'
import CustomTooltip from '@/components/customTooltip'





const MedicineGroups = () => {

    // credentials
    const itemID = useRef<number>(0)


    // Loaders
    const [isPending, setPending] = useState<boolean>(false)


    // model states
    const [isMedGroupFormVisible, setMedGroupFormVisible] = useState<boolean>(false)
    const [isAlert, setAlert] = useState<boolean>(false)


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


    const onDelete = async () => {
        try {
            setPending(true)
            const data = await deleteMedicineGroup(itemID.current)
            toast.success(data.message)
            fetchMedicineGroups()
        } catch ({ message }: any) {
            toast.error(message);
        } finally {
            setAlert(false)
            setPending(false)
        }
    }


    useEffect(() => {
        fetchMedicineGroups()
    }, [])


    return (
        <section className="flex flex-col gap-y-5 pb-16">

            <div className="flex justify-between">
                <h1 className="text-lg text-gray-800 font-semibold">Groups</h1>
                <Button size='sm' onClick={() => { setMedGroupFormVisible(true) }}>
                    <Plus /> Add Group
                </Button>
            </div>

            <Separator />

            {/* <div className="sm:w-48 space-y-1">
             <p className="text-sm text-gray-700">Search</p>
             <Input type="text" onChange={(e) => { onSearch(e.target.value) }} placeholder="name , category" />
         </div> */}

            {/* <Separator /> */}

            <Table className='border rounded-lg'>
                <TableHeader className='bg-zinc-100'>
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
                            <TableCell>
                                {/* DELETE  */}
                                <CustomTooltip message='DELETE'>
                                    <Trash className="w-4 cursor-pointer  text-gray-600" onClick={async () => {
                                        setAlert(true);
                                        itemID.current = group.id
                                    }} />
                                </CustomTooltip>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>


            {medicineGroups.length < 1 && <p className="text-gray-600">No data found</p>}


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

            {isAlert && (
                <AlertModel
                    isPending={isPending}
                    cancel={() => setAlert(false)}
                    continue={onDelete}
                />
            )}

        </section>
    )
}

export default MedicineGroups