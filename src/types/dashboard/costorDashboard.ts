export type DoctorDashTotalCount = {
    appointments: number,
    opds: number,
    appointment: {
        status: string,
        count: number,
    }[]
}