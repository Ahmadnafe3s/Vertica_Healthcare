import { useConfirmation } from '@/hooks/useConfirmation'
import { ConsultantRegister, PaginatedConsultantRegister } from '@/types/IPD/consutant-register'
import { Doctors, Params } from '@/types/type'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import { createConsultantReg, deleteConsultantReg, getConsultantRegs, updateConsultantReg } from '../../api-handlers'
import { ConsultantRegisterSchema } from './consultant-registers'
import { z } from 'zod'
import { fetchDoctors } from '@/pages/appointment/appointmentAPIhandler'

const useConsultantRegister = (params: Params) => {

    const { ipdId } = useParams()

    const { confirm, confirmationProps } = useConfirmation()
    const [doctors, setDoctors] = useState<Doctors[]>([])
    const [registers, setRegisters] = useState<PaginatedConsultantRegister>({ data: [], total_pages: 0 })
    const [current, setCurrent] = useState<ConsultantRegister | null>(null)
    const [isPending, setPending] = useState(false)
    const [form, setForm] = useState(false)


    const getDoctors = async () => {
        try {
            const data = await fetchDoctors()
            setDoctors(data)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    const handleSubmit = async (formData: z.infer<typeof ConsultantRegisterSchema>) => {
        try {
            setPending(true)
            let data;
            current ? (data = await updateConsultantReg(current.id, formData), setCurrent(null))
                : (data = await createConsultantReg(formData, { ipdId }))

            toast.success(data.message)
            fetchConsultantRegisters()
            setForm(false)
        } catch ({ message }: any) {
            toast.error(message)
        } finally { setPending(false) }
    }


    const fetchConsultantRegisters = async () => {
        try {
            const data = await getConsultantRegs({ ...params, ipdId })
            setRegisters(data)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    const onDelete = async (id: number) => {
        try {
            const isConfirm = await confirm()
            if (!isConfirm) return null
            const data = await deleteConsultantReg(id)
            toast.success(data.message)
            fetchConsultantRegisters()
        } catch ({ message }: any) {
            toast.error(message)

        }
    }

    return {
        doctors,
        getDoctors,
        registers,
        getRegisters: fetchConsultantRegisters,
        current,
        setCurrent,
        handleSubmit,
        onDelete,
        confirmationProps,
        isPending,
        form,
        setForm
    }
}


export default useConsultantRegister