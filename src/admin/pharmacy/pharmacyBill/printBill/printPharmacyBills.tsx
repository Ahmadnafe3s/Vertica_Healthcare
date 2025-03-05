
import CustomTooltip from "@/components/customTooltip"
import { Table, TD, TH, TR } from "@/components/pdfTable"
import { currencySymbol } from "@/helpers/currencySymbol"
import { currencyFormat } from "@/lib/utils"
import styles from "@/pdfStyleSheet/style"
import { pharmacyBills } from "@/types/pharmacy/pharmacy"
import { Page, Document, View, pdf } from "@react-pdf/renderer"
import { Printer } from "lucide-react"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"


interface DocumentsProps {
    PharmacyBills: pharmacyBills['data']
}


const Documents = ({ PharmacyBills }: DocumentsProps) => {
    return (
        <Document>
            <Page size='A4' style={styles.page}>
                <View>
                    <Table>
                        <TR>
                            <TH>Invoice No.</TH>
                            <TH>Date</TH>
                            <TH>OPD ID</TH>
                            <TH>Patient</TH>
                            <TH>Doctor</TH>
                            <TH>Discount %</TH>
                            <TH last>Toatl {currencySymbol()}</TH>
                        </TR>

                        {/* body rows */}

                        {PharmacyBills.map((bill) => (
                            <TR key={bill.id}>
                                <TD>{bill.id}</TD>
                                <TD>{bill.date}</TD>
                                <TD>{bill.opdId}</TD>
                                <TD>{bill.patient.name}</TD>
                                <TD>{bill.doctor}</TD>
                                <TD>{bill.discount}%</TD>
                                <TD last>{currencyFormat(bill.net_amount)}</TD>
                            </TR>
                        ))}
                    </Table>
                </View>
            </Page>
        </Document>
    )
}




const PrintPharmacyBills = ({ PharmacyBills }: DocumentsProps) => {

    const [client, setClient] = useState(false);

    const handleOpenNewTab = async () => {
        if (PharmacyBills.length < 1) return toast.error('Empty list')
        const blob = await pdf(<Documents PharmacyBills={PharmacyBills} />).toBlob()
        const url = URL.createObjectURL(blob)
        window.open(url, '_blank')
        setTimeout(() => URL.revokeObjectURL(url), 60000);
    }

    useEffect(() => {
        setClient(true)
    }, [])

    if (!client) return null

    return (
        <CustomTooltip message='Print List'>
            <Printer className='cursor-pointer text-gray-600 active:scale-95' onClick={handleOpenNewTab} />
        </CustomTooltip>
    )
}



export default PrintPharmacyBills