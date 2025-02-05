import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { currencySymbol } from "@/helpers/currencySymbol"
import { Pencil, Plus, SearchX, Trash } from "lucide-react"
import { useDebouncedCallback } from "use-debounce"
import AddChargesFormModel from "./addChargeNameFormModel"
import { useEffect, useRef, useState } from "react"
import { z } from "zod"
import { chargeNameFormSchema } from "@/formSchemas/setupSectionSchemas/ChargeNameFormSchema"
import toast from "react-hot-toast"
import { chargeNameDetailsType, chargeNamesType } from "@/types/setupTypes/chargeName"
import { createChargeName, deleteChargeName, getChargeNameDetails, getChargeNames, updateChargeName } from "../chargesAPIhandlers"
import { currencyFormat } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import AlertModel from "@/components/alertModel"
import { useLocation } from "react-router-dom"
import CustomPagination from "@/components/customPagination"
import LoaderModel from "@/components/loader"





const ChargesList = () => {

  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  let page = parseInt(queryParams.get('page') || '1', 10);

  // credentials
  const itemID = useRef<number>(0)

  // Loaders
  const [isPending, setPending] = useState<boolean>(false)


  // model states
  const [isChargeNameFormVisible, setChargeNameFormVisible] = useState<boolean>(false)
  const [isAlert, setAlert] = useState<boolean>(false)
  const [loaderModel, setLoaderModel] = useState<boolean>(false)

  // API States
  const [chargeNameDetails, setChargeNameDetails] = useState<chargeNameDetailsType | undefined>(undefined)
  const [chargeNames, setchargeNames] = useState<chargeNamesType>()



  // performing both
  const handleSubmit = async (formData: z.infer<typeof chargeNameFormSchema>) => {
    try {
      setPending(true);
      let data;
      if (chargeNameDetails) {
        data = await updateChargeName(chargeNameDetails.id, formData)
        setChargeNameDetails(undefined)
      } else {
        data = await createChargeName(formData)
      }
      setChargeNameFormVisible(false)
      fetChargeNames()
      toast.success(data.message)
    } catch ({ message }: any) {
      toast.error(message)
    } finally {
      setPending(false)
    }
  }


  const fetchChargeNameDetails = async (id: number) => {
    try {
      setLoaderModel(true)
      const data = await getChargeNameDetails(id)
      setChargeNameDetails(data)
    } catch ({ message }: any) {
      toast.error(message)
    } finally {
      setLoaderModel(false)
    }
  }


  const fetChargeNames = async () => {
    try {
      const data = await getChargeNames(page)
      setchargeNames(data)
      console.log(data);

    } catch ({ message }: any) {
      toast.error(message)
    }
  }


  const onDelete = async () => {
    try {
      setPending(true)
      const data = await deleteChargeName(itemID.current)
      toast.success(data.message)
      fetChargeNames()
    } catch ({ message }: any) {
      toast.error(message)
    } finally {
      setPending(false)
      setAlert(false)
    }
  }


  const onSearch = useDebouncedCallback(async (value) => {
    try {
      const data = await getChargeNames(page, value)
      setchargeNames(data)
    } catch ({ message }: any) {
      toast.error(message)
    }
  }, 400)


  useEffect(() => {
    fetChargeNames()
    console.log("hjsjisd");

  }, [page])


  return (

    <section className="flex flex-col gap-y-5 pb-16">

      <div className="flex justify-between">
        <h1 className="text-lg text-gray-800 font-semibold">Charges</h1>
        <Button variant='outline' size='sm' onClick={() => { setChargeNameFormVisible(true) }}>
          <Plus /> Add Charge
        </Button>
      </div>

      <Separator />

      <div className="sm:w-48 space-y-1">
        <p className="text-sm text-gray-700">Search</p>
        <Input type="text" onChange={(e) => { onSearch(e.target.value) }} placeholder="name , category" />
      </div>

      <Separator />

      <div className="flex flex-col min-h-[70vh] gap-y-16">
        {/* child 1 */}
        <div className="flex-1">
          <Table >
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Charge Category</TableHead>
                <TableHead>Charge Type</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead>Tax%</TableHead>
                <TableHead>Standard Charge {currencySymbol()}</TableHead>
                <TableHead>TPA Charge {currencySymbol()}</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {chargeNames?.data.map((chargeName) => {
                return <TableRow key={chargeName.id}>
                  <TableCell>{chargeName.name}</TableCell>
                  <TableCell>{chargeName.chargeCategory.category}</TableCell>
                  <TableCell>{chargeName.chargeCategory.chargeType.charge_type}</TableCell>
                  <TableCell>{chargeName.unitId}</TableCell>
                  <TableCell>{chargeName.tax_percentage} %</TableCell>
                  <TableCell>{currencyFormat(chargeName.standard_charge)}</TableCell>
                  <TableCell>{currencyFormat(chargeName.tpa)}</TableCell>
                  <TableCell className='flex space-x-2'>

                    {/* EDIT */}
                    <TooltipProvider delayDuration={200}>
                      <Tooltip>
                        <TooltipTrigger>
                          <Pencil className="w-4 cursor-pointer  text-gray-600" onClick={async () => {
                            await fetchChargeNameDetails(chargeName.id);
                            setChargeNameFormVisible(true)
                          }} />
                        </TooltipTrigger>
                        <TooltipContent>Edit</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>


                    {/* DELETE  */}
                    <TooltipProvider delayDuration={200}>
                      <Tooltip>
                        <TooltipTrigger>
                          <Trash className="w-4 cursor-pointer  text-gray-600" onClick={async () => {
                            setAlert(true);
                            itemID.current = chargeName.id
                          }} />
                        </TooltipTrigger>
                        <TooltipContent>DELETE</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                  </TableCell>
                </TableRow>
              })}
            </TableBody>
          </Table>

          {/* On no data */}

          {chargeNames?.data.length! < 1 && <h1 className='text-gray-900 pt-5 sm:mt-1 font-semibold text-lg flex items-center gap-1'>No data found <SearchX className='h-5 w-5' /></h1>}

        </div>

        {/* child 2 */}
        <div>
          <CustomPagination currentPage={page} total_pages={Number(chargeNames?.total_pages)} />
        </div>
      </div>


      {/* Models */}

      {/* Form model */}

      {
        isChargeNameFormVisible && (
          <AddChargesFormModel
            chargeNameDetails={chargeNameDetails!}
            Submit={handleSubmit}
            isPending={isPending}
            onClick={() => {
              setChargeNameFormVisible(false);
              setChargeNameDetails(undefined)
            }}
          />
        )
      }


      {/* Alert Model */}

      {
        isAlert && <AlertModel
          cancel={() => setAlert(false)}
          continue={onDelete}
          isPending={isPending}
        />
      }

      {/* Loader */}

      {loaderModel && <LoaderModel />}
    </section >
  )
}

export default ChargesList