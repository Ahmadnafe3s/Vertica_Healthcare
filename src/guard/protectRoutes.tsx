import { authSelector } from '@/features/auth/authSlice'
import { useAppSelector } from '@/hooks'
import { Navigate, Outlet } from 'react-router-dom'



const ProtectRoutes = ({ restrictedTo }: { restrictedTo?: string }) => {

    const session = useAppSelector(authSelector)

    if (!session.user) {
        return <Navigate to="/signin" />
    }

    if (restrictedTo && session.user.role === restrictedTo) {
        return <Navigate to="/unauthorized" />
    }

    return <Outlet></Outlet>

}

export default ProtectRoutes