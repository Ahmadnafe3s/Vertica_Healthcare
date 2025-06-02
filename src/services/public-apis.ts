import AxiosClient from "@/api/apiClient"
import { Params } from "@/types/type"

const pulicApi = {
    async getLatestNews(params: Params) {
        try {
            const res = await AxiosClient.get('/api/public/latest-news', { params })
            return res.data
        } catch (error: any) {
            const err = error.response?.data.message || 'Connection error'
            throw new Error(err)
        }
    },
    async getAnualCalendars() {
        try {
            const res = await AxiosClient.get('/api/public/annual-calendar')
            return res.data
        } catch (error: any) {
            const err = error.response?.data.message || 'Connection error'
            throw new Error(err)
        }
    },
    async getEvents(params: Params) {
        try {
            const res = await AxiosClient.get('/api/public/events', { params })
            return res.data
        } catch (error: any) {
            const err = error.response?.data.message || 'Connection error'
            throw new Error(err)
        }
    }
}




export default pulicApi