import { createPrescriptionFormSchema } from "@/formSchemas/createPrescriptionFormSchema";
import { useConfirmation } from "@/hooks/useConfirmation";
import { prescriptionDetail, PrescriptionsType } from "@/types/opd_section/prescription";
import { OIParams } from "@/types/type";
import { useState } from "react";
import toast from "react-hot-toast";
import { z } from "zod";
import { createPrescription, deletePrescription, getPrescription, getPrescriptionDetails, updatePrescription } from "../opdApiHandler";



const usePrescription = (params?: OIParams) => {

    const { confirm, confirmationProps } = useConfirmation()
    const [form, setForm] = useState(false)
    const [isPending, setPending] = useState(false)
    const [prescriptions, setPrescriptions] = useState<PrescriptionsType[]>([])
    const [current, setCurrent] = useState<prescriptionDetail | null>(null)
    const [refresh, setRefresh] = useState(false)


    // handling prescription
    const handleSubmit = async (formData: z.infer<typeof createPrescriptionFormSchema>) => {
        try {
            let data;
            setPending(true)
            current ?
                (data = await updatePrescription(current.id, formData), setCurrent(null))
                :
                (data = await createPrescription(formData, { opdId: params?.opdId, ipdId: params?.ipdId }))
            toast.success(data.message)
            setForm(false)
            setRefresh(!refresh)
        } catch ({ message }: any) {
            toast.error(message)
        } finally { setPending(false) }
    }


    // fetching prescription details
    const fetchPrescriptionInfo = async (id: number) => {
        try {
            setPending(true)
            const data = await getPrescriptionDetails(id)
            setCurrent(data)
        } catch ({ message }: any) {
            toast.error(message)
        } finally { setPending(false) }
    }


    const fetchPrescriptions = async () => {
        try {
            const data = await getPrescription(params!)
            setPrescriptions(data)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    // deleting prescription

    const onDelete = async (id: number) => {
        try {
            const isConfirm = await confirm()
            if (!isConfirm) return null
            const data = await deletePrescription(id)
            toast.success(data.message)
            setRefresh(!refresh)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    return {
        prescriptions,
        getPrescriptions: fetchPrescriptions,
        handleSubmit,
        setForm,
        form,
        current,
        setCurrent,
        isPending,
        setPending,
        onDelete,
        getPrescriptionInfo: fetchPrescriptionInfo,
        confirmationProps,
        refresh
    }
}


export default usePrescription