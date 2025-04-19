import AlertModel from "@/components/alertModel"
import CustomPagination from "@/components/customPagination"
import EmptyList from "@/components/emptyList"
import PermissionProtectedAction from "@/components/permission-protected-actions"
import ProtectedTable from "@/components/protected-table"
import TableActions from "@/components/table-actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { page_limit } from "@/globalData"
import { currencySymbol } from "@/helpers/currencySymbol"
import { currencyFormat } from "@/lib/utils"
import { Plus } from "lucide-react"
import { parseAsInteger, useQueryState } from "nuqs"
import { useEffect } from "react"
import { useDebouncedCallback } from 'use-debounce'
import PaymentFormModel from "../../../../components/form-modals/payment-form-modal"
import usePaymentHandlers from "@/pages/OPD/details/payments/payment-handlers"





const IpdPayments = () => {

  // Query params
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))
  const [search, setSearch] = useQueryState('search')

  const { payments, getPayments, current, setCurrent, onDelete, isPending, form, setForm, handleSubmit, confirmationProps } = usePaymentHandlers({ page, search, limit: page_limit })


  //useDebouncedCallback prevent unnecessary api calls
  const onSearch = useDebouncedCallback((search: string) => {
    search ? setSearch(search) : setSearch(null)
    setPage(1)
  }, 500)



  useEffect(() => {
    getPayments()
  }, [page, search])


  return (

    <section className="flex flex-col gap-y-5 pb-14">
      <div className="flex justify-between">
        <h1 className="text-lg text-gray-800 dark:text-gray-100 font-semibold">Payments</h1>
        <PermissionProtectedAction action='create' module='payments'>
          <Button size='sm' onClick={() => setForm(true)}>
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
          <ProtectedTable
            module="payments"
            renderTable={(show, canUpdate, canDelete) => (
              <Table className="rounded-lg border dark:border-gray-800">
                <TableHeader className="bg-zinc-100 dark:bg-gray-900">
                  <TableRow>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Payment Mode</TableHead>
                    <TableHead>Paid Amount {currencySymbol()}</TableHead>
                    <TableHead>Note</TableHead>
                    {show && <TableHead>Action</TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.data.map((payment, i) => {
                    return <TableRow key={i}>
                      <TableCell className="font-semibold">{payment.id}</TableCell>
                      <TableCell >{payment.date}</TableCell>
                      <TableCell >{payment.payment_mode}</TableCell>
                      <TableCell >{currencyFormat(payment.amount)}</TableCell>
                      <TableCell >{payment.note}</TableCell>
                      <TableActions
                        show={show}
                        canUpdate={canUpdate}
                        canDelete={canDelete}
                        onEdit={() => { setCurrent(payment); setForm(true) }}
                        onDelete={() => onDelete(payment.id)}
                      />
                    </TableRow>
                  })}
                </TableBody>
              </Table>
            )}
          />

          {/* error on emply list */}
          <EmptyList length={payments.data.length} message="No payments found" />

        </div>

        {/* pagination buttons */}
        <section>
          <CustomPagination
            total_pages={payments?.total_pages!}
            currentPage={page}
            previous={(p) => setPage(p)}
            goTo={(p) => setPage(p)}
            next={(p) => setPage(p)}
          />
        </section>
      </div>


      {/* Models */}

      {form && (
        <PaymentFormModel Submit={handleSubmit} isPending={isPending} paymentDetails={current!}
          onClick={() => { setForm(false); setCurrent(null) }}
        />
      )}


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




export default IpdPayments