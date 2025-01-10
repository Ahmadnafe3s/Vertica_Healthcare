export const calculateAmount = (Quantity: number, PurchasePrice: number, Tax: number, Discount: number) => {

    const amount = Quantity * PurchasePrice


    const discount = (Discount / 100) * amount

    const DiscountedAmount = amount - discount

    const TaxAmount = (Tax / 100) * DiscountedAmount

    const total_amount = DiscountedAmount + TaxAmount;

    return { amount, total_amount }

}