import AxiosClient from "@/api/apiClient"
import { CreateIpdSchema } from "@/formSchemas/create-ipd-schema"
import { IpdInfo } from "@/types/IPD/ipd"
import { Params } from "@/types/type"
import { z } from "zod"


export const createIpd = async (formData: z.infer<typeof CreateIpdSchema>) => {
    try {
        const res = await AxiosClient.post(`/api/ipd`, formData)
        return res.data
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
}


export const updateIpd = async (id: string, formData: z.infer<typeof CreateIpdSchema>) => {
    try {
        const res = await AxiosClient.put(`/api/ipd/${id}`, formData)
        return res.data
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
}


export const getIpds = async (params?: Params) => {
    try {
        const res = await AxiosClient.get(`/api/ipd`, { params })
        return res.data
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
}


export const deleteIpd = async (id: string) => {
    try {
        const res = await AxiosClient.delete(`/api/ipd/${id}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
}


export const getIpdInfo = async (id: string): Promise<IpdInfo> => {
    try {
        const res = await AxiosClient.get(`/api/ipd/${id}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
}