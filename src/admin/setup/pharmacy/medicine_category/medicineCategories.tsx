import { medicineCategory } from '@/types/setupTypes/pharmacy'
import { useEffect, useState } from 'react'
import { z } from 'zod'
import toast from 'react-hot-toast'
import MedicineCategoryForm, { MedicineCategoryFormSchema } from './medicineCategoryForm'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import AlertModel from '@/components/alertModel'
import { createMedicineCategory, deleteMedicineCategory, getMedicineCategories } from '../apiHandler'
import EmptyList from '@/components/emptyList'
import PermissionProtectedAction from '@/components/permission-protected-actions'
import PermissionTableActions from '@/components/permission-table-actions'
import { useConfirmation } from '@/hooks/useConfirmation'




const MedicineCategories = () => {

  const { confirm, confirmationProps } = useConfirmation()

  // Loaders
  const [isPending, setPending] = useState<boolean>(false)


  // model states
  const [form, setForm] = useState<boolean>(false)


  // API States
  const [medicneCategories, setMedicneCategories] = useState<medicineCategory[]>([])


  const handleSubmit = async (formData: z.infer<typeof MedicineCategoryFormSchema>) => {
    try {
      setPending(true)
      const data = await createMedicineCategory(formData)
      toast.success(data.message)
      setForm(false)
      fetchMedicineCategories()
    } catch ({ message }: any) {
      toast.error(message);
    } finally {
      setPending(false);
    }
  }


  const onDelete = async (id: number) => {
    try {
      const isConfirmed = await confirm()
      if (!isConfirmed) return null
      const data = await deleteMedicineCategory(id)
      toast.success(data.message)
      fetchMedicineCategories()
    } catch ({ message }: any) {
      toast.error(message);
    }
  }


  const fetchMedicineCategories = async () => {
    try {
      const data = await getMedicineCategories()
      setMedicneCategories(data)
    } catch ({ message }: any) {
      toast.error(message);
    }
  }



  useEffect(() => {
    fetchMedicineCategories()
  }, [])


  return (
    <section className="flex flex-col gap-y-5 pb-16">

      <div className="flex justify-between">
        <h1 className="text-lg font-semibold">Medicine Categories</h1>
        <PermissionProtectedAction action='create' module='medicine_category'>
          <Button size='sm' onClick={() => setForm(true)}>
            <Plus /> Add Category
          </Button>
        </PermissionProtectedAction>
      </div>

      <Separator />


      <Table className='border rounded-lg dark:border-gray-800'>
        <TableHeader className='bg-zinc-100 dark:bg-gray-800'>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Interval</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {medicneCategories.map((category) => (
            <TableRow key={category.id}>
              <TableCell>{category.id}</TableCell>
              <TableCell>{category.name}</TableCell>
              <TableCell className='flex'>
                <PermissionTableActions
                  module='medicine_category'
                  onDelete={() => onDelete(category.id)}
                  exclude={{ edit: true }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>


      <EmptyList length={medicneCategories.length} message='No categories found' />


      {/* Models */}

      {form && (
        <MedicineCategoryForm
          Submit={handleSubmit}
          isPending={isPending}
          onClick={() => setForm(false)}
        />
      )}

      {confirmationProps.isOpen && (
        <AlertModel
          continue={() => confirmationProps.onConfirm()}
          cancel={() => confirmationProps.onCancel()}
        />
      )}

    </section>
  )
}

export default MedicineCategories