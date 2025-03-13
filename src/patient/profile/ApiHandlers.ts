import AxiosClient from "@/api/apiClient"
import { patientRegistrationSchema } from "@/formSchemas/patientRegisterFormSchema"
import { PatientDetails } from "@/types/patient/patient"
import { z } from "zod"


export const getPatientDetails = async (patientId: number): Promise<PatientDetails> => {
    try {
        const res = await AxiosClient.get(`/api/patient/${patientId}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const resetPatientPassword = async (password: string, patientId: number) => {
    try {
        const res = await AxiosClient.put(`/api/patient/reset/${patientId}`, { password })
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const deletePatient = async (patientId: number) => {
    try {
        const res = await AxiosClient.delete(`/api/patient/${patientId}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}



export const createPatient = async (formData: z.infer<typeof patientRegistrationSchema>) => {
    try {
        const res = await AxiosClient.post(`/api/patient`, formData)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const updatePatient = async (patinetId: number, formData: z.infer<typeof patientRegistrationSchema>) => {
    try {
        const res = await AxiosClient.put(`/api/patient/${patinetId}`, formData)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}