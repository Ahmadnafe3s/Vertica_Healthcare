import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./Auth/signin";
import Navbar from "./components/Navbar";
import AsideLayout from "./Layouts/AsideLayout";
import HomePage from "./home/HomePage";
import RegisterPatient from "./Auth/registerPatient";
import { Toaster } from "react-hot-toast";
import { useAppDispatch } from "./hooks";
import { useEffect } from "react";
import { checkSession } from "./features/auth/authSlice";
import Not_found from "./error/not_found";
import Unauthorized from "./error/unauthorized";
import PatientRoutes from "./routes/PatientRoutes";
import HospitalChargesRoutes from "./routes/AdminSetup/HospitalChargesRoutes";
import SetupOperationRoutes from "./routes/AdminSetup/OperationRoutes";
import SetupFindingRoutes from "./routes/AdminSetup/FindingRoutes";
import SetupPharmacyRoutes from "./routes/AdminSetup/PharmacyRoutes";
import SetupVitalRoutes from "./routes/AdminSetup/vitalRoutes";
import SetupEventRoutes from "./routes/AdminSetup/EventRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import SetupPatientRoutes from "./routes/AdminSetup/patientRoutes";
import SetupAuthzRoutes from "./routes/AdminSetup/authzRoutes";
import SetupRadiologyRoutes from "./routes/AdminSetup/radiologyRoutes";
import SetupPathologyRoutes from "./routes/AdminSetup/pathology";



function App() {

  const dispatch = useAppDispatch()


  useEffect(() => {
    dispatch(checkSession())
  }, [dispatch])


  return (
    <div className="dark:bg-dark dark:text-white">
      <Router>
        <Toaster toastOptions={{ duration: 2000 }} />
        <Navbar />

        <Routes>

          <Route path="/" element={<HomePage />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="registerPatient" element={<RegisterPatient />} />


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
