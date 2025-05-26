import ProtectRoutes from '@/guard/protectRoutes'
import { Route } from 'react-router-dom'
import AuthzRoutes from './authzRoutes'
import BedRoutes from './bed-routes'
import EventRoutes from './EventRoutes'
import ChargesRoutes from './ChargesRoutes'
import FindingRoutes from './FindingRoutes'
import OperationRoutes from './OperationRoutes'
import PathologyRoutes from './pathology'
import RadiologyRoutes from './radiologyRoutes'
import PatientRoutes from './patientRoutes'
import PharmacyRoutes from './PharmacyRoutes'
import VitalRoutes from './vitalRoutes'
import SetupStaffRoutes from './staff'

const SetupIndexRoutes = () => {
    return (
        <Route element={<ProtectRoutes restrictedTo='patient' />}>
            {AuthzRoutes()}
            {BedRoutes()}
            {EventRoutes()}
            {ChargesRoutes()}
            {FindingRoutes()}
            {OperationRoutes()}
            {PathologyRoutes()}
            {RadiologyRoutes()}
            {PatientRoutes()}
            {PharmacyRoutes()}
            {VitalRoutes()}
            {SetupStaffRoutes()}
        </Route>
    )
}

export default SetupIndexRoutes