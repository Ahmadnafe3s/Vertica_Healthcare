import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pencil, Plus, Trash } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import toast from "react-hot-toast"
import FindingCategoryForm, { FindingCategoryFormSchema } from "./findingCategoryForm"
import AlertModel from "@/components/alertModel"
import { z } from "zod"
import { createFindingCategory, deleteFindingCategory, getFindingCategories, getFindingCategoryDetails, updateFindingCategory } from "../apiHandler"
import { findingCategory } from "@/types/setupTypes/finding"
import LoaderModel from "@/components/loader"
import CustomTooltip from "@/components/customTooltip"

const FindindngCategories = () => {
  // credentials
  const itemID = useRef<number>(0)


  // Loaders
  const [isPending, setPending] = useState<boolean>(false)


  // model states
  const [isFindingFormVisible, setFindingFormVisible] = useState<boolean>(false)
  const [isAlert, setAlert] = useState<boolean>(false)
  const [loaderModel, setLoaderModel] = useState<boolean>(false)

  // API States
  const [findingDetails, setfindingDetails] = useState<findingCategory | undefined>(undefined)
  const [findings, setFindings] = useState<findingCategory[]>([])


  const handleSubmit = async (formData: z.infer<typeof FindingCategoryFormSchema>) => {
    try {
      let data;
      setPending(true)
      if (findingDetails) {
        data = await updateFindingCategory(findingDetails.id, formData)
      } else {
        data = await createFindingCategory(formData)
      }
      toast.success(data.message)
      setPending(false)
      setFindingFormVisible(false)
      fetchFindingCategories()
    } catch ({ message }: any) {
      toast.error(message)
      setPending(false)
    }
  }


  const fetchFindingCategories = async () => {
    try {
      const data = await getFindingCategories()
      setFindings(data)
    } catch ({ message }: any) {
      toast.error(message)
      setPending(false)
    }
  }


  const fetchFindingCategoryDetails = async (id: number) => {
    try {
      setLoaderModel(true)
      const data = await getFindingCategoryDetails(id)
      setfindingDetails(data)
    } catch ({ message }: any) {
      toast.error(message)
      setPending(false)
    } finally {
      setLoaderModel(false)
    }
  }


  const onDelete = async () => {
    try {
      const data = await deleteFindingCategory(itemID.current)
      toast.success(data.message)
      fetchFindingCategories()
    } catch ({ message }: any) {
      toast.error(message)
    } finally {
      setAlert(false)
    }
  }


  useEffect(() => {
    fetchFindingCategories()
  }, [])


  return (
    <section className="flex flex-col pb-16 gap-y-5">

      <div className="flex justify-between">
        <h1 className="text-lg text-gray-800 font-semibold">Categories</h1>
        <Button size='sm' onClick={() => { setFindingFormVisible(true) }}>
          <Plus /> Add Category
        </Button>
      </div>

      <Separator />

      <Table className="border rounded-lg">
        <TableHeader className="bg-zinc-100">
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {findings.map((finding) => {
            return <TableRow key={finding.id}>
              <TableCell>{finding.id}</TableCell>
              <TableCell>{finding.name}</TableCell>

              <TableCell className='flex space-x-2'>

                {/* EDIT */}
                <CustomTooltip message="EDIT">
                  <Pencil className="w-4 cursor-pointer  text-gray-600" onClick={async () => {
                    await fetchFindingCategoryDetails(finding.id)
                    setFindingFormVisible(true);
                  }} />
                </CustomTooltip>


                {/* DELETE  */}
                <CustomTooltip message="DELETE">
                  <Trash className="w-4 cursor-pointer  text-gray-600" onClick={async () => {
                    setAlert(true);
                    itemID.current = finding.id
                  }} />
                </CustomTooltip>

              </TableCell>

            </TableRow>
          })}
        </TableBody>
      </Table>


      {/* Form Model */}

      {isFindingFormVisible && (
        <FindingCategoryForm
          categoryDetails={findingDetails!}
          Submit={handleSubmit}
          isPending={isPending}
          onClick={() => {
            setFindingFormVisible(false)
          }}
        />
      )}


      {/* Loader Model */}

      {loaderModel && <LoaderModel />}

      {/* Alert Model */}

      {isAlert && (
        <AlertModel
          cancel={() => setAlert(false)}
          continue={onDelete}
          isPending={isPending}
        />
      )}



    </section>
  )
}

export default FindindngCategories