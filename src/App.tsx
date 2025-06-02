import { useContext, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import SignIn from "./Auth/signin";
import Navbar from "./components/Navbar";
import { PermissionContext } from "./contexts/permission-provider";
import Not_found from "./error/not_found";
import Unauthorized from "./error/unauthorized";
import { checkSession } from "./features/auth/authSlice";
import { useAppDispatch } from "./hooks";
import AsideLayout from "./Layouts/AsideLayout";
import AnnualCalendar from "./pages/home/annual-calendar";
import HomePage from "./pages/home/HomePage";
import HomeLayout from "./pages/home/layout";
import IndexRoutes from "./routes";
import AdminRoutes from "./routes/AdminRoutes";
import SetupIndexRoutes from "./routes/AdminSetup";
import PatientRoutes from "./routes/PatientRoutes";
import HomePageEvents from "./pages/home/events";
import AboutUs from "./pages/home/about";



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
          {/* Homepage */}
          <Route path="/" element={<HomeLayout />}>
            <Route index element={<HomePage />} />
            <Route path="home/annual-calendar" element={<AnnualCalendar />} />
            <Route path="home/event" element={<HomePageEvents />} />
            <Route path="home/about" element={<AboutUs />} />
          </Route>

          <Route path="signin" element={<SignIn />} />
          <Route path="*" element={<Not_found />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route element={<AsideLayout />}>
            {AdminRoutes()}
            {PatientRoutes()}
            {IndexRoutes()}
            {SetupIndexRoutes()}
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
