import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Pencil, Plus, Trash } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import AddChargeCategoryFormModel, { ChargeCategoryFormSchema } from './addChargeCategoryFormModel'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { createChargeCategory, deleteChargeCategory, getChargeCategories, getChargeCategoryDetails, updateChargeCategory } from '../chargesAPIhandlers'
import AlertModel from '@/components/alertModel'
import CustomTooltip from '@/components/customTooltip'
import LoaderModel from '@/components/loader'
import EmptyList from '@/components/emptyList'
import PermissionProtectedAction from '@/components/permission-protected-actions'
import PermissionTableActions from '@/components/permission-table-actions'
import { useConfirmation } from '@/hooks/useConfirmation'


export interface categoryType {
    [x: string]: any
    id: number,
    chargeTypeId: string,
    chargeType: {
        charge_type: string
    },
    category: string,
    description: string
}


const CategoryList = () => {

    // credentials
    const itemID = useRef<number>(0)

    // my custom hook
    const { confirm, confirmationProps } = useConfirmation()

    // Loaders
    const [isPending, setPending] = useState<boolean>(false)


    // model states
    const [isCategroyFormVisible, setCategroyFormVisible] = useState<boolean>(false)
    const [isAlert, setAlert] = useState<boolean>(false)
    const [loaderModel, setLoaderModel] = useState<boolean>(false)

    // API States
    const [categoryDetails, setCategoryeDetails] = useState<categoryType | undefined>(undefined)
    const [chargeCategories, setchargeCategories] = useState<categoryType[]>([])



    const handleSubmit = async (formData: z.infer<typeof ChargeCategoryFormSchema>) => {
        try {
            setPending(true)
            let data;
            if (categoryDetails) {
                data = await updateChargeCategory(categoryDetails.id, formData)
            } else {
                data = await createChargeCategory(formData)
            }
            setPending(false)
            toast.success(data.message)
            fetchChargeCategories()
            setCategroyFormVisible(false)
        } catch ({ message }: any) {
            toast.error(message)
            setPending(false)
        }
    }


    // Fetching list
    const fetchChargeCategories = async () => {
        try {
            const data = await getChargeCategories()
            setchargeCategories(data)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    const fetchChargeCategoryDetails = async (id: number) => {
        try {
            setLoaderModel(true)
            const data = await getChargeCategoryDetails(id)
            setCategoryeDetails(data)
            setLoaderModel(false)
            setCategroyFormVisible(false)
            fetchChargeCategories()
        } catch ({ message }: any) {
            toast.error(message)
            setLoaderModel(false)
        }
    }


    const onDelete = async (id: number) => {
        try {
            const isConfirmed = await confirm()
            if (!isConfirmed) return null
            const data = await deleteChargeCategory(id);
            toast.success(data.message)
            fetchChargeCategories()
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    useEffect(() => {
        fetchChargeCategories()
    }, [])


    return (
        <section className="flex flex-col pb-16 gap-y-5">

            <div className="flex justify-between">
                <h1 className="text-lg  font-semibold">Charge Category</h1>

                <PermissionProtectedAction action="create" module="charge_category">
                    <Button size='sm' onClick={() => { setCategroyFormVisible(true) }}>
                        <Plus /> Add Categories
                    </Button>
                </PermissionProtectedAction>
            </div>

            <Separator />

            <Table className="rounded-lg border dark:border-gray-800">
                <TableHeader className='bg-zinc-100 dark:bg-gray-800'>
                    <TableRow>
                        <TableHead >Name</TableHead>
                        <TableHead >Charge Type</TableHead>
                        <TableHead >Description</TableHead>
                        <TableHead >Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {chargeCategories.map((category) => {
                        return <TableRow key={category.id}>
                            <TableCell>{category.category}</TableCell>
                            <TableCell>{category.chargeType.charge_type}</TableCell>
                            <TableCell>{category.description}</TableCell>
                            <TableCell className='flex space-x-2'>
                                {/* has actions */}
                                <PermissionTableActions
                                    module='charge_category'
                                    onEdit={async () => {
                                        await fetchChargeCategoryDetails(category.id);
                                        setCategroyFormVisible(true)
                                    }}
                                    onDelete={() => onDelete(category.id)}
                                />
                            </TableCell>
                        </TableRow>
                    })}
                </TableBody>
            </Table>

            <EmptyList length={chargeCategories.length} />

            {/* Models */}

            {/* Form Model */}
            {
                isCategroyFormVisible && (
                    <AddChargeCategoryFormModel
                        Submit={handleSubmit}
                        isPending={isPending}
                        categoryDetails={categoryDetails!}
                        onClick={() => { setCategroyFormVisible(false); setCategoryeDetails(undefined) }}
                    />
                )
            }

            {/* Alert Model */}

            {confirmationProps.isOpen && (
                <AlertModel
                    continue={() => { confirmationProps.onConfirm() }}
                    cancel={() => { confirmationProps.onCancel() }}
                />
            )}

            {loaderModel && <LoaderModel />}
        </section >

    )
}

export default CategoryList