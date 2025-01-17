import { appointmentFormSchema } from "@/formSchemas/AppointmentFormSchema"
import { AppointmentDetails, Appointments, Patients } from "@/types/type"
import axios from "axios"
import { z } from "zod"


// fetching patients on serach

export const fetchPatients = async (value: string): Promise<Patients[]> => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}/api/patient?search=${value}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)

    }
}


// fetching doctors according to appointment date

export const fetchDoctors = async (appointmentDate: string) => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}/api/staff/doctor/${appointmentDate}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


// for creating appointment

export const createAppointment = async (appointmentDetails: z.infer<typeof appointmentFormSchema>) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_APP_API_URL}/api/appointment`, appointmentDetails)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


// get appointment list

export const fetchAppointments = async (status?: string): Promise<Appointments[]> => {
    try {
        const params = status ? { status } : {}
        const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}/api/appointment`, { params })
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}



// for updating staus

export const updateStatus = async (id: number, status: string) => {
    try {
        const res = await axios.put(`${import.meta.env.VITE_APP_API_URL}/api/appointment/status/${id}`, { status })
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


// search appointment

export const searchAppointment = async (search: string) => {
    try {
        const params = { search }
        const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}/api/appointment`, { params })
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


// for getting appointment details

export const fetchAppointmentDetails = async (id: number): Promise<AppointmentDetails> => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}/api/appointment/${id}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


// delete appointment 

export const deleteAppointment = async (id: number) => {
    try {
        const res = await axios.delete(`${import.meta.env.VITE_APP_API_URL}/api/appointment/${id}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}