import { AddMedicinesFormSchema } from "@/formSchemas/addMedicinesFormSchema"
import { PurchaseMedicineFormSchema } from "@/formSchemas/purchaseMedicineFormSchema"
import { MedicineDetails, MedicineList, MedicinePurchaseDetails, MedicinePurchaseList } from "@/types/type"
import axios from "axios"
import { z } from "zod"



export const createMedicine = async (formData: z.infer<typeof AddMedicinesFormSchema>) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_APP_API_URL}/api/pharmacy`, formData)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}



export const getMedicineList = async (): Promise<MedicineList[]> => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}/api/pharmacy`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}



export const searchMedicine = async (search: string): Promise<MedicineList[]> => {
    try {
        const params = { search }
        const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}/api/pharmacy`, { params })
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}



export const deleteMedicine = async (id: number) => {
    try {
        const res = await axios.delete(`${import.meta.env.VITE_APP_API_URL}/api/pharmacy/${id}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}



export const getMedicinedetails = async (id: number): Promise<MedicineDetails> => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}/api/pharmacy/${id}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}



export const updateMedicine = async (id: number, formData: z.infer<typeof AddMedicinesFormSchema>): Promise<MedicineDetails> => {
    try {
        const res = await axios.put(`${import.meta.env.VITE_APP_API_URL}/api/pharmacy/${id}`, formData)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}





// [Handler for Purchasing feature]

export const createPurchase = async (formData: z.infer<typeof PurchaseMedicineFormSchema>) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_APP_API_URL}/api/purchaseMedicine`, formData)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}



export const getPurchaseList = async (): Promise<MedicinePurchaseList[]> => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}/api/purchaseMedicine`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}



export const getPurchaseDetails = async (id: number): Promise<MedicinePurchaseDetails> => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}/api/purchaseMedicine/${id}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}