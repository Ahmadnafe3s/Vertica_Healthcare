import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pencil, Plus, Trash } from "lucide-react"
import AddTaxformModel, { taxFormSchema } from "./addTaxformModel"
import toast from "react-hot-toast"
import { createTax, deleteTax, getTaxDetails, getTaxesList, updateTax } from "../chargesAPIhandlers"
import { z } from "zod"
import { useEffect, useRef, useState } from "react"
import AlertModel from "@/components/alertModel"
import LoaderModel from "@/components/loader"
import CustomTooltip from "@/components/customTooltip"

export interface TaxType {
  id: number,
  name: string,
  percentage: number
}


const TaxList = () => {

  // credentials
  const itemID = useRef<number>(0)


  // Loaders
  const [isPending, setPending] = useState<boolean>(false)
  const [isLoader, setLoader] = useState<boolean>(false)


  // model states
  const [isAddTaxFormVisible, setAddTaxFormVisible] = useState<boolean>(false)
  const [isAlert, setAlert] = useState<boolean>(false)


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


  const onDelete = async () => {
    try {
      setPending(true)
      const data = await deleteTax(itemID.current)
      fetchTaxesList();
      toast.success(data.message);
      setPending(false)
    } catch ({ message }: any) {
      toast.error(message)
    } finally {
      setAlert(false)
      setPending(false)
    }
  }


  useEffect(() => {
    fetchTaxesList()
  }, [])

  return (
    <section className="flex flex-col pb-16 gap-y-5">

      <div className="flex justify-between">
        <h1 className="text-lg text-gray-800 font-semibold">Taxes List</h1>
        <Button size='sm' onClick={() => setAddTaxFormVisible(true)}>
          <Plus /> Add Tax
        </Button>
      </div>

      <Separator />

      <Table className="rounded-lg border">
        <TableHeader className="bg-zinc-100">
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

                {/* EDIT  */}

                <CustomTooltip message="EDIT">
                  <Pencil className="w-4 cursor-pointer  text-gray-600" onClick={async () => {
                    await fetchTaxdetails(tax.id)
                    setAddTaxFormVisible(true)
                  }} />
                </CustomTooltip>

                {/* DELETE  */}

                <CustomTooltip message="DELETE">
                  <Trash className="w-4 cursor-pointer  text-gray-600" onClick={async () => {
                    setAlert(true);
                    itemID.current = tax.id
                  }} />
                </CustomTooltip>

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
      {isAlert && (
        <AlertModel
          isPending={isPending}
          cancel={() => setAlert(false)}
          continue={onDelete}
        />
      )}

      {/* loader model */}
      {isLoader && <LoaderModel />}
    </section>
  )
}

export default TaxList