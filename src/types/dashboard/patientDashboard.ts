
export type PatientDashTotalCount = {
    appointments: number,
    opds: number,
    pharmacies: number,
    radiology: number
    pathology: number
    issueBlood: number,
    issueBloodComponent: number,
    ambulance: number
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