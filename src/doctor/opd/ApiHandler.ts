import axios from "axios"

export const getDoctorOpds = async (params: { page: number, limit: number, search?: string }, doctorId: number) => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}/api/opd/doctor/${doctorId}`, { params })
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}