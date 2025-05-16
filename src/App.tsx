import { useContext, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import SignIn from "./Auth/signin";
import Navbar from "./components/Navbar";
import { PermissionContext } from "./contexts/permission-provider";
import Not_found from "./error/not_found";
import Unauthorized from "./error/unauthorized";
import { checkSession } from "./features/auth/authSlice";
import HomePage from "./home/HomePage";
import { useAppDispatch } from "./hooks";
import AsideLayout from "./Layouts/AsideLayout";
import IndexRoutes from "./routes";
import AdminRoutes from "./routes/AdminRoutes";
import SetupAuthzRoutes from "./routes/AdminSetup/authzRoutes";
import SetupBedRoutes from "./routes/AdminSetup/bed-routes";
import SetupEventRoutes from "./routes/AdminSetup/EventRoutes";
import SetupFindingRoutes from "./routes/AdminSetup/FindingRoutes";
import HospitalChargesRoutes from "./routes/AdminSetup/HospitalChargesRoutes";
import SetupOperationRoutes from "./routes/AdminSetup/OperationRoutes";
import SetupPathologyRoutes from "./routes/AdminSetup/pathology";
import SetupPatientRoutes from "./routes/AdminSetup/patientRoutes";
import SetupPharmacyRoutes from "./routes/AdminSetup/PharmacyRoutes";
import SetupRadiologyRoutes from "./routes/AdminSetup/radiologyRoutes";
import SetupVitalRoutes from "./routes/AdminSetup/vitalRoutes";
import PatientRoutes from "./routes/PatientRoutes";
import SetupStaffRoutes from "./routes/AdminSetup/staff";



function App() {

  const dispatch = useAppDispatch()
  const { removePermissions } = useContext(PermissionContext)


  useEffect(() => {
    removePermissions()
    dispatch(checkSession())
  }, [dispatch])


  return (
    <div className="dark:bg-background dark:text-white">
      <Router>
        <Toaster toastOptions={{ duration: 2000 }} />
        <Navbar />

        <Routes>

          <Route path="/" element={<HomePage />} />
          <Route path="signin" element={<SignIn />} />


          {/* routes with aside */}
          <Route element={<AsideLayout />}>

            {/*should have call the function*/}

            {AdminRoutes()}

            {PatientRoutes()}


            {/* Setup routes for charges*/}
            {HospitalChargesRoutes()}

            {/* Setup routes for operations*/}
            {SetupOperationRoutes()}

            {/* Setup routes for findings */}
            {SetupFindingRoutes()}

            {/* Setup routes for pharmacy */}
            {SetupPharmacyRoutes()}

            {/* Setup routes for vitals */}
            {SetupVitalRoutes()}

            {/* setup route for Event */}
            {SetupEventRoutes()}

            {/* setup route for Patinets */}
            {SetupPatientRoutes()}

            {/* setup route for Patinets */}
            {SetupAuthzRoutes()}

            {/* setup route for radiology */}
            {SetupRadiologyRoutes()}

            {/* setup route for pathology */}
            {SetupPathologyRoutes()}

            {/* setup route for bed */}
            {SetupBedRoutes()}

            {/* setup routes for staff */}
            {SetupStaffRoutes()}

            {/* Index route */}
            {IndexRoutes()}


          </Route>


          {/* error handlers */}
          <Route path="*" element={<Not_found />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
