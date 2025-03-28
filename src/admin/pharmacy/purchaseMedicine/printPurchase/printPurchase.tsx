import { pdf, Document, Page, Text, View } from '@react-pdf/renderer';
import { useEffect, useState } from 'react';
import styles from '@/pdfStyleSheet/style'
import toast from 'react-hot-toast';
import { currencySymbol } from '@/helpers/currencySymbol';
import { Table, TD, TH, TR } from '@/components/pdfTable';
import { currencyFormat } from '@/lib/utils';
import { Printer } from 'lucide-react';
import CustomTooltip from '@/components/customTooltip';
import { getPharmacyBillDetails, getPurchaseDetails } from '../../pharmacyApiHandler';
import { medicinePurchaseDetails } from '@/types/opd_section/purchaseMedicine';





// Move BillPDF outside the main component

const Documents = ({ Details }: { Details: medicinePurchaseDetails }) => {

    // const AllTotal = (items: typeof Details.items) => {
    //     if (items.length < 1) return 0
    //     return items.reduce((sum, item) => sum + (item.amount || 0), 0)
    // }


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
                            <Text >Purchase No</Text>
                            <Text style={styles.text.lightGray}>{Details?.id}</Text>
                        </View>

                        <View style={[styles.flex_direction.row, styles.justifyBetween]}>
                            <Text >Date</Text>
                            <Text style={styles.text.lightGray}>{Details?.purchase_date}</Text>
                        </View>

                        <View style={[styles.flex_direction.row, styles.justifyBetween]}>
                            <Text >Supplier</Text>
                            <Text style={styles.text.lightGray}>{Details.supplier_name}</Text>
                        </View>

                        <View style={[styles.flex_direction.row, styles.justifyBetween]}>
                            <Text >Expiry</Text>
                            <Text style={styles.text.lightGray}>{Details.expiry_date}</Text>
                        </View>

                        <View style={[styles.flex_direction.row, styles.justifyBetween]}>
                            <Text >Note</Text>
                            <Text style={styles.text.lightGray}>{Details?.note}</Text>
                        </View>
                    </View>

                    {/* col 2 */}
                    {/* <View style={[styles.spaceY, styles.flex_1]}>

                        <View style={[styles.flex_direction.row, styles.justifyBetween]}>
                            <Text >OPD No</Text>
                            <Text style={styles.text.lightGray}>{Details?.opdId || 'NA'}</Text>
                        </View>

                        <View style={[styles.flex_direction.row, styles.justifyBetween]}>
                            <Text>Doctor</Text>
                            <Text style={styles.text.lightGray}>{Details?.doctor}</Text>
                        </View>
                    </View> */}
                </View>

                {/* Table */}

                <View style={styles.spacing.mt4}>
                    <Table>
                        {/* Header Row */}
                        <TR>
                            <TH>Medicine Name</TH>
                            <TH>Category</TH>
                            <TH>Batch No.</TH>
                            <TH>MRP {currencySymbol()}</TH>
                            <TH>Sale Price {currencySymbol()}</TH>
                            <TH>Packing Qty</TH>
                            <TH>Qty</TH>
                            <TH last>Purchase Price {currencySymbol()}</TH>
                        </TR>

                        {/* Data Rows */}

                        <TR>
                            <TD>{Details?.medicine.name}</TD>
                            <TD>{Details?.category.name}</TD>
                            <TD>{Details?.batch_no}</TD>
                            <TD>{currencyFormat(Details?.MRP)}</TD>
                            <TD>{currencyFormat(Number(Details?.sale_price))}</TD>
                            <TD>{Details?.packing_quantity}</TD>
                            <TD>{Details?.quantity}</TD>
                            <TD last>{currencyFormat(Number(Details?.purchase_price))}</TD>
                        </TR>
                    </Table>
                </View>

                {/* final pricing */}

                <View style={[styles.spacing.mt4, styles.spaceY, styles.itemsEnd]}>
                    <Text >Total : {currencyFormat(Details?.amount)}</Text>
                    <Text>Discount : {Details.discount} %</Text>
                    <Text>Tax : {Details.tax} %</Text>
                    <Text style={styles.text.bold}>Net Amount : {currencyFormat(Details?.total_amount)}</Text>
                </View>

            </Page >
        </Document >
    )
}



interface PrintMedicinePurchaseProps {
    Id: string,
    onPending: (e: boolean) => void
}


const PrintMedicinePurchase = ({ Id, onPending }: PrintMedicinePurchaseProps) => {

    const [client, setClient] = useState(false);

    const handleOpenNewTab = async () => {
        try {
            onPending(true)
            const data = await getPurchaseDetails(Id)
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
                <Printer className='cursor-pointer text-gray-600 dark:text-gray-400 w-4 active:scale-95' onClick={handleOpenNewTab} />
            </CustomTooltip>
        </>
    );
};



export default PrintMedicinePurchase;