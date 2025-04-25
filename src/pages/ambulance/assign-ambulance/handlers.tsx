import { useConfirmation } from "@/hooks/useConfirmation"
import { AssignedAmbulanceInfo, PaginatedAssignedAmbulances } from "@/types/ambulance/ambulance"
import { Params } from "@/types/type"
import { useState } from "react"
import toast from "react-hot-toast"
import { createAssignAmbulance, deleteAssignedAmbulance, getAssignedAmbulanceInfo, getAssignedAmbulances, updateAssignedAmbulance } from "../api-handlers"

const useAssignAmbulance = (params: Params) => {

  const { confirm, confirmationProps } = useConfirmation()
  const [form, setForm] = useState(false)
  const [isPending, setPending] = useState(false)
  const [assigned, setAssigned] = useState<PaginatedAssignedAmbulances>({ data: [], total_pages: 0 })
  const [current, setCurrent] = useState<AssignedAmbulanceInfo | null>(null)


  const handleSubmit = async (formData: any) => {
    try {
      let data; setPending(true)
      current ? (
        data = await updateAssignedAmbulance(formData, current.id),
        setCurrent(null)
      ) : (data = await createAssignAmbulance(formData))
      fetchAssignedAmbulances()
      toast.success(data.message)
      setForm(false)
    } catch ({ message }: any) {
      toast.error(message)
    } finally { setPending(false) }
  }


  const fetchAssignedAmbulances = async () => {
    try {
      const data = await getAssignedAmbulances(params)
      setAssigned(data)
    } catch ({ message }: any) {
      toast.error(message)
    }
  }

  const onDelete = async (id: string) => {
    try {
      const isConfirm = await confirm()
      if (!isConfirm) return null
      const data = await deleteAssignedAmbulance(id)
      toast.success(data.message)
      fetchAssignedAmbulances()
    } catch ({ message }: any) {
      toast.error(message)
    }
  }


  const fetchAssignedAmulanceInfo = async (id: string) => {
    try {
      setPending(true)
      const data = await getAssignedAmbulanceInfo(id)
      setCurrent(data)
    } catch ({ message }: any) {
      toast.error(message)
    } finally { setPending(false) }
  }


  return {
    assigned,
    getAssignedAmbulances: fetchAssignedAmbulances,
    isPending,
    form,
    setForm,
    handleSubmit,
    onDelete,
    current,
    setCurrent,
    getAssignedAmbulanceInfo: fetchAssignedAmulanceInfo,
    confirmationProps
  }
}

export default useAssignAmbulance