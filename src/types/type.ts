export interface Patients {
    id: number,
    name: string
}


export interface Doctors {
    shift: string,
    staff: {
        id: number,
        name: string,
        emergency_fees: number,
        normal_fees: number,
    }
}





// Params

export type Params = { page?: number, limit?: number, search?: string | null }

export type OIParams = { opdId?: string, ipdId?: string, patientId?: number }