import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Trash } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import toast from "react-hot-toast"
import MedicineUnitForm from "./medicineUnitForm"
import { medicineUnit } from "@/types/setupTypes/pharmacy"
import { createMedicineUnit, deleteMedicineUnit, getMedicineUnits } from "../apiHandler"
import AlertModel from "@/components/alertModel"
import CustomTooltip from "@/components/customTooltip"
import EmptyList from "@/components/emptyList"




const MedicineUnits = () => {

  // credentials
  const itemID = useRef<number>(0)


  // Loaders
  const [isPending, setPending] = useState<boolean>(false)


  // model states
  const [model, setModel] = useState<{ alert: boolean, medUnitForm: boolean }>({
    alert: false,
    medUnitForm: false
  })


  // API States
  const [medicineUnits, setMedicineUnits] = useState<medicineUnit[]>([])



  const handleSubmit = async (formData: any) => {
    try {
      setPending(true)
      const data = await createMedicineUnit(formData)
      toast.success(data.message)
      setModel({ ...model, medUnitForm: false })
      fetchMedicineUnits()
    } catch ({ message }: any) {
      toast.error(message);
    } finally {
      setPending(false);
    }
  }


  const onDelete = async () => {
    try {
      setPending(true)
      const data = await deleteMedicineUnit(itemID.current)
      toast.success(data.message)
      fetchMedicineUnits()
    } catch ({ message }: any) {
      toast.error(message);
    } finally {
      setPending(false);
      setModel(rest => ({ ...rest, alert: false }))
    }
  }


  const fetchMedicineUnits = async () => {
    try {
      const data = await getMedicineUnits()
      setMedicineUnits(data)
    } catch ({ message }: any) {
      toast.error(message);
    }
  }


  useEffect(() => {
    fetchMedicineUnits()
  }, [])



  return (
    <section className="flex flex-col gap-y-5 pb-16">

      <div className="flex justify-between">
        <h1 className="text-lg font-semibold">Units</h1>
        <Button size='sm' onClick={() => setModel({ ...model, medUnitForm: true })
        }>
          <Plus /> Add Unit
        </Button>
      </div>

      <Separator />

      <Table className='border rounded-lg dark:border-gray-800'>
        <TableHeader className='bg-zinc-100 dark:bg-gray-900'>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {medicineUnits.map((unit) => (
            <TableRow key={unit.id}>
              <TableCell>{unit.id}</TableCell>
              <TableCell>{unit.name}</TableCell>
              <TableCell>
                {/* DELETE  */}
                <CustomTooltip message="DELETE">
                  <Trash className="w-4 cursor-pointer  text-gray-600 dark:text-gray-400" onClick={async () => {
                    setModel(rest => ({ ...rest, alert: true }))
                    itemID.current = unit.id
                  }} />
                </CustomTooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>


      <EmptyList length={medicineUnits.length} />


      {/* Models */}

      {model.medUnitForm && (
        <MedicineUnitForm
          isPending={isPending}
          Submit={handleSubmit}
          onClick={() => setModel({ ...model, medUnitForm: false })}
        />
      )}


      {/* Alert mdoel */}

      {model.alert && (
        <AlertModel
          continue={onDelete}
          cancel={() => setModel(rest => ({ ...rest, alert: false }))}
        />
      )}

    </section>
  )
}

export default MedicineUnits