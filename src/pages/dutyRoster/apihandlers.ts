import AxiosClient from "@/api/apiClient"
import { AssignRosterSchema } from "@/formSchemas/assignRosterFormSchema"
import { RosterDetails, Rosters } from "@/types/dutyRoster/DutyRoster"
import { z } from "zod"



// create roster
export const createRoster = async (formData: z.infer<typeof AssignRosterSchema>) => {
    try {
        const res = await AxiosClient.post(`/api/roster`, formData)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


// update roster
export const updateRoster = async (formData: z.infer<typeof AssignRosterSchema>, ID: number) => {
    try {
        const res = await AxiosClient.put(`/api/roster/${ID}`, formData)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


// for edit mode (retriving data)
export const getRosterDetails = async (ID: number): Promise<RosterDetails> => {
    try {
        const res = await AxiosClient.get(`/api/roster/${ID}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}







// [ for roster report page ]


// fetching roster list

export const getRosters = async (params: { page?: number, limit?: number, credentials?: string, date?: string, period?: { startDate: string, endDate: string } }): Promise<Rosters> => {
    try {
        const res = await AxiosClient.get(`/api/roster`, { params })
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


// delete roster

export const deleteRoster = async (id: number | null) => {
    try {
        const res = await AxiosClient.delete(`/api/roster/${id}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}