
import CustomTooltip from "@/components/customTooltip"
import { Table, TD, TH, TR } from "@/components/pdfTable"
import { currencySymbol } from "@/helpers/currencySymbol"
import { currencyFormat } from "@/lib/utils"
import styles from "@/pdfStyleSheet/style"
import { medicinePurchases } from "@/types/opd_section/purchaseMedicine"
import { Page, Document, View, pdf } from "@react-pdf/renderer"
import { Printer } from "lucide-react"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"


interface DocumentsProps {
    MedicinePurchases: medicinePurchases['data']
}


const Documents = ({ MedicinePurchases }: DocumentsProps) => {
    return (
        <Document>
            <Page size='A4' style={styles.page}>
                <View>
                    <Table>
                        <TR>
                            <TH>Purchase No.</TH>
                            <TH>Date</TH>
                            <TH>Medicine Name</TH>
                            <TH>Expiry</TH>
                            <TH>Supplier</TH>
                            <TH>Qty</TH>
                            <TH last>Net Amount {currencySymbol()}</TH>
                        </TR>

                        {/* body rows */}

                        {MedicinePurchases.map((purcahse) => (
                            <TR key={purcahse.id}>
                                <TD>{purcahse.id}</TD>
                                <TD>{purcahse.purchase_date}</TD>
                                <TD>{purcahse.medicine.name}</TD>
                                <TD>{purcahse.expiry_date}</TD>
                                <TD>{purcahse.supplier_name}</TD>
                                <TD>{purcahse.quantity}</TD>
                                <TD last>{currencyFormat(purcahse.total_amount)}</TD>
                            </TR>
                        ))}
                    </Table>
                </View>
            </Page>
        </Document>
    )
}




const PrintMedicinePurchases = ({ MedicinePurchases }: DocumentsProps) => {

    const [client, setClient] = useState(false);

    const handleOpenNewTab = async () => {
        if (MedicinePurchases.length < 1) return toast.error('Empty list')
        const blob = await pdf(<Documents MedicinePurchases={MedicinePurchases} />).toBlob()
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
            <Printer className='cursor-pointer text-gray-600 dark:text-gray-400 active:scale-95' onClick={handleOpenNewTab} />
        </CustomTooltip>
    )
}



export default PrintMedicinePurchases