import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Pencil, Plus, Trash } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import AddChargeCategoryFormModel, { ChargeCategoryFormSchema } from './addChargeCategoryFormModel'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { createChargeCategory, getChargeCategories, getChargeCategoryDetails, updateChargeCategory } from '../chargesAPIhandlers'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'


export interface categoryType {
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


    useEffect(() => {
        fetchChargeCategories()
    }, [])


    return (
        <section className="flex flex-col pb-16 gap-y-5">

            <div className="flex justify-between">
                <h1 className="text-lg text-gray-800 font-semibold">Charge Category</h1>
                <Button variant='outline' size='sm' onClick={() => { setCategroyFormVisible(true) }}>
                    <Plus /> Add Categories
                </Button>
            </div>

            <Separator />

            <Table>
                <TableHeader>
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
                            <TableCell className='space-x-2'>

                                {/* EDIT */}
                                <TooltipProvider delayDuration={200}>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <Pencil className="w-4 cursor-pointer  text-gray-600" onClick={async () => {
                                                await fetchChargeCategoryDetails(category.id);
                                                setCategroyFormVisible(true)
                                            }} />
                                        </TooltipTrigger>
                                        <TooltipContent>Edit</TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>


                                {/* DELETE  */}
                                <TooltipProvider delayDuration={200}>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <Trash className="w-4 cursor-pointer  text-gray-600" onClick={async () => {
                                                setAlert(true);
                                                itemID.current = category.id
                                            }} />
                                        </TooltipTrigger>
                                        <TooltipContent>DELETE</TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>

                            </TableCell>
                        </TableRow>
                    })}
                </TableBody>
            </Table>


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
        </section >

    )
}

export default CategoryList