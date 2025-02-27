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
import AlertModel from "@/components/alertModel"
import CustomPagination from "@/components/customPagination"
import LoaderModel from "@/components/loader"
import CustomTooltip from "@/components/customTooltip"
import { useQueryState, parseAsInteger } from "nuqs"





const ChargesList = () => {

  // params
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))
  const [search, setSearch] = useQueryState('search')

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
  const [chargeNames, setchargeNames] = useState<chargeNamesType>({ data: [], total_pages: 0 })



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
      const data = await getChargeNames({ page, limit: search ? 100 : 10, search: search! })
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


  const onSearch = useDebouncedCallback(async (value: string) => {
    if (value) {
      setPage(1)
      setSearch(value)
      return null
    }
    setSearch(null) // if no value then null
  }, 400)


  useEffect(() => {
    fetChargeNames()
  }, [page, search])


  return (

    <section className="flex flex-col gap-y-5 pb-16">

      <div className="flex justify-between">
        <h1 className="text-lg text-gray-800 font-semibold">Charges</h1>
        <Button size='sm' onClick={() => { setChargeNameFormVisible(true) }}>
          <Plus /> Add Charge
        </Button>
      </div>

      <Separator />

      <div className="sm:w-48 space-y-1">
        <p className="text-sm text-gray-700">Search</p>
        <Input type="text" onChange={(e) => { onSearch(e.target.value) }} placeholder="name , category" />
      </div>

      <Separator />

      <div className="flex flex-col min-h-[58vh] gap-y-16">
        {/* child 1 */}
        <div className="flex-1">
          <Table className="rounded-lg border">
            <TableHeader className="bg-zinc-100">
              <TableRow >
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
                    <CustomTooltip message="EDIT">
                      <Pencil className="w-4 cursor-pointer  text-gray-600" onClick={async () => {
                        await fetchChargeNameDetails(chargeName.id);
                        setChargeNameFormVisible(true)
                      }} />
                    </CustomTooltip>

                    {/* DELETE  */}
                    <CustomTooltip message="DELETE">
                      <Trash className="w-4 cursor-pointer  text-gray-600" onClick={async () => {
                        setAlert(true);
                        itemID.current = chargeName.id
                      }} />
                    </CustomTooltip>

                  </TableCell>
                </TableRow>
              })}
            </TableBody>
          </Table>


          {/* On no data */}

          {chargeNames?.data.length! < 1 && <h1 className='text-gray-900 pt-5 sm:mt-1 font-semibold text-lg flex items-center gap-1'>No data found <SearchX className='h-5 w-5' /></h1>}

        </div>

        {/* Pagination */}

        <CustomPagination
          total_pages={chargeNames?.total_pages}
          currentPage={+page}
          previous={(p) => setPage(p)}
          goTo={(p) => setPage(p)}
          next={(p) => setPage(p)}
        />
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