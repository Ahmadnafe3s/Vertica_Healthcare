export type AdminDashTotalCount = {
    opdIncome: number,
    appointmentIncome: number,
    pharmacyIncome: number,
    expenses: number,
    opds: number,
    pharmacyBills: number,
    purchases: number,
    pharmacyExpenses: number,
    medicines: number
}


export type AdminDash_MM_IncExp = {
    month: string,
    Income: number,
    Expenses: number
}


export type AdminDashVisitors = {
    "service": string,
    "visitors": number,
    "fill": string,
}


export type AdminDashAppmtReport = {
    totalAppmts: number,
    status: {
        status: string,
        count: number,
        fill: string,
    }[]

}