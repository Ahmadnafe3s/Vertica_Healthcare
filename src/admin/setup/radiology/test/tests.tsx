import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pencil, Plus, Trash } from "lucide-react"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import CustomTooltip from "@/components/customTooltip"
import { z } from "zod"
import LoaderModel from "@/components/loader"
import AlertModel from "@/components/alertModel"
import { RadiologyTestNameDetailsType, RadiologyTestNameType } from "@/types/setupTypes/radiology"
import { useConfirmation } from "@/hooks/useConfirmation"
import { createRadiologytTest, deleteRadiologyTest, getRadiologyTestDetails, getRadiologyTests, updateRadiologyTest } from "../ApiHandlers"
import CreateRadioTest from "./createRadioTest"
import { TestNameFormSchema } from "@/formSchemas/setupSectionSchemas/CreateTestNameSchema"
import { currencySymbol } from "@/helpers/currencySymbol"
import { currencyFormat } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { useDebouncedCallback } from "use-debounce"
import { useQueryState, parseAsInteger } from "nuqs"
import CustomPagination from "@/components/customPagination"




const RadiologyTests = () => {

  // custom hooks
  const { confirm, confirmationProps } = useConfirmation()

  // query params

  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))
  const [search, setSearch] = useQueryState('search')


  // Loaders
  const [loading, setloading] = useState<{ inline: boolean, model: boolean }>({ inline: false, model: false })

  // API states
  const [tests, setTests] = useState<RadiologyTestNameType>({ data: [], total_pages: 0 })
  const [testDetails, setTestDetails] = useState<RadiologyTestNameDetailsType | undefined>(undefined)

  // model states
  const [isTestNameForm, setTestNameForm] = useState(false)


  // doing both upsert
  const handleSubmit = async (formData: z.infer<typeof TestNameFormSchema>) => {
    try {
      setloading(prev => ({ ...prev, inline: true }))
      let data;
      testDetails ? (data = await updateRadiologyTest(testDetails?.id!, formData),
        setTestDetails(undefined))
        :
        data = await createRadiologytTest(formData)
      toast.success(data.message)
      fetchRadiologyTests()
      setTestNameForm(false)
    } catch ({ message }: any) {
      toast.error(message)
    } finally { setloading(prev => ({ ...prev, inline: false })) }
  }



  const fetchRadiologyTests = async () => {
    try {
      const data = await getRadiologyTests({ page, limit: 10, search: search! })
      setTests(data)
    } catch ({ message }: any) {
      toast.error(message)
    }
  }


  const fetchRadioTestDetails = async (id: number) => {
    try {
      setloading(prev => ({ ...prev, model: true }))
      const data = await getRadiologyTestDetails(id)
      setTestDetails(data)
    } catch ({ message }: any) {
      toast.error(message)
    } finally { setloading(prev => ({ ...prev, model: false })) }
  }


  const onDelete = async (id: number) => {
    try {
      const isConfirm = await confirm()
      if (!isConfirm) return null
      const data = await deleteRadiologyTest(id)
      toast.success(data.message)
      fetchRadiologyTests()
    } catch ({ message }: any) {
      toast.error(message)
    }
  }


  const onSearch = useDebouncedCallback((value: string) => {
    value ? setSearch(value) : setSearch(null)
    setPage(1)
  }, 400)


  useEffect(() => {
    fetchRadiologyTests()
  }, [page, search])


  return (
    <section className="flex flex-col gap-y-5 pb-16 pt-5">

      <div className="flex justify-between">
        <h1 className="text-lg text-gray-800 font-semibold">Radiology Tests</h1>
        <Button size='sm' onClick={() => setTestNameForm(true)}>
          <Plus /> Add RadiologyTest
        </Button>
      </div>


      <Separator />

      <div className="sm:w-48 space-y-1">
        <p className="text-sm text-gray-700">Search</p>
        <Input type="text" onChange={(e) => { onSearch(e.target.value) }} placeholder="name , short, category" />
      </div>

      <Separator />

      <div className="flex flex-col pb-16 min-h-[65vh] space-y-10">
        <div className="flex-1">
          <Table className='border rounded-lg'>
            <TableHeader className='bg-zinc-100'>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Short Name</TableHead>
                <TableHead>Test Type</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Report Days</TableHead>
                <TableHead>Standard Charge {currencySymbol()}</TableHead>
                <TableHead>Tax %</TableHead>
                <TableHead>Amount {currencySymbol()}</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tests.data.map((test) => (
                <TableRow key={test.id}>
                  <TableCell>{test.name}</TableCell>
                  <TableCell>{test.shortName}</TableCell>
                  <TableCell>{test.testType}</TableCell>
                  <TableCell>{test.category.name}</TableCell>
                  <TableCell>{test.reportDays}</TableCell>
                  <TableCell>{currencyFormat(test.standardCharge)}</TableCell>
                  <TableCell>{test.tax}</TableCell>
                  <TableCell>{currencyFormat(test.amount)}</TableCell>
                  <TableCell className='flex space-x-2'>

                    {/* EDIT */}

                    <CustomTooltip message='EDIT'>
                      <Pencil className="w-4 cursor-pointer  text-gray-600" onClick={async () => {
                        await fetchRadioTestDetails(test.id)
                        setTestNameForm(true)
                      }} />
                    </CustomTooltip>

                    {/* DELETE  */}

                    <CustomTooltip message='DELETE'>
                      <Trash className="w-4 cursor-pointer  text-gray-600" onClick={() => onDelete(test.id)} />
                    </CustomTooltip>

                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {tests?.data.length === 0 && <div className="flex justify-center text-sm items-center h-40 text-gray-500">No Parameters Found</div>}
        </div>

        {/* Pagination */}

        <CustomPagination
          currentPage={page}
          total_pages={tests.total_pages}
          previous={(p) => setPage(p)}
          next={(p) => setPage(p)}
          goTo={(p) => setPage(p)}
        />

      </div>


      {isTestNameForm && <CreateRadioTest
        editDetails={testDetails!}
        Submit={handleSubmit}
        isPending={loading.inline}
        onClick={() => { setTestNameForm(false), setTestDetails(undefined) }}
      />}

      {/* loader model */}

      {loading.model && <LoaderModel />}

      {confirmationProps.isOpen && (
        <AlertModel
          cancel={() => confirmationProps.onCancel()}
          continue={() => confirmationProps.onConfirm()}
        />
      )}
    </section>

  )
}




export default RadiologyTests