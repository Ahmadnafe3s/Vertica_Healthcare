import axios from "axios"

export const getDoctorDashTotalCount = async (doctorId: number) => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}/api/dashboard/doctor/totalCount/${doctorId}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}
