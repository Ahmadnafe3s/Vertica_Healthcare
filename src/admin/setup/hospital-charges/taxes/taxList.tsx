import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, } from "lucide-react"
import AddTaxformModel, { taxFormSchema } from "./addTaxformModel"
import toast from "react-hot-toast"
import { createTax, deleteTax, getTaxDetails, getTaxesList, updateTax } from "../chargesAPIhandlers"
import { z } from "zod"
import { useEffect, useState } from "react"
import AlertModel from "@/components/alertModel"
import LoaderModel from "@/components/loader"
import PermissionProtectedAction from "@/components/permission-protected-actions"
import PermissionTableActions from "@/components/permission-table-actions"
import { useConfirmation } from "@/hooks/useConfirmation"

export interface TaxType {
  id: number,
  name: string,
  percentage: number
}


const TaxList = () => {

  const { confirm, confirmationProps } = useConfirmation()

  // Loaders
  const [isPending, setPending] = useState<boolean>(false)
  const [isLoader, setLoader] = useState<boolean>(false)

  // model states
  const [isAddTaxFormVisible, setAddTaxFormVisible] = useState<boolean>(false)

  // API States
  const [taxestList, setTaxlist] = useState<TaxType[]>([])
  const [taxDetails, setTaxDetails] = useState<TaxType | undefined>(undefined)


  const handleSubmit = async (formData: z.infer<typeof taxFormSchema>) => {
    try {

      let data;
      setPending(true);

      if (taxDetails) {
        data = await updateTax(taxDetails.id, formData);
        setTaxDetails(undefined);
      } else {
        data = await createTax(formData);
      }

      fetchTaxesList();
      toast.success(data.message);
      setAddTaxFormVisible(false);
    } catch ({ message }: any) {
      toast.error(message);
    } finally {
      setPending(false);
    }
  }


  const fetchTaxdetails = async (id: number) => {
    try {
      setLoader(true)
      const data = await getTaxDetails(id)
      setTaxDetails(data)
      setLoader(false)
    } catch ({ message }: any) {
      toast.error(message)
      setLoader(false)
    }
  }


  const fetchTaxesList = async () => {
    try {
      const data = await getTaxesList()
      setTaxlist(data)
    } catch ({ message }: any) {
      toast.error(message)
    }
  }


  const onDelete = async (id: number) => {
    try {
      const isConfirmed = await confirm()
      if (!isConfirmed) return null
      const data = await deleteTax(id)
      fetchTaxesList();
      toast.success(data.message);
    } catch ({ message }: any) {
      toast.error(message)
    }
  }


  useEffect(() => {
    fetchTaxesList()
  }, [])



  return (
    <section className="flex flex-col pb-16 gap-y-5">

      <div className="flex justify-between">
        <h1 className="text-lg  font-semibold">Taxes List</h1>
        <PermissionProtectedAction action='create' module='charge_tax'>
          <Button size='sm' onClick={() => setAddTaxFormVisible(true)}>
            <Plus /> Add Tax
          </Button>
        </PermissionProtectedAction>
      </div>

      <Separator />

      <Table className="rounded-lg border dark:border-gray-800">
        <TableHeader className="bg-zinc-100 dark:bg-gray-800">
          <TableRow>
            <TableHead >Name</TableHead>
            <TableHead >Percentage %</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {taxestList.map((tax) => {
            return <TableRow key={tax.id}>
              <TableCell>{tax.name}</TableCell>
              <TableCell>{tax.percentage}%</TableCell>
              <TableCell className='flex space-x-2'>

                <PermissionTableActions
                  module="charge_tax"
                  onEdit={async () => {
                    await fetchTaxdetails(tax.id)
                    setAddTaxFormVisible(true)
                  }}
                  onDelete={() => onDelete(tax.id)}
                  editTooltip="Modify Tax"
                  deleteTooltip="Delete Tax"
                />

              </TableCell>
            </TableRow>
          })}
        </TableBody>
      </Table>


      {/* Models */}


      {/* Form model */}

      {isAddTaxFormVisible && (
        <AddTaxformModel Submit={handleSubmit}
          isPending={isPending}
          taxDetails={taxDetails!}
          onClick={() => {
            setAddTaxFormVisible(false);
            setTaxDetails(undefined)
          }}
        />
      )}


      {/* alert model */}
      {confirmationProps.isOpen && (
        <AlertModel
          cancel={() => confirmationProps.onCancel()}
          continue={() => confirmationProps.onConfirm()}
        />
      )}

      {/* loader model */}
      {isLoader && <LoaderModel />}
    </section>
  )
}

export default TaxList