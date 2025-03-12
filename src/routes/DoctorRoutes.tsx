import DoctorAppointments from "@/doctor/appointments/appointments"
import DoctorDashboard from "@/doctor/dashboard/dashboard"
import DoctorLayout from "@/doctor/doctorLayout"
import DoctorOpds from "@/doctor/opd/opds"
import ProtectRoutes from "@/guard/protectRoutes"
import { Route } from "react-router-dom"


const DoctorRoutes = () => {
    return (
        <Route path="doctor" element={<ProtectRoutes requiredRole={["doctor"]} protectElement={<DoctorLayout />} />} >
            <Route path="appointment" element={<DoctorAppointments />} />
            <Route path="dashboard" element={<DoctorDashboard />} />
            <Route path="opd" element={<DoctorOpds />} />
        </Route>
    )
}

export default DoctorRoutes