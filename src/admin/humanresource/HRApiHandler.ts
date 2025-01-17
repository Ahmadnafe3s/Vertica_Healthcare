import { createStaffFormSchema } from "@/formSchemas/createStaffFormSchema"
import { StaffProfile } from "@/types/type"
import axios from "axios"
import { z } from "zod"


export const fetchStaffProfile = async (id: number): Promise<StaffProfile> => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}/api/staff/${id}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
}



export const post = async (formData: z.infer<typeof createStaffFormSchema>) => {

    try {
        const res = await axios.post(`${import.meta.env.VITE_APP_API_URL}/api/staff`, formData)
        return res.data
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }

}

// staff id is coming from profile page passed here by createStaff component

export const update = async (id: number, formData: z.infer<typeof createStaffFormSchema>) => {
    try {
        const res = await axios.put(`${import.meta.env.VITE_APP_API_URL}/api/staff/${id}`, formData)
        return res.data
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
}