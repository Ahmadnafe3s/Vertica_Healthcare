import { medicineCategory } from '@/types/setupTypes/pharmacy'
import { useEffect, useRef, useState } from 'react'
import { z } from 'zod'
import toast from 'react-hot-toast'
import MedicineCategoryForm, { MedicineCategoryFormSchema } from './medicineCategoryForm'
import { Button } from '@/components/ui/button'
import { Plus, Trash } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import AlertModel from '@/components/alertModel'
import { createMedicineCategory, deleteMedicineCategory, getMedicineCategories } from '../apiHandler'
import CustomTooltip from '@/components/customTooltip'
import EmptyList from '@/components/emptyList'

const MedicineCategories = () => {

  // credentials
  const itemID = useRef<number>(0)


  // Loaders
  const [isPending, setPending] = useState<boolean>(false)


  // model states
  const [model, setModel] = useState<{ alert: boolean, medicineCategoryForm: boolean }>({
    alert: false,
    medicineCategoryForm: false
  })


  // API States
  const [medicneCategories, setMedicneCategories] = useState<medicineCategory[]>([])



  const handleSubmit = async (formData: z.infer<typeof MedicineCategoryFormSchema>) => {
    try {
      setPending(true)
      const data = await createMedicineCategory(formData)
      toast.success(data.message)
      setModel({ ...model, medicineCategoryForm: false })
      fetchMedicineCategories()
    } catch ({ message }: any) {
      toast.error(message);
    } finally {
      setPending(false);
    }
  }


  const onDelete = async () => {
    try {
      setPending(true)
      const data = await deleteMedicineCategory(itemID.current)
      toast.success(data.message)
      fetchMedicineCategories()
    } catch ({ message }: any) {
      toast.error(message);
    } finally {
      setPending(false);
      setModel(rest => ({ ...rest, alert: false }))
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
        <Button size='sm' onClick={() => setModel(rest => ({ ...rest, medicineCategoryForm: true }))}>
          <Plus /> Add Category
        </Button>
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
              <TableCell>
                {/* DELETE  */}
                <CustomTooltip message='DELETE'>
                  <Trash className="w-4 cursor-pointer  text-gray-600 dark:text-gray-400" onClick={async () => {
                    setModel(rest => ({ ...rest, alert: true }))
                    itemID.current = category.id
                  }} />
                </CustomTooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>


      <EmptyList length={medicneCategories.length} message='No categories found' />


      {/* Models */}

      {model.medicineCategoryForm && (
        <MedicineCategoryForm
          Submit={handleSubmit}
          isPending={isPending}
          onClick={() => setModel(rest => ({ ...rest, medicineCategoryForm: false }))}
        />
      )}

      {model.alert && (
        <AlertModel
          continue={onDelete}
          cancel={() => setModel(rest => ({ ...rest, alert: false }))}
        />
      )}

    </section>
  )
}

export default MedicineCategories