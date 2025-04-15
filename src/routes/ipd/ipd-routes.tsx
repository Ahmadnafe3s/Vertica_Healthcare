import ProtectRoutes from '@/guard/protectRoutes'
import IpdLayout from '@/pages/ipd/ipd-layout'
import Ipds from '@/pages/ipd/ipds/ipds'
import IpdSectionsLayout from '@/pages/ipd/sections/ipd-section-layout'
import IpdMedications from '@/pages/ipd/sections/medication/medications'
import IpdOperations from '@/pages/ipd/sections/operation/operations'
import IpdOverview from '@/pages/ipd/sections/overview'
import IpdTimelines from '@/pages/ipd/sections/timeline/timeline'
import IpdVitals from '@/pages/ipd/sections/vital/vitals'
import { Route } from 'react-router-dom'


const IpdRoutes = () => {
    return (
        <Route element={<ProtectRoutes />}>
            <Route path='ipd' element={<IpdLayout />}>
                <Route path='' element={<Ipds />} />
                <Route path=':ipdId' element={<IpdSectionsLayout />}>
                    <Route path='' element={<IpdOverview />} />
                    <Route path='medication' element={<IpdMedications />} />
                    <Route path='operation' element={<IpdOperations />} />
                    <Route path='vital' element={<IpdVitals />} />
                    <Route path='timeline' element={<IpdTimelines />} />
                </Route>
            </Route>
        </Route>
    )
}



export default IpdRoutes