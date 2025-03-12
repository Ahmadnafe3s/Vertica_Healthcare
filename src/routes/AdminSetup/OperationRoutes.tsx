import OperationCategories from '@/admin/setup/operation/operation_category/operationCategories'
import OperationNames from '@/admin/setup/operation/operation_name/operationNames'
import OperationLayout from '@/admin/setup/operation/operationLayout'
import ProtectRoutes from '@/guard/protectRoutes'
import { Route } from 'react-router-dom'



const SetupOperationRoutes = () => {
    return (
        <Route path="admin/setup/operation" element={<ProtectRoutes requiredRole={['admin']} protectElement={<OperationLayout />} />}>
            <Route path="" element={<OperationNames />} />
            <Route path="category" element={<OperationCategories />} />
        </Route>
    )
}


export default SetupOperationRoutes