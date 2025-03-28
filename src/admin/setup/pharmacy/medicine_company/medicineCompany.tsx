import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Plus, Trash } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { createMedicineCompany, deleteMedicineCompany, getMedicineCompanies } from '../apiHandler'
import { medicineComapny } from '@/types/setupTypes/pharmacy'
import AlertModel from '@/components/alertModel'
import MedicineCompanyForm, { MedicineCompanyFormSchema } from './medicineCompanyForm'
import CustomTooltip from '@/components/customTooltip'
import EmptyList from '@/components/emptyList'

const MedicineCompany = () => {

    // credentials
    const itemID = useRef<number>(0)


    // Loaders
    const [isPending, setPending] = useState<boolean>(false)

    // model states
    const [model, setModel] = useState<{ medicineCompanyForm: boolean, alert: boolean }>({
        medicineCompanyForm: false,
        alert: false
    })


    // API States
    const [medicineCompanies, setMedicineCompanies] = useState<medicineComapny[]>([])


    const handleSubmit = async (formData: z.infer<typeof MedicineCompanyFormSchema>) => {
        try {
            setPending(true)
            const data = await createMedicineCompany(formData)
            toast.success(data.message)
            setModel({
                ...model,
                medicineCompanyForm: false
            })
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


    const onDelete = async () => {
        try {
            setPending(true)
            const data = await deleteMedicineCompany(itemID.current)
            toast.success(data.message)
            fetchMedicineComapnies()
        } catch ({ message }: any) {
            toast.error(message);
        } finally {
            setModel({
                ...model,
                alert: false
            })
            setPending(false)
        }
    }


    useEffect(() => {
        fetchMedicineComapnies()
    }, [])


    return (
        <section className="flex flex-col gap-y-5 pb-16">

            <div className="flex justify-between">
                <h1 className="text-lg font-semibold">Comapnies</h1>
                <Button size='sm' onClick={() => {
                    setModel({
                        ...model,
                        medicineCompanyForm: true
                    })
                }}>
                    <Plus /> Add Company
                </Button>
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
                            <TableCell>
                                {/* DELETE  */}
                                <CustomTooltip message='DELETE'>
                                    <Trash className="w-4 cursor-pointer  text-gray-600 dark:text-gray-600" onClick={async () => {
                                        setModel({
                                            ...model,
                                            alert: true
                                        })
                                        itemID.current = company.id
                                    }} />
                                </CustomTooltip>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>


            <EmptyList length={medicineCompanies.length} />


            {/* Form model */}

            {model.medicineCompanyForm && (
                <MedicineCompanyForm
                    Submit={handleSubmit}
                    isPending={isPending}
                    onClick={() => {
                        setModel({
                            ...model,
                            medicineCompanyForm: false
                        })
                    }}
                />
            )}

            {/* alert model */}

            {model.alert && (
                <AlertModel
                    isPending={isPending}
                    continue={onDelete}
                    cancel={() => {
                        setModel({
                            ...model,
                            alert: false
                        })
                    }}
                />
            )}

        </section>
    )
}



export default MedicineCompany