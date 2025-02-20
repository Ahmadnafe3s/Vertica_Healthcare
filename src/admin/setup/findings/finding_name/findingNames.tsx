import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pencil, Plus, Trash } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { z } from "zod"
import FindingNameForm, { FindingNameFormSchema } from "./findingNameForm"
import { createFindingName, deleteFindingName, getFindingNameDetails, getFindingNames, updateFindingName } from "../apiHandler"
import toast from "react-hot-toast"
import { findingName } from "@/types/setupTypes/finding"
import LoaderModel from "@/components/loader"
import AlertModel from "@/components/alertModel"
import CustomTooltip from "@/components/customTooltip"

const FindingNames = () => {
  // credentials
  const itemID = useRef<number>(0)


  // Loaders
  const [isPending, setPending] = useState<boolean>(false)


  // model states
  const [isFindingNameFormVisible, setFindingNameFormVisible] = useState<boolean>(false)
  const [isAlert, setAlert] = useState<boolean>(false)
  const [loaderModel, setLoaderModel] = useState<boolean>(false)

  // API States
  const [findingNameDetails, setfindingNameDetails] = useState<findingName | undefined>(undefined)
  const [findingNames, setFindingNames] = useState<findingName[]>([])


  // handles both upsert
  const handleSubmit = async (formData: z.infer<typeof FindingNameFormSchema>) => { // 
    try {
      let data;
      setPending(true)
      if (findingNameDetails) {
        data = await updateFindingName(findingNameDetails.id, formData)
        setfindingNameDetails(undefined)
      } else {
        data = await createFindingName(formData)
      }
      toast.success(data.message)
      setPending(false)
      setFindingNameFormVisible(false)
      fetchFindingNames()
    } catch ({ message }: any) {
      toast.error(message)
      setPending(false)
    }
  }


  const fetchFindingNames = async () => {
    try {
      const data = await getFindingNames()
      setFindingNames(data)
    } catch ({ message }: any) {
      toast.error(message)
    }
  }


  const fetchFindingNameDetails = async (id: number) => {
    try {
      setLoaderModel(true)
      const data = await getFindingNameDetails(id)
      setfindingNameDetails(data)
    } catch ({ message }: any) {
      toast.error(message)
    } finally {
      setLoaderModel(false)
    }
  }


  const onDelete = async () => {
    try {
      setPending(true)
      const data = await deleteFindingName(itemID.current)
      toast.success(data.message)
      fetchFindingNames()
    } catch ({ message }: any) {
      toast.error(message)
    } finally {
      setAlert(false)
      setPending(false)
    }
  }


  useEffect(() => {
    fetchFindingNames()
  }, [])


  return (
    <section className="flex flex-col pb-16 gap-y-5">

      <div className="flex justify-between">
        <h1 className="text-lg text-gray-800 font-semibold">Findigs</h1>
        <Button size='sm' onClick={() => { setFindingNameFormVisible(true) }}>
          <Plus /> Add Finding
        </Button>
      </div>

      <Separator />

      <Table className="border rounded-lg">
        <TableHeader className="bg-zinc-100">
          <TableRow>
            <TableHead>Finding</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {findingNames.map((name) => {
            return <TableRow key={name.id}>
              <TableCell>{name.name}</TableCell>
              <TableCell>{name.category.name}</TableCell>
              <TableCell>{name.description}</TableCell>

              <TableCell className='flex space-x-2'>

                {/* EDIT */}

                <CustomTooltip message="EDIT">
                  <Pencil className="w-4 cursor-pointer  text-gray-600" onClick={async () => {
                    await fetchFindingNameDetails(name.id)
                    setFindingNameFormVisible(true);
                  }} />
                </CustomTooltip>


                {/* DELETE  */}
                <CustomTooltip message="DELETE">
                  <Trash className="w-4 cursor-pointer  text-gray-600" onClick={async () => {
                    setAlert(true);
                    itemID.current = name.id
                  }} />
                </CustomTooltip>

              </TableCell>
            </TableRow>
          })}
        </TableBody>
      </Table>


      {/* Finding name form */}

      {isFindingNameFormVisible && (
        <FindingNameForm
          nameDetails={findingNameDetails!}
          Submit={handleSubmit}
          isPending={isPending}
          onClick={() => {
            setFindingNameFormVisible(false)
            setfindingNameDetails(undefined)
          }}
        />
      )}


      {/* Loder model */}

      {loaderModel && (
        <LoaderModel />
      )}

      {/* Alert model */}

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

export default FindingNames