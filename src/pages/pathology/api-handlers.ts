import AxiosClient from "@/api/apiClient"
import { LabReportFormSchema } from "@/formSchemas/approvedBYschema"
import { createPathologyBillSchema } from "@/formSchemas/createPathologyBill"
import { sampleCollectionSchema } from "@/formSchemas/sampleCollectionSchema"
import { RadiologySampleCollectionDet, RadioTestReport } from "@/types/radiology/radiology"
import { z } from "zod"



export const createPathologyBill = async (formData: z.infer<typeof createPathologyBillSchema>) => {
    try {
        const res = await AxiosClient.post(`/api/pathologyBill`, formData)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}



export const getPathologyBills = async (params: { page?: number, limit?: number, search?: string }) => {
    try {
        const res = await AxiosClient.get(`/api/pathologyBill`, { params })
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const getPathologyBillDetails = async (id: string) => {
    try {
        const res = await AxiosClient.get(`/api/pathologyBill/${id}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}



export const deletePathologyBill = async (id: string) => {
    try {
        const res = await AxiosClient.delete(`/api/pathologyBill/${id}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const updatePathologyBill = async (id: string, formData: z.infer<typeof createPathologyBillSchema>) => {
    try {
        const res = await AxiosClient.put(`/api/pathologyBill/${id}`, formData)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}







// Radiology sample-collection

export const createPathSampleCollection = async (formData: z.infer<typeof sampleCollectionSchema>, itemId: number) => {
    try {
        const res = await AxiosClient.post(`/api/pathologyBill/sample-collection/${itemId}`, formData)
        return res.data
    }
    catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const updatePathSampleCollection = async (itemId: number, formData: z.infer<typeof sampleCollectionSchema>) => {
    try {
        const res = await AxiosClient.put(`/api/pathologyBill/sample-collection/${itemId}`, formData)
        return res.data
    }
    catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const getPathSampleCollectionDetails = async (id: number):Promise<RadiologySampleCollectionDet> => {
    try {
        const res = await AxiosClient.get(`/api/pathologyBill/sample-collection/${id}`)
        return res.data
    }
    catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}



// Radiology Report

export const createPathologyReport = async (itemId: number, formData: z.infer<typeof LabReportFormSchema>) => {
    try {
        const res = await AxiosClient.post(`/api/pathologyBill/report/${itemId}`, formData)
        return res.data
    }
    catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}



export const getPathologyReportDetails = async (itemId: number): Promise<RadioTestReport> => {
    try {
        const res = await AxiosClient.get(`/api/pathologyBill/report/${itemId}`)
        return res.data
    }
    catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const updatePathologyReport = async (itemId: number, formData: z.infer<typeof LabReportFormSchema>) => {
    try {
        const res = await AxiosClient.put(`/api/pathologyBill/report/${itemId}`, formData)
        return res.data
    }
    catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}