import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./Auth/signin";
import Navbar from "./components/Navbar";
import AsideLayout from "./Layouts/AsideLayout";
import HomePage from "./home/HomePage";
import AdminDashboard from "./admin/dashboard";
import AdminAppointment from "./admin/appointmet";
import QueueAppointment from "./admin/QueueAppointment";
import OPD from "./admin/OPD/OPD";
import RegisterPatient from "./Auth/registerPatient";
import Pharmacy from "./admin/pharmacy/pharmacy";
import Bill from "./admin/pharmacy/bills";
import Medicines from "./admin/pharmacy/medicines";
import Purchase from "./admin/pharmacy/purchase";



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
          
          <Route path="admin/pharmacy" element={<Pharmacy />} >
            <Route path="bill" element={<Bill />} />
            <Route path="medicines" element={<Medicines />} />
            <Route path="purchase" element={<Purchase />} />
          </Route>

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
