import usePermission from "@/authz";
import { ReactNode, useEffect } from "react";


interface PermissionProtectedActionProps {
    children: ReactNode;
    action: 'view' | 'create';
    module: string;
}

const PermissionProtectedAction = ({
    children,
    action,
    module
}: PermissionProtectedActionProps) => {

    const { hasPermission, loadPermission } = usePermission();

    useEffect(() => {
        loadPermission();
    }, [])

    const isPermitted = hasPermission(action, module);

    if (!isPermitted) return null;

    return (
        <main>{children}</main>
    )
}


export default PermissionProtectedAction