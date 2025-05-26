import { PermissionContext } from '@/contexts/permission-provider'
import { authSelector } from '@/features/auth/authSlice'
import { useAppSelector } from '@/hooks'
import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'



const ProtectRoutes = ({ restrictedTo, action, module }: { restrictedTo?: string, action?: string, module?: string }) => {

    const session = useAppSelector(authSelector)
    const { hasPermission } = useContext(PermissionContext)

    if (!session.user) {
        return <Navigate to="/signin" />
    }

    // if action and module are provided, check if the user has permission
    if (action && module) {
        if (!hasPermission(action, module)) {
            return <Navigate to="/unauthorized" />
        }
    }

    if (restrictedTo && session.user.role === restrictedTo) {
        return <Navigate to="/unauthorized" />
    }

    return <Outlet></Outlet>

}

export default ProtectRoutes