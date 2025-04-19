import AlertModel from '@/components/alertModel'
import EmptyList from '@/components/emptyList'
import PermissionProtectedAction from '@/components/permission-protected-actions'
import PermissionTableActions from '@/components/permission-table-actions'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Plus } from 'lucide-react'
import { useEffect } from 'react'
import { z } from 'zod'
import CreateBedModal, { FormField } from '../../../../components/form-modals/form-modal'
import useFloorHandlers from './floor-handlers'





export const SetupFloorSchema = z.object({
  name: z.string().nonempty('Floor name is required'),
  description: z.string()
})


const Fileds: FormField[] = [
  { name: 'name', type: 'text', label: 'Name' },
  { name: 'description', type: 'textarea', label: 'Description' }
]



const SetupBedFloors = () => {


  const {
    floors,
    isPending,
    form,
    handleSubmit,
    fetchFloors,
    setForm, onDelete,
    confirmationProps } = useFloorHandlers()



  useEffect(() => {
    fetchFloors()
  }, [])



  return (
    <section className="flex flex-col pb-16 gap-y-5">

      <div className="flex justify-between">
        <h1 className="text-lg font-semibold">Floors</h1>
        <PermissionProtectedAction action='create' module='bed_floor'>
          <Button size='sm' onClick={() => { setForm(true) }}>
            <Plus /> Add Floor
          </Button>
        </PermissionProtectedAction>
      </div>

      <Separator />

      <Table className="rounded-lg border dark:border-gray-800">
        <TableHeader className='bg-zinc-100 dark:bg-gray-800'>
          <TableRow>
            {['Name', 'Description', 'Action'].map((item, index) => (
              <TableHead key={index}>{item}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {floors.map((floor) => {
            return <TableRow key={floor.id}>
              <TableCell>{floor.name}</TableCell>
              <TableCell>{floor.description}</TableCell>
              <TableCell className='flex space-x-2'>
                <PermissionTableActions
                  module='bed_floor'
                  onDelete={() => onDelete(floor.id)}
                  exclude={{ edit: true }}
                />
              </TableCell>
            </TableRow>
          })}
        </TableBody>
      </Table>

      {/* Models */}

      {<EmptyList length={floors.length} message='No Floors Found' />}


      {/* form model */}
      {form && (
        <CreateBedModal
          title='Add Floor'
          isPending={isPending}
          Submit={handleSubmit}
          schema={SetupFloorSchema}
          fields={Fileds}
          onClick={() => setForm(false)}
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





export default SetupBedFloors










