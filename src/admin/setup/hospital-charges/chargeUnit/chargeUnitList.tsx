import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Pencil, Plus, Trash } from 'lucide-react'
import AddUnitFormModel, { unitFormSchema } from './addUnitFormModel'
import { useEffect, useRef, useState } from 'react'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { createChargeUnit, deleteChargeUnit, getChargeUnitDetails, getChargeUnitList, updateChargeUnit } from '../chargesAPIhandlers'
import AlertModel from '@/components/alertModel'
import CustomTooltip from '@/components/customTooltip'


export interface unitType {
  "id": number,
  "unit_type": string
}


const ChargeUnitList = () => {

  // credentials
  const itemID = useRef<number>(0)


  // Loaders
  const [isPending, setPending] = useState<boolean>(false)


  // model states
  const [isAddUnitFormVisible, setAddUnitFormVisible] = useState<boolean>(false)
  const [isAlert, setAlert] = useState<boolean>(false)


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
  const onDelete = async () => {
    try {
      const data = await deleteChargeUnit(itemID.current)
      toast.success(data.message)
      fetchUnitsList()
    } catch ({ message }: any) {
      toast.error(message)
    } finally {
      setAlert(false)
    }
  }



  useEffect(() => {
    fetchUnitsList()
  }, [])


  return (
    <section className="flex flex-col pb-16 gap-y-5">

      <div className="flex justify-between">
        <h1 className="text-lg text-gray-800 font-semibold">Unit List</h1>
        <Button size='sm' onClick={() => { setAddUnitFormVisible(true) }}>
          <Plus /> Add Unit
        </Button>
      </div>

      <Separator />

      <Table className="rounded-lg border">
        <TableHeader className='bg-zinc-100'>
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
                {/* EDIT  */}
                <CustomTooltip message='EDIT'>
                  <Pencil className="w-4 cursor-pointer  text-gray-600" onClick={async () => {
                    fetchUnitdetails(unit.id)
                  }} />
                </CustomTooltip>

                {/* DELETE  */}
                <CustomTooltip message='DELETE'>
                  <Trash className="w-4 cursor-pointer  text-gray-600" onClick={async () => {
                    setAlert(true);
                    itemID.current = unit.id
                  }} />
                </CustomTooltip>
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
      {isAlert && <AlertModel
        cancel={() => setAlert(false)}
        continue={onDelete}
      />}

    </section>
  )
}

export default ChargeUnitList