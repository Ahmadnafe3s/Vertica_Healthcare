import CustomTooltip from "@/components/customTooltip"
import { Table, TD, TH, TR } from "@/components/pdfTable"
import styles from "@/pdfStyleSheet/style"
import { OPDs } from "@/types/opd_section/opd"
import { Page, Document, View, pdf } from "@react-pdf/renderer"
import { Printer } from "lucide-react"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

interface OpdsDocumentProps {
    opds: OPDs['data']
}

const OpdsDocument = ({ opds }: OpdsDocumentProps) => {
    return (
        <Document>
            <Page size='A4' style={styles.page}>
                <View>
                    <Table>
                        <TR>
                            <TH>OPD No.</TH>
                            <TH>Patient Name</TH>
                            <TH>Appointment Date</TH>
                            <TH>Consultant</TH>
                            <TH>Reference</TH>
                            <TH>Symptom Type</TH>
                            <TH last>Previous Isuue</TH>
                        </TR>

                        {/* body rows */}

                        {opds.map((opd) => (
                            <TR key={opd.id}>
                                <TD>{opd.id}</TD>
                                <TD>{opd.appointment.patient.name}</TD>
                                <TD>{opd.appointment.appointment_date}</TD>
                                <TD>{opd.appointment.doctor.name}</TD>
                                <TD>{opd.appointment.reference}</TD>
                                <TD>{opd.appointment.symptom_type}</TD>
                                <TD>{opd.appointment.previous_medical_issue}</TD>
                            </TR>
                        ))}
                    </Table>
                </View>
            </Page>
        </Document>
    )
}




const OpdsPdf = ({ opds }: { opds: OPDs['data'] }) => {

    const [client, setClient] = useState(false);

    const handleOpenNewTab = async () => {
        if (opds.length < 1) return toast.error('Empty list')
        const blob = await pdf(<OpdsDocument opds={opds} />).toBlob()
        const url = URL.createObjectURL(blob)
        window.open(url, '_blank')
        setTimeout(() => URL.revokeObjectURL(url), 60000);
    }

    useEffect(() => {
        setClient(true)
    }, [])

    if (!client) return null

    return (
        <CustomTooltip message='Print Bill'>
            <Printer className='cursor-pointer text-gray-600 w-5 h-5 active:scale-95' onClick={handleOpenNewTab} />
        </CustomTooltip>
    )
}



export default OpdsPdf