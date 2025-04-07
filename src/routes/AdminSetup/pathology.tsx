import SetupPathCategories from '@/admin/setup/pathology/category/categories'
import SetupPathParameters from '@/admin/setup/pathology/parameter/parameters'
import SetupPathologyLayout from '@/admin/setup/pathology/pathology-layout'
import SetupPathologyTestNames from '@/admin/setup/pathology/test/test-names'
import PathologyUnit from '@/admin/setup/pathology/units/units'
import ProtectRoutes from '@/guard/protectRoutes'
import { Route } from 'react-router-dom'



const SetupPathologyRoutes = () => {
    return (
        <Route element={<ProtectRoutes />}>
            <Route path='admin/setup/pathology' element={<SetupPathologyLayout />}>
                <Route path='' element={<SetupPathologyTestNames />} />
                <Route path='category' element={<SetupPathCategories />} />
                <Route path='test' element={<div>PathologyTest</div>} />
                <Route path='units' element={<PathologyUnit />} />
                <Route path='parameter' element={<SetupPathParameters />} />
            </Route>
        </Route>
    )
}

export default SetupPathologyRoutes