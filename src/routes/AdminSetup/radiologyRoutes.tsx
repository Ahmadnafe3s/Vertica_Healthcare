import RadioCategories from '@/admin/setup/radiology/category/categories'
import SetupRadioParameters from '@/admin/setup/radiology/parameter/parameters'
import SetupRadiologyLayout from '@/admin/setup/radiology/RadiologyLayout'
import RadiologyTests from '@/admin/setup/radiology/test/tests'
import RadiologyUnits from '@/admin/setup/radiology/units/units'
import ProtectRoutes from '@/guard/protectRoutes'
import { Route } from 'react-router-dom'



const SetupRadiologyRoutes = () => {
    return (
        <Route element={<ProtectRoutes />}>
            <Route path='admin/setup/radiology' element={<SetupRadiologyLayout />}>
                <Route path='' element={<RadiologyTests />} />
                <Route path='category' element={<RadioCategories />} />
                <Route path='units' element={<RadiologyUnits />} />
                <Route path='parameter' element={<SetupRadioParameters />} />
            </Route>
        </Route>
    )
}

export default SetupRadiologyRoutes