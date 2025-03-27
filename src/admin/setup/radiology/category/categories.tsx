import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Trash } from "lucide-react"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import AlertModel from "@/components/alertModel"
import { z } from "zod"
import CustomTooltip from "@/components/customTooltip"
import { RadioCategoryType } from "@/types/setupTypes/radiology"
import CreateRadioCategory, { CreateRadioCategorySchema } from "./createRadioCategory"
import { useConfirmation } from "@/hooks/useConfirmation"
import { createRadiologytCategory, deleteRadiologyCategory, getRadiologyCategories } from "../ApiHandlers"



const RadioCategories = () => {

    // custom hooks
    const { confirm, confirmationProps } = useConfirmation()

    // Loaders
    const [isPending, setPending] = useState<boolean>(false)


    // model states
    const [isCategoryForm, setCategoryFrom] = useState(false)


    //  api states
    const [categories, setCategories] = useState<RadioCategoryType[]>([])



    const handleSubmit = async (formData: z.infer<typeof CreateRadioCategorySchema>) => {
        try {
            setPending(true)
            const data = await createRadiologytCategory(formData)
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
            const data = await getRadiologyCategories()
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
            const data = await deleteRadiologyCategory(id)
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
                <h1 className="text-lg text-gray-800 font-semibold">Categories</h1>
                <Button size='sm' onClick={() => { setCategoryFrom(true) }}>
                    <Plus /> Add Category
                </Button>
            </div>

            <Separator />

            <Table className="border rounded-lg">
                <TableHeader className="bg-zinc-100">
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
                                    <Trash className="w-4 cursor-pointer  text-gray-600" onClick={() => onDelete(category.id)} />
                                </CustomTooltip>

                            </TableCell>

                        </TableRow>
                    })}
                </TableBody>
            </Table>

            {categories.length === 0 && <p className="text-center text-sm h-40 flex items-center justify-center text-gray-500">No categories found</p>}

            {/* Form Model */}

            {isCategoryForm && (
                <CreateRadioCategory
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





export default RadioCategories