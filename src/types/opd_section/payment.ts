export interface Payment {
    id: string,
    caseId: number,
    date: string,
    amount: number,
    payment_mode: string,
    note: string,
}