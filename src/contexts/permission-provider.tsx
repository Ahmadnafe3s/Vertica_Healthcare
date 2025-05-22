import AuthzApi from "@/admin/setup/services/authorization";
import { authSelector } from "@/features/auth/authSlice";
import { useAppSelector } from "@/hooks";
import { createContext, ReactNode, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";




type PermissionContextValue = {
    hasPermission: (action: string, module: string) => boolean;
    removePermissions: () => void;
}

export const PermissionContext = createContext<PermissionContextValue>({
    hasPermission: () => false,
    removePermissions: () => { }
})


export const PermissionProvider = ({ children }: { children: ReactNode }) => {

    const { user } = useAppSelector(authSelector)
    const [permission, setPermission] = useState<string[]>([]);



    const loadPermissions = async () => {

        if (!user?.role) return;
        const storedPermissions = sessionStorage.getItem('permissions');

        if (storedPermissions) {
            return setPermission(JSON.parse(storedPermissions));
        }

        try {
            const data = await AuthzApi.getPermissions({ role: user.role });
            sessionStorage.setItem('permissions', JSON.stringify(data.map(p => p.name)));
            setPermission(data.map(p => p.name));
        } catch {
            toast.error('Failed to load permissions');
        }
    };



    useEffect(() => {
        loadPermissions();
    }, [user?.role]);


    const removePermissions = async () => {
        //gurantee that the permissions are removed & refreshed
        sessionStorage.removeItem('permissions');
        await loadPermissions()
    }

    const hasPermission = (action: string, module: string) => {
        return user?.role === 'admin' || permission.includes(`${action}:${module}`);
    }


    const value = useMemo(() => ({ hasPermission, removePermissions }), [permission, user?.role]);



    return (
        <PermissionContext.Provider value={value}>
            {children}
        </PermissionContext.Provider>
    )


}