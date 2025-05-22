import MedicineCategories from '@/admin/setup/pharmacy/medicine_category/medicineCategories'
import MedicineCompany from '@/admin/setup/pharmacy/medicine_company/medicineCompany'
import DoseDuration from '@/admin/setup/pharmacy/medicine_dose_duration/doseDuration'
import DoseIntervals from '@/admin/setup/pharmacy/medicine_dose_interval/doseIntervals'
import MedicineGroups from '@/admin/setup/pharmacy/medicine_group/medicineGroups'
import MedicineUnits from '@/admin/setup/pharmacy/medicine_unit/medicineUnits'
import PharmacyLayout from '@/admin/setup/pharmacy/layout'
import ProtectRoutes from '@/guard/protectRoutes'
import { Route } from 'react-router-dom'



const SetupPharmacyRoutes = () => {
    return (
        <Route element={<ProtectRoutes />}>
            <Route path="admin/setup/pharmacy" element={<PharmacyLayout />}>
                <Route path="" element={<MedicineCategories />} />
                <Route path="group" element={<MedicineGroups />} />
                <Route path="company" element={<MedicineCompany />} />
                <Route path="unit" element={<MedicineUnits />} />
                <Route path="duration" element={<DoseDuration />} />
                <Route path="interval" element={<DoseIntervals />} />
            </Route>
        </Route>
    )
}

export default SetupPharmacyRoutes