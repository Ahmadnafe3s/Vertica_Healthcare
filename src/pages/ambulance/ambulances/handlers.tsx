import { createAmbulanceSchema } from '@/formSchemas/ambulance'
import { useConfirmation } from '@/hooks/useConfirmation'
import { PagintedAmbulance } from '@/types/ambulance/ambulance'
import { Params } from '@/types/type'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { createAmbulance, deleteAmbulance, getAmbulances, updateAmbulance } from '../api-handlers'



const useAmbulances = (params: Params) => {

  const { confirm, confirmationProps } = useConfirmation()
  const [form, setForm] = useState(false)
  const [ambulances, setAmbulances] = useState<PagintedAmbulance>({ data: [], total_pages: 0 })
  const [current, setCurrent] = useState<PagintedAmbulance['data'][0] | null>(null)
  const [isPending, setPending] = useState(false)


  const handleSubmit = async (formData: z.infer<typeof createAmbulanceSchema>) => {
    try {
      let data; setPending(true)
      current ? (
        data = await updateAmbulance(formData, current.id),
        setCurrent(null)
      ) : (
        data = await createAmbulance(formData)
      )
      setForm(false)
      fetchAmbulances()
      setPending(false)
      toast.success(data.message)
    } catch ({ message }: any) {
      toast.error(message)
    } finally { setPending(false) }
  }


  const onDelete = async (id: number) => {
    try {
      const isConfirm = await confirm()
      if (!isConfirm) return null
      const data = await deleteAmbulance(id)
      toast.success(data.message)
      fetchAmbulances()
    } catch ({ message }: any) {
      toast.error(message)
    }
  }


  const fetchAmbulances = async () => {
    try {
      const data = await getAmbulances(params)
      setAmbulances(data)
    } catch ({ message }: any) {
      toast.error(message)
    }
  }


  return {
    ambulances,
    getAmbulances: fetchAmbulances,
    isPending,
    form,
    handleSubmit,
    setForm,
    onDelete,
    current,
    setCurrent,
    confirmationProps
  }


}

export default useAmbulances