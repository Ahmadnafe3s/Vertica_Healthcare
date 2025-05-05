export type AdminDashTotalCount = {
    opdIncome: number,
    appointmentIncome: number,
    pharmacyIncome: number,
    radiologyIncome: number,
    pathologyIncome: number,
    expenses: number,
    opds: number,
    purchases: number,
    pharmacyExpenses: number,
    medicines: number,
    ambulanceIncome: number,
    bloodBankIncome: number
}


export type AdminDash_MM_IncExp = {
    month: string,
    Income: number,
    Expenses: number
}


export type AdminDashVisitors = {
    service: string,
    visitors: number,
    fill: string,
}


export type AdminDashAppmtReport = {
    totalAppmts: number,
    status: {
        status: string,
        count: number,
        fill: string,
    }[]

}