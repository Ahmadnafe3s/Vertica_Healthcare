import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./Auth/signin";
import Navbar from "./components/Navbar";
import AsideLayout from "./Layouts/AsideLayout";
import HomePage from "./home/HomePage";
import AdminDashboard from "./admin/dashboard";
import AdminAppointment from "./admin/appointment/appointmet";
import QueueAppointment from "./admin/appointment/QueueAppointment";
import OPD from "./admin/OPD/OPD";
import RegisterPatient from "./Auth/registerPatient";
import Pharmacy from "./admin/pharmacy/pharmacy";
import Bill from "./admin/pharmacy/bills";
import Medicines from "./admin/pharmacy/medicines";
import Purchase from "./admin/pharmacy/purchase";
import HumanResource from "./admin/humanresource/humanresource";
import Staff from "./admin/humanresource/staff";
import CreateStaff from "./admin/humanresource/createStaff";
import DutuRoster from "./admin/dutyRoster/dutyroster";
import RosterReport from "./admin/dutyRoster/rosterReport";
import PurchaseMedicineForm from "./admin/pharmacy/forms/purchaseMedicine";
import { Toaster } from "react-hot-toast";
import { useAppDispatch } from "./hooks";
import { useEffect } from "react";
import { checkSession } from "./features/auth/authSlice";
import ProtectRoutes from "./guard/protectRoutes";
import Not_found from "./error/not_found";
import Unauthorized from "./error/unauthorized";
import Staffprofile from "./admin/profile/staffprofile";
import ResetPassword from "./admin/profile/resetpassword";
import OPDLIST from "./admin/OPD/opdList";
import VisitDetails from "./admin/OPD/patient/visitDetails";
import Patient from "./admin/OPD/patient/Navigations";
import Medication from "./admin/OPD/patient/medication/medication";
import Vital from "./admin/OPD/patient/vital/vital";
import OperationList from "./admin/OPD/patient/operation/operationList";
import Timeline from "./admin/OPD/patient/timeline/timelineList";
import CahrgesList from "./admin/OPD/patient/charges/chargesList";
import TreatmentsList from "./admin/OPD/patient/treatmentHistory/treatmentsList";
import PaymentsList from "./admin/OPD/patient/payments/paymentsList";






function App() {

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(checkSession())
  }, [dispatch])

  
  return (
    <Router>
      <Toaster toastOptions={{ duration: 2000 }} />
      <Navbar />

      <Routes>

        <Route path="/" element={<HomePage />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="registerPatient" element={<RegisterPatient />} />


        {/* routes with aside */}
        <Route element={<AsideLayout />}>

          <Route
            path="admin/dashboard"
            element={<ProtectRoutes requiredRole="admin" protectElement={<AdminDashboard />} />}
          />
          <Route path="admin/appointment" element={<AdminAppointment />} />
          <Route path="admin/QueueAppointment" element={<QueueAppointment />} />


          <Route path="admin/OPD" element={<OPD />}>
            <Route path="list" element={<OPDLIST />} />
            <Route path="patient/:patientId/:caseId" element={<Patient />}>
              <Route path="visitdetails" element={<VisitDetails />} />
              <Route path="medication" element={<Medication />} />
              <Route path="vital" element={<Vital />} />
              <Route path="operation" element={<OperationList />} />
              <Route path="timeline" element={<Timeline />} />
              <Route path="charges" element={<CahrgesList />} />
              <Route path="treatmenthistory" element={<TreatmentsList />} />
              <Route path="payment" element={<PaymentsList />} />
            </Route>
          </Route>

          <Route path="admin/pharmacy" element={<Pharmacy />} >
            <Route path="bill" element={<Bill />} />
            <Route path="medicines" element={<Medicines />} />
            <Route path="purchase" element={<Purchase />} />
            <Route path="createPurchase" element={<PurchaseMedicineForm />} />
          </Route>

          <Route path="admin/humanresource" element={<HumanResource />} >
            <Route path="staff" element={<Staff />} />
            <Route path="create" element={<CreateStaff />} />
          </Route>

          <Route path="admin/profile" element={<HumanResource />} >
            <Route path="staff/:id" element={<Staffprofile />} />
            <Route path="edit/:id" element={<CreateStaff />} />
            <Route path="resetpassword/:id" element={<ResetPassword />} />
          </Route>

          <Route path="admin/dutyroster" element={<DutuRoster />}>
            <Route path="rosterreport" element={<RosterReport />} />
          </Route>
        </Route>


        {/* error handlers */}
        <Route path="*" element={<Not_found />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

      </Routes>
    </Router>
  );
}

export default App;
