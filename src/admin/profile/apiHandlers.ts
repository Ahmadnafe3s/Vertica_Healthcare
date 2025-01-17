import { StaffProfile } from "@/types/type"
import axios from "axios"


export const getStaffDetails = async (id: number): Promise<StaffProfile> => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}/api/staff/${id}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}



export const deleteStaffProfile = async (id: number) => {
    try {
        const res = await axios.delete(`${import.meta.env.VITE_APP_API_URL}/api/staff/${id}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)

    }
}



export const resetPassword = async (id: number, password: string) => {
    try {
        const res = await axios.put(`${import.meta.env.VITE_APP_API_URL}/api/staff/reset/${id}`, { password })
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}