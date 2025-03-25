import Patients from '@/admin/setup/patient/patients'
import ProtectRoutes from '@/guard/protectRoutes'
import { Route } from 'react-router-dom'

const SetupPatientRoutes = () => {
    return (
        <>
            <Route element={<ProtectRoutes />}>
                <Route path='admin/setup/patient' element={<Patients />} />
            </Route>
        </>
    )
}

export default SetupPatientRoutes