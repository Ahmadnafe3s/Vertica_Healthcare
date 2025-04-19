import { medicationFormSchema } from "@/formSchemas/medicationFormSchema"
import { useConfirmation } from "@/hooks/useConfirmation"
import { medicationDetail, opdMedications } from "@/types/opd_section/medication"
import { useState } from "react"
import toast from "react-hot-toast"
import { useParams } from "react-router-dom"
import { z } from "zod"
import { createMedication, deleteMedication, getMedicationDetails, getMedications, updateMedication } from "../../opdApiHandler"
import { Params } from "@/types/type"




const useMedicationHandlers = (params?: Params) => {

    const { opdId, ipdId } = useParams()
    const { confirm, confirmationProps } = useConfirmation()
    const [isPending, setPending] = useState(false)
    const [form, setForm] = useState(false)
    const [medications, setMedications] = useState<opdMedications>({ data: [], total_pages: 1 })
    const [current, setCurrent] = useState<medicationDetail | undefined>(undefined)


    // handling both upsert
    const handleSubmit = async (formData: z.infer<typeof medicationFormSchema>) => {
        try {
            let data;
            setPending(true)
            current ?
                (data = await updateMedication(current.id, formData), setCurrent(undefined))
                :
                (data = await createMedication(formData, { opdId, ipdId }))

            toast.success(data.message)
            setForm(false)
            fetchMedications()
        } catch ({ message }: any) {
            toast.error(message)
        } finally { setPending(false) }
    }


    const fetchMedications = async () => {
        try {
            const data = await getMedications({ ...params, opdId, ipdId })
            setMedications(data)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    const fetchMedicationDetails = async (id: number) => {
        try {
            setPending(true)
            const data = await getMedicationDetails(id)
            setCurrent(data)
        } catch ({ message }: any) {
            toast.error(message)
        } finally { setPending(false) }
    }

    const onDelete = async (id: number) => {
        try {
            const isConfirm = await confirm()
            if (!isConfirm) return null
            const data = await deleteMedication(id)
            toast.success(data.message)
            fetchMedications()
        } catch ({ message }: any) {
            toast.error(message)
        }
    }

    return {
        medications,
        getMedications: fetchMedications,
        current,
        setCurrent,
        getMedicationDetails: fetchMedicationDetails,
        isPending,
        form,
        setForm,
        handleSubmit,
        onDelete,
        confirmationProps
    }

}

export default useMedicationHandlers