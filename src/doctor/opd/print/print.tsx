import CustomTooltip from "@/components/customTooltip"
import { Table, TD, TH, TR } from "@/components/pdfTable"
import { authSelector } from "@/features/auth/authSlice"
import { useAppSelector } from "@/hooks"
import styles from "@/pdfStyleSheet/style"
import { OPDs } from "@/types/opd_section/opd"
import { Page, Document, View, pdf, Text } from "@react-pdf/renderer"
import { Printer } from "lucide-react"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

interface DoctorOpdDocumentProps {
    opds: OPDs['data'],
    user: { name: string, id: number }
}


const Documents = ({ opds, user }: DoctorOpdDocumentProps) => {

    return (
        <Document>
            <Page size='A4' style={styles.page}>
                <View style={styles.spacing.mb4}>
                    <Text style={[styles.text.bold, styles.text.xl, styles.textCenter]}>{`${user.name} ( ${user.id} )`}</Text>
                </View>
                <View>
                    <Table>
                        <TR>
                            <TH>OPD No.</TH>
                            <TH>Appointment Date</TH>
                            <TH>Patient</TH>
                            <TH>Gender</TH>
                            <TH>Symptom Type</TH>
                            <TH last>Previous Isuue</TH>
                        </TR>

                        {/* body rows */}

                        {opds.map((opd) => (
                            <TR key={opd.id}>
                                <TD>{opd.id}</TD>
                                <TD>{opd.appointment.appointment_date}</TD>
                                <TD>{opd.patient.name}</TD>
                                <TD>{opd.patient.gender}</TD>
                                <TD>{opd.appointment.symptom_type}</TD>
                                <TD last>{opd.appointment.previous_medical_issue}</TD>
                            </TR>
                        ))}
                    </Table>
                </View>
            </Page>
        </Document>
    )
}




const PrintDoctorOpds = ({ opds }: { opds: OPDs['data'] }) => {

    const [client, setClient] = useState(false);
    const { user } = useAppSelector(authSelector)

    const handleOpenNewTab = async () => {
        if (opds.length < 1) return toast.error('Empty list')
        const blob = await pdf(<Documents opds={opds} user={{ name: user?.name!, id: user?.id! }} />).toBlob()
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
            <Printer className='cursor-pointer text-gray-600  active:scale-95' onClick={handleOpenNewTab} />
        </CustomTooltip>
    )
}



export default PrintDoctorOpds