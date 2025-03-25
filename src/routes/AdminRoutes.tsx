import AdminLayout from "@/admin/AdminLayout"
import AppointmentLayout from "@/admin/appointment/appointmentLayout"
import AdminAppointment from "@/admin/appointment/appointmet"
import CancelledAppointments from "@/admin/appointment/cancelledAppointments"
import QueueAppointment from "@/admin/appointment/QueueAppointment"
import AdminDashboard from "@/admin/dashboard/dashboard"
import DutuRoster from "@/admin/dutyRoster/dutyRosterLayout"
import RosterReport from "@/admin/dutyRoster/rosterReport"
import CreateStaff from "@/admin/humanresource/createStaff"
import HumanResource from "@/admin/humanresource/HRLayout"
import Staff from "@/admin/humanresource/staff"
import CahrgesList from "@/admin/OPD/details/charges/chargesList"
import Medication from "@/admin/OPD/details/medication/medication"
import OpdDetailsLayout from "@/admin/OPD/details/opdDetailsLayout"
import OperationList from "@/admin/OPD/details/operation/operationList"
import PaymentsList from "@/admin/OPD/details/payments/paymentsList"
import Timeline from "@/admin/OPD/details/timeline/timelineList"
import TreatmentsList from "@/admin/OPD/details/treatmentHistory/treatmentsList"
import VisitDetails from "@/admin/OPD/details/visitDetails"
import Vital from "@/admin/OPD/details/vital/vital"
import AdminOPDlayout from "@/admin/OPD/opd-layout"
import OPDLIST from "@/admin/OPD/opdList"
import Medicines from "@/admin/pharmacy/medicines/medicines"
import Bill from "@/admin/pharmacy/pharmacyBill/pharmacyBills"
import Pharmacy from "@/admin/pharmacy/pharmacyLayout"
import Purchase from "@/admin/pharmacy/purchaseMedicine/purchase"
import ResetPassword from "@/admin/profile/resetpassword"
import Staffprofile from "@/admin/profile/staffprofile"
import ProtectRoutes from "@/guard/protectRoutes"
import { Route } from "react-router-dom"





const AdminRoutes = () => {

    return (

        // protected route only handling authentication 
        <Route element={<ProtectRoutes restrictedTo="patient" />}>

            <Route path="admin" element={<AdminLayout />}>
                {/* Dashboard */}
                <Route
                    path="dashboard"
                    element={<AdminDashboard />}
                />


                {/* Appoinment routes */}
                <Route path="appointment" element={<AppointmentLayout />}>
                    <Route path="" element={<AdminAppointment />} />
                    <Route path="queue" element={<QueueAppointment />} />
                    <Route path="cancelled" element={<CancelledAppointments />} />
                </Route>


                {/* OPD Routes */}
                <Route path="opd" element={<AdminOPDlayout />}>
                    <Route path="" element={<OPDLIST />} />
                    <Route path="patient/:patientId/:opdId" element={<OpdDetailsLayout />}>
                        <Route path="" element={<VisitDetails />} />
                        <Route path="medication" element={<Medication />} />
                        <Route path="vital" element={<Vital />} />
                        <Route path="operation" element={<OperationList />} />
                        <Route path="timeline" element={<Timeline />} />
                        <Route path="charges" element={<CahrgesList />} />
                        <Route path="treatmenthistory" element={<TreatmentsList />} />
                        <Route path="payment" element={<PaymentsList />} />
                    </Route>
                </Route>

                {/* Pharmacy Routes */}
                <Route path="pharmacy" element={<Pharmacy />} >
                    <Route path="" element={<Bill />} />
                    <Route path="medicines" element={<Medicines />} />
                    <Route path="purchase" element={<Purchase />} />
                </Route>

                {/* HR Routes */}
                <Route path="humanresource" element={<HumanResource />} >
                    <Route path="staff" element={<Staff />} />
                    <Route path="create" element={<CreateStaff />} />
                </Route>

                {/* Profile Routes */}
                <Route path="profile" element={<HumanResource />} >
                    <Route path="staff/:id" element={<Staffprofile />} />
                    <Route path="edit/:id" element={<CreateStaff />} />
                    <Route path="resetpassword/:id" element={<ResetPassword />} />
                </Route>

                {/* Duty Roster Routes */}
                <Route path="dutyroster" element={<DutuRoster />}>
                    <Route path="rosterreport" element={<RosterReport />} />
                </Route>

            </Route>
        </Route>

    )
}

export default AdminRoutes