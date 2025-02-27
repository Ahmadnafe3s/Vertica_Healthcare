
import { useEffect, useRef, useState } from "react"
import ChargeFormModel from "./chargeFormModel"
import { Button } from "@/components/ui/button"
import { Pencil, Plus, SearchX, Trash } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { currencySymbol } from "@/helpers/currencySymbol"
import toast from "react-hot-toast"
import { createCharges, deleteCharge, getChargeDetails, getCharges, updateCharge } from "../../opdApiHandler"
import { useParams } from "react-router-dom"
import AlertModel from "@/components/alertModel"
import { currencyFormat } from "@/lib/utils"
import ChargeDetailsModel from "./chargeDetailsModel"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import LoaderModel from "@/components/loader"
import { chargeFormSchema } from "@/formSchemas/chargeFormSchema"
import { z } from "zod"
import { ChargeDetailsType, ChargeListType } from "@/types/opd_section/charges"
import CustomPagination from "@/components/customPagination"
import CustomTooltip from "@/components/customTooltip"
import { parseAsInteger, useQueryState } from "nuqs"

const CahrgesList = () => {

  // Query params
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))
  const [search, setSearch] = useQueryState('search')


  const id = useRef<number>(0)
  const { opdId } = useParams()
  const [isPending, setPending] = useState<boolean>(false)


  // Api states
  //chargeDetails provides data to details MODEL and FORM (ON EDIT MODE)
  const [chargeDetails, setChargeDetails] = useState<ChargeDetailsType | undefined>(undefined)
  const [CHARGES, SET_CHARGES] = useState<ChargeListType>({ data: [], total_pages: 1 })


  // Models State
  const [isAlert, setAlert] = useState<boolean>(false)
  const [isChargeLoading, setIsChargeLoading] = useState<boolean>(false)
  const [isChargeDetailsVisible, setIsChargeDetailsVisible] = useState<boolean>(false)
  const [isChargeFormVisible, setIsChargeFormVisible] = useState<boolean>(false)


  //fetching charges list

  const fetchCharges = async () => {
    try {
      //on search limit will be 100
      const data = await getCharges({ opdId: opdId!, page, limit: search ? 100 : 10, date: search! }) // opdId is here string
      SET_CHARGES(data)
    } catch ({ message }: any) {
      toast.error(message)
    }
  }


  // Fetching details for Details model and form on edit mode
  const fetchChargeDetails = async (id: number) => {
    try {
      setIsChargeLoading(true)
      const data = await getChargeDetails(id)
      setChargeDetails(data)
    } catch ({ message }: any) {
      toast.error(message)
    } finally {
      setIsChargeLoading(false)
    }
  }



  const onDelete = async () => {
    try {
      const data = await deleteCharge(Number(id.current))
      toast.success(data.message)
      // refetching list
      fetchCharges()
    } catch ({ message }: any) {
      toast.error(message)
    } finally {
      setAlert(false)
    }
  }



  const onSearch = async (date: string) => {
    if (date) {
      setPage(1)
      setSearch(date)
      return
    }
    setSearch(null)
  }



  // handling create and update both
  const handleSubmit = async (formData: z.infer<typeof chargeFormSchema>) => {
    try {
      setPending(true)
      let data;
      chargeDetails ? (data = await updateCharge(chargeDetails.id, formData), setChargeDetails(undefined))
        :
        (data = await createCharges(opdId!, formData))

      toast.success(data.message)
      fetchCharges()
      setIsChargeFormVisible(false)
    } catch ({ message }: any) {
      toast.error(message)
    } finally {
      setPending(false)
    }
  }



  useEffect(() => {
    fetchCharges()
  }, [page, search])


  return (
    <section className="flex flex-col gap-y-5">

      <div className="flex justify-between">
        <h1 className="text-lg text-gray-800 font-semibold">Charges</h1>
        <Button size='sm' onClick={() => setIsChargeFormVisible(true)} >
          <Plus /> Add Charge
        </Button>
      </div>

      <Separator />

      <div className="sm:w-48 space-y-1">
        <p className="text-sm text-gray-700">Search by date</p>
        <Input type="date" onChange={(e) => { onSearch(e.target.value) }} defaultValue={search!} />
      </div>

      <Separator />

      <div className="flex flex-col min-h-[60vh] mb-20">
        <div className="flex-1">
          <Table className="rounded-lg border">
            <TableHeader className="bg-zinc-100">
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Charge Name</TableHead>
                <TableHead>Charge Type</TableHead>
                <TableHead>Standard Charge {currencySymbol()}</TableHead>
                <TableHead>TPA Charge {currencySymbol()}</TableHead>
                <TableHead>Net Amount {currencySymbol()}</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {CHARGES?.data.map((charge, i) => {
                return <TableRow key={i}>
                  <TableCell>{charge.date}</TableCell>
                  {/* to view details model */}
                  <TableCell className="text-blue-500 cursor-pointer hover:text-blue-400 font-semibold" onClick={async () => {
                    await fetchChargeDetails(charge.id);
                    setIsChargeDetailsVisible(true)
                  }} >
                    {charge.chargeNames.name}
                  </TableCell>
                  <TableCell>{charge.chargeType.charge_type}</TableCell>
                  <TableCell>{currencyFormat(charge.standard_charge)}</TableCell>
                  <TableCell>{currencyFormat(charge.tpa)}</TableCell>
                  <TableCell>{currencyFormat(charge.net_amount)}</TableCell>
                  <TableCell className="flex space-x-2">

                    {/* EDIT  */}
                    <CustomTooltip message="EDIT">
                      <Pencil className="w-4 cursor-pointer text-gray-600" onClick={async () => {
                        await fetchChargeDetails(charge.id)
                        setIsChargeFormVisible(true)
                      }} />
                    </CustomTooltip>

                    {/* DELETE */}
                    <CustomTooltip message="DELETE">
                      <Trash className="w-4 cursor-pointer text-gray-600" onClick={() => {
                        setAlert(true)
                        id.current = charge.id
                      }} />
                    </CustomTooltip>

                  </TableCell>
                </TableRow>
              })}
            </TableBody>
          </Table>

          {CHARGES?.data.length! < 1 && <h1 className='text-gray-900 mt-5 sm:mt-1 font-semibold text-lg flex items-center gap-1'>No data found <SearchX className='h-5 w-5' /></h1>}

        </div>

        {/* Pagination */}

        <div>
          <section>
            <CustomPagination
              total_pages={CHARGES?.total_pages!}
              currentPage={page}
              previous={(p) => setPage(p)}
              goTo={(p) => setPage(p)}
              next={(p) => setPage(p)}
            />
          </section>
        </div>
      </div>


      {/* MODEL */}

      {isChargeFormVisible && <ChargeFormModel isPending={isPending} chargeDetails={chargeDetails!} Submit={handleSubmit}
        onClick={() => {
          setIsChargeFormVisible(false);
          setChargeDetails(undefined)
        }}
      />}


      {/* Alert Model */}

      {isAlert && (
        <AlertModel
          cancel={() => setAlert(false)}
          continue={onDelete}
        />
      )}


      {/* Details Model */}

      {isChargeDetailsVisible && <ChargeDetailsModel
        chargeDetails={chargeDetails}
        onClick={() => {
          setIsChargeDetailsVisible(false);
          setChargeDetails(undefined)
        }}
      />}


      {/* loader */}

      {isChargeLoading && <LoaderModel />}

    </section>
  )
}

export default CahrgesList