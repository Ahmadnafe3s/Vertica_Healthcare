import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pencil, Plus, Trash } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import toast from "react-hot-toast"
import AddOperationCategoryForm, { AddOperationCategoryFormSchema } from "./addOperationCategoryForm"
import { z } from "zod"
import { createOperationCategory, deleteOperationCategory, getOperationCategories, getOperationCategoryDetails, updateOperationCategory } from "../operationsAPIhandlers"
import { operationCategoryType } from "@/types/setupTypes/setupOpeartion"
import AlertModel from "@/components/alertModel"
import LoaderModel from "@/components/loader"
import CustomTooltip from "@/components/customTooltip"

const OperationCategories = () => {
  // credentials
  const itemID = useRef<number>(0)


  // Loaders
  const [isPending, setPending] = useState<boolean>(false)
  const [isLoader, setLoader] = useState<boolean>(false)


  // model states
  const [isAddOpCatFormVisible, setAddOpCatFormVisible] = useState<boolean>(false)
  const [isAlert, setAlert] = useState<boolean>(false)


  // API States
  const [operationCategories, setoperationCategories] = useState<operationCategoryType[]>([])
  const [operationCategoryDetails, setOperationCategoryDetails] = useState<operationCategoryType | undefined>(undefined)



  const handleSubmit = async (formData: z.infer<typeof AddOperationCategoryFormSchema>) => {
    try {
      setPending(true)
      let data;
      if (operationCategoryDetails) {
        data = await updateOperationCategory(operationCategoryDetails.id, formData)
        setOperationCategoryDetails(undefined)
      } else {
        data = await createOperationCategory(formData)
      }
      fetchOperationCategories()
      setAddOpCatFormVisible(false)
      toast.success(data.message)
    } catch ({ message }: any) {
      toast.error(message);
    } finally {
      setPending(false);
    }
  }


  const fetchOperationCategories = async () => {
    try {
      const data = await getOperationCategories()
      setoperationCategories(data)
    } catch ({ message }: any) {
      toast.error(message);
    } finally {
      setPending(false);
    }
  }


  const fetchOperationCategoryDetails = async (id: number) => {
    try {
      setLoader(true)
      const data = await getOperationCategoryDetails(id)
      setOperationCategoryDetails(data)
    } catch ({ message }: any) {
      toast.error(message);
    } finally {
      setLoader(false)
    }
  }


  const onDelete = async () => {
    try {
      setPending(true)
      const data = await deleteOperationCategory(itemID.current)
      toast.success(data.message)
      fetchOperationCategories()
    } catch ({ message }: any) {
      toast.error(message);
    } finally {
      setPending(false)
      setAlert(false)
    }
  }


  useEffect(() => {
    fetchOperationCategories()
  }, [])


  return (
    <section className="flex flex-col gap-y-5 pb-16">

      <div className="flex justify-between">
        <h1 className="text-lg font-semibold">Category List</h1>
        <Button size='sm' onClick={() => { setAddOpCatFormVisible(true) }}>
          <Plus /> Add Category
        </Button>
      </div>

      <Separator />

      {/* <div className="sm:w-48 space-y-1">
               <p className="text-sm text-gray-700">Search</p>
               <Input type="text" onChange={(e) => { onSearch(e.target.value) }} placeholder="name , category" />
           </div> */}

      {/* <Separator /> */}

      <Table className="rounded-lg border dark:border-gray-800">
        <TableHeader className='bg-zinc-100 dark:bg-gray-800'>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {operationCategories.map((category) => {
            return <TableRow key={category.id}>
              <TableCell>{category.name}</TableCell>

              <TableCell className='flex space-x-2'>
                {/* EDIT */}

                <CustomTooltip message="EDIT">
                  <Pencil className="w-4 cursor-pointer  text-gray-600 dark:text-gray-400" onClick={async () => {
                    await fetchOperationCategoryDetails(category.id)
                    setAddOpCatFormVisible(true)
                  }} />
                </CustomTooltip>

                {/* DELETE  */}

                <CustomTooltip message="DELETE">
                  <Trash className="w-4 cursor-pointer  text-gray-600 dark:text-gray-400" onClick={async () => {
                    setAlert(true);
                    itemID.current = category.id
                  }} />
                </CustomTooltip>

              </TableCell>
            </TableRow>
          })}
        </TableBody>
      </Table>

      {/* Model */}

      {isAddOpCatFormVisible && (
        <AddOperationCategoryForm
          Submit={handleSubmit}
          categoryDetails={operationCategoryDetails!}
          isPending={isPending}
          onClick={() => {
            setAddOpCatFormVisible(false);
            setOperationCategoryDetails(undefined)
          }}
        />
      )}


      {/* Alert Model */}

      {isAlert && (
        <AlertModel
          cancel={() => setAlert(false)}
          continue={onDelete}
          isPending={isPending}
        />
      )}

      {/* Loader model */}

      {isLoader && <LoaderModel />}

    </section>
  )
}

export default OperationCategories