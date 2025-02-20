export interface opdMedications {
    id: number,
    opdId: number,
    medicineId: number,
    date: string,
    time: string,
    dose: string,
    note: string,
    medicine: {
        name: string,
        category: {
            id: number,
            name: string
        },
        unit: {
            id: number,
            name: string
        }
    }
}



export interface medicationDetail {
    id: number,
    opdId: string,
    medicineId: number,
    date: string,
    time: string,
    dose: string,
    note: string,
    medicine: {
        name: string,
        category: {
            name: string,
        }
    }
}