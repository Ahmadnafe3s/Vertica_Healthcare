import { AddMedicinesFormSchema } from "@/formSchemas/addMedicinesFormSchema"
import { createPharmacyBillSchema } from "@/formSchemas/createPharmBillSchema"
import { PurchaseMedicineFormSchema } from "@/formSchemas/purchaseMedicineFormSchema"
import { medicinePurchaseDetails, medicinePurchases } from "@/types/opd_section/purchaseMedicine"
import { medicineBatchDetails, medicineDetails, medicines } from "@/types/pharmacy/pharmacy"
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



export const getMedicineList = async (search?: string): Promise<medicines[]> => {
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



export const getMedicinedetails = async (id: number): Promise<medicineDetails> => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}/api/pharmacy/${id}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}



export const updateMedicine = async (id: number, formData: z.infer<typeof AddMedicinesFormSchema>): Promise<medicineDetails> => {
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



export const getPurchaseList = async (params: { page: number, limit?: number, search?: string }): Promise<medicinePurchases> => {
    try {
        console.log(params);
        
        const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}/api/purchaseMedicine`, { params })
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}



export const getPurchaseDetails = async (id: string): Promise<medicinePurchaseDetails> => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}/api/purchaseMedicine/${id}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const deletePurchaseMedicine = async (id: string) => {
    try {
        const res = await axios.delete(`${import.meta.env.VITE_APP_API_URL}/api/purchaseMedicine/${id}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}



// API handlers for medicine Batches

export const getMedicinesBatches = async (medicineId: number) => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}/api/pharmacy/batch/${medicineId}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}



export const getMedicinesBatchDetails = async (batchId: number): Promise<medicineBatchDetails> => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}/api/pharmacy/batch/details/${batchId}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}




// API handlers for pharmacy bill

export const createPharmacyBill = async (formData: z.infer<typeof createPharmacyBillSchema>) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_APP_API_URL}/api/pharmacy/bill`, formData)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const getPharmacyBills = async () => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}/api/pharmacy/bill/list`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const getPharmacyBillDetails = async (id: string) => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}/api/pharmacy/bill/details/${id}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const deletePharmacyBill = async (id: string) => {
    try {
        const res = await axios.delete(`${import.meta.env.VITE_APP_API_URL}/api/pharmacy/bill/${id}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}