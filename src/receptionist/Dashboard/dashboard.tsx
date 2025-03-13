import AxiosClient from "@/api/apiClient"
import RectCard from "@/components/rectCard"
import StaffCalendar from "@/components/staffCalendar"
import { ReceptionistDashReport } from "@/types/dashboard/receptionistDashboard"
import { CalendarClock, CalendarFold, DollarSign, HeartPulse, Pill, ScanHeart } from "lucide-react"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

const ReceptionistDashboard = () => {

    const [report, setReport] = useState<ReceptionistDashReport>()

    const getDashReport = async () => {
        try {
            const res = await AxiosClient('/api/dashboard/receptionist/dashReport')
            setReport(res.data)
        } catch (error: any) {
            toast.error(error?.response.data?.message)
        }
    }


    useEffect(() => {
        getDashReport()
    }, [])

    return (

        <div className='pt-4 pb-20 space-y-16'>

            {/* total income section */}
            <div className='grid lg:grid-cols-4 sm:grid-cols-2 gap-4'>

                <RectCard name='OPD Income' path={'/admin/opd'} amount={report?.opdIncome ?? 0}>
                    <HeartPulse className='h-8 w-8 text-red-500' />
                </RectCard>

                <RectCard name='Total OPDs' path={'/admin/opd'} visits={report?.opds ?? 0}>
                    <ScanHeart className='h-8 w-8 text-yellow-500' />
                </RectCard>

                <RectCard name='Appointment Income' path={'/admin/appointment'} amount={report?.appointmentIncome ?? 0}>
                    <CalendarClock className='h-8 w-8 text-slate-500' />
                </RectCard>

                <RectCard name='Total Appointments' path={'/admin/appointment'} visits={report?.appoitments ?? 0}>
                    <CalendarFold className='h-8 w-8 text-green-500' />
                </RectCard>
            </div>

            {/* Staff Calendar */}
            <StaffCalendar />
        </div>

    )
}

export default ReceptionistDashboard