

// for profile

export interface StaffProfile {
    id: number;
    name: string;
    roleId: number,
    role: { name: string };
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
    image: string | undefined; // URL to image or null if not provided
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
        fees: number,
        specialist: string
    }
}





// Params

export type Params = { page?: number, limit?: number, search?: string | null }

export type OIParams = { opdId?: string, ipdId?: string, patientId?: number }