import { z } from "zod";
import { MedicineGroupFromSchema } from "./medicine_group/medicineGroupFrom";
import { MedicineCompanyFormSchema } from "./medicine_company/medicineCompanyForm";
import { MedicineUnitFormSchema } from "./medicine_unit/medicineUnitForm";
import { DoseDurationFormSchema } from "./medicine_dose_duration/doseDurationForm";
import { DoseIntervalFormSchema } from "./medicine_dose_interval/doseIntervalForm";
import { MedicineCategoryFormSchema } from "./medicine_category/medicineCategoryForm";
import AxiosClient from "@/api/apiClient";



export const createMedicineGroup = async (formData: z.infer<typeof MedicineGroupFromSchema>) => {
    try {
        const res = await AxiosClient.post(`/api/setupPharmacy/group`, formData)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}

export const deleteMedicineGroup = async (id: number) => {
    try {
        const res = await AxiosClient.delete(`/api/setupPharmacy/group/${id}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const geteMedicineGroups = async () => {
    try {
        const res = await AxiosClient.get(`/api/setupPharmacy/group`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}




// Handlers for medicine company

export const createMedicineCompany = async (formData: z.infer<typeof MedicineCompanyFormSchema>) => {
    try {
        const res = await AxiosClient.post(`/api/setupPharmacy/company`, formData)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const deleteMedicineCompany = async (id: number) => {
    try {
        const res = await AxiosClient.delete(`/api/setupPharmacy/company/${id}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const getMedicineCompanies = async () => {
    try {
        const res = await AxiosClient.get(`/api/setupPharmacy/company`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}



// API handlers for medicine unit


export const createMedicineUnit = async (formData: z.infer<typeof MedicineUnitFormSchema>) => {
    try {
        const res = await AxiosClient.post(`/api/setupPharmacy/unit`, formData)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const deleteMedicineUnit = async (id: number) => {
    try {
        const res = await AxiosClient.delete(`/api/setupPharmacy/unit/${id}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const getMedicineUnits = async () => {
    try {
        const res = await AxiosClient.get(`/api/setupPharmacy/unit`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}



// API Handlers for Dose Duration


export const createDoseDuration = async (formData: z.infer<typeof DoseDurationFormSchema>) => {
    try {
        const res = await AxiosClient.post(`/api/setupPharmacy/duration`, formData)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const deleteDoseDuration = async (id: number) => {
    try {
        const res = await AxiosClient.delete(`/api/setupPharmacy/duration/${id}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const getDoseDurations = async () => {
    try {
        const res = await AxiosClient.get(`/api/setupPharmacy/duration`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}



// API handlers for dose interval


export const createDoseInterval = async (formData: z.infer<typeof DoseIntervalFormSchema>) => {
    try {
        const res = await AxiosClient.post(`/api/setupPharmacy/interval`, formData)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const deleteDoseInterval = async (id: number) => {
    try {
        const res = await AxiosClient.delete(`/api/setupPharmacy/interval/${id}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const getDoseIntervals = async () => {
    try {
        const res = await AxiosClient.get(`/api/setupPharmacy/interval`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}



// API Handlers for medicine categories


export const createMedicineCategory = async (formData: z.infer<typeof MedicineCategoryFormSchema>) => {
    try {
        const res = await AxiosClient.post(`/api/setupPharmacy/category`, formData)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const deleteMedicineCategory = async (id: number) => {
    try {
        const res = await AxiosClient.delete(`/api/setupPharmacy/category/${id}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const getMedicineCategories = async () => {
    try {
        const res = await AxiosClient.get(`/api/setupPharmacy/category`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}
