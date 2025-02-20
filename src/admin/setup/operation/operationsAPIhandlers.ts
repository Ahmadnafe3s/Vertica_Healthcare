import axios from "axios"
import { AddOperationCategoryFormSchema } from "./operation_category/addOperationCategoryForm"
import { z } from "zod"
import { AddOperationNameFormSchema } from "./operation_name/addOperationNameModel"


export const createOperationCategory = async (formData: z.infer<typeof AddOperationCategoryFormSchema>) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_APP_API_URL}/api/setupOperation/category`, formData)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const updateOperationCategory = async (id: number, formData: z.infer<typeof AddOperationCategoryFormSchema>) => {
    try {
        const res = await axios.put(`${import.meta.env.VITE_APP_API_URL}/api/setupOperation/category/${id}`, formData)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const deleteOperationCategory = async (id: number) => {
    try {
        const res = await axios.delete(`${import.meta.env.VITE_APP_API_URL}/api/setupOperation/category/${id}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const getOperationCategoryDetails = async (id: number) => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}/api/setupOperation/category/${id}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const getOperationCategories = async () => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}/api/setupOperation/category`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}



// API handlers for operation name section

export const createOperationName = async (formData: z.infer<typeof AddOperationNameFormSchema>) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_APP_API_URL}/api/setupOperation/name`, formData)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const updateOperationName = async (id: number, formData: z.infer<typeof AddOperationNameFormSchema>) => {
    try {
        const res = await axios.put(`${import.meta.env.VITE_APP_API_URL}/api/setupOperation/name/${id}`, formData)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}

export const deleteOperationName = async (id: number) => {
    try {
        const res = await axios.delete(`${import.meta.env.VITE_APP_API_URL}/api/setupOperation/name/${id}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const getOperationNameDetails = async (id: number) => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}/api/setupOperation/name/${id}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}

export const getOperationNames = async (categoryId?: number) => {
    try {
        const params = { categoryId }
        const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}/api/setupOperation/name`, { params })
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}