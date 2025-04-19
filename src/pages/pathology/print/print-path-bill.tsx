import CustomTooltip from "@/components/customTooltip"
import { Table, TD, TH, TR } from "@/components/pdfTable"
import { address, hospital_name, hospital_slogan } from "@/globalData"
import { currencySymbol } from "@/helpers/currencySymbol"
import { currencyFormat } from "@/lib/utils"
import styles from "@/pdfStyleSheet/style"
import { PathologyBillDeatils } from "@/types/pathology/pathology"
import { RadiologyBillDeatils } from "@/types/radiology/radiology"
import { Page, Document, View, pdf, Text } from "@react-pdf/renderer"
import { Printer } from "lucide-react"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"


interface DocumentsProps {
    details: PathologyBillDeatils
}


const Documents = ({ details }: DocumentsProps) => {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* header */}
                <View style={styles.header}>
                    <View style={styles.spaceY}>
                        <Text style={[styles.text.bold, styles.text.xl]}>{hospital_name}</Text>
                        <Text style={[styles.text.sm, styles.text.lightGray, styles.text.italic]}>{hospital_slogan}</Text>
                    </View>
                    <View style={[styles.text.sm, styles.spaceY]}>
                        <Text>{address.street}</Text>
                        <Text>{address.city + ', ' + address.district}</Text>
                        <Text>{address.zip}</Text>
                    </View>
                </View>

                <View style={[styles.spacing.mt4, styles.flex_direction.row, styles.justifyBetween, styles.spacex16]}>

                    {/* col 1 */}
                    <View style={[styles.spaceY, styles.flex_1]}>

                        <View style={[styles.flex_direction.row, styles.justifyBetween]}>
                            <Text >Invoice No</Text>
                            <Text style={styles.text.lightGray}>{details?.id}</Text>
                        </View>

                        <View style={[styles.flex_direction.row, styles.justifyBetween]}>
                            <Text >Invoice Date</Text>
                            <Text style={styles.text.lightGray}>{details?.date}</Text>
                        </View>

                        <View style={[styles.flex_direction.row, styles.justifyBetween]}>
                            <Text >Patient Name</Text>
                            <Text style={styles.text.lightGray}>{details.patient.name}</Text>
                        </View>

                        <View style={[styles.flex_direction.row, styles.justifyBetween]}>
                            <Text >Gender</Text>
                            <Text style={styles.text.lightGray}>{details.patient.gender}</Text>
                        </View>

                        <View style={[styles.flex_direction.row, styles.justifyBetween]}>
                            <Text >Blood Group</Text>
                            <Text style={styles.text.lightGray}>{details.patient.blood_group}</Text>
                        </View>

                        <View style={[styles.flex_direction.row, styles.justifyBetween]}>
                            <Text >Note</Text>
                            <Text style={styles.text.lightGray}>{details?.note}</Text>
                        </View>
                    </View>

                    {/* col 2 */}
                    <View style={[styles.spaceY, styles.flex_1]}>

                        <View style={[styles.flex_direction.row, styles.justifyBetween]}>
                            <Text >OPD No</Text>
                            <Text style={styles.text.lightGray}>{details?.opdId || 'NA'}</Text>
                        </View>

                        <View style={[styles.flex_direction.row, styles.justifyBetween]}>
                            <Text>Doctor</Text>
                            <Text style={styles.text.lightGray}>{details?.doctor}</Text>
                        </View>

                        <View style={[styles.flex_direction.row, styles.justifyBetween]}>
                            <Text>Previous Report Value</Text>
                            <Text style={styles.text.lightGray}>{details?.previousReportValue}</Text>
                        </View>

                        <View style={[styles.flex_direction.row, styles.justifyBetween]}>
                            <Text>Payment Mode</Text>
                            <Text style={styles.text.lightGray}>{details?.payment_mode}</Text>
                        </View>

                    </View>
                </View>

                {/* Table */}

                <View style={styles.spacing.mt4}>
                    <Table>
                        {/* Header Row */}
                        <TR>
                            <TH>Test Name</TH>
                            <TH>Report Date</TH>
                            <TH>Report Days</TH>
                            <TH>Tax%</TH>
                            <TH last>Amount {currencySymbol()}</TH>
                        </TR>

                        {/* Data Rows */}

                        {details.PathologyBillItems?.map((item, i) => (
                            <TR key={i}>
                                <TD>{item.testName.name}</TD>
                                <TD>{item.reportDate}</TD>
                                <TD>{item.reportDays}</TD>
                                <TD>{item.tax}%</TD>
                                <TD last>{currencyFormat(item.amount)}</TD>
                            </TR>
                        ))}
                    </Table>
                </View>

                {/* final pricing */}

                <View style={[styles.spacing.mt4, styles.spaceY, styles.itemsEnd]}>
                    <Text>Discount : {details.discount} %</Text>
                    <Text>Additional Tax : {details.additionalTax} %</Text>
                    <Text style={styles.text.bold}>Net Amount : {currencyFormat(details?.net_amount)}</Text>
                </View>

            </Page >
        </Document >
    )
}



interface PrintPathologyBillProps {
    details: PathologyBillDeatils
}



const PrintPathologyBill = ({ details }: PrintPathologyBillProps) => {

    const [client, setClient] = useState(false);

    const handleOpenNewTab = async () => {
        if (!details) return toast.error('Empty list')
        const blob = await pdf(<Documents details={details} />).toBlob()
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
            <Printer className='cursor-pointer h-4 w-4 text-gray-600 dark:text-gray-300 active:scale-95' onClick={handleOpenNewTab} />
        </CustomTooltip>
    )
}



export default PrintPathologyBill