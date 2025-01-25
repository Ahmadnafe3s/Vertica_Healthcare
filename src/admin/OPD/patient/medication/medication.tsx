import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, SearchX, Trash } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import MedicationForm from "./medicationForm"
import toast from "react-hot-toast"
import { deleteMedication, getMedications, searchMedications } from "../../opdApiHandler"
import { useParams } from "react-router-dom"
import { opdMedications } from "@/types/type"
import AlertModel from "@/components/alertModel"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"



const Medication = () => {

  const { caseId } = useParams()
  const id = useRef<undefined | number>(undefined)

  const [model, setModel] = useState<{ addMedicationForm: boolean, alert: boolean }>({
    addMedicationForm: false,
    alert: false
  })


  const [MEDICATION, SET_MEDICATION] = useState<opdMedications[]>([])

  const onDelete = async () => {
    try {

      const data = await deleteMedication(Number(id.current))
      toast.success(data.message)
      fetchMedicationList()

    } catch ({ message }: any) {
      toast.error(message)
    } finally {
      setModel((rest) => {
        return {
          ...rest,
          alert: false
        }
      });
      id.current = undefined
    }
  }


  const fetchMedicationList = async () => {
    try {
      const data = await getMedications(Number(caseId))
      SET_MEDICATION(data)
    } catch ({ message }: any) {
      toast.error(message)
    }
  }


  const onSearch = async (date: string) => {
    try {
      const data = await searchMedications(Number(caseId), date)
      SET_MEDICATION(data)
    } catch ({ message }: any) {
      toast.error(message)
    }
  }


  useEffect(() => {
    console.log(caseId);
    fetchMedicationList()
  }, [])

  return (
    <>
      <section className="flex flex-col gap-y-5">

        <div className="flex justify-between">
          <h1 className="text-lg text-gray-800 font-semibold">Medication</h1>
          <Button variant='outline' size='sm' onClick={() => setModel((rest) => {
            return {
              ...rest,
              addMedicationForm: true
            }
          })}>
            <Plus /> Add Medication
          </Button>
        </div>

        <Separator />

        <div className="sm:w-48 space-y-1">
          <p className="text-sm text-gray-700">Search by date</p>
          <Input type="date" onChange={(e) => { onSearch(e.target.value) }} />
        </div>

        <Separator />


        <Table>

          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Medicine Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Unit</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Dose</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {MEDICATION.map((medication, i) => {
              return <TableRow key={i}>
                <TableCell >{medication.date}</TableCell>
                <TableCell>{medication.medicine.name}</TableCell>
                <TableCell>{medication.medicine.category}</TableCell>
                <TableCell>{medication.medicine.unit}</TableCell>
                <TableCell>{medication.time}</TableCell>
                <TableCell>{medication.dose}</TableCell>
                <TableCell>
                  <Trash className="active:scale-95 w-4 text-gray-600 cursor-pointer"
                    onClick={() => {
                      setModel((rest) => {
                        return {
                          ...rest,
                          alert: true
                        }
                      });
                      id.current = medication.id
                    }}
                  />
                </TableCell>
              </TableRow>
            })}
          </TableBody>
        </Table>

      </section>

      {/* error on emply list */}

      {MEDICATION.length < 1 && <h1 className='text-gray-900 mt-4 sm:mt-1 font-semibold text-lg flex items-center gap-1'>No data found <SearchX className='h-5 w-5' /></h1>}


      {/* models */}

      {
        model.addMedicationForm && <MedicationForm ID={0}
          onClick={() => {
            setModel((rest) => {
              return {
                ...rest,
                addMedicationForm: false
              }
            });
            fetchMedicationList()
          }}
        />
      }

      {/* Alert Model */}

      {
        model.alert && <AlertModel
          cancel={() => {
            setModel((rest) => {
              return {
                ...rest,
                alert: false
              }
            });
            id.current = undefined
          }}
          continue={onDelete}
        />
      }
    </>
  )
}

export default Medication