import { operationFormSchema } from "@/formSchemas/addOperationFormSchema"
import { chargeFormSchema } from "@/formSchemas/chargeFormSchema"
import { medicationFormSchema } from "@/formSchemas/medicationFormSchema"
import { paymentFormSchema } from "@/formSchemas/paymentFormSchema"
import { timelineFormSchema } from "@/formSchemas/timelineFormSchema"
import { vitalFormSchema } from "@/formSchemas/vitalFormSchema"
import { ChargeDetailsType } from "@/types/opd_section/charges"
import { opdDetails, opdMedications, OPDs, Operation_Details, Operation_list, PaymentType, Timeline_List, Vitals_List } from "@/types/type"
import axios from "axios"
import { z } from "zod"


export const getOPDList = async (): Promise<OPDs[]> => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}/api/opd`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


// can filter list by date
export const getOPDlistBYpatient = async (patientId: number, date?: string) => {
    try {
        const params = { date }
        const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}/api/opd/patient/${patientId}`, { params })
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const searchOPDs = async (search: string) => {
    try {
        const params = { search }
        const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}/api/opd`, { params })
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const getOPD_Details = async (caseId: number): Promise<opdDetails> => {

    try {
        const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}/api/opd/${caseId}`)
        return res.data

    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


// for medication page

export const createMedication = async (caseId: number, formData: z.infer<typeof medicationFormSchema>) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_APP_API_URL}/api/medication/${caseId}`, formData)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}



export const getMedications = async (caseId: number): Promise<opdMedications[]> => {

    try {
        const params = { caseId }
        const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}/api/medication`, { params })
        return res.data

    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}



export const deleteMedication = async (id: number) => {
    try {
        const res = await axios.delete(`${import.meta.env.VITE_APP_API_URL}/api/medication/${id}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const searchMedications = async (caseId: number, date: string): Promise<opdMedications[]> => {
    try {
        const params = { caseId, date }
        const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}/api/medication`, { params })
        return res.data

    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}






// [For Vital pages]

export const createVital = async (patientId: number, caseId: number, formData: z.infer<typeof vitalFormSchema>) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_APP_API_URL}/api/vital/${patientId}/${caseId}`, formData)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}



export const getVitals = async (caseId: number): Promise<Vitals_List[]> => {
    try {
        const params = { caseId }
        const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}/api/vital`, { params })
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}



export const deleteVitals = async (id: number) => {
    try {
        console.log(id);

        const res = await axios.delete(`${import.meta.env.VITE_APP_API_URL}/api/vital/${id}`,)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}



export const searchVital = async (caseId: number, date: string): Promise<Vitals_List[]> => {
    try {
        const params = { caseId, date }
        const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}/api/vital`, { params })
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}







//  API Handlers for operation section


export const createOperation = async (patientId: number, caseId: number, formData: z.infer<typeof operationFormSchema>) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_APP_API_URL}/api/operation/${patientId}/${caseId}`, formData)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}




export const getOperation_List = async (caseId: number): Promise<Operation_list[]> => {
    try {
        const params = { caseId }
        const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}/api/operation`, { params })
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}



export const getOperation_Details = async (id: string): Promise<Operation_Details> => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}/api/operation/${id}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}



export const deleteOperation = async (id: string) => {
    try {
        const res = await axios.delete(`${import.meta.env.VITE_APP_API_URL}/api/operation/${id}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const updateOperation = async (id: string, formData: z.infer<typeof operationFormSchema>) => {
    try {
        const res = await axios.put(`${import.meta.env.VITE_APP_API_URL}/api/operation/${id}`, formData)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}






//  API handlers for timeline section

export const createTimeline = async (caseId: number, patientId: number, formData: z.infer<typeof timelineFormSchema>) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_APP_API_URL}/api/timeline/${patientId}/${caseId}`, formData)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}



export const getTimelines = async (caseId: number): Promise<Timeline_List[]> => {
    try {
        const params = { caseId }
        const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}/api/timeline`, { params })
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}



export const deleteTimeline = async (id: number) => {
    try {
        const res = await axios.delete(`${import.meta.env.VITE_APP_API_URL}/api/timeline/${id}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}



export const updateTimeine = async (id: number, formData: z.infer<typeof timelineFormSchema>) => {
    try {
        const res = await axios.put(`${import.meta.env.VITE_APP_API_URL}/api/timeline/${id}`, formData)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const getTimelineDetails = async (id: number): Promise<Timeline_List> => {  // this api willl not return Array of objects but same time of object
    try {
        const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}/api/timeline/${id}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}






// API Handlers for charges section


export const createCharges = async (caseId: number | string, formData: z.infer<typeof chargeFormSchema>) => {
    try {

        const res = await axios.post(`${import.meta.env.VITE_APP_API_URL}/api/charge/${caseId}`, formData)
        return res.data

    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}




export const updateCharge = async (id: string | number, formData: z.infer<typeof chargeFormSchema>) => {
    try {
        const res = await axios.put(`${import.meta.env.VITE_APP_API_URL}/api/charge/${id}`, formData)
        return res.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}




export const deleteCharge = async (id: string | number) => {
    try {
        const res = await axios.delete(`${import.meta.env.VITE_APP_API_URL}/api/charge/${id}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const getChargeDetails = async (id: number): Promise<ChargeDetailsType> => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}/api/charge/${id}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const getChargesList = async (caseId: string | number, page: number) => {
    try {
        const params = { caseId, page }
        const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}/api/charge`, { params })
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const searchCharges = async (caseId: string | number, date: string) => {
    try {
        const params = { caseId, date }
        const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}/api/charge`, { params })
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}




// API handlers for payment section

export const createPayment = async (caseId: number, formData: z.infer<typeof paymentFormSchema>) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_APP_API_URL}/api/payment/${caseId}`, formData)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


// if we provide search it only will search with respective OPD caseId
export const getPaymentsList = async (caseId: number, search?: string): Promise<PaymentType[]> => {
    try {
        const params = { caseId, search }
        const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}/api/payment`, { params })
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const getPaymentDetails = async (id: string): Promise<PaymentType> => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}/api/payment/${id}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const updatePayment = async (id: string, formData: z.infer<typeof paymentFormSchema>) => {
    try {
        const res = await axios.put(`${import.meta.env.VITE_APP_API_URL}/api/payment/${id}`, formData)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const deletePayment = async (id: string) => {
    try {
        const res = await axios.delete(`${import.meta.env.VITE_APP_API_URL}/api/payment/${id}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}