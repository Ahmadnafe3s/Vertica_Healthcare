import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Trash } from "lucide-react"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import AlertModel from "@/components/alertModel"
import { z } from "zod"
import CustomTooltip from "@/components/customTooltip"
import { useConfirmation } from "@/hooks/useConfirmation"
import EmptyList from "@/components/emptyList"
import CreatePathCategory, { CreatePathCategorySchema } from "./create-path-category"
import { createPathologytCategory, deletePathologyCategory, getPathologyCategories } from "../api-handler"
import { PathCategoryType } from "@/types/setupTypes/pathology"




const SetupPathCategories = () => {

    // custom hooks
    const { confirm, confirmationProps } = useConfirmation()

    // Loaders
    const [isPending, setPending] = useState<boolean>(false)


    // model states
    const [isCategoryForm, setCategoryFrom] = useState(false)


    //  api states
    const [categories, setCategories] = useState<PathCategoryType[]>([])



    const handleSubmit = async (formData: z.infer<typeof CreatePathCategorySchema>) => {
        try {
            setPending(true)
            const data = await createPathologytCategory(formData)
            toast.success(data.message)
            setPending(false)
            setCategoryFrom(false)
            fetchCategories()
        } catch ({ message }: any) {
            toast.error(message)
            setPending(false)
        }
    }


    const fetchCategories = async () => {
        try {
            const data = await getPathologyCategories()
            setCategories(data)
        } catch ({ message }: any) {
            toast.error(message)
            setPending(false)
        }
    }


    const onDelete = async (id: number) => {
        try {
            const isConfirmed = await confirm()
            if (!isConfirmed) return null
            const data = await deletePathologyCategory(id)
            toast.success(data.message)
            fetchCategories()
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    useEffect(() => {
        fetchCategories()
    }, [])


    return (
        <section className="flex flex-col pb-16 gap-y-5">

            <div className="flex justify-between">
                <h1 className="text-lg font-semibold">Categories</h1>
                <Button size='sm' onClick={() => { setCategoryFrom(true) }}>
                    <Plus /> Add Category
                </Button>
            </div>

            <Separator />

            <Table className="border rounded-lg dark:border-gray-800">
                <TableHeader className="bg-zinc-100 dark:bg-gray-800">
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {categories.map((category) => {
                        return <TableRow key={category.id}>
                            <TableCell>{category.id}</TableCell>
                            <TableCell>{category.name}</TableCell>

                            <TableCell className='flex space-x-2'>

                                {/* DELETE  */}
                                <CustomTooltip message="DELETE">
                                    <Trash className="w-4 cursor-pointer  text-gray-600 dark:text-gray-400" onClick={() => onDelete(category.id)} />
                                </CustomTooltip>

                            </TableCell>

                        </TableRow>
                    })}
                </TableBody>
            </Table>

            <EmptyList length={categories.length} message="No categories found" />

            {/* Form Model */}

            {isCategoryForm && (
                <CreatePathCategory
                    Submit={handleSubmit}
                    isPending={isPending}
                    onClick={() => { setCategoryFrom(false) }}
                />
            )}


            {/* Alert Model */}
            {confirmationProps.isOpen && (
                <AlertModel
                    cancel={() => confirmationProps.onCancel()}
                    continue={() => confirmationProps.onConfirm()}
                />
            )}



        </section>
    )
}






export default SetupPathCategories