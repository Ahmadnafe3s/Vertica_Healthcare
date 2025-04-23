import ProtectRoutes from '@/guard/protectRoutes'
import PatientDashboard from '@/patient/dashboard/patientDashboard'
import PatientLayout from '@/patient/patientLayout'
import PatientProfile from '@/patient/profile/patientProfile'
import { Route } from 'react-router-dom'


const PatientRoutes = () => {


    return (
        <Route element={<ProtectRoutes />}>
            <Route path="patient" element={<PatientLayout />}>
                <Route path="dashboard" element={<PatientDashboard />} />
                <Route path="profile/:id" element={<PatientProfile />} />
            </Route>
        </Route>
    )
}

export default PatientRoutes