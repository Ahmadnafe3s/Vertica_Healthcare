import { Events } from "@/types/setupTypes/events"
import axios from "axios"

// Props

type createEventProps = { title: string, start: Date | undefined, end: Date | undefined, allDay: boolean | undefined }

export const createEvents = async ({ title, start, end, allDay }: createEventProps) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_APP_API_URL}/api/setupEvent`, { title, start, end, allDay })
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}



export const getEvents = async (): Promise<Events> => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}/api/setupEvent`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}



export const deleteEvent = async (id: number) => {
    try {
        const res = await axios.delete(`${import.meta.env.VITE_APP_API_URL}/api/setupEvent/${id}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


