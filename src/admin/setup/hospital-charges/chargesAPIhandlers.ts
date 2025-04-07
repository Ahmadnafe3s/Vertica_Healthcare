// Unit section

import { z } from "zod"
import { unitFormSchema } from "./chargeUnit/addUnitFormModel"
import { taxFormSchema } from "./taxes/addTaxformModel"
import { TaxType } from "./taxes/taxList"
import { ChargeTypeformModelSchema } from "./chargeType/addChargeTypeformModel"
import { ChargeCategoryFormSchema } from "./chargesCategory/addChargeCategoryFormModel"
import { Charge_Type_Interface } from "./chargeType/chargeTypes"
import { chargeNameFormSchema } from "@/formSchemas/setupSectionSchemas/ChargeNameFormSchema"
import { chargeNameDetailsType, chargeNamesType } from "@/types/setupTypes/chargeName"
import AxiosClient from "@/api/apiClient"
import { ChargeDetails } from "@/types/type"



export const createChargeUnit = async (formData: z.infer<typeof unitFormSchema>) => {
    try {
        const res = await AxiosClient.post(`/api/hospitalCharge/unit`, formData)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const updateChargeUnit = async (id: number, formData: z.infer<typeof unitFormSchema>) => {
    try {
        const res = await AxiosClient.put(`/api/hospitalCharge/unit/${id}`, formData)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const getChargeUnitDetails = async (id: number) => {
    try {
        const res = await AxiosClient.get(`/api/hospitalCharge/unit/${id}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const getChargeUnitList = async () => {
    try {
        const res = await AxiosClient.get(`/api/hospitalCharge/unit`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const deleteChargeUnit = async (id: number) => {
    try {
        const res = await AxiosClient.delete(`/api/hospitalCharge/unit/${id}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}



// API handlers for taxes section

export const createTax = async (formData: z.infer<typeof taxFormSchema>) => {
    try {
        const res = await AxiosClient.post(`/api/hospitalCharge/tax`, formData)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const updateTax = async (id: number, formData: z.infer<typeof taxFormSchema>) => {
    try {
        const res = await AxiosClient.put(`/api/hospitalCharge/tax/${id}`, formData)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}



export const deleteTax = async (id: number) => {
    try {
        const res = await AxiosClient.delete(`/api/hospitalCharge/tax/${id}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const getTaxDetails = async (id: number): Promise<TaxType> => {
    try {
        const res = await AxiosClient.get(`/api/hospitalCharge/tax/${id}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const getTaxesList = async () => {
    try {
        const res = await AxiosClient.get(`/api/hospitalCharge/tax`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}






// API Handlers for charge type section

export const createChargeType = async (formData: z.infer<typeof ChargeTypeformModelSchema>) => {
    try {
        const res = await AxiosClient.post(`/api/hospitalCharge/type`, formData)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}



export const updateChargeType = async (id: number, formData: z.infer<typeof ChargeTypeformModelSchema>) => {
    try {
        const res = await AxiosClient.put(`/api/hospitalCharge/type/${id}`, formData)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}



export const deleteChargeType = async (id: number) => {
    try {
        const res = await AxiosClient.delete(`/api/hospitalCharge/type/${id}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


type moduleType = 'opd' | 'appointment' | 'radiology' | 'pathology' | 'blood_bank' | 'ambulance'

export const getChargeTypes = async (module?: moduleType): Promise<Charge_Type_Interface[]> => {
    try {
        const params = { module }
        const res = await AxiosClient.get(`/api/hospitalCharge/type`, { params })
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const getChargeTypeDetails = async (id: number) => {
    try {
        const res = await AxiosClient.get(`/api/hospitalCharge/type/${id}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const updateChargeTypeModule = async (id: number, data: any) => {
    try {
        const res = await AxiosClient.put(`/api/hospitalCharge/type/module/${id}`, data)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}



// API handlers for charge category section

export const createChargeCategory = async (formData: z.infer<typeof ChargeCategoryFormSchema>) => {
    try {
        const res = await AxiosClient.post(`/api/hospitalCharge/category`, formData)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const updateChargeCategory = async (id: number, formData: z.infer<typeof ChargeCategoryFormSchema>) => {
    try {
        const res = await AxiosClient.put(`/api/hospitalCharge/category/${id}`, formData)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const deleteChargeCategory = async (id: number) => {
    try {
        const res = await AxiosClient.delete(`/api/hospitalCharge/category/${id}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}



export const getChargeCategoryDetails = async (id: number) => {
    try {
        const res = await AxiosClient.get(`/api/hospitalCharge/category/${id}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const getChargeCategories = async (chargeTypeId?: number) => {
    try {
        const params = { chargeTypeId }
        const res = await AxiosClient.get(`/api/hospitalCharge/category`, { params })
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


// Api handlers for Charges Section or chargeName


export const createChargeName = async (formData: z.infer<typeof chargeNameFormSchema>) => {
    try {
        const res = await AxiosClient.post(`/api/hospitalCharge/name`, formData)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}



export const updateChargeName = async (id: number, formData: z.infer<typeof chargeNameFormSchema>) => {
    try {
        const res = await AxiosClient.put(`/api/hospitalCharge/name/${id}`, formData)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const deleteChargeName = async (id: number) => {
    try {
        const res = await AxiosClient.delete(`/api/hospitalCharge/name/${id}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const getChargeNameDetails = async (id: number):Promise<chargeNameDetailsType> => {
    try {
        const res = await AxiosClient.get(`/api/hospitalCharge/name/${id}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const getChargeNames = async (params: { page?: number, search?: string, limit?: number }): Promise<chargeNamesType> => {  // will recieve object that will contain data array and total_count 0bject
    try {
        const res = await AxiosClient.get(`/api/hospitalCharge/name`, { params })
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}