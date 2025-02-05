// for roster list

import { number } from "zod";

export interface Shift {
    id: number;
    staffId: number;
    shiftStartTime: string;
    shiftEndTime: string;
    shiftStartDate: string;
    shiftEndDate: string;
    shift: string;
    note: string;
    staff: {
        name: string,
        department: string
    }
}


// for profile

export interface StaffProfile {
    id: number;
    name: string;
    role: string;
    designation: string;
    department: string;
    specialist: string;
    fees: string;
    father_name: string;
    mother_name: string;
    gender: string;
    marital_status: string;
    blood_group: string;
    dob: string; // Date of birth in YYYY-MM-DD format
    date_of_joining: string; // Joining date in YYYY-MM-DD format
    phone: string;
    emergency_contact: string;
    email: string;
    image: string | null; // URL to image or null if not provided
    current_address: string;
    permanent_address: string;
    qualification: string;
    work_experience: string;
    note: string;
    PAN: string;
    national_identification_number: string;
    local_identification_number: string;
}


export interface Patients {
    id: number,
    name: string
}


export interface Doctors {
    shift: string,
    staff: {
        id: number,
        name: string,
        fees: string,
        specialist: string
    }
}



export interface Appointments {
    id: number,
    doctorId: number,
    patientId: number,
    fees: string,
    shift: string,
    appointment_date: string,
    appointment_priority: string,
    symptom_type: string,
    symptom_description: string,
    payment_mode: string,
    status: string,
    discount: string,
    alternative_address: string,
    reference: string,
    previous_medical_issue: string,
    message: string,
    doctor: {
        name: string
    },
    patient: {
        name: string,
        phone: string,
        gender: string
    }
}




export interface AppointmentDetails {
    id: number,
    doctorId: number,
    patientId: number,
    fees: string,
    shift: string,
    appointment_date: string,
    appointment_priority: string,
    symptom_type: string,
    symptom_description: string,
    payment_mode: string,
    status: string,
    discount: string,
    alternative_address: string,
    reference: string,
    previous_medical_issue: string,
    message: string,
    patient: {
        name: string,
        phone: string,
        email: string,
        gender: string,
        age: string,
        blood_group: string,
        address: string,
    },
    doctor: {
        name: string,
        gender: string,
        phone: string,
        department: string,
        specialist: string
    }
}




export interface MedicineList {
    id: number,
    name: string,
    company: string,
    composition: string,
    category: string,
    group: string,
    quantity: number,
}


export interface MedicineDetails {
    id: number,
    name: string,
    category: string,
    company: string,
    composition: string,
    group: string,
    unit: string,
    min_level: string,
    reorder_level: string,
    quantity: number,
    vat: string,
    rack_no: string,
    note: string
}


export interface MedicinePurchaseList {
    id: number,
    purchase_date: string,
    amount: number,
    supplier_name: string,
    tax: string,
    quantity: number,
    discount: string,
    total_amount: number,
    medicine: {
        name: string,
        group: string
    }
}




export interface MedicinePurchaseDetails {
    id: number,
    category: string,
    medicineId: number,
    supplier_name: string,
    batch_no: string,
    purchase_date: string,
    expiry_date: string,
    MRP: string,
    sale_price: string,
    packing_quantity: string,
    quantity: 100,
    purchase_price: string,
    tax: 18,
    discount: string,
    amount: 10000,
    total_amount: 11446,
    payment_mode: string,
    note: string,
    medicine: {
        name: string,
        group: string
    }
}



export interface OPDs {  // it will be Array of objects

    id: number,
    caseId: number,
    patientId: number,
    appointmentId: number,

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
    }
}



export interface opdMedications {
    id: number,
    caseId: number,
    medicineId: number,
    date: string,
    time: string,
    dose: string,
    note: string,
    medicine: {
        name: string,
        category: string,
        unit: string
    }
}


export interface Vitals_List {
    id: number,
    caseId: number,
    name: string,
    value: string,
    date: string
}



export interface Operation_list {
    id: string,
    caseId: number,
    name: string,
    category: string,
    date: string,
    ot_technician: string,
}


export interface Operation_Details {  // it is only object (return by server)
    id: string,
    patientId: number,
    caseId: number,
    category: string,
    name: string,
    date: string,
    doctorId: number,
    assistant_1: string,
    assistant_2: string,
    anesthetist: string,
    anesthesia_type: string,
    ot_technician: string,
    ot_assistant: string,
    note: string,
    result: string,
    patient: {
        name: string,
    },
    doctor: {
        name: string,
    }
}


export interface opdDetails {
    id: number,
    caseId: number,
    appointmentId: number,
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
    medication: opdMedications[],
    Vitals: Vitals_List[],
    Operation: Operation_list[],
    timeline: Timeline_List[],
    charges: ChargeListType[],
    Payment: PaymentType[]
}



export interface Timeline_List {
    id: 1,
    date: string,
    title: string,
    description: string,
}




export interface ChargeListType {
    id: number
    date: string,
    name: string,
    charge_type: string,
    tpa: number,
    amount: number
    net_amount: number
}


export interface ChargeDetails {
    id: number,
    caseId: number,
    charge_type: string,
    category: string,
    name: string,
    amount: number,
    tpa: number,
    date: string,
    total: number,
    tax: number,
    discount: number,
    net_amount: number,
}


export interface PaymentType {
    id: string,
    caseId: number,
    date: string,
    amount: number,
    payment_mode: string,
    note: string,
}