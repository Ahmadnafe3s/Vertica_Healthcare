import { operationFormSchema } from "@/formSchemas/addOperationFormSchema"
import { useConfirmation } from "@/hooks/useConfirmation"
import { operationDetailsType, PaginatedOperations } from "@/types/opd_section/operationType"
import { Params } from "@/types/type"
import { useState } from "react"
import toast from "react-hot-toast"
import { useParams } from "react-router-dom"
import { z } from "zod"
import { createOperation, deleteOperation, getOperation_Details, getOperations, updateOperation } from "../../opdApiHandler"



const useOperationHandlers = (params: Params) => {

    const { opdId, ipdId } = useParams()
    const { confirm, confirmationProps } = useConfirmation()
    const [isPending, setPending] = useState(false)
    const [form, setForm] = useState(false)
    const [operations, setOperations] = useState<PaginatedOperations>({ data: [], total_pages: 1 })
    const [current, setCurrent] = useState<operationDetailsType | undefined>(undefined)



    const handleSubmit = async (formData: z.infer<typeof operationFormSchema>) => {
        try {
            setPending(true)
            let data;
            current ? (
                data = await updateOperation(current.id, formData),
                setCurrent(undefined)
            ) : (data = await createOperation(formData, { opdId, ipdId }))

            toast.success(data.message)
            fetchOperations() // refetching list
            setForm(false)
        } catch ({ message }: any) {
            toast.error(message)
        } finally {
            setPending(false)
        }
    }


    const fetchOperations = async () => {
        try {
            const data = await getOperations({ ...params, opdId, ipdId })
            setOperations(data)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    const onDelete = async (id: string) => {
        try {
            const isConfirm = await confirm()
            if (!isConfirm) return null
            const data = await deleteOperation(id)
            toast.success(data.message)
            fetchOperations()
        } catch ({ message }: any) {
            toast.error(message)
        }
    }

    const fetchOperationDetails = async (id: string) => {
        try {
            setPending(true)
            const data = await getOperation_Details(id)
            setCurrent(data)
        } catch ({ message }: any) {
            toast.error(message)
        } finally { setPending(false) }
    }


    return {
        operations,
        getOperations: fetchOperations,
        current,
        setCurrent,
        getDetails: fetchOperationDetails,
        isPending,
        form,
        setForm,
        handleSubmit,
        onDelete,
        confirmationProps
    }
}

export default useOperationHandlers