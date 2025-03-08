import { number } from "zod"

export type PatientDashTotalCount = {
    appointments: number,
    opds: number,
    pharmacies: number,
}



export type YearlyAppointments = {
    "month": string
    "appointments": number
}[]



export type StatusCount = {
    "status": string,
    "count": number,
    "fill": string,
}[]


export type Expenses = {
    "expenses": number
}