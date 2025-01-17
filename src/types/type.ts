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
        address: string
    },
    doctor: {
        name: string,
        gender: string,
        phone: string,
        department: string,
        specialist: string
    }
}