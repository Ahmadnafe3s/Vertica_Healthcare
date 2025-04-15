import { getSetupVitals } from '@/admin/setup/vitals/apiHandler'
import { vitalFormSchema } from '@/formSchemas/vitalFormSchema'
import { useConfirmation } from '@/hooks/useConfirmation'
import { VitalType } from '@/types/opd_section/vitals'
import { SetupVital } from '@/types/setupTypes/vital'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import { z } from 'zod'
import { createVital, deleteVitals, getVitals } from '../../opdApiHandler'

const useVitalHandlers = () => {

    const { opdId, ipdId } = useParams()
    const { confirm, confirmationProps } = useConfirmation()
    const [isPending, setPending] = useState(false)
    const [form, setForm] = useState(false)
    const [vitals, setVitals] = useState<VitalType[]>([])
    const [setupVitals, setSetupVitals] = useState<SetupVital[]>([])



    const handleSubmit = async (formData: z.infer<typeof vitalFormSchema>) => {
        try {
            setPending(true)
            const data = await createVital(formData, { opdId, ipdId })
            toast.success(data.message)
            setForm(false)
            fetchVitals()
        } catch ({ message }: any) {
            toast.error(message)
        } finally {
            setPending(false)
        }
    }

    const fetchVitals = async (search?: string) => {
        try {
            const data = await getVitals({ opdId, ipdId, search })
            setVitals(data)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    const onDelete = async (id: number) => {
        try {
            const isConfirm = await confirm()
            if (!isConfirm) return null
            const data = await deleteVitals(id)
            toast.success(data.message)
            fetchVitals()
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    const fetchSetupVitals = async () => {
        try {
            const data = await getSetupVitals()
            setSetupVitals(data)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    return {
        vitals,
        setupVitals,
        getVitals: fetchVitals,
        getSetupVitals: fetchSetupVitals,
        isPending,
        form,
        setForm,
        handleSubmit,
        onDelete,
        confirmationProps
    }
}

export default useVitalHandlers