import { useState } from "react"
import { createIpd, deleteIpd, getIpdInfo, getIpds, updateIpd } from "../api-handlers"
import { z } from "zod"
import { CreateIpdSchema } from "@/formSchemas/create-ipd-schema"
import toast from "react-hot-toast"
import { IpdInfo, PaginatedIpdType } from "@/types/IPD/ipd"
import { Params } from "@/types/type"
import { useConfirmation } from "@/hooks/useConfirmation"

const useIpdHandlers = () => {

    const { confirm, confirmationProps } = useConfirmation()
    const [form, setForm] = useState(false)
    const [isPending, setPending] = useState(false)
    const [current, setCurrent] = useState<IpdInfo | null>(null)
    const [ipds, setIpds] = useState<PaginatedIpdType>({ data: [], total_pages: 0 })


    const handleSubmit = async (formData: z.infer<typeof CreateIpdSchema>) => {
        try {
            setPending(true)
            let data;
            current ? (
                data = await updateIpd(current.id, formData),
                setCurrent(null)
            ) : (
                data = await createIpd(formData)
            );
            toast.success(data.message);
            setForm(false)
            fetchIpds()
        } catch ({ message }: any) {
            toast.error(message)
        } finally {
            setPending(false)
        }
    }


    const fetchIpds = async (params?: Params) => {
        try {
            const data = await getIpds(params)
            setIpds(data)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    const fetchIpdInfo = async (id: string) => {
        try {
            setPending(true)
            const data = await getIpdInfo(id)
            setCurrent(data)
        } catch ({ message }: any) {
            toast.error(message)
        } finally { setPending(false) }
    }



    const onDelete = async (id: string) => {
        try {
            const isConfirm = await confirm()
            if (!isConfirm) return null
            const data = await deleteIpd(id)
            toast.success(data.message)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    return {
        ipds,
        fetchIpds,
        current,
        setCurrent,
        fetchIpdInfo,
        isPending,
        form,
        setForm,
        handleSubmit,
        onDelete,
        confirmationProps
    }
}

export default useIpdHandlers