import { useState } from "react"
import { getPermissions } from "./admin/setup/Authorization/APIHandler"
import { useAppSelector } from "./hooks"
import { authSelector } from "./features/auth/authSlice"
import toast from "react-hot-toast"


const usePermission = () => {

    const [PERMISSION, SETPERMISSION] = useState(new Map())

    const { user } = useAppSelector(authSelector)

    const loadPermission = async () => {
        if (!user?.role) return toast.error('Role not found')
        const data = await getPermissions({ role: user?.role })

        SETPERMISSION(new Map(data.map((p) => [p.name, p])))
    }



    const hasPermission = (action: string, module: string) => {
        return PERMISSION.has(`${action}:${module}`);
    }


    return { loadPermission, hasPermission }
}



export default usePermission