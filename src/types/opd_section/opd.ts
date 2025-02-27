import { chargeListDataType } from "./charges"
import { opdMedicationData } from "./medication"
import { operation } from "./operationType"
import { Payment } from "./payment"
import { timeline } from "./timeline"
import { VitalType } from "./vitals"

interface opdData {  // it will be Array of objects
    id: string,
    patientId: number,
    appointmentId: string,

    appointment: {

        appointment_date: string,
        symptom_type: string,
        previous_medical_issue: string,
        reference: string,

        patient: {
            id: number,
            name: string
        },

        doctor: {
            id: number,
            name: string
        }
    },
    prescriptions: {
        id: number
    }
}


export interface OPDs {
    data: opdData[],
    total_pages: number
}


export interface opdDetails {
    id: number,
    appointmentId: string,
    appointment: {
        symptom_description: string,
        doctor: {
            id: number,
            name: string,
            image: string,
            gender: string
        },
        patient: {
            id: number,
            name: string,
            gender: string,
            guardian_name: string,
            aadhar: string,
            address: string,
            phone: string,
            blood_group: string,
            age: string,
            image: null | string,
            alergies: string
        }
    },
    medications: opdMedicationData[],
    Vitals: VitalType[],
    Operations: operation[],
    timelines: timeline[],
    charges: chargeListDataType[],
    Payments: Payment[]
}