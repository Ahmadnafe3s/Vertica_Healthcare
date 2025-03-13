import AxiosClient from "@/api/apiClient"
import { StaffProfile } from "@/types/type"



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