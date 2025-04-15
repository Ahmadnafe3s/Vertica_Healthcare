import AlertModel from "@/components/alertModel"
import CustomPagination from "@/components/customPagination"
import EmptyList from "@/components/emptyList"
import LoaderModel from "@/components/loader"
import PermissionProtectedAction from "@/components/permission-protected-actions"
import PermissionTableActions from "@/components/permission-table-actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { paymentFormSchema } from "@/formSchemas/paymentFormSchema"
import { currencySymbol } from "@/helpers/currencySymbol"
import { useConfirmation } from "@/hooks/useConfirmation"
import { currencyFormat } from "@/lib/utils"
import { Payment, paymentData } from "@/types/opd_section/payment"
import { Plus } from "lucide-react"
import { parseAsInteger, useQueryState } from "nuqs"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useParams } from "react-router-dom"
import { useDebouncedCallback } from 'use-debounce'
import { z } from "zod"
import { createPayment, deletePayment, getPaymentDetails, getPaymentsList, updatePayment } from "../../opdApiHandler"
import PaymentFormModel from "./paymentFormModel"





const PaymentsList = () => {

  // custom hooks
  const { confirm, confirmationProps } = useConfirmation()

  // Query params
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))
  const [search, setSearch] = useQueryState('search')

  const { opdId } = useParams()
  const [isPending, setPending] = useState<boolean>(false)

  // API States
  const [paymensList, setPaymentList] = useState<Payment>({ data: [], total_pages: 0 })
  const [paymentDetails, setPaymentDetails] = useState<paymentData>()

  // Models State
  const [isPaymentFormVisible, setIsPaymentFormVisible] = useState<boolean>(false);
  const [isPaymentLoading, setIsPaymentLoading] = useState<boolean>(false);


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
  const onDelete = async (id: string) => {
    try {
      const isConfirm = await confirm()
      if (!isConfirm) return null
      const data = await deletePayment(id)
      toast.success(data.message)
      fetchPaymetsList()
    } catch ({ message }: any) {
      toast.error(message)
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
        <h1 className="text-lg text-gray-800 dark:text-gray-100 font-semibold">Payments</h1>
        <PermissionProtectedAction action='create' module='payments'>
          <Button size='sm' onClick={() => setIsPaymentFormVisible(true)}>
            <Plus /> Add Payment
          </Button>
        </PermissionProtectedAction>
      </div>

      <Separator />
      {/* search section */}
      <div className="sm:w-48 space-y-1">
        <p className="text-sm text-gray-700 dark:text-gray-500">Search by keyword</p>
        <Input type="text" onChange={(e) => { onSearch(e.target.value) }} placeholder="transaction id , date" defaultValue={search!} />
      </div>

      <Separator />

      {/* pagination */}

      <div className="flex flex-col mb-16 gap-y-10 min-h-[58vh]">
        <div className="flex-1">
          <Table className="rounded-lg border dark:border-gray-800">
            <TableHeader className="bg-zinc-100 dark:bg-gray-900">
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

                    <PermissionTableActions
                      module="payments"
                      onEdit={async () => {
                        fetchPaymetDetails(payment.id)
                      }}
                      onDelete={() => onDelete(payment.id)}
                    />

                  </TableCell>
                </TableRow>
              })}
            </TableBody>
          </Table>

          {/* error on emply list */}
          <EmptyList length={paymensList.data.length} message="No payments found" />

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

      {confirmationProps.isOpen && (
        <AlertModel
          cancel={() => confirmationProps.onCancel()}
          continue={() => confirmationProps.onConfirm()}
        />
      )}
    </section>
  )
}

export default PaymentsList