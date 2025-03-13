import AxiosClient from "@/api/apiClient"
import RectCard from "@/components/rectCard"
import StaffCalendar from "@/components/staffCalendar"
import { PharmtDashPharmacyReport } from "@/types/dashboard/pharmacistDashboard"
import { BriefcaseMedical, DollarSign, HandCoins, Pill, ReceiptText } from "lucide-react"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

const PharmacistDashboard = () => {

    const [report, setReport] = useState<PharmtDashPharmacyReport>()


    const getPharmacyReport = async () => {
        try {
            const res = await AxiosClient('/api/dashboard/pharmacist/pharmacyReport')
            setReport(res.data)
        } catch (error: any) {
            toast.error(error.response?.data?.message)
        }
    }

    useEffect(() => {
        getPharmacyReport()
    }, [])


    return (
        <div className='pt-4 pb-20 space-y-16'>

            {/* total income section */}
            <div className='grid lg:grid-cols-4 sm:grid-cols-2 gap-4'>

                <RectCard name='Pharmacy Income' path={'/admin/pharmacy'} amount={report?.pharmacyIncome ?? 0}>
                    <BriefcaseMedical className='h-8 w-8 text-green-500' />
                </RectCard>

                <RectCard name='Total Medicines' path={'/admin/pharmacy/medicines'} visits={report?.medicines}>
                    <Pill className='h-8 w-8 text-red-500' />
                </RectCard>

                <RectCard name='Pharmacy Bill' path={'/admin/pharmacy'} visits={report?.pharmacyBills}>
                    <ReceiptText className='h-8 w-8 text-slate-500' />
                </RectCard>

                <RectCard name='Total Purchase' path={'/admin/pharmacy/purchase'} visits={report?.purchases}>
                    <HandCoins className='h-8 w-8 text-violet-500' />
                </RectCard>

                <RectCard name='Expenses' path={'/admin/pharmacy/purchase'} amount={report?.expenses ?? 0}>
                    <DollarSign className='h-8 w-8 text-pink-500 ' />
                </RectCard>

            </div>


            {/* showing calender */}

            <StaffCalendar />

        </div>
    )
}

export default PharmacistDashboard