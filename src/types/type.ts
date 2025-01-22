// for roster list

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
    appointmentId: number,

    appointment: {

        appointment_date: string,
        symptom_description: string,
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
