import { pdf, Document, Page, Text, View } from '@react-pdf/renderer';
import { HTMLAttributes, useEffect, useState } from 'react';
import styles from '@/pdfStyleSheet/style'
import { PrintBillDetails } from '@/types/opd_section/opd';
import { getPrintBillDetails } from '../opdApiHandler';
import toast from 'react-hot-toast';
import { currencySymbol } from '@/helpers/currencySymbol';
import { Table, TD, TH, TR } from '@/components/pdfTable';
import { currencyFormat } from '@/lib/utils';
import { Printer } from 'lucide-react';
import CustomTooltip from '@/components/customTooltip';






export interface BillPDFProps extends HTMLAttributes<HTMLDivElement> {
    bill: PrintBillDetails
}

// Move BillPDF outside the main component

const BillPDF = ({ bill }: BillPDFProps) => {

    const NetAmount = (charges: typeof bill.charges) => {
        if (!charges) return 0
        const net_amount = charges.reduce((sum, charge) => sum + (charge.net_amount || 0), 0)
        return net_amount
    }

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* header */}
                <View style={styles.header}>
                    <View style={styles.spaceY}>
                        <Text style={[styles.text.bold, styles.text.xl]}>Vertical Healthcare</Text>
                        <Text style={[styles.text.sm, styles.text.lightGray, styles.text.italic]}>Your Health is our priority</Text>
                    </View>
                    <View style={[styles.text.sm, styles.spaceY]}>
                        <Text>New Market purwa</Text>
                        <Text>Tulsipur , Balrampur</Text>
                        <Text>U.P , India , 271208</Text>
                    </View>
                </View>

                <View style={[styles.spacing.mt4, styles.flex_direction.row, styles.justifyBetween, styles.spacex16]}>

                    {/* col 1 */}
                    <View style={[styles.spaceY, styles.flex_1]}>

                        <View style={[styles.flex_direction.row, styles.justifyBetween]}>
                            <Text >OPD ID</Text>
                            <Text style={styles.text.lightGray}>{bill?.id}</Text>
                        </View>

                        <View style={[styles.flex_direction.row, styles.justifyBetween]}>
                            <Text >Patient Name</Text>
                            <Text style={styles.text.lightGray}>{bill?.appointment.patient.name}</Text>
                        </View>

                        <View style={[styles.flex_direction.row, styles.justifyBetween]}>
                            <Text >Age</Text>
                            <Text style={styles.text.lightGray}>{bill?.appointment.patient.age}</Text>
                        </View>

                        <View style={[styles.flex_direction.row, styles.justifyBetween]}>
                            <Text >Blood Group</Text>
                            <Text style={styles.text.lightGray}>{bill?.appointment.patient.blood_group}</Text>
                        </View>

                        <View style={[styles.flex_direction.row, styles.justifyBetween]}>
                            <Text >Cunsultant</Text>
                            <Text style={styles.text.lightGray}>{bill?.appointment.doctor.name}</Text>
                        </View>

                        <View style={[styles.flex_direction.row, styles.justifyBetween]}>
                            <Text >Specialist</Text>
                            <Text style={styles.text.lightGray}>{bill?.appointment.doctor.specialist}</Text>
                        </View>
                    </View>

                    {/* col 2 */}
                    <View style={[styles.spaceY, styles.flex_1]}>

                        <View style={[styles.flex_direction.row, styles.justifyBetween]}>
                            <Text >Appointment No</Text>
                            <Text style={styles.text.lightGray}>{bill?.appointmentId}</Text>
                        </View>

                        <View style={[styles.flex_direction.row, styles.justifyBetween]}>
                            <Text>Appointment Date</Text>
                            <Text style={styles.text.lightGray}>{bill?.appointment.appointment_date}</Text>
                        </View>

                        <View style={[styles.flex_direction.row, styles.justifyBetween]}>
                            <Text>Priority</Text>
                            <Text style={styles.text.lightGray}>{bill?.appointment.appointment_priority}</Text>
                        </View>

                        <View style={[styles.flex_direction.row, styles.justifyBetween]}>
                            <Text>Shift</Text>
                            <Text style={styles.text.lightGray}>{bill?.appointment.shift}</Text>
                        </View>
                    </View>
                </View>

                {/* Table */}

                <View style={styles.spacing.mt4}>
                    <Table>
                        {/* Header Row */}
                        <TR>
                            <TH>Charge Name</TH>
                            <TH>Category</TH>
                            <TH>Std Charge</TH>
                            <TH>TPA Charge</TH>
                            <TH>Total {currencySymbol()}</TH>
                            <TH>Tax%</TH>
                            <TH>Discount%</TH>
                            <TH last>All Total {currencySymbol()}</TH>
                        </TR>

                        {/* Data Rows */}

                        {bill?.charges.map((charge, i) => (
                            <TR key={i}>
                                <TD>{charge.chargeNames.name}</TD>
                                <TD>{charge.chargeCategory.category}</TD>
                                <TD>{currencyFormat(charge.standard_charge)}</TD>
                                <TD>{currencyFormat(charge.tpa)}</TD>
                                <TD>{currencyFormat(charge.total)}</TD>
                                <TD>{charge.tax}%</TD>
                                <TD>{charge.discount}%</TD>
                                <TD last>{currencyFormat(charge.net_amount)}</TD>
                            </TR>
                        ))}
                    </Table>
                </View>

                <View style={[styles.spacing.mt4, styles.borderedBox, styles.flex_direction.row, styles.justifyBetween]}>
                    <Text style={styles.text.italic}>Net Amount</Text>
                    <Text style={styles.text.bold}>{currencyFormat(NetAmount(bill?.charges))}</Text>
                </View>

            </Page >
        </Document >
    )
}



interface OpdBillPDFprops {
    opdId: string,
    onPending: (e: boolean) => void
}


const OpdBillPDF = ({ opdId, onPending }: OpdBillPDFprops) => {

    const [client, setClient] = useState(false);

    const handleOpenNewTab = async () => {
        try {
            onPending(true)
            const data = await getPrintBillDetails(opdId)
            if (!data) return toast.error('No data found')
            const blob = await pdf(<BillPDF bill={data!} />).toBlob();
            const url = URL.createObjectURL(blob);
            window.open(url, '_blank');  // open in new tab
            // Clean up after 1 minute (adjust as needed)
            setTimeout(() => URL.revokeObjectURL(url), 60000);
        } catch ({ message }: any) {
            toast.error(message)
        } finally { onPending(false) }
    };


    // Needed to avoid SSR issues with Blob
    useEffect(() => {
        setClient(true);
    }, []);

    if (!client) return null;

    return (
        <>
            <CustomTooltip message='Print List'>
                <Printer className='cursor-pointer text-gray-600 w-5 h-5 active:scale-95' onClick={handleOpenNewTab} />
            </CustomTooltip>
        </>
    );
};



export default OpdBillPDF;