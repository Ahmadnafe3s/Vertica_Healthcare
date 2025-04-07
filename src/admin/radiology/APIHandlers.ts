import AxiosClient from "@/api/apiClient"
import { LabReportFormSchema } from "@/formSchemas/approvedBYschema"
import { createRadiologyBillSchema } from "@/formSchemas/createRadiologyBill"
import { sampleCollectionSchema } from "@/formSchemas/sampleCollectionSchema"
import { RadiologySampleCollectionDet, RadioTestReport } from "@/types/radiology/radiology"
import { z } from "zod"



export const createRadiologyBill = async (formData: z.infer<typeof createRadiologyBillSchema>) => {
    try {
        const res = await AxiosClient.post(`/api/radiologyBill`, formData)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}



export const getRadiologyBills = async (params: { page?: number, limit?: number, search?: string }) => {
    try {
        const res = await AxiosClient.get(`/api/radiologyBill`, { params })
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const getRadiologyBillDetails = async (id: string) => {
    try {
        const res = await AxiosClient.get(`/api/radiologyBill/${id}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}



export const deleteRadiologyBill = async (id: string) => {
    try {
        const res = await AxiosClient.delete(`/api/radiologyBill/${id}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const updateRadiologyBill = async (id: string, formData: z.infer<typeof createRadiologyBillSchema>) => {
    try {
        const res = await AxiosClient.put(`/api/radiologyBill/${id}`, formData)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


// Radiology sample-collection

export const createRadioSampleCollection = async (formData: z.infer<typeof sampleCollectionSchema>, itemId: number) => {
    try {
        const res = await AxiosClient.post(`/api/radiologyBill/sample-collection/${itemId}`, formData)
        return res.data
    }
    catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const updateRadioSampleCollection = async (itemId: number, formData: z.infer<typeof sampleCollectionSchema>) => {
    try {
        const res = await AxiosClient.put(`/api/radiologyBill/sample-collection/${itemId}`, formData)
        return res.data
    }
    catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const getRadioSampleCollectionDetails = async (id: number):Promise<RadiologySampleCollectionDet> => {
    try {
        const res = await AxiosClient.get(`/api/radiologyBill/sample-collection/${id}`)
        return res.data
    }
    catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}



// Radiology Report

export const createRadiologyReport = async (itemId: number, formData: z.infer<typeof LabReportFormSchema>) => {
    try {
        const res = await AxiosClient.post(`/api/radiologyBill/report/${itemId}`, formData)
        return res.data
    }
    catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}



export const getRadiologyReportDetails = async (itemId: number): Promise<RadioTestReport> => {
    try {
        const res = await AxiosClient.get(`/api/radiologyBill/report/${itemId}`)
        return res.data
    }
    catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const updateRadiologyReport = async (itemId: number, formData: z.infer<typeof LabReportFormSchema>) => {
    try {
        const res = await AxiosClient.put(`/api/radiologyBill/report/${itemId}`, formData)
        return res.data
    }
    catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}