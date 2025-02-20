export interface medicines {
    id: number
    name: string,
    company: {
        id: number
        name: string,
    },
    composition: string,
    category: {
        id: number
        name: string,
    },
    group: {
        id: number
        name: string,
    },
    quantity: number
}



export interface medicineDetails {
    id: number,
    name: string,
    categoryId: number,
    companyId: number,
    composition: string,
    groupId: number,
    unitId: number,
    min_level: string,
    reorder_level: string,
    quantity: number,
    vat: string,
    rack_no: string,
    note: string,
    category: {
        id: number,
        name: string,
    },
    company: {
        id: number,
        name: string,
    },
    unit: {
        id: number,
        name: string,
    },
    group: {
        id: number,
        name: string,
    }
}