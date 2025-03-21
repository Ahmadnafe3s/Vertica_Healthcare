import usePermission from '@/authz'
import { authSelector } from '@/features/auth/authSlice'
import { useAppSelector } from '@/hooks'
import React from 'react'
import { Navigate } from 'react-router-dom'

interface ProtectRoutesProps {
    requiredRole?: string[],
    protectElement: React.ReactNode
}

const ProtectRoutes = ({ requiredRole = [], protectElement }: ProtectRoutesProps) => {

    const session = useAppSelector(authSelector)

    if (!session.user) {
        return <Navigate to="/signin" />
    }

    if ((requiredRole.length > 0) && !requiredRole.includes(session.user?.role)) { // if role exists the check (means if we passed)
        return <Navigate to="/unauthorized" />
    }

    return <>{protectElement}</>
}

export default ProtectRoutes