import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pencil, Plus, SearchX, Trash } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import MedicationForm from "./medicationForm"
import toast from "react-hot-toast"
import { createMedication, deleteMedication, getMedicationDetails, getMedications, updateMedication } from "../../opdApiHandler"
import { useParams } from "react-router-dom"
import AlertModel from "@/components/alertModel"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { medicationDetail, opdMedications } from "@/types/opd_section/medication"
import { medicationFormSchema } from "@/formSchemas/medicationFormSchema"
import { z } from "zod"
import LoaderModel from "@/components/loader"
import CustomTooltip from "@/components/customTooltip"
import { useQueryState, parseAsInteger } from "nuqs"
import CustomPagination from "@/components/customPagination"



const Medication = () => {

  // Query params
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))
  const [search, setSearch] = useQueryState('search')

  //credentials
  const { opdId } = useParams()
  const itemID = useRef<number>(0)


  // laoding states
  const [loading, setLoading] = useState<{ inline: boolean, model: boolean }>({ inline: false, model: false })

  // models
  const [model, setModel] = useState<{ medicationForm: boolean, alert: boolean }>({
    medicationForm: false,
    alert: false
  })

  // api states
  const [medications, setMedications] = useState<opdMedications>({ data: [], total_pages: 1 })
  const [medicationDetails, setMedicationDetails] = useState<medicationDetail | undefined>(undefined)



  const onDelete = async () => {
    try {
      const data = await deleteMedication(itemID.current)
      toast.success(data.message)
      fetchMedications()
    } catch ({ message }: any) {
      toast.error(message)
    } finally {
      setModel((rest) => ({ ...rest, alert: false }))
    }
  }


  const fetchMedications = async () => {
    try {
      const data = await getMedications({ opdId: opdId!, page, limit: 10, date: search! })
      setMedications(data)
    } catch ({ message }: any) {
      toast.error(message)
    }
  }


  // handling both upsert
  const handleSubmit = async (formData: z.infer<typeof medicationFormSchema>) => {
    try {
      let data;
      setLoading(rest => ({ ...rest, inline: true }))
      medicationDetails ?
        (data = await updateMedication(medicationDetails.id, formData), setMedicationDetails(undefined))
        :
        (data = await createMedication(opdId!, formData))

      toast.success(data.message)
      setModel(rest => ({ ...rest, medicationForm: false }))
      fetchMedications()
    } catch ({ message }: any) {
      toast.error(message)
    } finally {
      setLoading(rest => ({ ...rest, inline: false }))
    }
  }


  const onSearch = (date: string) => {
    date ? setSearch(date) : setSearch(null)
    setPage(1)
  }


  const fetchMedicationDetails = async (id: number) => {
    try {
      setLoading((rest) => ({ ...rest, model: true }))
      const data = await getMedicationDetails(id)
      setMedicationDetails(data)
    } catch ({ message }: any) {
      toast.error(message)
    } finally {
      setLoading((rest) => ({ ...rest, model: false }))
    }
  }



  useEffect(() => {
    fetchMedications()
    console.log(medications);

  }, [page, search])

  return (
    <>
      <section className="flex flex-col gap-y-5">

        <div className="flex justify-between">
          <h1 className="text-lg text-gray-800 font-semibold">Medication</h1>
          <Button size='sm' onClick={() => setModel(rest => ({ ...rest, medicationForm: true }))}>
            <Plus /> Add Medication
          </Button>
        </div>

        <Separator />

        <div className="sm:w-48 space-y-1">
          <p className="text-sm text-gray-700">Search by date</p>
          <Input type="date" onChange={(e) => { onSearch(e.target.value) }} defaultValue={search!} />
        </div>

        <Separator />

        {/* pagination */}
        <section className="flex flex-col gap-y-5 min-h-[60vh]">
          <div className="flex-1">
            <Table className="rounded-lg border">
              <TableHeader className="bg-zinc-100">
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
                {medications.data.map((medication, i) => {
                  return <TableRow key={i}>
                    <TableCell >{medication.date}</TableCell>
                    <TableCell>{medication.medicine.name}</TableCell>
                    <TableCell>{medication.category.name}</TableCell>
                    <TableCell>{medication.medicine.unit.name}</TableCell>
                    <TableCell>{medication.time}</TableCell>
                    <TableCell>{medication.dose}</TableCell>
                    <TableCell className="flex space-x-2">

                      {/* Edit */}
                      <CustomTooltip message="EDIT">
                        <Pencil className="active:scale-95 w-4 text-gray-600 cursor-pointer"
                          onClick={async () => {
                            await fetchMedicationDetails(medication.id)
                            setModel((rest) => ({ ...rest, medicationForm: true }))
                          }}
                        />
                      </CustomTooltip>

                      {/* Delete */}
                      <CustomTooltip message="DELETE">
                        <Trash className="active:scale-95 w-4 text-gray-600 cursor-pointer"
                          onClick={() => {
                            setModel((rest) => ({ ...rest, alert: true }))
                            itemID.current = medication.id
                          }}
                        />
                      </CustomTooltip>
                    </TableCell>
                  </TableRow>
                })}
              </TableBody>
            </Table>
            {/* error on emply list */}

            {medications.data.length < 1 && <h1 className='text-gray-900 mt-4 sm:mt-1 font-semibold text-lg flex items-center gap-1'>No data found <SearchX className='h-5 w-5' /></h1>}
          </div>

          {/* pagination buttons */}
          <section>
            <CustomPagination
              total_pages={medications?.total_pages!}
              currentPage={page}
              previous={(p) => setPage(p)}
              goTo={(p) => setPage(p)}
              next={(p) => setPage(p)}
            />
          </section>
        </section>
      </section>




      {/* models */}

      {
        model.medicationForm && <MedicationForm
          medicationDetails={medicationDetails!}
          Submit={handleSubmit}
          isPending={loading.inline}

          onClick={() => {
            setModel(rest => ({ ...rest, medicationForm: false }));
            setMedicationDetails(undefined)
          }}
        />
      }


      {/* Alert Model */}

      {
        model.alert && <AlertModel
          cancel={() => { setModel((rest) => ({ ...rest, alert: false })) }}
          isPending={loading.model}
          continue={onDelete}
        />
      }


      {/* Loader model */}

      {loading.model && (<LoaderModel />)}

    </>
  )
}

export default Medication