import { pdf, Document, Page, Text, View } from '@react-pdf/renderer';
import { useEffect, useState } from 'react';
import styles from '@/pdfStyleSheet/style'
import toast from 'react-hot-toast';
import { currencySymbol } from '@/helpers/currencySymbol';
import { Table, TD, TH, TR } from '@/components/pdfTable';
import { currencyFormat } from '@/lib/utils';
import { Printer } from 'lucide-react';
import CustomTooltip from '@/components/customTooltip';
import { pharmacyBillDetail } from '@/types/pharmacy/pharmacy';
import { getPharmacyBillDetails } from '../../pharmacyApiHandler';





// Move BillPDF outside the main component

const Documents = ({ Details }: { Details: pharmacyBillDetail }) => {

    const AllTotal = (items: typeof Details.items) => {
        if (items.length < 1) return 0
        return items.reduce((sum, item) => sum + (item.amount || 0), 0)

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
                            <Text >Invoice No</Text>
                            <Text style={styles.text.lightGray}>{Details?.id}</Text>
                        </View>

                        <View style={[styles.flex_direction.row, styles.justifyBetween]}>
                            <Text >Invoice Date</Text>
                            <Text style={styles.text.lightGray}>{Details?.date}</Text>
                        </View>

                        <View style={[styles.flex_direction.row, styles.justifyBetween]}>
                            <Text >Patient Name</Text>
                            <Text style={styles.text.lightGray}>{Details.patient.name}</Text>
                        </View>

                        <View style={[styles.flex_direction.row, styles.justifyBetween]}>
                            <Text >Note</Text>
                            <Text style={styles.text.lightGray}>{Details?.note}</Text>
                        </View>
                    </View>

                    {/* col 2 */}
                    <View style={[styles.spaceY, styles.flex_1]}>

                        <View style={[styles.flex_direction.row, styles.justifyBetween]}>
                            <Text >OPD No</Text>
                            <Text style={styles.text.lightGray}>{Details?.opdId || 'NA'}</Text>
                        </View>

                        <View style={[styles.flex_direction.row, styles.justifyBetween]}>
                            <Text>Doctor</Text>
                            <Text style={styles.text.lightGray}>{Details?.doctor}</Text>
                        </View>
                    </View>
                </View>

                {/* Table */}

                <View style={styles.spacing.mt4}>
                    <Table>
                        {/* Header Row */}
                        <TR>
                            <TH>Medicine Name</TH>
                            <TH>Category</TH>
                            <TH>Batch No.</TH>
                            <TH>Unit</TH>
                            <TH>Sale Price {currencySymbol()}</TH>
                            <TH>Qty</TH>
                            <TH>Tax%</TH>
                            <TH last>Total {currencySymbol()}</TH>
                        </TR>

                        {/* Data Rows */}

                        {Details.items?.map((item, i) => (
                            <TR key={i}>
                                <TD>{item.medicine.name}</TD>
                                <TD>{item.category.name}</TD>
                                <TD>{item.batch.purchaseMedicine.batch_no}</TD>
                                <TD>{item.medicine.unit.name}</TD>
                                <TD>{currencyFormat(item.salePrice)}</TD>
                                <TD>{item.quantity}</TD>
                                <TD>{item.tax}</TD>
                                <TD last>{currencyFormat(item.amount)}</TD>
                            </TR>
                        ))}
                    </Table>
                </View>

                {/* final pricing */}

                <View style={[styles.spacing.mt4, styles.spaceY, styles.itemsEnd]}>
                    <Text >All Total : {currencyFormat(AllTotal(Details.items))}</Text>
                    <Text>Discount : {Details.discount} %</Text>
                    <Text style={styles.text.bold}>Net Amount : {currencyFormat(Details?.net_amount)}</Text>
                </View>

            </Page >
        </Document >
    )
}



interface OpdBillPDFprops {
    Id: string,
    onPending: (e: boolean) => void
}


const PrintPharmacyBill = ({ Id, onPending }: OpdBillPDFprops) => {

    const [client, setClient] = useState(false);

    const handleOpenNewTab = async () => {
        try {
            onPending(true)
            const data = await getPharmacyBillDetails(Id)
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
            <CustomTooltip message='Print Bill'>
                <Printer className='cursor-pointer text-gray-600 dark:text-gray-300 w-4 active:scale-95' onClick={handleOpenNewTab} />
            </CustomTooltip>
        </>
    );
};



export default PrintPharmacyBill;