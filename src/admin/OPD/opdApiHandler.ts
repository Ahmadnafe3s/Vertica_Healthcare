import AxiosClient from "@/api/apiClient"
import { operationFormSchema } from "@/formSchemas/addOperationFormSchema"
import { chargeFormSchema } from "@/formSchemas/chargeFormSchema"
import { createPrescriptionFormSchema } from "@/formSchemas/createPrescriptionFormSchema"
import { medicationFormSchema } from "@/formSchemas/medicationFormSchema"
import { paymentFormSchema } from "@/formSchemas/paymentFormSchema"
import { timelineFormSchema } from "@/formSchemas/timelineFormSchema"
import { vitalFormSchema } from "@/formSchemas/vitalFormSchema"
import { ChargeDetailsType } from "@/types/opd_section/charges"
import { opdMedications } from "@/types/opd_section/medication"
import { opdDetails, OPDs } from "@/types/opd_section/opd"
import { operationDetailsType, PaginatedOperations } from "@/types/opd_section/operationType"
import { Payment, paymentData } from "@/types/opd_section/payment"
import { prescriptionDetail } from "@/types/opd_section/prescription"
import { timeline } from "@/types/opd_section/timeline"
import { VitalType } from "@/types/opd_section/vitals"
import { z } from "zod"


