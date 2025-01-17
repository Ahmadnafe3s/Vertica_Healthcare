import { AssignRosterSchema } from "@/formSchemas/assignRosterFormSchema"
import { Shift } from "@/types/type"
import axios from "axios"
import { z } from "zod"



// create roster
export const createRoster = async (formData: z.infer<typeof AssignRosterSchema>) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_APP_API_URL}/api/roster`, formData)
        return res.data.message
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


// update roster
export const updateRoster = async (formData: z.infer<typeof AssignRosterSchema>, ID: number) => {
    try {
        const res = await axios.put(`${import.meta.env.VITE_APP_API_URL}/api/roster/${ID}`, formData)
        return res.data.message
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}



// fetching staffs list for select option

export const fetchStaffs = async () => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}/api/staff`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


// for edit mode (retriving data)

export const fetchRosterDetails = async (ID: number): Promise<Shift> => {
    try {
        const res = await axios.get<Shift>(`${import.meta.env.VITE_APP_API_URL}/api/roster/${ID}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}







// [ for roster report page ]


// fetching roster list

export const fetchRosterlist = async (): Promise<Shift[]> => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}/api/roster`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


//search by credentials

export const searchBYid = async (credentials: string): Promise<Shift[]> => {
    try {
        const params = { credentials }
        const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}/api/roster`, { params })
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


//search by DATE

export const searchBYdate = async (date: string): Promise<Shift[]> => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}/api/roster?date=${date}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


//search by Period

export const searchBYPeriod = async (startDate: string, endDate: string): Promise<Shift[]> => {
    try {
        if (!startDate && endDate) throw new Error("Please enter period correctly");
        const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}/api/roster?startDate=${startDate}&&endDate=${endDate}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message || error.message)
    }
}


// delete roster

export const deleteRoster = async (id: number | null) => {
    try {
        const res = await axios.delete(`${import.meta.env.VITE_APP_API_URL}/api/roster/${id}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}