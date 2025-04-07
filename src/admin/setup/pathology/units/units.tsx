import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Plus, Trash } from 'lucide-react'
import { useEffect, useState } from 'react'
import { z } from 'zod'
import toast from 'react-hot-toast'
import AlertModel from '@/components/alertModel'
import CustomTooltip from '@/components/customTooltip'
import { useConfirmation } from '@/hooks/useConfirmation'
import CreatePathologyUnit, { PathUnitSchema } from './create-unit'
import { createPathologyUnit, deletePathologytUnit, getPathologytUnits } from '../api-handler'
import EmptyList from '@/components/emptyList'



export interface PathologyUnitType {
  "id": number,
  "name": string
}


const PathologyUnit = () => {

  // custom hooks
  const { confirm, confirmationProps } = useConfirmation()

  // Loaders
  const [isPending, setPending] = useState<boolean>(false)


  // model states
  const [isUnitForm, setUnitForm] = useState<boolean>(false)


  // API States
  const [unitsList, setUnitsList] = useState<PathologyUnitType[]>([])


  // performing upsert 
  const handleSubmit = async (formData: z.infer<typeof PathUnitSchema>) => {
    try {
      setPending(true)
      const data = await createPathologyUnit(formData)
      toast.success(data.message)
      setUnitForm(false)
      fetchUnits()
    } catch ({ message }: any) {
      toast.error(message)
    } finally {
      setPending(false)
    }
  }


  // fetching list

  const fetchUnits = async () => {
    try {
      const data = await getPathologytUnits()
      setUnitsList(data)
    } catch ({ message }: any) {
      toast.error(message)
    }
  }


  // deleting details
  const onDelete = async (id: number) => {
    try {
      const isConfirm = await confirm()
      if (!isConfirm) return null
      const data = await deletePathologytUnit(id)
      toast.success(data.message)
      fetchUnits()
    } catch ({ message }: any) {
      toast.error(message)
    }
  }



  useEffect(() => {
    fetchUnits()
  }, [])


  return (
    <section className="flex flex-col pb-16 gap-y-5">

      <div className="flex justify-between">
        <h1 className="text-lg font-semibold">Unit List</h1>
        <Button size='sm' onClick={() => { setUnitForm(true) }}>
          <Plus /> Add Unit
        </Button>
      </div>

      <Separator />

      <Table className="rounded-lg border dark:border-gray-800">
        <TableHeader className='bg-zinc-100 dark:bg-gray-800'>
          <TableRow>
            <TableHead className=''>Unit Names</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {unitsList.map((unit) => {
            return <TableRow key={unit.id}>
              <TableCell>{unit.name}</TableCell>
              <TableCell className='flex space-x-2'>
                {/* DELETE  */}
                <CustomTooltip message='DELETE'>
                  <Trash className="w-4 cursor-pointer  text-gray-600 dark:text-gray-400" onClick={() => onDelete(unit.id)} />
                </CustomTooltip>
              </TableCell>
            </TableRow>
          })}
        </TableBody>
      </Table>

      {/* Models */}

      {<EmptyList length={unitsList.length} message='No Units Found' />}


      {/* form model */}
      {isUnitForm && (
        <CreatePathologyUnit isPending={isPending} Submit={handleSubmit}
          onClick={() => { setUnitForm(false) }}
        />
      )}


      {/* Alert model */}
      {confirmationProps.isOpen && <AlertModel
        cancel={() => confirmationProps.onCancel()}
        continue={() => confirmationProps.onConfirm()}
      />}

    </section>
  )
}





export default PathologyUnit