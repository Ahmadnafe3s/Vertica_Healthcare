import ProtectRoutes from '@/guard/protectRoutes'
import PharmacistDashboard from '@/pharmacist/dashboard/dashboard'
import PharmacistLayout from '@/pharmacist/pharmacistLayout'
import { Route } from 'react-router-dom'

const PharmacistRoutes = () => {
    return (
        <Route path='pharmacist' element={<ProtectRoutes requiredRole={['pharmacist']} protectElement={<PharmacistLayout />} />}>
            <Route path='dashboard' element={<PharmacistDashboard />} />
        </Route>
    )
}

export default PharmacistRoutes