import AxiosClient from "@/api/apiClient"


export const getPatientDashTotalCount = async (patientId: number) => {
    try {
        const res = await AxiosClient.get(`/api/dashboard/patient/totalCount/${patientId}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}



export const getYearlyApppointmentsReport = async (patientId: number, params?: { year?: number },) => {
    try {
        const res = await AxiosClient.get(`/api/dashboard/patient/yearlyAppointments/${patientId}`, { params })
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const getApppointmentStatusCount = async (patientId: number, params?: { year?: number },) => {
    try {
        const res = await AxiosClient.get(`/api/dashboard/patient/statusCount/${patientId}`, { params })
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const getPatientTotalExpenses = async (patientId: number) => {
    try {
        const res = await AxiosClient.get(`/api/dashboard/patient/totalExpenses/${patientId}`,)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}