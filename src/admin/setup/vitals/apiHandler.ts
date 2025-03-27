import { z } from "zod";
import { SetupVitalFormSchema } from "./setupVitalForm";
import AxiosClient from "@/api/apiClient";



export const createSetupVital = async (formData: z.infer<typeof SetupVitalFormSchema>) => {
    try {
        const res = await AxiosClient.post(`/api/setupVital`, formData)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const updateSetupVital = async (id: number, formData: z.infer<typeof SetupVitalFormSchema>) => {
    try {
        const res = await AxiosClient.put(`/api/setupVital/${id}`, formData)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const getSetupVitalDetails = async (id: number) => {
    try {
        const res = await AxiosClient.get(`/api/setupVital/${id}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const deleteSetupVital = async (id: number) => {
    try {
        const res = await AxiosClient.delete(`/api/setupVital/${id}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const getSetupVitals = async () => {
    try {
        const res = await AxiosClient.get(`/api/setupVital`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}