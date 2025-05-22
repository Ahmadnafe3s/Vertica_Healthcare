import ChargesList from '@/admin/setup/hospital-charges/chargeName/chargesNameList'
import ChargesLayout from '@/admin/setup/hospital-charges/layout'
import CategoryList from '@/admin/setup/hospital-charges/chargesCategory/categoryList'
import ChargeTypes from '@/admin/setup/hospital-charges/chargeType/chargeTypes'
import ChargeUnitList from '@/admin/setup/hospital-charges/chargeUnit/chargeUnitList'
import TaxList from '@/admin/setup/hospital-charges/taxes/taxList'
import ProtectRoutes from '@/guard/protectRoutes'
import { Route } from 'react-router-dom'



const HospitalChargesRoutes = () => {
    return (
        <Route element={<ProtectRoutes />}>
            <Route path="admin/setup/charges" element={<ChargesLayout />}>
                <Route path="" element={<ChargesList />} />
                <Route path="category" element={<CategoryList />} />
                <Route path="types" element={<ChargeTypes />} />
                <Route path="units" element={<ChargeUnitList />} />
                <Route path="tax" element={<TaxList />} />
            </Route>
        </Route>
    )
}

export default HospitalChargesRoutes