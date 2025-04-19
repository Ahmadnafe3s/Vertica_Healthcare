import CustomTooltip from "@/components/customTooltip"
import { Table, TD, TH, TR } from "@/components/pdfTable"
import { currencySymbol } from "@/helpers/currencySymbol"
import { currencyFormat } from "@/lib/utils"
import styles from "@/pdfStyleSheet/style"
import { Appointment } from "@/types/appointment/appointment"
import { Page, Document, View, pdf } from "@react-pdf/renderer"
import { Printer } from "lucide-react"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"


interface Documents {
    Appointments: Appointment['data']
}


const Documents = ({ Appointments }: Documents) => {
    return (
        <Document>
            <Page size='A4' style={styles.page}>
                <View>
                    <Table>
                        <TR>
                            <TH>Appointment No.</TH>
                            <TH>Patient</TH>
                            <TH>Date</TH>
                            <TH>Doctor</TH>
                            <TH>Fees {currencySymbol()}</TH>
                            <TH>Discount %</TH>
                            <TH>Net Amount {currencySymbol()}</TH>s
                            <TH last>Status</TH>
                        </TR>

                        {/* body rows */}

                        {Appointments.map((appointment) => (
                            <TR key={appointment.id}>
                                <TD>{appointment.id}</TD>
                                <TD>{appointment.patient.name}</TD>
                                <TD>{appointment.appointment_date}</TD>
                                <TD>{appointment.doctor.name}</TD>
                                <TD>{currencyFormat(appointment.fees)}</TD>
                                <TD>{appointment.discount}%</TD>
                                <TD>{currencyFormat(appointment.net_amount)}</TD>
                                <TD last>{appointment.status}</TD>
                            </TR>
                        ))}
                    </Table>
                </View>
            </Page>
        </Document>
    )
}




const AppointmentListPDF = ({ appointments }: { appointments: Appointment['data'] }) => {

    const [client, setClient] = useState(false);

    const handleOpenNewTab = async () => {
        if (appointments.length < 1) return toast.error('Empty list')
        const blob = await pdf(<Documents Appointments={appointments} />).toBlob()
        const url = URL.createObjectURL(blob)
        window.open(url, '_blank')
        setTimeout(() => URL.revokeObjectURL(url), 60000);
    }

    useEffect(() => {
        setClient(true)
    }, [])

    if (!client) return null

    return (
        <CustomTooltip message='Print Appointments'>
            <Printer className='cursor-pointer text-gray-600 dark:text-neutral-200 active:scale-95' onClick={handleOpenNewTab} />
        </CustomTooltip>
    )
}



export default AppointmentListPDF