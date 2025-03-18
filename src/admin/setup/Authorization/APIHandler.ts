import AxiosClient from "@/api/apiClient"
import { z } from "zod"
import { roleFormSchema } from "./role/createRole"


export const createRole = async (formData: z.infer<typeof roleFormSchema>) => {
    try {
        const res = await AxiosClient.post(`/api/setupAuthz/role`, formData)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}



export const getRoles = async () => {
    try {
        const res = await AxiosClient.get(`/api/setupAuthz/role`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const updateRole = async (formData: z.infer<typeof roleFormSchema>, id: number) => {
    try {
        const res = await AxiosClient.put(`/api/setupAuthz/role/${id}`, formData)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const deleteRole = async (id: number) => {
    try {
        const res = await AxiosClient.delete(`/api/setupAuthz/role/${id}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const getRoleDetails = async (id: number) => {
    try {
        const res = await AxiosClient.get(`/api/setupAuthz/role/${id}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}




// for permissions

export const createPermission = async (permission: string, roleId: number) => {
    try {
        const res = await AxiosClient.post(`/api/setupAuthz/permission/${roleId}`, { name: permission })
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const deletePermission = async (name: string, roleId: number) => {
    try {
        const params = { name }
        const res = await AxiosClient.delete(`/api/setupAuthz/permission/${roleId}`, { params })
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const getPermissions = async (params: { roleId?: number, role?: string }): Promise<{ id: number, name: string }[]> => {
    try {
        const res = await AxiosClient.get(`/api/setupAuthz/permission`, { params })
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}