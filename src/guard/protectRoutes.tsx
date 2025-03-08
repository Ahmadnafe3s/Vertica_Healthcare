import { authSelector } from '@/features/auth/authSlice'
import { useAppSelector } from '@/hooks'
import React from 'react'
import { Navigate } from 'react-router-dom'

interface ProtectRoutesProps {
    requiredRole?: string,
    protectElement: React.ReactNode
}

const ProtectRoutes = ({ requiredRole, protectElement }: ProtectRoutesProps) => {

    const session = useAppSelector(authSelector)

    // if (session.user && session.user.role !== requiredRole) {
    //     return <div>You are already logged in as a patient. Stay on this page or log out.</div>;
    // }   // i was trying to prevent users to visit register page

    if (!session.user) {
        return <Navigate to="/signin" />
    }

    if (requiredRole && session.user.role !== requiredRole) { // if role exists the check (means if we passed)
        return <Navigate to="/unauthorized" />
    }

    return <>{protectElement}</>
}

export default ProtectRoutes