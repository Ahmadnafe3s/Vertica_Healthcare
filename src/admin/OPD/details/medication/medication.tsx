import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pencil, Plus, SearchX, Trash } from "lucide-react"
import { useEffect, useState } from "react"
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
import usePermission from "@/authz"
import { useConfirmation } from "@/hooks/useConfirmation"
import EmptyList from "@/components/emptyList"



const Medication = () => {

  // Query params
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))
  const [search, setSearch] = useQueryState('search')

  //credentials
  const { opdId } = useParams()


  // custom hook
  const { hasPermission, loadPermission } = usePermission()
  const { confirm, confirmationProps } = useConfirmation()

  // laoding states
  const [loading, setLoading] = useState<{ inline: boolean, model: boolean }>({ inline: false, model: false })

  // models
  const [medicationForm, setMedicationForm] = useState(false)

  // api states
  const [medications, setMedications] = useState<opdMedications>({ data: [], total_pages: 1 })
  const [medicationDetails, setMedicationDetails] = useState<medicationDetail | undefined>(undefined)



  const onDelete = async (id: number) => {
    try {
      const isConfirm = await confirm()
      if (!isConfirm) return null
      const data = await deleteMedication(id)
      toast.success(data.message)
      fetchMedications()
    } catch ({ message }: any) {
      toast.error(message)
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
      setMedicationForm(false)
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
    loadPermission()
  }, [page, search])

  return (
    <>
      <section className="flex flex-col gap-y-5">

        <div className="flex justify-between">
          <h1 className="text-lg text-gray-800 dark:text-white font-semibold">Medication</h1>
          {hasPermission('create', 'medication') && (
            <Button size='sm' onClick={() => setMedicationForm(true)}>
              <Plus /> Add Medication
            </Button>
          )}
        </div>

        <Separator />

        <div className="sm:w-48 space-y-1">
          <p className="text-sm text-gray-700 dark:text-gray-300">Search by date</p>
          <Input type="date" onChange={(e) => { onSearch(e.target.value) }} defaultValue={search!} />
        </div>

        <Separator />

        {/* pagination */}
        <section className="flex flex-col gap-y-5 min-h-[60vh]">
          <div className="flex-1">
            <Table className="rounded-lg border dark:border-gray-800">
              <TableHeader className="bg-zinc-100 dark:bg-gray-900">
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
                    <TableCell className="flex gap-2">
                      {/* Edit */}
                      {hasPermission('update', 'medication') && (
                        <CustomTooltip message="EDIT">
                          <Pencil className="active:scale-95 w-4 text-gray-600 dark:text-gray-400 cursor-pointer"
                            onClick={async () => {
                              await fetchMedicationDetails(medication.id)
                              setMedicationForm(true)
                            }}
                          />
                        </CustomTooltip>
                      )}

                      {/* Delete */}
                      {hasPermission('delete', 'medication') && (
                        <CustomTooltip message="DELETE">
                          <Trash className="active:scale-95 w-4 text-gray-600 dark:text-gray-400 cursor-pointer"
                            onClick={() => onDelete(medication.id)}
                          />
                        </CustomTooltip>
                      )}

                    </TableCell>
                  </TableRow>
                })}
              </TableBody>
            </Table>
            {/* error on emply list */}

            <EmptyList length={medications.data.length} message="No medications found" />

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
        medicationForm && <MedicationForm
          medicationDetails={medicationDetails!}
          Submit={handleSubmit}
          isPending={loading.inline}
          onClick={() => {
            setMedicationForm(false);
            setMedicationDetails(undefined)
          }}
        />
      }


      {/* Alert Model */}

      {
        confirmationProps.isOpen && <AlertModel
          cancel={() => { confirmationProps.onCancel() }}
          continue={() => { confirmationProps.onConfirm() }}
        />
      }


      {/* Loader model */}

      {loading.model && (<LoaderModel />)}

    </>
  )
}

export default Medication