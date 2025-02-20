import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./Auth/signin";
import Navbar from "./components/Navbar";
import AsideLayout from "./Layouts/AsideLayout";
import HomePage from "./home/HomePage";
import AdminDashboard from "./admin/dashboard";
import AdminAppointment from "./admin/appointment/appointmet";
import QueueAppointment from "./admin/appointment/QueueAppointment";
import OPD from "./admin/OPD/opd-layout";
import RegisterPatient from "./Auth/registerPatient";
import Pharmacy from "./admin/pharmacy/pharmacy";
import Bill from "./admin/pharmacy/pharmacyBills";
import Medicines from "./admin/pharmacy/medicines";
import Purchase from "./admin/pharmacy/purchase";
import HumanResource from "./admin/humanresource/HRLayout";
import Staff from "./admin/humanresource/staff";
import CreateStaff from "./admin/humanresource/createStaff";
import DutuRoster from "./admin/dutyRoster/dutyroster";
import RosterReport from "./admin/dutyRoster/rosterReport";
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
import Patient from "./admin/OPD/patient/patient-layout";
import Medication from "./admin/OPD/patient/medication/medication";
import Vital from "./admin/OPD/patient/vital/vital";
import OperationList from "./admin/OPD/patient/operation/operationList";
import Timeline from "./admin/OPD/patient/timeline/timelineList";
import CahrgesList from "./admin/OPD/patient/charges/chargesList";
import TreatmentsList from "./admin/OPD/patient/treatmentHistory/treatmentsList";
import PaymentsList from "./admin/OPD/patient/payments/paymentsList";
import ChargesList from "./admin/setup/hospital-charges/chargeName/chargesNameList";
import ChargesLayout from "./admin/setup/hospital-charges/charges-layout";
import CategoryList from "./admin/setup/hospital-charges/chargesCategory/categoryList";
import ChargeTypes from "./admin/setup/hospital-charges/chargeType/chargeTypes";
import ChargeUnitList from "./admin/setup/hospital-charges/chargeUnit/chargeUnitList";
import TaxList from "./admin/setup/hospital-charges/taxes/taxList";
import OperationLayout from "./admin/setup/operation/operationLayout";
import OperationNames from "./admin/setup/operation/operation_name/operationNames";
import OperationCategories from "./admin/setup/operation/operation_category/operationCategories";
import FindingNames from "./admin/setup/findings/finding_name/findingNames";
import FindindngCategories from "./admin/setup/findings/finding_category/findindngCategory";
import FindingsLayout from "./admin/setup/findings/findingsLayout";
import PharmacyLayout from "./admin/setup/pharmacy/pharmacyLayout";
import MedicineCategories from "./admin/setup/pharmacy/medicine_category/medicineCategories";
import MedicineGroups from "./admin/setup/pharmacy/medicine_group/medicineGroups";
import MedicineCompany from "./admin/setup/pharmacy/medicine_company/medicineCompany";
import MedicineUnits from "./admin/setup/pharmacy/medicine_unit/medicineUnits";
import DoseDuration from "./admin/setup/pharmacy/medicine_dose_duration/doseDuration";
import DoseIntervals from "./admin/setup/pharmacy/medicine_dose_interval/doseIntervals";
import SetupVitals from "./admin/setup/vitals/setupVitals";






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


          {/* Setup routes for charges*/}

          <Route path="admin/setup/charges" element={<ProtectRoutes requiredRole="admin" protectElement={<ChargesLayout />} />}>
            <Route path="" element={<ChargesList />} />
            <Route path="category" element={<CategoryList />} />
            <Route path="types" element={<ChargeTypes />} />
            <Route path="units" element={<ChargeUnitList />} />
            <Route path="tax" element={<TaxList />} />
          </Route>


          {/* Setup routes for operations*/}

          <Route path="admin/setup/operation" element={<ProtectRoutes requiredRole="admin" protectElement={<OperationLayout />} />}>
            <Route path="" element={<OperationNames />} />
            <Route path="category" element={<OperationCategories />} />
          </Route>

          {/* Setup routes for findings */}

          <Route path="admin/setup/finding" element={<ProtectRoutes requiredRole="admin" protectElement={<FindingsLayout />} />}>
            <Route path="" element={<FindingNames />} />
            <Route path="category" element={<FindindngCategories />} />
          </Route>


          {/* Setup routes for pharmacy */}

          <Route path="admin/setup/pharmacy" element={<ProtectRoutes requiredRole="admin" protectElement={<PharmacyLayout />} />}>
            <Route path="" element={<MedicineCategories />} />
            <Route path="group" element={<MedicineGroups />} />
            <Route path="company" element={<MedicineCompany />} />
            <Route path="unit" element={<MedicineUnits />} />
            <Route path="duration" element={<DoseDuration />} />
            <Route path="interval" element={<DoseIntervals />} />
          </Route>


          {/* Setup routes for vitals */}

          <Route path="admin/setup/vital" element={<ProtectRoutes requiredRole="admin" protectElement={<SetupVitals />} />} />



          <Route path="admin/OPD" element={<OPD />}>
            <Route path="list" element={<OPDLIST />} />
            <Route path="patient/:patientId/:opdId" element={<Patient />}>
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
