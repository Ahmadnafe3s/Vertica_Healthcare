import {useState} from "react"
import {createIpd, deleteIpd, getIpdInfo, getIpdOverview, getIpds, updateIpd} from "../api-handlers"
import {z} from "zod"
import {CreateIpdSchema} from "@/formSchemas/create-ipd-schema"
import toast from "react-hot-toast"
import {IpdInfo, IpdOverviewType, PaginatedIpdType} from "@/types/IPD/ipd"
import {Params} from "@/types/type"
import {useConfirmation} from "@/hooks/useConfirmation"
import {useParams} from "react-router-dom"
import {errorHandler} from "@/helpers/error-handler.ts";

const useIpdHandlers = () => {

    const {ipdId} = useParams()
    const {confirm, confirmationProps} = useConfirmation()
    const [form, setForm] = useState(false)
    const [isPending, setPending] = useState(false)
    const [current, setCurrent] = useState<IpdInfo | null>(null)
    const [ipds, setIpds] = useState<PaginatedIpdType>({data: [], total_pages: 0})
    const [overview, setOverview] = useState<IpdOverviewType | null>(null)


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
            await fetchIpds()
        } catch (error) {
            toast.error(errorHandler(error))
        } finally {
            setPending(false)
        }
    }


    const fetchIpds = async (params?: Params) => {
        try {
            const data = await getIpds(params)
            setIpds(data)
        } catch (error) {
            toast.error(errorHandler(error))
        }
    }


    const fetchIpdInfo = async (ipdId: string) => {
        try {
            setPending(true)
            const data = await getIpdInfo(ipdId)
            setCurrent(data)
        } catch (error) {
            toast.error(errorHandler(error))
        } finally {
            setPending(false)
        }
    }


    const onDelete = async (id: string) => {
        // @ts-ignore
        try {
            const isConfirm = await confirm()
            if (!isConfirm) return null
            const data = await deleteIpd(id)
            toast.success(data.message)
            await fetchIpds()
        } catch (error) {
            toast.error(errorHandler(error))
        }
    }


    const fetchIpdOverview = async () => {
        try {
            const data = await getIpdOverview(ipdId!)
            setOverview(data)
        } catch (error) {
            toast.error(errorHandler(error))
        }
    }


    return {
        ipds,
        fetchIpds,
        overview,
        getIpdOverview: fetchIpdOverview,
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