import AxiosClient from "@/api/apiClient"

export const getDoctorDashTotalCount = async (doctorId: number) => {
    try {
        const res = await AxiosClient.get(`/api/dashboard/doctor/totalCount/${doctorId}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}
