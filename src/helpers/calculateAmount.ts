export const calculateAmount = (total: number, Tax: number, Discount: number) => {

    const discount = (Discount / 100) * total

    const DiscountedAmount = total - discount

    const TaxAmount = (Tax / 100) * DiscountedAmount

    const net_amount = DiscountedAmount + TaxAmount;

    return { total, net_amount : Math.round(net_amount) }

}