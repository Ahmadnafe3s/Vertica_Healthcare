import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./Auth/signin";
import Navbar from "./components/Navbar";
import AsideLayout from "./Layouts/AsideLayout";
import HomePage from "./home/HomePage";
import AdminDashboard from "./admin/dashboard";
import AdminAppointment from "./admin/appointmet";
import QueueAppointment from "./admin/QueueAppointment";
import OPD from "./admin/OPD";
import RegisterPatient from "./Auth/registerPatient";



function App() {
  return (
    <Router>

      <Navbar />


      <Routes>
        <Route path="signin" element={<SignIn />} />
        <Route path="home" element={<HomePage />} />
        <Route path="registerPatient" element={<RegisterPatient />} />

        {/* routes with aside */}
        <Route element={<AsideLayout />}>
          <Route path="admin/dashboard" element={<AdminDashboard />} />
          <Route path="admin/appointment" element={<AdminAppointment />} />
          <Route path="admin/QueueAppointment" element={<QueueAppointment />} />
          <Route path="admin/OPD" element={<OPD />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
