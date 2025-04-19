import ProtectRoutes from "@/guard/protectRoutes"
import RadiologyBills from "@/pages/radiology/radiologyBills"
import { Route } from "react-router-dom"

const RadiologyRoutes = () => {
    return (
        <Route element={<ProtectRoutes />}>
            <Route path="radiology" element={<RadiologyBills />} />
        </Route>
    )
}

export default RadiologyRoutes