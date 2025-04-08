import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Plus } from 'lucide-react'
import AddUnitFormModel, { unitFormSchema } from './addUnitFormModel'
import { useEffect, useState } from 'react'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { createChargeUnit, deleteChargeUnit, getChargeUnitDetails, getChargeUnitList, updateChargeUnit } from '../chargesAPIhandlers'
import AlertModel from '@/components/alertModel'
import PermissionProtectedAction from '@/components/permission-protected-actions'
import PermissionTableActions from '@/components/permission-table-actions'
import { useConfirmation } from '@/hooks/useConfirmation'


export interface unitType {
  "id": number,
  "unit_type": string
}


const ChargeUnitList = () => {

  const { confirm, confirmationProps } = useConfirmation()

  // Loaders
  const [isPending, setPending] = useState<boolean>(false)


  // model states
  const [isAddUnitFormVisible, setAddUnitFormVisible] = useState<boolean>(false)

  // API States
  const [unitDetails, setUnitdetails] = useState<unitType | undefined>(undefined)
  const [unitsList, setUnitsList] = useState<unitType[]>([])


  // performing upsert 
  const handleSubmit = async (formData: z.infer<typeof unitFormSchema>) => {
    try {
      let data;
      setPending(true)
      if (unitDetails) {
        data = await updateChargeUnit(unitDetails.id, formData)
        setUnitdetails(undefined)
      } else {
        data = await createChargeUnit(formData)
      }
      toast.success(data.message)
      setAddUnitFormVisible(false)
      fetchUnitsList()
    } catch ({ message }: any) {
      toast.error(message)
    } finally {
      setPending(false)
    }
  }


  // fetching list
  const fetchUnitsList = async () => {
    try {
      const data = await getChargeUnitList()
      setUnitsList(data)
    } catch ({ message }: any) {
      toast.error(message)
    }
  }


  // fetching details for update mode
  const fetchUnitdetails = async (id: number) => {
    try {
      const data = await getChargeUnitDetails(id)
      setUnitdetails(data)
      setAddUnitFormVisible(true)
    } catch ({ message }: any) {
      toast.error(message)
    }
  }


  // deleting details
  const onDelete = async (id: number) => {
    try {
      const isConfirmed = await confirm()
      if (!isConfirmed) return null
      const data = await deleteChargeUnit(id)
      toast.success(data.message)
      fetchUnitsList()
    } catch ({ message }: any) {
      toast.error(message)
    }
  }



  useEffect(() => {
    fetchUnitsList()
  }, [])


  return (
    <section className="flex flex-col pb-16 gap-y-5">

      <div className="flex justify-between">
        <h1 className="text-lg font-semibold">Unit List</h1>
        <PermissionProtectedAction action='create' module='charge_unit'>
          <Button size='sm' onClick={() => { setAddUnitFormVisible(true) }}>
            <Plus /> Add Unit
          </Button>
        </PermissionProtectedAction>
      </div>

      <Separator />

      <Table className="rounded-lg border dark:border-gray-800">
        <TableHeader className="bg-zinc-100 dark:bg-gray-800">
          <TableRow>
            <TableHead className=''>Unit Type</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {unitsList.map((unit) => {
            return <TableRow key={unit.id}>
              <TableCell>{unit.unit_type}</TableCell>
              <TableCell className='flex space-x-2'>

                <PermissionTableActions
                  module='charge_unit'
                  onEdit={() => {
                    fetchUnitdetails(unit.id)
                  }}
                  onDelete={() => { onDelete(unit.id) }}
                />

              </TableCell>
            </TableRow>
          })}
        </TableBody>
      </Table>

      {/* Models */}

      {/* form model */}
      {isAddUnitFormVisible && (
        <AddUnitFormModel isPending={isPending} Submit={handleSubmit} unitDetails={unitDetails!}
          onClick={() => { setAddUnitFormVisible(false); setUnitdetails(undefined) }}
        />
      )}


      {/* Alert model */}
      {confirmationProps.isOpen && <AlertModel
        cancel={() => confirmationProps.onCancel()}
        continue={confirmationProps.onConfirm}
      />}

    </section>
  )
}

export default ChargeUnitList