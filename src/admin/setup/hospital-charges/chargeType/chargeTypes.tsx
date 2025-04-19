import AlertModel from '@/components/alertModel'
import PermissionProtectedAction from '@/components/permission-protected-actions'
import PermissionTableActions from '@/components/permission-table-actions'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useConfirmation } from '@/hooks/useConfirmation'
import { Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { createChargeType, deleteChargeType, getChargeTypes, updateChargeTypeModule } from '../chargesAPIhandlers'
import AddChargeTypeformModel, { ChargeTypeformModelSchema } from './addChargeTypeformModel'



export interface Charge_Type_Interface {
  id: number,
  charge_type: string,
  opd: boolean,
  ipd: boolean,
  appointment: boolean,
  pathylogy: boolean,
  radiology: boolean,
  blood_bank: boolean,
  ambulance: boolean,
}


const ChargeTypes = () => {

  const { confirm, confirmationProps } = useConfirmation()

  // Loaders
  const [isPending, setPending] = useState<boolean>(false)


  // model states
  const [isChargeTypeFormVisible, setChargeTypeFormVisible] = useState<boolean>(false)

  const [chargeTypesList, setChargeTypesList] = useState<Charge_Type_Interface[]>([])


  const handleSubmit = async (formData: z.infer<typeof ChargeTypeformModelSchema>) => {
    try {
      setPending(true)
      const data = await createChargeType(formData)
      toast.success(data.message)
      setPending(false)
      fetchChargeTypes();
      setChargeTypeFormVisible(false)
    } catch ({ message }: any) {
      toast.error(message)
      setPending(false)
    }
  }


  const fetchChargeTypes = async () => {
    try {
      const data = await getChargeTypes()
      setChargeTypesList(data)
    } catch ({ message }: any) {
      toast.error(message)
    }
  }


  // this will ensure where where respected charge type will be display
  const updateModule = async (id: number, module: any) => {
    try {
      const data = await updateChargeTypeModule(id, module)
      toast.success(data.message)
      fetchChargeTypes()
    } catch ({ message }: any) {
      toast.error(message)
    }
  }



  const onDelete = async (id: number) => {
    try {
      const isConfirmed = await confirm()
      if (!isConfirmed) return null
      const data = await deleteChargeType(id)
      toast.success(data.message)
      fetchChargeTypes()
      setPending(false)
    } catch ({ message }: any) {
      toast.error(message)
    }
  }


  useEffect(() => {
    fetchChargeTypes()
  }, [])


  return (
    <section className="flex flex-col pb-16 gap-y-5">

      <div className="flex justify-between">
        <h1 className="text-lg font-semibold">Charge Types</h1>
        <PermissionProtectedAction action='create' module='charge_type'>
          <Button size='sm' onClick={() => { setChargeTypeFormVisible(true) }}>
            <Plus /> Add Charge Type
          </Button>
        </PermissionProtectedAction>
      </div>

      <Separator />

      <Table className="rounded-lg border dark:border-gray-800">
        <TableHeader className='bg-zinc-100 dark:bg-gray-800'>
          <TableRow>
            <TableHead >Charge Types</TableHead>
            <TableHead >Appointment</TableHead>
            <TableHead >OPD</TableHead>
            <TableHead >IPD</TableHead>
            <TableHead >Pathylogy</TableHead>
            <TableHead >Radiology</TableHead>
            <TableHead >Blood Bank</TableHead>
            <TableHead >Ambulance</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {chargeTypesList.map((type) => {
            return <TableRow key={type.id}>
              <TableCell>{type.charge_type}</TableCell>
              <TableCell><Checkbox checked={type.appointment} onCheckedChange={(value) => { updateModule(type.id, { appointment: value }) }} /></TableCell>
              <TableCell><Checkbox checked={type.opd} onCheckedChange={(value) => { updateModule(type.id, { opd: value }) }} /></TableCell>
              <TableCell><Checkbox checked={type.ipd} onCheckedChange={(value) => { updateModule(type.id, { ipd: value }) }} /></TableCell>
              <TableCell><Checkbox checked={type.pathylogy} onCheckedChange={(value) => { updateModule(type.id, { pathylogy: value }) }} /></TableCell>
              <TableCell><Checkbox checked={type.radiology} onCheckedChange={(value) => { updateModule(type.id, { radiology: value }) }} /></TableCell>
              <TableCell><Checkbox checked={type.blood_bank} onCheckedChange={(value) => { updateModule(type.id, { blood_bank: value }) }} /></TableCell>
              <TableCell><Checkbox checked={type.ambulance} onCheckedChange={(value) => { updateModule(type.id, { ambulance: value }) }} /></TableCell>
              <TableCell className='flex space-x-2'>
                <PermissionTableActions
                  module='charge_type'
                  onDelete={() => onDelete(type.id)}
                  exclude={{ edit: true }}
                />
              </TableCell>
            </TableRow>
          })}
        </TableBody>
      </Table>



      {/* Models */}

      {/* Form */}
      {isChargeTypeFormVisible && (
        <AddChargeTypeformModel
          isPending={isPending}
          Submit={handleSubmit}
          onClick={() => {
            setChargeTypeFormVisible(false)
          }}
        />
      )}


      {/* Alert */}
      {confirmationProps.isOpen && (
        <AlertModel
          cancel={() => confirmationProps.onCancel()}
          continue={() => confirmationProps.onConfirm()}
        />
      )}

    </section>
  )
}

export default ChargeTypes