import SetupVitals from '@/admin/setup/vitals/setupVitals'
import ProtectRoutes from '@/guard/protectRoutes'
import { Route } from 'react-router-dom'

const SetupVitalRoutes = () => {
    return (
        <Route element={<ProtectRoutes />}>
            <Route path="admin/setup/vital" element={<SetupVitals />} />
        </Route>
    )
}

export default SetupVitalRoutes