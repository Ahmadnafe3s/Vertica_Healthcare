import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Plus, } from 'lucide-react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { createMedicineCompany, deleteMedicineCompany, getMedicineCompanies } from '../apiHandler'
import { medicineComapny } from '@/types/setupTypes/pharmacy'
import AlertModel from '@/components/alertModel'
import MedicineCompanyForm, { MedicineCompanyFormSchema } from './medicineCompanyForm'
import EmptyList from '@/components/emptyList'
import PermissionProtectedAction from '@/components/permission-protected-actions'
import PermissionTableActions from '@/components/permission-table-actions'
import { useConfirmation } from '@/hooks/useConfirmation'




const MedicineCompany = () => {

    const { confirm, confirmationProps } = useConfirmation()

    // Loaders
    const [isPending, setPending] = useState<boolean>(false)

    const [form, setForm] = useState(false)


    // API States
    const [medicineCompanies, setMedicineCompanies] = useState<medicineComapny[]>([])


    const handleSubmit = async (formData: z.infer<typeof MedicineCompanyFormSchema>) => {
        try {
            setPending(true)
            const data = await createMedicineCompany(formData)
            toast.success(data.message)
            setForm(false)
            fetchMedicineComapnies()
        } catch ({ message }: any) {
            toast.error(message);
        } finally {
            setPending(false);
        }
    }


    const fetchMedicineComapnies = async () => {
        try {
            const data = await getMedicineCompanies()
            setMedicineCompanies(data)
        } catch ({ message }: any) {
            toast.error(message);
        }
    }


    const onDelete = async (id: number) => {
        try {
            const isConfirmed = await confirm()
            if (!isConfirmed) return null
            const data = await deleteMedicineCompany(id)
            toast.success(data.message)
            fetchMedicineComapnies()
        } catch ({ message }: any) {
            toast.error(message);
        }
    }


    useEffect(() => {
        fetchMedicineComapnies()
    }, [])


    return (
        <section className="flex flex-col gap-y-5 pb-16">

            <div className="flex justify-between">
                <h1 className="text-lg font-semibold">Comapnies</h1>
                <PermissionProtectedAction action='create' module='medicine_company'>
                    <Button size='sm' onClick={() => { setForm(true) }}>
                        <Plus /> Add Company
                    </Button>
                </PermissionProtectedAction>
            </div>

            <Separator />

            {/* <div className="sm:w-48 space-y-1">
             <p className="text-sm text-gray-700">Search</p>
             <Input type="text" onChange={(e) => { onSearch(e.target.value) }} placeholder="name , category" />
         </div> */}

            {/* <Separator /> */}

            <Table className='rounded-lg border dark:border-gray-800'>
                <TableHeader className='bg-zinc-100 dark:bg-gray-900'>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {medicineCompanies.map((company) => (
                        <TableRow key={company.id}>
                            <TableCell>{company.id}</TableCell>
                            <TableCell>{company.name}</TableCell>
                            <TableCell className='flex'>

                                <PermissionTableActions
                                    module='medicine_company'
                                    onDelete={() => onDelete(company.id)}
                                    exclude={{ edit: true }}
                                />

                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>


            <EmptyList length={medicineCompanies.length} />


            {/* Form model */}

            {form && (
                <MedicineCompanyForm
                    Submit={handleSubmit}
                    isPending={isPending}
                    onClick={() => setForm(false)}
                />
            )}

            {/* alert model */}

            {confirmationProps.isOpen && (
                <AlertModel
                    continue={() => confirmationProps.onConfirm()}
                    cancel={() => confirmationProps.onCancel()}
                />
            )}
        </section>
    )
}



export default MedicineCompany