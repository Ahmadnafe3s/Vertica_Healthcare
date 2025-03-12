import AxiosClient from "@/api/apiClient"
import { AdminDash_MM_IncExp, AdminDashAppmtReport, AdminDashIncExp, AdminDashVisitors } from "@/types/dashboard/adminDashboard"


export const getAdminDashIncExp = async (): Promise<AdminDashIncExp> => {
    try {
        const res = await AxiosClient.get(`/api/dashboard/admin`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)

    }
}

export const getAdminDash_MM_IncExp = async (year?: number): Promise<AdminDash_MM_IncExp[]> => {
    try {
        const params = { year }
        const res = await AxiosClient.get(`/api/dashboard/admin/monthly`, { params })
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)

    }
}


export const getAdminDashVisitors = async ():Promise<AdminDashVisitors[]> => {
    try {
        const res = await AxiosClient.get(`/api/dashboard/admin/visitors`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const getAdminDashAppointmentReport = async ():Promise<AdminDashAppmtReport> => {
    try {
        const res = await AxiosClient.get(`/api/dashboard/admin/appointmentReport`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}