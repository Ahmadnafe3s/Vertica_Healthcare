import AxiosClient from "@/api/apiClient"
import { AssignedAmbulanceInfo, PaginatedAssignedAmbulances, PagintedAmbulance } from "@/types/ambulance/ambulance"
import { Params } from "@/types/type"


export const createAmbulance = async <T>(formData: T) => {
    try {
        const res = await AxiosClient.post('/api/ambulance', formData)
        return res.data
    } catch (error: any) {
        const err = error?.response ? error.response.data.message : 'Something went wrong'
        throw new Error(err)
    }
}


export const updateAmbulance = async <T>(formData: T, id: number) => {
    try {
        const res = await AxiosClient.put(`/api/ambulance/${id}`, formData)
        return res.data
    } catch (error: any) {
        const err = error?.response ? error.response.data.message : 'Something went wrong'
        throw new Error(err)
    }
}


export const deleteAmbulance = async (id: number) => {
    try {
        const res = await AxiosClient.delete(`/api/ambulance/${id}`)
        return res.data
    } catch (error: any) {
        const err = error?.response ? error.response.data.message : 'Something went wrong'
        throw new Error(err)
    }
}



export const getAmbulances = async (params: Params): Promise<PagintedAmbulance> => {
    try {
        const res = await AxiosClient.get(`/api/ambulance`, { params })
        return res.data
    } catch (error: any) {
        const err = error?.response ? error.response.data.message : 'Something went wrong'
        throw new Error(err)
    }
}



// Assign Ambulances


export const createAssignAmbulance = async <T>(formData: T) => {
    try {
        const res = await AxiosClient.post(`/api/ambulance/assign`, formData)
        return res.data
    } catch (error: any) {
        const err = error?.response ? error.response.data.message : 'Something went wrong'
        throw new Error(err)
    }
}


export const updateAssignedAmbulance = async<T>(formData: T, id: string) => {
    try {
        const res = await AxiosClient.put(`/api/ambulance/assign/${id}`, formData)
        return res.data
    } catch (error: any) {
        const err = error?.response ? error.response.data.message : 'Something went wrong'
        throw new Error(err)
    }
}

export const deleteAssignedAmbulance = async (id: string) => {
    try {
        const res = await AxiosClient.delete(`/api/ambulance/assign/${id}`)
        return res.data
    } catch (error: any) {
        const err = error?.response ? error.response.data.message : 'Something went wrong'
        throw new Error(err)
    }
}


export const getAssignedAmbulances = async (params: Params): Promise<PaginatedAssignedAmbulances> => {
    try {
        const res = await AxiosClient.get(`/api/ambulance/assign`, { params })
        return res.data
    } catch (error: any) {
        const err = error?.response ? error.response.data.message : 'Something went wrong'
        throw new Error(err)
    }
}


export const getAssignedAmbulanceInfo = async (id: string): Promise<AssignedAmbulanceInfo> => {
    try {
        const res = await AxiosClient.get(`/api/ambulance/assign/${id}`)
        return res.data
    } catch (error: any) {
        const err = error?.response ? error.response.data.message : 'Something went wrong'
        throw new Error(err)
    }
}