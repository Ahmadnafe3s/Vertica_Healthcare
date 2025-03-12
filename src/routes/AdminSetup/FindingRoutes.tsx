import FindindngCategories from '@/admin/setup/findings/finding_category/findindngCategory'
import FindingNames from '@/admin/setup/findings/finding_name/findingNames'
import FindingsLayout from '@/admin/setup/findings/findingsLayout'
import ProtectRoutes from '@/guard/protectRoutes'
import { Route } from 'react-router-dom'

const SetupFindingRoutes = () => {
    return (
        <Route path="admin/setup/finding" element={<ProtectRoutes requiredRole={['admin']} protectElement={<FindingsLayout />} />}>
            <Route path="" element={<FindingNames />} />
            <Route path="category" element={<FindindngCategories />} />
        </Route>
    )
}

export default SetupFindingRoutes