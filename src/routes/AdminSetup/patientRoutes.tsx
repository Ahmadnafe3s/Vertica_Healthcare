import Patients from '@/admin/setup/patient/patients'
import ProtectRoutes from '@/guard/protectRoutes'
import { Route } from 'react-router-dom'

const SetupPatientRoutes = () => {
    return (
        <>
            <Route path='admin/setup/patient' element={<ProtectRoutes requiredRole={['admin']} protectElement={<Patients />} />} />
        </>
    )
}

export default SetupPatientRoutes