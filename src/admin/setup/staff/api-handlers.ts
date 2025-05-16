import AxiosClient from "@/api/apiClient";
import { z, ZodType } from "zod";


const SetupStaffApi = {

    createDepartment: async <T extends ZodType<any>>(formData: z.infer<T>) => {
        try {
            const res = await AxiosClient.post('/api/setupStaff/department', formData)
            return res.data
        } catch (error: any) {
            const err = error.response.data.message || "Something went wrong"
            throw new Error(err)
        }
    },

    updateDepartment: async <T extends ZodType<any>>(id: number, formData: z.infer<T>) => {
        try {
            const res = await AxiosClient.put(`/api/setupStaff/department/${id}`, formData)
            return res.data
        } catch (error: any) {
            const err = error.response.data.message || "Something went wrong"
            throw new Error(err)
        }
    },

    deleteDepartment: async (id: number) => {
        try {
            const res = await AxiosClient.delete(`/api/setupStaff/department/${id}`)
            return res.data
        } catch (error: any) {
            const err = error.response.data.message || "Something went wrong"
            throw new Error(err)
        }
    },

    getDepartments: async () => {
        try {
            const res = await AxiosClient.get(`/api/setupStaff/department`)
            return res.data
        } catch (error: any) {
            const err = error.response.data.message || "Something went wrong"
            throw new Error(err)
        }
    },

    createDesignation: async <T extends ZodType<any>>(formData: z.infer<T>) => {
        try {
            const res = await AxiosClient.post('/api/setupStaff/designation', formData)
            return res.data
        } catch (error: any) {
            const err = error.response.data.message || "Something went wrong"
            throw new Error(err)
        }
    },

    updateDesignation: async <T extends ZodType<any>>(id: number, formData: z.infer<T>) => {
        try {
            const res = await AxiosClient.put(`/api/setupStaff/designation/${id}`, formData)
            return res.data
        } catch (error: any) {
            const err = error.response.data.message || "Something went wrong"
            throw new Error(err)
        }
    },

    deleteDesignation: async (id: number) => {
        try {
            const res = await AxiosClient.delete(`/api/setupStaff/designation/${id}`)
            return res.data
        } catch (error: any) {
            const err = error.response.data.message || "Something went wrong"
            throw new Error(err)
        }
    },

    getDesignations: async () => {
        try {
            const res = await AxiosClient.get(`/api/setupStaff/designation`)
            return res.data
        } catch (error: any) {
            const err = error.response.data.message || "Something went wrong"
            throw new Error(err)
        }
    },

    createSpecialization: async <T extends ZodType<any>>(formData: z.infer<T>) => {
        try {
            const res = await AxiosClient.post('/api/setupStaff/specialization', formData)
            return res.data
        } catch (error: any) {
            const err = error.response.data.message || "Something went wrong"
            throw new Error(err)
        }
    },

    updateSpecialization: async <T extends ZodType<any>>(id: number, formData: z.infer<T>) => {
        try {
            const res = await AxiosClient.put(`/api/setupStaff/specialization/${id}`, formData)
            return res.data
        } catch (error: any) {
            const err = error.response.data.message || "Something went wrong"
            throw new Error(err)
        }
    },

    deleteSpecialization: async (id: number) => {
        try {
            const res = await AxiosClient.delete(`/api/setupStaff/specialization/${id}`)
            return res.data
        } catch (error: any) {
            const err = error.response.data.message || "Something went wrong"
            throw new Error(err)
        }
    },

    getSpecializations: async () => {
        try {
            const res = await AxiosClient.get(`/api/setupStaff/specialization`)
            return res.data
        } catch (error: any) {
            const err = error.response.data.message || "Something went wrong"
            throw new Error(err)
        }
    }
}




export default SetupStaffApi