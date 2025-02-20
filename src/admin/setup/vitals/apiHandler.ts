import { z } from "zod";
import { SetupVitalFormSchema } from "./setupVitalForm";
import axios from "axios";



export const createSetupVital = async (formData: z.infer<typeof SetupVitalFormSchema>) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_APP_API_URL}/api/setupVital`, formData)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const updateSetupVital = async (id: number, formData: z.infer<typeof SetupVitalFormSchema>) => {
    try {
        const res = await axios.put(`${import.meta.env.VITE_APP_API_URL}/api/setupVital/${id}`, formData)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const getSetupVitalDetails = async (id: number) => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}/api/setupVital/${id}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const deleteSetupVital = async (id: number) => {
    try {
        const res = await axios.delete(`${import.meta.env.VITE_APP_API_URL}/api/setupVital/${id}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const getSetupVitals = async () => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}/api/setupVital`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}