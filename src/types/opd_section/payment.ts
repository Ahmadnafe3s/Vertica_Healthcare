export interface paymentData {
    id: string,
    caseId: number,
    date: string,
    amount: number,
    payment_mode: string,
    note: string,
}


export interface Payment {
    data: paymentData[],
    total_pages: number
}