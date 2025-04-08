import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, } from "lucide-react"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import AddOperationCategoryForm, { AddOperationCategoryFormSchema } from "./addOperationCategoryForm"
import { z } from "zod"
import { createOperationCategory, deleteOperationCategory, getOperationCategories, getOperationCategoryDetails, updateOperationCategory } from "../operationsAPIhandlers"
import { operationCategoryType } from "@/types/setupTypes/setupOpeartion"
import AlertModel from "@/components/alertModel"
import LoaderModel from "@/components/loader"
import PermissionProtectedAction from "@/components/permission-protected-actions"
import PermissionTableActions from "@/components/permission-table-actions"
import { useConfirmation } from "@/hooks/useConfirmation"

const OperationCategories = () => {

  const { confirm, confirmationProps } = useConfirmation()

  // Loaders
  const [isPending, setPending] = useState<boolean>(false)
  const [isLoader, setLoader] = useState<boolean>(false)


  // model states
  const [isAddOpCatFormVisible, setAddOpCatFormVisible] = useState<boolean>(false)

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


  const onDelete = async (id: number) => {
    try {
      const isConfirmed = await confirm()
      if (!isConfirmed) return null
      const data = await deleteOperationCategory(id)
      toast.success(data.message)
      fetchOperationCategories()
    } catch ({ message }: any) {
      toast.error(message);
    }
  }


  useEffect(() => {
    fetchOperationCategories()
  }, [])


  return (
    <section className="flex flex-col gap-y-5 pb-16">

      <div className="flex justify-between">
        <h1 className="text-lg font-semibold">Category List</h1>
        <PermissionProtectedAction action='create' module='operation_category'>
          <Button size='sm' onClick={() => { setAddOpCatFormVisible(true) }}>
            <Plus /> Add Category
          </Button>
        </PermissionProtectedAction>
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

                {/* it has both edit and delete */}
                <PermissionTableActions
                  module="operation_category"
                  onEdit={async () => {
                    await fetchOperationCategoryDetails(category.id)
                    setAddOpCatFormVisible(true)
                  }}
                  onDelete={() => onDelete(category.id)}
                />

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

      {confirmationProps.isOpen && (
        <AlertModel
          cancel={() => confirmationProps.onCancel()}
          continue={() => confirmationProps.onConfirm()}
        />
      )}

      {/* Loader model */}
      {isLoader && <LoaderModel />}

    </section>
  )
}

export default OperationCategories