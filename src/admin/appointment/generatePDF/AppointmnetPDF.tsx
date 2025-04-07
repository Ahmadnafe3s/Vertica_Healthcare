import { pdf, Document, Page, Text, View } from '@react-pdf/renderer';
import { useEffect, useState } from 'react';
import styles from '@/pdfStyleSheet/style'
import toast from 'react-hot-toast';
import { currencySymbol } from '@/helpers/currencySymbol';
import { Table, TD, TH, TR } from '@/components/pdfTable';
import { currencyFormat } from '@/lib/utils';
import { Printer } from 'lucide-react';
import CustomTooltip from '@/components/customTooltip';
import { AppointmentDetails } from '@/types/appointment/appointment';
import { getAppointmentDetails } from '../appointmentAPIhandler';
import { address, hospital_name, hospital_slogan } from '@/globalData';






export interface DocumentProps {
    Details: AppointmentDetails
}




const Documents = ({ Details }: DocumentProps) => {

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
                            <Text >Patient ID</Text>
                            <Text style={styles.text.lightGray}>{Details?.patientId}</Text>
                        </View>

                        <View style={[styles.flex_direction.row, styles.justifyBetween]}>
                            <Text >Patient Name</Text>
                            <Text style={styles.text.lightGray}>{Details?.patient.name}</Text>
                        </View>

                        <View style={[styles.flex_direction.row, styles.justifyBetween]}>
                            <Text >Age</Text>
                            <Text style={styles.text.lightGray}>{Details?.patient.age}</Text>
                        </View>

                        <View style={[styles.flex_direction.row, styles.justifyBetween]}>
                            <Text >Gender</Text>
                            <Text style={styles.text.lightGray}>{Details?.patient.gender}</Text>
                        </View>

                        <View style={[styles.flex_direction.row, styles.justifyBetween]}>
                            <Text >Blood Group</Text>
                            <Text style={styles.text.lightGray}>{Details?.patient.blood_group}</Text>
                        </View>

                        <View style={[styles.flex_direction.row, styles.justifyBetween]}>
                            <Text >Email</Text>
                            <Text style={styles.text.lightGray}>{Details?.patient.email}</Text>
                        </View>

                        <View style={[styles.flex_direction.row, styles.justifyBetween]}>
                            <Text >Address</Text>
                            <Text style={styles.text.lightGray}>{Details?.patient.address}</Text>
                        </View>
                    </View>

                    {/* col 2 */}
                    <View style={[styles.spaceY, styles.flex_1]}>

                        <View style={[styles.flex_direction.row, styles.justifyBetween]}>
                            <Text>Status</Text>
                            <Text style={styles.text.lightGray}>{Details?.status}</Text>
                        </View>

                        <View style={[styles.flex_direction.row, styles.justifyBetween]}>
                            <Text>Cunsultant ID</Text>
                            <Text style={styles.text.lightGray}>{Details?.doctorId}</Text>
                        </View>

                        <View style={[styles.flex_direction.row, styles.justifyBetween]}>
                            <Text>Cunsultant</Text>
                            <Text style={styles.text.lightGray}>{Details?.doctor.name}</Text>
                        </View>

                        <View style={[styles.flex_direction.row, styles.justifyBetween]}>
                            <Text>Specialist</Text>
                            <Text style={styles.text.lightGray}>{Details?.doctor.specialist}</Text>
                        </View>

                        <View style={[styles.flex_direction.row, styles.justifyBetween]}>
                            <Text>Phone</Text>
                            <Text style={styles.text.lightGray}>{Details?.doctor.phone}</Text>
                        </View>
                    </View>

                </View>

                {/* Table */}

                <View style={styles.spacing.mt4}>
                    <Table>
                        {/* Header Row */}
                        <TR>
                            <TH>Appointment No</TH>
                            <TH>Appointment Date</TH>
                            <TH>Priority</TH>
                            <TH>Shift</TH>
                            <TH last>Fees {currencySymbol()}</TH>
                        </TR>

                        {/* Data Rows */}

                        <TR>
                            <TD>{Details?.id}</TD>
                            <TD>{Details?.appointment_date}</TD>
                            <TD>{Details?.appointment_priority}</TD>
                            <TD>{Details?.shift}</TD>
                            <TD last>{currencyFormat(Details?.fees)}</TD>
                        </TR>

                    </Table>
                </View>

                <View style={[styles.spacing.mt4, styles.spaceY, styles.itemsEnd]}>
                    <Text >Total : {currencyFormat(Details?.fees)}</Text>
                    <Text>Discount : {Details.discount} %</Text>
                    <Text style={styles.text.bold}>Net Amount : {currencyFormat(Details?.net_amount)}</Text>
                </View>

            </Page >
        </Document >
    )
}



interface OpdBillPDFprops {
    appointmentId: string,
    onPending: (e: boolean) => void
}


const AppointmentPDF = ({ appointmentId, onPending }: OpdBillPDFprops) => {

    const [client, setClient] = useState(false);

    const handleOpenNewTab = async () => {
        try {
            onPending(true)
            const data = await getAppointmentDetails(appointmentId)
            if (!data) return toast.error('No data found')
            const blob = await pdf(<Documents Details={data!} />).toBlob();
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
            <CustomTooltip message='Print Appointment'>
                <Printer className='cursor-pointer text-gray-600 dark:text-neutral-300 w-4 active:scale-95' onClick={handleOpenNewTab} />
            </CustomTooltip>
        </>
    );
};



export default AppointmentPDF;