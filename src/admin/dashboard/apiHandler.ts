import { AdminDash_MM_IncExp, AdminDashIncExp, AdminDashVisitors } from "@/types/dashboard/adminDashboard"
import axios from "axios"


export const getAdminDashIncExp = async (): Promise<AdminDashIncExp> => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}/api/dashboard/admin`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)

    }
}

export const getAdminDash_MM_IncExp = async (year?: string): Promise<AdminDash_MM_IncExp[]> => {
    try {
        const params = { year }
        const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}/api/dashboard/admin/monthly`, { params })
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)

    }
}


export const getAdminDashVisitors = async ():Promise<AdminDashVisitors[]> => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}/api/dashboard/admin/visitors`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}