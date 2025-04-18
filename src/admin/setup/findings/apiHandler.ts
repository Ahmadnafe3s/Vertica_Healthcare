import { FindingCategoryFormSchema } from "./finding_category/findingCategoryForm";
import { z } from "zod";
import { FindingNameFormSchema } from "./finding_name/findingNameForm";
import AxiosClient from "@/api/apiClient";


export const createFindingCategory = async (formData: z.infer<typeof FindingCategoryFormSchema>) => {
    try {
        const res = await AxiosClient.post(`/api/setupFinding/category`, formData)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}



export const updateFindingCategory = async (id: number, formData: z.infer<typeof FindingCategoryFormSchema>) => {
    try {
        const res = await AxiosClient.put(`/api/setupFinding/category/${id}`, formData)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const deleteFindingCategory = async (id: number) => {
    try {
        const res = await AxiosClient.delete(`/api/setupFinding/category/${id}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const getFindingCategoryDetails = async (id: number) => {
    try {
        const res = await AxiosClient.get(`/api/setupFinding/category/${id}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const getFindingCategories = async () => {
    try {
        const res = await AxiosClient.get(`/api/setupFinding/category`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


// Handlers for finding name

export const createFindingName = async (formData: z.infer<typeof FindingNameFormSchema>) => {
    try {
        const res = await AxiosClient.post(`/api/setupFinding/name`, formData)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const updateFindingName = async (id: number, formData: z.infer<typeof FindingNameFormSchema>) => {
    try {
        const res = await AxiosClient.put(`/api/setupFinding/name/${id}`, formData)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const deleteFindingName = async (id: number) => {
    try {
        const res = await AxiosClient.delete(`/api/setupFinding/name/${id}`,)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const getFindingNameDetails = async (id: number) => {
    try {
        const res = await AxiosClient.get(`/api/setupFinding/name/${id}`,)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const getFindingNames = async (categoryId?: string) => {
    try {
        const params = { categoryId }
        const res = await AxiosClient.get(`/api/setupFinding/name`, { params })
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}