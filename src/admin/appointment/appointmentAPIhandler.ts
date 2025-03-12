import AxiosClient from "@/api/apiClient"
import { appointmentFormSchema } from "@/formSchemas/AppointmentFormSchema"
import { Appointment, AppointmentDetails } from "@/types/appointment/appointment"
import { Patients } from "@/types/type"
import { z } from "zod"


// fetching patients on serach

export const fetchPatients = async (value: string): Promise<Patients[]> => {
    try {
        const res = await AxiosClient.get(`/api/patient?search=${value}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)

    }
}


// fetching doctors according to appointment date

export const fetchDoctors = async (appointmentDate?: string) => {
    try {
        const params = { appointmentDate }
        const res = await AxiosClient.get(`/api/staff/doctor/list`, { params })
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


// for creating appointment

export const createAppointment = async (appointmentDetails: z.infer<typeof appointmentFormSchema>) => {
    try {
        const res = await AxiosClient.post(`/api/appointment`, appointmentDetails)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


// get appointment list

export const fetchAppointments = async (params: { page?: number, limit?: number, status?: string, search?: string }): Promise<Appointment> => {
    try {
        const res = await AxiosClient.get(`/api/appointment`, { params })
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}



// for updating staus

export const updateStatus = async (id: string, status: string) => {
    try {
        const res = await AxiosClient.put(`/api/appointment/status/${id}`, { status })
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


// for getting appointment details

export const getAppointmentDetails = async (id: string): Promise<AppointmentDetails> => {
    try {
        const res = await AxiosClient.get(`/api/appointment/${id}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


// delete appointment 

export const deleteAppointment = async (id: string) => {
    try {
        const res = await AxiosClient.delete(`/api/appointment/${id}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}