import AxiosClient from "@/api/apiClient"
import {CreateIpdSchema} from "@/formSchemas/create-ipd-schema"
import {PaginatedConsultantRegister} from "@/types/IPD/consutant-register"
import {IpdInfo, PaginatedIpdTreatmentHisInfo} from "@/types/IPD/ipd"
import {OIParams, Params} from "@/types/type"
import {z} from "zod"
import {ConsultantRegisterSchema} from "./sections/consulatant-register/consultant-registers"


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
        const res = await AxiosClient.get(`/api/ipd`, {params})
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


export const getIpdOverview = async (opdId: string) => {
    try {
        const res = await AxiosClient.get(`/api/ipd/overview/${opdId}`)
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


export const getIpdTreatmentHistory = async (params: Params & OIParams): Promise<PaginatedIpdTreatmentHisInfo> => {
    try {
        const res = await AxiosClient.get(`/api/ipd/t/history`, {params})
        return res.data
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
}


// consultant register


export const createConsultantReg = async (formData: z.infer<typeof ConsultantRegisterSchema>, params: OIParams) => {
    try {
        const res = await AxiosClient.post(`/api/consultantReg`, formData, {params})
        return res.data
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
}


export const updateConsultantReg = async (id: number, formData: z.infer<typeof ConsultantRegisterSchema>) => {
    try {
        const res = await AxiosClient.put(`/api/consultantReg/${id}`, formData)
        return res.data
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
}


export const getConsultantRegs = async (params: Params & OIParams): Promise<PaginatedConsultantRegister> => {
    try {
        const res = await AxiosClient.get(`/api/consultantReg`, {params})
        return res.data
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
}


export const deleteConsultantReg = async (id: number) => {
    try {
        const res = await AxiosClient.delete(`/api/consultantReg/${id}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
}


// Lab investigation

export const getIpdRadInvestigation = async (ipdId: string, params: { search?: string }) => {
    try {
        const res = await AxiosClient.get(`/api/radiologyBill/items/${ipdId}`, {params})
        return res.data
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
}

export const getIpdPatInvestigation = async (ipdId: string, params: { search?: string }) => {
    try {
        const res = await AxiosClient.get(`/api/pathologyBill/items/${ipdId}`, {params})
        return res.data
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
}