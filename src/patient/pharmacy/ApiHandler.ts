import axios from "axios"



export const getPatientPharmacyBills = async (params: { page?: number, limit?: number, search?: string }, patientId: number) => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}/api/pharmacy/bill/list/patient/${patientId}`, { params })
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}