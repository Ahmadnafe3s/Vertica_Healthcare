import { patientRegistrationSchema } from "@/formSchemas/patientRegisterFormSchema"
import { PatientDetails } from "@/types/patient/patient"
import axios from "axios"
import { z } from "zod"


export const getPatientDetails = async (patientId: number): Promise<PatientDetails> => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}/api/patient/${patientId}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const resetPatientPassword = async (password: string, patientId: number) => {
    try {
        const res = await axios.put(`${import.meta.env.VITE_APP_API_URL}/api/patient/reset/${patientId}`, { password })
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const deletePatient = async (patientId: number) => {
    try {
        const res = await axios.delete(`${import.meta.env.VITE_APP_API_URL}/api/patient/${patientId}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}



export const createPatient = async (formData: z.infer<typeof patientRegistrationSchema>) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_APP_API_URL}/api/patient`, formData)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const updatePatient = async (patinetId: number, formData: z.infer<typeof patientRegistrationSchema>) => {
    try {
        const res = await axios.put(`${import.meta.env.VITE_APP_API_URL}/api/patient/${patinetId}`, formData)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}