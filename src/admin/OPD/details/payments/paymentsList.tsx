import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { currencySymbol } from "@/helpers/currencySymbol"
import { Pencil, Plus, SearchX, Trash } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import PaymentFormModel from "./paymentFormModel"
import toast from "react-hot-toast"
import { createPayment, deletePayment, getPaymentDetails, getPaymentsList, updatePayment } from "../../opdApiHandler"
import { useParams } from "react-router-dom"
import { currencyFormat } from "@/lib/utils"
import { paymentFormSchema } from "@/formSchemas/paymentFormSchema"
import { z } from "zod"
import LoaderModel from "@/components/loader"
import AlertModel from "@/components/alertModel"
import { useDebouncedCallback } from 'use-debounce'
import { Payment, paymentData } from "@/types/opd_section/payment"
import CustomTooltip from "@/components/customTooltip"
import { useQueryState, parseAsInteger } from "nuqs"
import CustomPagination from "@/components/customPagination"





const PaymentsList = () => {

  // Query params
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))
  const [search, setSearch] = useQueryState('search')

  const { opdId } = useParams()
  const [isPending, setPending] = useState<boolean>(false)
  const ID = useRef<string>()

  // API States
  const [paymensList, setPaymentList] = useState<Payment>({ data: [], total_pages: 0 })
  const [paymentDetails, setPaymentDetails] = useState<paymentData>()

  // Models State
  const [isPaymentFormVisible, setIsPaymentFormVisible] = useState<boolean>(false);
  const [isPaymentLoading, setIsPaymentLoading] = useState<boolean>(false);
  const [isAlert, setAlert] = useState<boolean>(false)


  // Fetching list
  const fetchPaymetsList = async () => {
    try {
      const data = await getPaymentsList({ opdId: opdId!, page, limit: 10, search: search! })
      setPaymentList(data)
    } catch ({ message }: any) {
      toast.error(message)
    }
  }


  // fetching payment details for edit mode
  const fetchPaymetDetails = async (id: string) => {
    try {
      setIsPaymentLoading(true)
      const data = await getPaymentDetails(id)
      setPaymentDetails(data)
      setIsPaymentFormVisible(true)
    } catch ({ message }: any) {
      toast.error(message)
    } finally {
      setIsPaymentLoading(false)
    }
  }


  // This handler handling both (insert and update as well as updates list)
  const handleSubmit = async (formData: z.infer<typeof paymentFormSchema>) => {
    try {
      setPending(true)
      let data;
      if (paymentDetails) {
        data = await updatePayment(paymentDetails.id, formData)
        setPaymentDetails(undefined)
      } else {
        data = await createPayment(opdId!, formData)
      }
      toast.success(data.message)
      fetchPaymetsList()
      setIsPaymentFormVisible(false)
    } catch ({ message }: any) {
      toast.error(message)
    } finally {
      setPending(false)
    }
  }


  // Delete payment
  const onDelete = async () => {
    try {
      const data = await deletePayment(String(ID.current))
      toast.success(data.message)
      fetchPaymetsList()
    } catch ({ message }: any) {
      toast.error(message)
    } finally {
      setAlert(false)
    }
  }



  //useDebouncedCallback prevent unnecessary api calls
  const onSearch = useDebouncedCallback((search: string) => {
    search ? setSearch(search) : setSearch(null)
    setPage(1)
  }, 500)


  // fetching list initially on load
  useEffect(() => {
    fetchPaymetsList()
  }, [page, search])

  return (

    <section className="flex flex-col gap-y-5 pb-14">
      <div className="flex justify-between">
        <h1 className="text-lg text-gray-800 font-semibold">Payments</h1>
        <Button
          size='sm'
          onClick={() => setIsPaymentFormVisible(true)}
        >
          <Plus /> Add Payment
        </Button>
      </div>

      <Separator />
      {/* search section */}
      <div className="sm:w-48 space-y-1">
        <p className="text-sm text-gray-700">Search by keyword</p>
        <Input type="text" onChange={(e) => { onSearch(e.target.value) }} placeholder="transaction id , date" defaultValue={search!}/>
      </div>

      <Separator />

      {/* pagination */}

      <div className="flex flex-col mb-16 gap-y-10 min-h-[58vh]">
        <div className="flex-1">
          <Table className="rounded-lg border">
            <TableHeader className="bg-zinc-100">
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Payment Mode</TableHead>
                <TableHead>Paid Amount {currencySymbol()}</TableHead>
                <TableHead>Note</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paymensList.data.map((payment, i) => {
                return <TableRow key={i}>
                  <TableCell className="font-semibold">{payment.id}</TableCell>
                  <TableCell >{payment.date}</TableCell>
                  <TableCell >{payment.payment_mode}</TableCell>
                  <TableCell >{currencyFormat(payment.amount)}</TableCell>
                  <TableCell >{payment.note}</TableCell>
                  <TableCell className="flex space-x-2">

                    {/* Edit */}
                    <CustomTooltip message="EDIT">
                      <Pencil className="w-4 cursor-pointer active:scale-90 text-gray-600" onClick={async () => {
                        fetchPaymetDetails(payment.id)
                      }} />
                    </CustomTooltip>

                    {/* Delete */}

                    <CustomTooltip message="DELETE">
                      <Trash className="w-4 cursor-pointer active:scale-90 text-gray-600" onClick={async () => {
                        ID.current = payment.id
                        setAlert(true)
                      }} />
                    </CustomTooltip>

                  </TableCell>
                </TableRow>
              })}
            </TableBody>
          </Table>

          {/* error on emply list */}
          {paymensList.data.length < 1 && <h1 className='text-gray-900 mt-4 sm:mt-1 font-semibold text-lg flex items-center gap-1'>No data found <SearchX className='h-5 w-5' /></h1>}

        </div>

        {/* pagination buttons */}
        <section>
          <CustomPagination
            total_pages={paymensList?.total_pages!}
            currentPage={page}
            previous={(p) => setPage(p)}
            goTo={(p) => setPage(p)}
            next={(p) => setPage(p)}
          />
        </section>
      </div>


      {/* Models */}

      {isPaymentFormVisible && (
        <PaymentFormModel Submit={handleSubmit} isPending={isPending} paymentDetails={paymentDetails!}
          onClick={() => {
            setIsPaymentFormVisible(false)
            setPaymentDetails(undefined)
          }}
        />
      )}

      {/* Loader */}

      {isPaymentLoading && <LoaderModel />}

      {/* Alert Model */}

      {isAlert && <AlertModel cancel={() => setAlert(false)} continue={onDelete} />}
    </section>
  )
}

export default PaymentsList