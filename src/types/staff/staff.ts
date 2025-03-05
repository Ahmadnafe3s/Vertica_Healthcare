
export interface staffsData {
    name: string, id: number, role: string, phone: string, image: string, gender: string
}



export interface staffs {
    data: staffsData[],
    total_pages: number
}