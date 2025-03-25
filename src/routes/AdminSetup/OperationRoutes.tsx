import OperationCategories from '@/admin/setup/operation/operation_category/operationCategories'
import OperationNames from '@/admin/setup/operation/operation_name/operationNames'
import OperationLayout from '@/admin/setup/operation/operationLayout'
import ProtectRoutes from '@/guard/protectRoutes'
import { Route } from 'react-router-dom'



const SetupOperationRoutes = () => {
    return (
        <Route element={<ProtectRoutes />}>
            <Route path="admin/setup/operation" element={<OperationLayout />}>
                <Route path="" element={<OperationNames />} />
                <Route path="category" element={<OperationCategories />} />
            </Route>
        </Route>
    )
}


export default SetupOperationRoutes