import AmbulanceRoutes from './ambulance/ambulanceRoutes'
import AppointmentRoutes from './appointment/appointmentRoutes'
import BloodBankRoutes from './blood-bank/blood-bank'
import DutyRosterRoutes from './duty-roster/duty-roster'
import IpdRoutes from './ipd/ipd-routes'
import OpdRoutes from './opd/opd-routes'
import PathologyRoutes from './pathology/pathology-routes'
import PharmacyRoutes from './pharmacy/pharmacy-routes'
import RadiologyRoutes from './radiology/radiology-routes'
import StaffRoutes from './staff/staff'



const IndexRoutes = () => {
    return (
        <>
            {IpdRoutes()}
            {OpdRoutes()}
            {AppointmentRoutes()}
            {DutyRosterRoutes()}
            {StaffRoutes()}
            {RadiologyRoutes()}
            {PathologyRoutes()}
            {PharmacyRoutes()}
            {AmbulanceRoutes()}
            {BloodBankRoutes()}
        </>
    )
}

export default IndexRoutes