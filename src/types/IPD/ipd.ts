type IpdDataType = {
    id: string
    date: string
    patientId: number
    doctorId: number
    bedGroupId: number
    bedId: number
    symptom_type: string
    casualty: string
    patient: {
        name: string
        phone: string
    },
    doctor: {
        name: string
    },
    bedGroup: {
        name: string
    },
    bed: {
        name: string
    }
}


export type PaginatedIpdType = {
    data: IpdDataType[],
    total_pages: number
}



export type IpdInfo = {
    id: string;
    patientId: number;
    date: string;
    opdId: string;
    casualty: string
    old_patient: string
    reference: string;
    doctorId: number;
    bedGroupId: number;
    bedId: number;
    symptom_type: string;
    symptom_description: string;
    previous_medical_issue: string;
    note: string;
    patient: {
        name: string;
        phone: string;
    };
    doctor: {
        name: string;
    };
    bedGroup: {
        name: string;
    };
    bed: {
        name: string;
    };
}

