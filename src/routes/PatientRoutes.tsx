import RegisterPatient from '@/Auth/registerPatient'
import PatientAppointments from '@/patient/appointment/patientAppointments'
import PatientDashboard from '@/patient/dashboard/patientDashboard'
import PatientOpdCharges from '@/patient/opd/details/charges/charges'
import PatientOpdMedication from '@/patient/opd/details/medication/medication'
import PatinetOpdDetailsLayout from '@/patient/opd/details/opdDetailsLayout'
import PatientOpdOperation from '@/patient/opd/details/operation/operation'
import PatientOpdPayments from '@/patient/opd/details/payments/payments'
import PatientOpdTimeline from '@/patient/opd/details/timeline/timeline'
import PatinetOpdVisitDetails from '@/patient/opd/details/visitdetails/visitdetails'
import PatientOpdVitals from '@/patient/opd/details/vitals/vitals'
import PatientOpds from '@/patient/opd/opds/opds'
import PatientsOpdLayout from '@/patient/opd/patientOpdLayout'
import PatientLayout from '@/patient/patientLayout'
import PatientPharmacyBills from '@/patient/pharmacy/pharmacy'
import PatientProfile from '@/patient/profile/patientProfile'
import PatientResetPassword from '@/patient/profile/patientResetPassword'
import { BrowserRouter, Route } from 'react-router-dom'

const PatientRoutes = () => {


    return (
        <Route path="patient" element={<PatientLayout />}>
            <Route path="dashboard" element={<PatientDashboard />} />
            <Route path="appointment" element={<PatientAppointments />} />
            <Route path="profile/:id" element={<PatientProfile />} />
            <Route path="edit/:id" element={<RegisterPatient />} />
            <Route path="resetpassword" element={<PatientResetPassword />} />
            <Route path="pharmacy" element={<PatientPharmacyBills />} />
            {/* opd layout */}
            <Route path="opd" element={<PatientsOpdLayout />} >
                <Route path="" element={<PatientOpds />} />
                {/* details layout */}
                <Route path="details/:opdId" element={<PatinetOpdDetailsLayout />}>
                    <Route path="" element={<PatinetOpdVisitDetails />} />
                    <Route path="medication" element={<PatientOpdMedication />} />
                    <Route path="vital" element={<PatientOpdVitals />} />
                    <Route path="timeline" element={<PatientOpdTimeline />} />
                    <Route path="operation" element={<PatientOpdOperation />} />
                    <Route path="charges" element={<PatientOpdCharges />} />
                    <Route path="payment" element={<PatientOpdPayments />} />
                    {/* <Route path="findings" element={<PatientOpdFindings />} /> */}
                </Route>
            </Route>
        </Route>
    )
}

export default PatientRoutes