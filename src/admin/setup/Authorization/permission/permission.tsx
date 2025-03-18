import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useEffect, useRef, useState } from "react"
import toast from "react-hot-toast"
import { createPermission, deletePermission, getPermissions, getRoles } from "../APIHandler"
import { ROLE } from "../role/role"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"



const Permission = () => {

    // have to create dynamically
    const module = ['appointment', 'opd', 'pharmacy', 'medicine', 'purchase_medicine', 'prescription', 'medication', 'operation', 'charges', 'payments', 'vitals', 'timeline', 'human_resource', 'duty_roster', 'setup']

    const [permissions, setPermissions] = useState(new Map())


    const [roles, setRoles] = useState<ROLE[]>([])
    const roleId = useRef<number>()


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
            if (!roleId.current) return toast.error('Please select role')
            let data
            isAllow ?
                (data = await createPermission(permission, roleId.current)) // updating current set
                :
                (PID && (data = await deletePermission(permission, PID))) // if permission id will present then it will work

            // both time updating
            fetchPermissions(roleId.current)
            toast.success(data.message)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    const fetchPermissions = async (RoleId: number) => {
        try {
            const data = await getPermissions({ roleId: RoleId })
            setPermissions(new Map(data.map((p) => [p.name, p]))); // setting map
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    useEffect(() => {
        fetchRoles()
    }, [])



    return (
        <section className="flex flex-col pb-16 gap-y-5 pt-5">

            <div className="flex justify-between">
                <h1 className="text-lg text-gray-800 font-semibold">Permission</h1>
                {/* <Button size='sm' onClick={() => { setChargeTypeFormVisible(true) }}>
                    <Plus /> Add Charge Type
                </Button> */}
            </div>

            <Separator />

            {/* ROLE */}
            <div className="w-[200px] sm:w-[300px] space-y-2">
                <p className="text-gray-600">Roles</p>
                <Select onValueChange={(val) => { roleId.current = Number(val); fetchPermissions(Number(val)) }}>
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


            <Table className="rounded-lg border">
                <TableHeader className='bg-zinc-100'>
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
                    {module.map((mod, i) => {
                        return <TableRow key={i}>
                            <TableCell>{mod}</TableCell>
                            {['view', 'create', 'update', 'delete'].map((action) => {
                                const perm = `${action}:${mod}`;
                                const permID = permissions.get(perm)
                                return <TableCell key={action}>
                                    {/* checking if any role has permission the checked */}
                                    <Checkbox checked={permissions.has(perm)} onCheckedChange={(value) => { handleCheckBox(Boolean(value), perm, permID?.id) }} />
                                </TableCell>
                            })}
                        </TableRow>
                    })}
                </TableBody>
            </Table>



            {/* Models */}



            {/* Alert */}
            {/* {isAlert && (
                <AlertModel
                    isPending={isPending}
                    cancel={() => { setAlert(false) }}
                    continue={onDelete}
                />
            )} */}

        </section>
    )
}

export default Permission