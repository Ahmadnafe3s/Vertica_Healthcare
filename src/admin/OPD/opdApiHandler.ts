import { OPDs } from "@/types/type"
import axios from "axios"


export const getOPDList = async (): Promise<OPDs[]> => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}/api/opd`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}