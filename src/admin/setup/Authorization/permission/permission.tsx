import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { dashboardPermissions, Module, setupPermissions } from "@/lib/modules"
import { parseAsInteger, useQueryState } from "nuqs"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { createPermission, deletePermission, getPermissions, getRoles } from "../APIHandler"
import { ROLE } from "../role/role"



const Permission = () => {

    type actionType = 'view' | 'create' | 'update' | 'delete'

    const [permissions, setPermissions] = useState(new Map())
    const [roleId, setRoleId] = useQueryState('roleId', parseAsInteger)

    const [roles, setRoles] = useState<ROLE[]>([])

    const fetchRoles = async () => {
        try {
            const data = await getRoles()
            setRoles(data)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    // creating and deleting both
    const handleCheckBox = async (isAllow: boolean, permission: string, PID?: number) => {
        try {
            if (!roleId) return toast.error('Please select role')
            let data
            isAllow ?
                (data = await createPermission(permission, roleId)) // updating current set
                :
                (PID && (data = await deletePermission(permission, PID))) // if permission id will present then it will work

            // both time updating
            fetchPermissions()
            toast.success(data.message)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    const fetchPermissions = async () => {
        try {
            const data = await getPermissions({ roleId: Number(roleId) })
            setPermissions(new Map(data.map((p) => [p.name, p]))); // setting map
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    useEffect(() => {
        fetchRoles()
    }, [])

    useEffect(() => {
        fetchPermissions()
    }, [roleId])



    return (
        <>
            <section className="flex flex-col pb-16 gap-y-5 pt-5">
                <div className="flex justify-between">
                    <h1 className="text-lg font-semibold">Permission</h1>
                </div>

                <Separator />

                {/* ROLE */}
                <div className="w-[200px] sm:w-[300px] space-y-2">
                    <p className="text-gray-400">Roles</p>
                    <Select defaultValue={String(roleId)} onValueChange={(val) => { setRoleId(+val) }}>
                        <SelectTrigger>
                            <SelectValue placeholder='Select Role' />
                        </SelectTrigger>
                        <SelectContent>
                            {roles.map((role) => (
                                <SelectItem key={role.id} value={String(role.id)}>{role.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>


                <Table className="rounded-lg border dark:border-gray-800">
                    <TableHeader className='bg-zinc-100 dark:bg-gray-900'>
                        <TableRow>
                            <TableHead >Module</TableHead>
                            <TableHead >View</TableHead>
                            <TableHead >Create</TableHead>
                            <TableHead >Update</TableHead>
                            <TableHead >Delete</TableHead>
                            {/* <TableHead >Action</TableHead> */}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {Module.map((mod, i) => {
                            return <TableRow key={i}>
                                <TableCell>{mod.name}</TableCell>
                                {['view', 'create', 'update', 'delete'].map((action) => {
                                    const perm = `${action}:${mod.name}`;
                                    const permID = permissions.get(perm)
                                    return <TableCell key={action}>
                                        {/* checking if any role has permission the checked */}
                                        <Checkbox
                                            disabled={!mod[action as actionType]} // cause true will disable it
                                            checked={permissions.has(perm)}
                                            onCheckedChange={(value) => {
                                                handleCheckBox(Boolean(value),
                                                    perm, permID?.id)
                                            }}
                                        />
                                    </TableCell>
                                })}
                            </TableRow>
                        })}
                    </TableBody>
                </Table>


                {/* dashboard permissions */}

                <div className="mt-10">

                    <h1 className="font-medium mb-4">Dashboard Permission</h1>

                    <Table className="rounded-lg border dark:border-gray-800 pb-3">
                        <TableHeader className='bg-zinc-100 dark:bg-gray-900'>
                            <TableRow>
                                <TableHead >Module</TableHead>
                                {dashboardPermissions.map((action, i) => (
                                    <TableHead key={i}>{action}</TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell>Dashboard</TableCell>
                                {dashboardPermissions.map((action) => {
                                    const perm = `${action}:dashboard`;
                                    const permID = permissions.get(perm)
                                    return <TableCell key={action}>
                                        {/* checking if any role has permission the checked */}
                                        <Checkbox checked={permissions.has(perm)} onCheckedChange={(value) => { handleCheckBox(Boolean(value), perm, permID?.id) }} />
                                    </TableCell>
                                })}
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>



                {/* Setup permissions */}

                <div className="mt-10">

                    <h1 className="font-medium mb-4">Setup Permission</h1>

                    <Table className="rounded-lg border dark:border-gray-800 pb-3">
                        <TableHeader className='bg-zinc-100 dark:bg-gray-900'>
                            <TableRow>
                                <TableHead >Module</TableHead>
                                <TableHead >View</TableHead>
                                <TableHead >Create</TableHead>
                                <TableHead >Update</TableHead>
                                <TableHead >Delete</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {setupPermissions.map((mod) => {
                                return <TableRow key={mod.name}>
                                    <TableCell>{mod.name}</TableCell>
                                    {['view', 'create', 'update', 'delete'].map((action) => {
                                        const perm = `${action}:${mod.name}`;
                                        const permID = permissions.get(perm)
                                        return <TableCell key={action}>
                                            <Checkbox
                                                disabled={!mod[action as actionType]}
                                                checked={permissions.has(perm)}
                                                onCheckedChange={(value) => {
                                                    handleCheckBox(Boolean(value),
                                                        perm, permID?.id)
                                                }}
                                            />
                                        </TableCell>
                                    })}
                                </TableRow>
                            })}
                        </TableBody>
                    </Table>
                </div>

            </section>
        </>
    )
}

export default Permission