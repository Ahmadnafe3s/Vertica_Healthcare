import { createStaffFormSchema } from "@/formSchemas/createStaffFormSchema"
import { StaffProfile } from "@/types/type"
import { z } from "zod"
import { staffs } from "@/types/staff/staff"
import AxiosClient from "@/api/apiClient"


export const fetchStaffProfile = async (id: number): Promise<StaffProfile> => {
    try {
        const res = await AxiosClient.get(`/api/staff/${id}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
}



export const createStaff = async (formData: z.infer<typeof createStaffFormSchema>) => {

    try {
        const res = await AxiosClient.post(`/api/staff`, formData)
        return res.data
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }

}


export const getStaffs = async (params: { search?: string, page?: number, limit?: number }): Promise<staffs> => {
    try {
        const response = await AxiosClient.get(`/api/staff`, { params })
        return response.data
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
}


// staff id is coming from profile page passed here by createStaff component

export const updateStaff = async (id: number, formData: z.infer<typeof createStaffFormSchema>) => {
    try {
        const res = await AxiosClient.put(`/api/staff/${id}`, formData)
        return res.data
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
}


export const getStaffDetails = async (id: number): Promise<StaffProfile> => {
    try {
        const res = await AxiosClient.get(`/api/staff/${id}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}



export const deleteStaffProfile = async (id: number) => {
    try {
        const res = await AxiosClient.delete(`/api/staff/${id}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)

    }
}



export const resetPassword = async (id: number, password: string) => {
    try {
        const res = await AxiosClient.put(`/api/staff/reset/${id}`, { password })
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}