import AxiosClient from "@/api/apiClient"
import { z } from "zod"
import { RadiologyTestNameDetailsType, RadioParametersType, RadioTestNameParameter } from "@/types/setupTypes/radiology"
import { CreateRadioCategorySchema } from "./category/createRadioCategory"
import { RadioUnitSchema } from "./units/createRadioUnit"
import { TestNameFormSchema } from "@/formSchemas/setupSectionSchemas/CreateTestNameSchema"


// Handlers for Radiology Units

export const createRadiologytUnit = async (formData: z.infer<typeof RadioUnitSchema>) => {
    try {
        const res = await AxiosClient.post(`/api/setupRadiology/unit`, formData)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const getRadiologytUnits = async () => {
    try {
        const res = await AxiosClient.get(`/api/setupRadiology/unit`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const deleteRadiologytUnit = async (id: number) => {
    try {
        const res = await AxiosClient.delete(`/api/setupRadiology/unit/${id}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


// radiology parameters

export const createRadiologytParameter = async (formData: any) => {
    try {
        const res = await AxiosClient.post(`/api/setupRadiology/parameter`, formData)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const getRadiologytParameters = async () => {
    try {
        const res = await AxiosClient.get(`/api/setupRadiology/parameter`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const deleteRadiologytParameter = async (id: number) => {
    try {
        const res = await AxiosClient.delete(`/api/setupRadiology/parameter/${id}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const getRadiologytParameterDetails = async (id: number): Promise<RadioParametersType> => {
    try {
        const res = await AxiosClient.get(`/api/setupRadiology/parameter/${id}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const updateRadiologytParameter = async (id: number, formData: any) => {
    try {
        const res = await AxiosClient.put(`/api/setupRadiology/parameter/${id}`, formData)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}



// radiology categories

export const createRadiologytCategory = async (formData: z.infer<typeof CreateRadioCategorySchema>) => {
    try {
        const res = await AxiosClient.post(`/api/setupRadiology/category`, formData)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const getRadiologyCategories = async () => {
    try {
        const res = await AxiosClient.get(`/api/setupRadiology/category`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const deleteRadiologyCategory = async (id: number) => {
    try {
        const res = await AxiosClient.delete(`/api/setupRadiology/category/${id}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


// radiology tests

export const createRadiologytTest = async (formData: z.infer<typeof TestNameFormSchema>) => {
    try {
        const res = await AxiosClient.post(`/api/setupRadiology/testName`, formData)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const getRadiologyTests = async (params: { page?: number, limit?: number, search?: string }) => {
    try {
        const res = await AxiosClient.get(`/api/setupRadiology/testName`, { params })
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const getRadiologyTestDetails = async (id: number):Promise<RadiologyTestNameDetailsType> => {
    try {
        const res = await AxiosClient.get(`/api/setupRadiology/testName/${id}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const updateRadiologyTest = async (id: number, formData: z.infer<typeof TestNameFormSchema>) => {
    try {
        const res = await AxiosClient.put(`/api/setupRadiology/testName/${id}`, formData)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const deleteRadiologyTest = async (id: number) => {
    try {
        const res = await AxiosClient.delete(`/api/setupRadiology/testName/${id}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


// Test Name Parameters

export const getRadioTestNameParameters = async (testNameId: number):Promise<RadioTestNameParameter> => {
    try {
        const res = await AxiosClient.get(`/api/setupRadiology/testName/parameters/${testNameId}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}