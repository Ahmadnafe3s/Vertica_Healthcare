import { useState } from 'react'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { createBedFloor, deleteBedFloor, getBedFloors } from '../api-handler'
import { SetupFloorSchema } from './bed-floors'
import { useConfirmation } from '@/hooks/useConfirmation'

export interface FloorType {
    "id": number,
    "name": string,
    "description": string
}


const useFloorHandlers = () => {

    const { confirm , confirmationProps} = useConfirmation()

    const [floors, setFloors] = useState<FloorType[]>([])
    const [isPending, setPending] = useState(false)
    const [form, setForm] = useState(false)



    // performing upsert
    const handleSubmit = async <T extends z.infer<typeof SetupFloorSchema>>(formData: T) => {
        try {
            setPending(true)
            const data = await createBedFloor(formData)
            toast.success(data.message)
            setForm(false)
            fetchFloors()
        } catch ({ message }: any) {
            toast.error(message)
        } finally {
            setPending(false)
        }
    }


    const fetchFloors = async () => {
        try {
            const data = await getBedFloors()
            setFloors(data)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    const onDelete = async (id: number) => {
        try {
            const isConfirm = await confirm()
            if (!isConfirm) return null
            const data = await deleteBedFloor(id)
            toast.success(data.message)
            fetchFloors()
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    return {
        floors,
        isPending,
        form,
        handleSubmit,
        fetchFloors,
        setForm,
        onDelete,
        confirmationProps,
    }
}

export default useFloorHandlers