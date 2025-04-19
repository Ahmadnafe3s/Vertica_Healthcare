import { chargeFormSchema } from "@/formSchemas/chargeFormSchema"
import { useConfirmation } from "@/hooks/useConfirmation"
import { ChargeDetailsType, ChargeListType } from "@/types/opd_section/charges"
import { Params } from "@/types/type"
import { useState } from "react"
import toast from "react-hot-toast"
import { useParams } from "react-router-dom"
import { z } from "zod"
import { createCharges, deleteCharge, getChargeDetails, getCharges, updateCharge } from "../../opdApiHandler"

const useChargeHandlers = (params: Params) => {

    const { opdId, ipdId } = useParams()
    const { confirm, confirmationProps } = useConfirmation()
    const [isPending, setPending] = useState(false)
    const [form, setForm] = useState(false)
    const [charges, setCharges] = useState<ChargeListType>({ data: [], total_pages: 1 })
    const [current, setCurrent] = useState<ChargeDetailsType | null>(null)


    // handling create and update both
    const handleSubmit = async (formData: z.infer<typeof chargeFormSchema>) => {
        try {
            setPending(true)
            let data;
            current ? (data = await updateCharge(current.id, formData), setCurrent(null))
                :
                (data = await createCharges(formData, { opdId, ipdId }))

            toast.success(data.message)
            fetchCharges()
            setForm(false)
        } catch ({ message }: any) {
            toast.error(message)
        } finally {
            setPending(false)
        }
    }



    const fetchCharges = async () => {
        try {
            const data = await getCharges({ ...params, opdId, ipdId })
            setCharges(data)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    // Fetching details for Details model and form on edit mode
    const fetchChargeDetails = async (id: number) => {
        try {
            setPending(true)
            const data = await getChargeDetails(id)
            setCurrent(data)
        } catch ({ message }: any) {
            toast.error(message)
        } finally { setPending(false) }
    }



    const onDelete = async (id: number) => {
        try {
            const isConfirm = await confirm()
            if (!isConfirm) return null
            const data = await deleteCharge(id)
            toast.success(data.message)
            // refetching list
            fetchCharges()
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    return {
        charges,
        getCharges: fetchCharges,
        current,
        setCurrent,
        getDetails: fetchChargeDetails,
        isPending,
        form,
        setForm,
        handleSubmit,
        onDelete,
        confirmationProps
    }
}


export default useChargeHandlers