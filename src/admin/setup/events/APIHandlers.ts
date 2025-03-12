import AxiosClient from "@/api/apiClient"
import { Events } from "@/types/setupTypes/events"

// Props

type createEventProps = { title: string, start: Date | undefined, end: Date | undefined, allDay: boolean | undefined }

export const createEvents = async ({ title, start, end, allDay }: createEventProps) => {
    try {
        const res = await AxiosClient.post(`/api/setupEvent`, { title, start, end, allDay })
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}



export const getEvents = async (): Promise<Events> => {
    try {
        const res = await AxiosClient.get(`/api/setupEvent`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}



export const deleteEvent = async (id: number) => {
    try {
        const res = await AxiosClient.delete(`/api/setupEvent/${id}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


