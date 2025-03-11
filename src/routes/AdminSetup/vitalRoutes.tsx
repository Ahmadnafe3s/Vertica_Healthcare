import SetupVitals from '@/admin/setup/vitals/setupVitals'
import ProtectRoutes from '@/guard/protectRoutes'
import { Route } from 'react-router-dom'

const SetupVitalRoutes = () => {
    return (
        <Route path="admin/setup/vital" element={<ProtectRoutes requiredRole="admin" protectElement={<SetupVitals />} />} />
    )
}

export default SetupVitalRoutes