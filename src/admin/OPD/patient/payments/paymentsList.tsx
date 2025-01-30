import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { currencySymbol } from "@/helpers/currencySymbol"
import { Pencil, Plus, SearchX, Trash } from "lucide-react"
import { useEffect, useState } from "react"
import PaymentFormModel from "./paymentFormModel"
import toast from "react-hot-toast"
import { getPaymentsList } from "../../opdApiHandler"
import { useParams } from "react-router-dom"
import { PaymentType } from "@/types/type"
import { currencyFormat } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const PaymentsList = () => {

  const { caseId } = useParams()
  const [paymensList, setPaymentList] = useState<PaymentType[]>([])

  const [Model, setModel] = useState<{ paymentForm: boolean }>({
    paymentForm: false
  })

  const fetchPaymetsList = async () => {
    try {
      const data = await getPaymentsList(Number(caseId))
      setPaymentList(data)
    } catch ({ message }: any) {
      toast.error(message)
    }
  }


  function onSearch(value: any) {
    throw new Error("Function not implemented.")
  }


  useEffect(() => {
    fetchPaymetsList()
  }, [])

  return (
    <section className="flex flex-col gap-y-5">

      <div className="flex justify-between">
        <h1 className="text-lg text-gray-800 font-semibold">Payments</h1>
        <Button variant='outline' size='sm' onClick={() =>
          setModel((rest) => {
            return {
              ...rest,
              paymentForm: true
            }
          })
        }>
          <Plus /> Add Payment
        </Button>
      </div>

      <Separator />
      {/* search section */}
      <div className="sm:w-48 space-y-1">
        <p className="text-sm text-gray-700">Search by keyword</p>
        <Input type="text" onChange={(e) => { onSearch(e.target.value) }} placeholder="transaction id , date" />
      </div>

      <Separator />

      <Table>
        <TableHeader>
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
          {paymensList.map((payment, i) => {
            return <TableRow key={i}>
              <TableCell className="font-semibold">{payment.id}</TableCell>
              <TableCell >{payment.date}</TableCell>
              <TableCell >{payment.payment_mode}</TableCell>
              <TableCell >{currencyFormat(payment.amount)}</TableCell>
              <TableCell >{payment.note}</TableCell>
              <TableCell className="space-x-1">

                {/* Edit */}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Pencil className="w-4 cursor-pointer active:scale-90 text-gray-600" onClick={async () => {
                      }} />
                    </TooltipTrigger>
                    <TooltipContent>Edit</TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                {/* Delete */}

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Trash className="w-4 cursor-pointer active:scale-90 text-gray-600" onClick={async () => {
                      }} />
                    </TooltipTrigger>
                    <TooltipContent>Delete</TooltipContent>
                  </Tooltip>
                </TooltipProvider>

              </TableCell>
            </TableRow>
          })}
        </TableBody>
      </Table>


      {/* error on emply list */}

      {paymensList.length < 1 && <h1 className='text-gray-900 mt-4 sm:mt-1 font-semibold text-lg flex items-center gap-1'>No data found <SearchX className='h-5 w-5' /></h1>}

      {Model.paymentForm && (
        <PaymentFormModel
          onClick={() => {
            setModel((rest) => {
              return {
                ...rest,
                paymentForm: false
              }
            })
          }}
        />
      )}

    </section>
  )
}

export default PaymentsList