export const getOPDs = async (params: { search?: string, page?: number, limit?: number, patientId?: number }): Promise<OPDs> => {
    try {
        const res = await AxiosClient.get(`/api/opd`, { params })
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const getOPD_Details = async (opdId: string): Promise<opdDetails> => {

    try {
        const res = await AxiosClient.get(`/api/opd/${opdId}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const getPrintBillDetails = async (opdId: string) => {
    try {
        const res = await AxiosClient.get(`/api/opd/printbill/${opdId}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const getTreatmentHistory = async (params: { page?: number, limit?: number, date?: string }, patientId: number): Promise<OPDs> => {
    try {
        const res = await AxiosClient.get(`/api/opd/history/${patientId}`, { params })
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


// for medication page

export const createMedication = async (opdId: string, formData: z.infer<typeof medicationFormSchema>) => {
    try {
        const res = await AxiosClient.post(`/api/medication/${opdId}`, formData)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}



export const getMedications = async (params: { opdId: string, date?: string, page?: number, limit?: number }): Promise<opdMedications> => {

    try {
        const res = await AxiosClient.get(`/api/medication`, { params })
        return res.data

    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}



export const deleteMedication = async (id: number) => {
    try {
        const res = await AxiosClient.delete(`/api/medication/${id}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const getMedicationDetails = async (id: number) => {
    try {
        const res = await AxiosClient.get(`/api/medication/${id}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const updateMedication = async (id: number, formData: z.infer<typeof medicationFormSchema>) => {
    try {
        const res = await AxiosClient.put(`/api/medication/${id}`, formData)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}





// [For Vital pages]

export const createVital = async (patientId: number, opdId: string, formData: z.infer<typeof vitalFormSchema>) => {
    try {
        const res = await AxiosClient.post(`/api/vital/${patientId}/${opdId}`, formData)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}



export const getVitals = async (opdId: string): Promise<VitalType[]> => {
    try {
        const params = { opdId }
        const res = await AxiosClient.get(`/api/vital`, { params })
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}



export const deleteVitals = async (id: number) => {
    try {
        const res = await AxiosClient.delete(`/api/vital/${id}`,)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}



export const searchVital = async (opdId: string, date: string): Promise<VitalType[]> => {
    try {
        const params = { opdId, date }
        const res = await AxiosClient.get(`/api/vital`, { params })
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}







//  API Handlers for operation section


export const createOperation = async (patientId: number, opdId: string, formData: z.infer<typeof operationFormSchema>) => {
    try {

        const res = await AxiosClient.post(`/api/operation/${patientId}/${opdId}`, formData)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}




export const getOperations = async (params: { opdId: string, page: number, limit?: number, search?: string }): Promise<PaginatedOperations> => {
    try {
        const res = await AxiosClient.get(`/api/operation`, { params })
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}



export const getOperation_Details = async (id: string): Promise<operationDetailsType> => {
    try {
        const res = await AxiosClient.get(`/api/operation/${id}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}



export const deleteOperation = async (id: string) => {
    try {
        const res = await AxiosClient.delete(`/api/operation/${id}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const updateOperation = async (id: string, formData: z.infer<typeof operationFormSchema>) => {
    try {
        const res = await AxiosClient.put(`/api/operation/${id}`, formData)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}






//  API handlers for timeline section

export const createTimeline = async (opdId: string, patientId: number, formData: z.infer<typeof timelineFormSchema>) => {
    try {
        const res = await AxiosClient.post(`/api/timeline/${patientId}/${opdId}`, formData)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}



export const getTimelines = async (opdId: string): Promise<timeline[]> => {
    try {
        const params = { opdId }
        const res = await AxiosClient.get(`/api/timeline`, { params })
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}



export const deleteTimeline = async (id: number) => {
    try {
        const res = await AxiosClient.delete(`/api/timeline/${id}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}



export const updateTimeine = async (id: number, formData: z.infer<typeof timelineFormSchema>) => {
    try {
        const res = await AxiosClient.put(`/api/timeline/${id}`, formData)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const getTimelineDetails = async (id: number): Promise<timeline> => {  // this api willl not return Array of objects but same time of object
    try {
        const res = await AxiosClient.get(`/api/timeline/${id}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}






// API Handlers for charges section


export const createCharges = async (caseId: number | string, formData: z.infer<typeof chargeFormSchema>) => {
    try {

        const res = await AxiosClient.post(`/api/charge/${caseId}`, formData)
        return res.data

    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}




export const updateCharge = async (id: string | number, formData: z.infer<typeof chargeFormSchema>) => {
    try {
        const res = await AxiosClient.put(`/api/charge/${id}`, formData)
        return res.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}




export const deleteCharge = async (id: string | number) => {
    try {
        const res = await AxiosClient.delete(`/api/charge/${id}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const getChargeDetails = async (id: number): Promise<ChargeDetailsType> => {
    try {
        const res = await AxiosClient.get(`/api/charge/${id}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const getCharges = async (params: { opdId: string, page?: number, limit?: number, date?: string }) => {
    try {
        const res = await AxiosClient.get(`/api/charge`, { params })
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


// API handlers for payment section

export const createPayment = async (opdId: string, formData: z.infer<typeof paymentFormSchema>) => {
    try {
        const res = await AxiosClient.post(`/api/payment/${opdId}`, formData)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


// if we provide search it only will search with respective OPD caseId
export const getPaymentsList = async (params: { opdId: string, search?: string, page?: number, limit?: number }): Promise<Payment> => {
    try {
        const res = await AxiosClient.get(`/api/payment`, { params })
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const getPaymentDetails = async (id: string): Promise<paymentData> => {
    try {
        const res = await AxiosClient.get(`/api/payment/${id}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const updatePayment = async (id: string, formData: z.infer<typeof paymentFormSchema>) => {
    try {
        const res = await AxiosClient.put(`/api/payment/${id}`, formData)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const deletePayment = async (id: string) => {
    try {
        const res = await AxiosClient.delete(`/api/payment/${id}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}





// API handlers for prescription section


export const createPrescription = async (opdId: string, patientId: number, formData: z.infer<typeof createPrescriptionFormSchema>) => {
    try {
        const res = await AxiosClient.post(`/api/prescription/${opdId}/${patientId}`, formData)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const updatePrescription = async (id: number, formData: z.infer<typeof createPrescriptionFormSchema>) => {
    try {
        const res = await AxiosClient.put(`/api/prescription/${id}`, formData)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const deletePrescription = async (id: number) => {
    try {
        const res = await AxiosClient.delete(`/api/prescription/${id}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const getPrescriptionDetails = async (id: number): Promise<prescriptionDetail> => {
    try {
        const res = await AxiosClient.get(`/api/prescription/${id}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}
