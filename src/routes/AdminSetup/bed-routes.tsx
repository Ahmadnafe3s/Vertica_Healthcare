import SetupBedLayout from "@/admin/setup/bed/bed-layout"
import SetupBed from "@/admin/setup/bed/bed-name/bed"
import SetupBedFloors from "@/admin/setup/bed/floor/bed-floors"
import SetupBedGroups from "@/admin/setup/bed/group/bed-groups"
import ProtectRoutes from "@/guard/protectRoutes"
import { Route } from "react-router-dom"




const SetupBedRoutes = () => {
    return (
        <Route element={<ProtectRoutes />}>
            <Route path="admin/setup/bed" element={<SetupBedLayout />}>
                <Route path="" element={<SetupBed />} />
                <Route path="groups" element={<SetupBedGroups />} />
                <Route path="floors" element={<SetupBedFloors />} />
            </Route>
        </Route>
    )
}

export default SetupBedRoutes