import { pdf, Document, Page, Text, View } from '@react-pdf/renderer';
import { useEffect, useState } from 'react';
import styles from '@/pdfStyleSheet/style'
import toast from 'react-hot-toast';
import { Table, TD, TH, TR } from '@/components/pdfTable';
import { Printer } from 'lucide-react';
import CustomTooltip from '@/components/customTooltip';
import { RadiologyBillDeatils, RadiologySampleCollectionDet, RadioTestReport } from '@/types/radiology/radiology';
import { address, hospital_name, hospital_slogan } from '@/globalData';
import { getRadiologyReportDetails, getRadioSampleCollectionDetails } from '../APIHandlers';



interface DocumentProps {
    details: RadiologyBillDeatils,
    report: RadioTestReport,
    collection: RadiologySampleCollectionDet
}


// Move BillPDF outside the main component

const Documents = ({ details, report, collection }: DocumentProps) => {




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


                {/* Report Details */}

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
                            <Text >Age</Text>
                            <Text style={styles.text.lightGray}>{details.patient.age}</Text>
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
                            <Text style={styles.text.lightGray}>{details?.ipdId || 'NA'}</Text>
                        </View>

                        <View style={[styles.flex_direction.row, styles.justifyBetween]}>
                            <Text>Doctor</Text>
                            <Text style={styles.text.lightGray}>{details?.doctor}</Text>
                        </View>


                        <View style={[styles.flex_direction.row, styles.justifyBetween]}>
                            <Text>Collected By</Text>
                            <Text style={styles.text.lightGray}>{collection.staff?.name}</Text>
                        </View>

                        <View style={[styles.flex_direction.row, styles.justifyBetween]}>
                            <Text>Collected Date</Text>
                            <Text style={styles.text.lightGray}>{collection?.date}</Text>
                        </View>

                        <View style={[styles.flex_direction.row, styles.justifyBetween]}>
                            <Text>Center</Text>
                            <Text style={styles.text.lightGray}>{collection?.center}</Text>
                        </View>

                        <View style={[styles.flex_direction.row, styles.justifyBetween]}>
                            <Text>Approved By</Text>
                            <Text style={styles.text.lightGray}>{report?.staff?.name}</Text>
                        </View>

                        <View style={[styles.flex_direction.row, styles.justifyBetween]}>
                            <Text>Expected Date</Text>
                            <Text style={styles.text.lightGray}>{report?.date}</Text>
                        </View>
                    </View>
                </View>

                {/* Test name */}

                <View style={[styles.background, styles.spacing.mt4, styles.textCenter, styles.text.bold, styles.text.base]} >
                    <Text>{report?.item?.testName?.name}</Text>
                </View>

                {/* Table */}

                <View style={styles.spacing.mt4}>
                    <Table>
                        {/* Header Row */}
                        <TR>
                            <TH>Parameter Name</TH>
                            <TH>Report Value</TH>
                            <TH last>Reference Range</TH>
                        </TR>

                        {/* Data Rows */}

                        {report?.reportValues.map((item, i) => (
                            <TR key={i}>
                                <TD>
                                    <Text style={styles.text.semibold}>{item.parameter.name}</Text>
                                    {'\n'}
                                    <Text style={styles.text.sm}>{item.parameter.note}</Text>
                                </TD>
                                <TD>{item.reportValue + ' ' + item.parameter.unit.name}</TD>
                                <TD last>{item.parameter.from + ' - ' + item.parameter.to}</TD>
                            </TR>
                        ))}
                    </Table>
                </View>

            </Page >
        </Document >
    )
}


interface PrintRadioTestReportProps {
    details: RadiologyBillDeatils,
    itemId: number,
    onPending: (v: boolean) => void
}



const PrintRadioTestReport = ({ details, itemId, onPending }: PrintRadioTestReportProps) => {

    const [client, setClient] = useState(false);

    const handleOpenNewTab = async () => {
        try {

            onPending(true)

            const [report, collectionData] = await Promise.all([
                getRadiologyReportDetails(itemId),
                getRadioSampleCollectionDetails(itemId)
            ])

            if (!details || !report || !collectionData) return toast.error('No data found')

            const blob = await pdf(<Documents details={details!} report={report!} collection={collectionData!} />).toBlob();
            const url = URL.createObjectURL(blob);
            window.open(url, '_blank');

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
            <CustomTooltip message='Print Report'>
                <Printer className='cursor-pointer text-gray-600 dark:text-gray-300 w-4 active:scale-95' onClick={handleOpenNewTab} />
            </CustomTooltip>
        </>
    );
};



export default PrintRadioTestReport;