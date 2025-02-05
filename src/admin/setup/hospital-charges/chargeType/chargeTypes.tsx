import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Pencil, Plus, Trash } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { z } from 'zod'
import AddChargeTypeformModel, { ChargeTypeformModelSchema } from './addChargeTypeformModel'
import toast from 'react-hot-toast'
import { createChargeType, deleteChargeType, getChargeTypes, updateChargeType, updateChargeTypeModule } from '../chargesAPIhandlers'
import { Checkbox } from '@/components/ui/checkbox'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import AlertModel from '@/components/alertModel'



export interface Charge_Type_Interface {
  id: number,
  charge_type: string,
  opd: boolean,
  appointment: boolean,
  pathylogy: boolean,
  radiology: boolean,
  blood_bank: boolean,
  ambulance: boolean,
}


const ChargeTypes = () => {

  // credentials
  const itemID = useRef<number>(0)


  // Loaders
  const [isPending, setPending] = useState<boolean>(false)


  // model states
  const [isChargeTypeFormVisible, setChargeTypeFormVisible] = useState<boolean>(false)
  const [isAlert, setAlert] = useState<boolean>(false)


  // API States
  const [chargeTypeDetails, setChargeTypeDetails] = useState<Charge_Type_Interface | undefined>(undefined)
  const [chargeTypesList, setChargeTypesList] = useState<Charge_Type_Interface[]>([])


  const handleSubmit = async (formData: z.infer<typeof ChargeTypeformModelSchema>) => {
    try {
      let data;
      setPending(true)
      if (chargeTypeDetails) {
        data = await updateChargeType(chargeTypeDetails.id, formData)
      } else {
        data = await createChargeType(formData)
      }
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



  const onDelete = async () => {
    try {
      setPending(true)
      const data = await deleteChargeType(itemID.current)
      toast.success(data.message)
      fetchChargeTypes()
      setPending(false)
    } catch ({ message }: any) {
      toast.error(message)
    } finally {
      setAlert(false)
      setPending(false)
    }
  }


  useEffect(() => {
    fetchChargeTypes()
  }, [])


  return (
    <section className="flex flex-col pb-16 gap-y-5">

      <div className="flex justify-between">
        <h1 className="text-lg text-gray-800 font-semibold">Charge Types</h1>
        <Button variant='outline' size='sm' onClick={() => { setChargeTypeFormVisible(true) }}>
          <Plus /> Add Charge Type
        </Button>
      </div>

      <Separator />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead >Charge Types</TableHead>
            <TableHead >Appointment</TableHead>
            <TableHead >OPD</TableHead>
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
              <TableCell><Checkbox checked={type.pathylogy} onCheckedChange={(value) => { updateModule(type.id, { pathylogy: value }) }} /></TableCell>
              <TableCell><Checkbox checked={type.radiology} onCheckedChange={(value) => { updateModule(type.id, { radiology: value }) }} /></TableCell>
              <TableCell><Checkbox checked={type.blood_bank} onCheckedChange={(value) => { updateModule(type.id, { blood_bank: value }) }} /></TableCell>
              <TableCell><Checkbox checked={type.ambulance} onCheckedChange={(value) => { updateModule(type.id, { ambulance: value }) }} /></TableCell>
              <TableCell className='space-x-2'>

                {/* EDIT 
                <TooltipProvider delayDuration={200}>
                  <Tooltip>
                    <TooltipTrigger>
                      <Pencil className="w-4 cursor-pointer  text-gray-600" onClick={async () => {

                      }} />
                    </TooltipTrigger>
                    <TooltipContent>Edit</TooltipContent>
                  </Tooltip>
                </TooltipProvider> */}


                {/* DELETE  */}
                <TooltipProvider delayDuration={200}>
                  <Tooltip>
                    <TooltipTrigger>
                      <Trash className="w-4 cursor-pointer  text-gray-600" onClick={async () => {
                        setAlert(true);
                        itemID.current = type.id
                      }} />
                    </TooltipTrigger>
                    <TooltipContent>DELETE</TooltipContent>
                  </Tooltip>
                </TooltipProvider>

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
      {isAlert && (
        <AlertModel
          isPending={isPending}
          cancel={() => { setAlert(false) }}
          continue={onDelete}
        />
      )}

    </section>
  )
}

export default ChargeTypes