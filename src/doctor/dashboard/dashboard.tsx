import RectCard from "@/components/rectCard"
import StaffCalendar from "@/components/staffCalendar"
import { authSelector } from "@/features/auth/authSlice"
import { useAppSelector } from "@/hooks"
import { DoctorDashTotalCount } from "@/types/dashboard/costorDashboard"
import { Ambulance, CalendarClock, CheckCheck, CircleX, DollarSign, HeartPulse, LoaderCircle } from "lucide-react"
import { useEffect, useState } from "react"
import { getDoctorDashTotalCount } from "./APIHandlers"
import toast from "react-hot-toast"



const DoctorDashboard = () => {

  const { user } = useAppSelector(authSelector)
  const [total, setToatl] = useState<DoctorDashTotalCount>()


  const fetchDoctorDashTotalCount = async () => {
    try {
      const data = await getDoctorDashTotalCount(Number(user?.id))
      setToatl(data)
    } catch ({ message }: any) {
      toast.error(message)
    }
  }

  useEffect(() => {
    fetchDoctorDashTotalCount()
  }, [])


  return (
    <div className="flex flex-col gap-y-10 pt-5 pb-10">

      <div className='grid lg:grid-cols-4 sm:grid-cols-2 gap-4'>

        <RectCard name='OPD' path={'../opd'} visits={total?.opds}>
          <HeartPulse className='h-8 w-8 text-rose-500' />
        </RectCard>

        <RectCard name='Appointments' path={'../appointment'} visits={total?.appointments}>
          <CalendarClock className='h-8 w-8 text-slate-500' />
        </RectCard>

        {total?.appointment.map((item, i) => (
          <RectCard key={i} name={item.status} path={'../appointment'} visits={item.count}>
            {item.status === 'Approved' ? <CheckCheck className='h-8 w-8 text-green-500' /> : item.status === 'Pending' ? <LoaderCircle className='h-8 w-8 text-yellow-500' /> : <CircleX className='h-8 w-8 text-red-500' />}
          </RectCard>
        ))}


      </div>

      <StaffCalendar />
    </div>
  )
}

export default DoctorDashboard