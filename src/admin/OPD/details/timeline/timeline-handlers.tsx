import { useConfirmation } from "@/hooks/useConfirmation"
import { PaginatedOperations, operationDetailsType } from "@/types/opd_section/operationType"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { createTimeline, deleteTimeline, getTimelines, updateTimeine } from "../../opdApiHandler"
import { timeline } from "@/types/opd_section/timeline"
import { z } from "zod"
import { timelineFormSchema } from "@/formSchemas/timelineFormSchema"
import toast from "react-hot-toast"

const useTimelineHandlers = () => {

  const { opdId, ipdId } = useParams()
  const { confirm, confirmationProps } = useConfirmation()
  const [isPending, setPending] = useState(false)
  const [form, setForm] = useState(false)
  const [timelines, setTimelines] = useState<timeline[]>([])
  const [current, setCurrent] = useState<timeline | null>(null)


  const handleSubmit = async (formData: z.infer<typeof timelineFormSchema>) => {
    try {
      setPending(true)
      let data;

      current ? (
        data = await updateTimeine(current.id, formData), setCurrent(null))
        :
        (data = await createTimeline(formData, { opdId, ipdId }))

      toast.success(data.message)
      fetchTimelines()
      setForm(false)
    } catch ({ message }: any) {
      toast.error(message)
    } finally { setPending(false) }
  }


  const fetchTimelines = async () => {
    try {
      const data = await getTimelines({ opdId, ipdId })
      setTimelines(data)
    } catch ({ message }: any) {
      toast.error(message)
    }
  }


  const onDelete = async (id: number) => {
    try {
      const isConfirm = await confirm()
      if (!isConfirm) return null
      const data = await deleteTimeline(id)  // timeline id
      toast.success(data.message)
      fetchTimelines()
    } catch ({ message }: any) {
      toast.error(message)
    }
  }


  return {
    timelines,
    getTimelines: fetchTimelines,
    current,
    setCurrent,
    isPending,
    form,
    setForm,
    handleSubmit,
    onDelete,
    confirmationProps
  }
}

export default useTimelineHandlers