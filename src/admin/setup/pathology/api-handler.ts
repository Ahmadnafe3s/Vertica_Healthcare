import AxiosClient from "@/api/apiClient"
import { z } from "zod"
import { PathUnitSchema } from "./units/create-unit"
import { PathologyTestNameDetailsType, PathParametersType, PathTestNameParameter } from "@/types/setupTypes/pathology"
import { CreatPathParameterSchema } from "./parameter/create-path-parameter"
import { CreatePathCategorySchema } from "./category/create-path-category"
import { TestNameFormSchema } from "@/formSchemas/setupSectionSchemas/CreateTestNameSchema"



// Handlers for pathology Units

export const createPathologyUnit = async (formData: z.infer<typeof PathUnitSchema>) => {
    try {
        const res = await AxiosClient.post(`/api/setupPathology/unit`, formData)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const getPathologytUnits = async () => {
    try {
        const res = await AxiosClient.get(`/api/setupPathology/unit`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const deletePathologytUnit = async (id: number) => {
    try {
        const res = await AxiosClient.delete(`/api/setupPathology/unit/${id}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}






// radiology parameters

export const createPathologyParameter = async (formData: z.infer<typeof CreatPathParameterSchema>) => {
    try {
        const res = await AxiosClient.post(`/api/setupPathology/parameter`, formData)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const getPathologytParameters = async () => {
    try {
        const res = await AxiosClient.get(`/api/setupPathology/parameter`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const deletePathologytParameter = async (id: number) => {
    try {
        const res = await AxiosClient.delete(`/api/setupPathology/parameter/${id}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const getPathologytParameterDetails = async (id: number): Promise<PathParametersType> => {
    try {
        const res = await AxiosClient.get(`/api/setupPathology/parameter/${id}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const updatePathologytParameter = async (id: number, formData: any) => {
    try {
        const res = await AxiosClient.put(`/api/setupPathology/parameter/${id}`, formData)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}





// radiology categories

export const createPathologytCategory = async (formData: z.infer<typeof CreatePathCategorySchema>) => {
    try {
        const res = await AxiosClient.post(`/api/setupPathology/category`, formData)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const getPathologyCategories = async () => {
    try {
        const res = await AxiosClient.get(`/api/setupPathology/category`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const deletePathologyCategory = async (id: number) => {
    try {
        const res = await AxiosClient.delete(`/api/setupPathology/category/${id}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}









// radiology tests

export const createPathologytTest = async (formData: z.infer<typeof TestNameFormSchema>) => {
    try {
        const res = await AxiosClient.post(`/api/setupPathology/testName`, formData)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const getPathologyTests = async (params: { page?: number, limit?: number, search?: string }) => {
    try {
        const res = await AxiosClient.get(`/api/setupPathology/testName`, { params })
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const getPathologyTestDetails = async (id: number):Promise<PathologyTestNameDetailsType> => {
    try {
        const res = await AxiosClient.get(`/api/setupPathology/testName/${id}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const updatePathologyTest = async (id: number, formData: z.infer<typeof TestNameFormSchema>) => {
    try {
        const res = await AxiosClient.put(`/api/setupPathology/testName/${id}`, formData)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const deletePathologyTest = async (id: number) => {
    try {
        const res = await AxiosClient.delete(`/api/setupPathology/testName/${id}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


// Test Name Parameters

export const getPathTestNameParameters = async (testNameId: number):Promise<PathTestNameParameter> => {
    try {
        const res = await AxiosClient.get(`/api/setupPathology/testName/parameters/${testNameId}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}