import ProtectRoutes from "@/guard/protectRoutes"
import ReceptionistDashboard from "@/receptionist/Dashboard/dashboard"
import ReceptionistLayout from "@/receptionist/receptionistLayout"
import { Route } from "react-router-dom"

const ReceptionistRoutes = () => {
    return (
        <Route path="receptionist" element={<ProtectRoutes requiredRole={['admin', 'receptionist']} protectElement={<ReceptionistLayout />} />}>
            <Route path="dashboard" element={<ReceptionistDashboard />} />
        </Route>
    )
}

export default ReceptionistRoutes