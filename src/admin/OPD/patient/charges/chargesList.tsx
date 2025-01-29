
import { useEffect, useRef, useState } from "react"
import ChargeFormModel from "./chargeFormModel"
import { Button } from "@/components/ui/button"
import { Pencil, Plus, SearchX, Trash } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { currencySymbol } from "@/helpers/currencySymbol"
import toast from "react-hot-toast"
import { deleteCharge, getChargesList } from "../../opdApiHandler"
import { useParams } from "react-router-dom"
import { ChargeListType } from "@/types/type"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import AlertModel from "@/components/alertModel"
import { currencyFormat } from "@/lib/utils"
import ChargeDetailsModel from "./chargeDetailsModel"

const CahrgesList = () => {

  const id = useRef<number | null>(null)
  const { caseId } = useParams()
  const [CHARGES, SET_CHARGES] = useState<ChargeListType[]>([])

  const [MODEL, SET_MODEL] = useState<{ chargeForm: boolean, alert: boolean, chargeDetails: boolean }>({
    chargeForm: false,
    alert: false,
    chargeDetails: false
  })


  const fetchChargeList = async () => {
    try {
      const data = await getChargesList(Number(caseId))
      SET_CHARGES(data)
    } catch ({ message }: any) {
      toast.error(message)
    }
  }


  const onDelete = async () => {
    try {
      const data = await deleteCharge(Number(id.current))
      toast.success(data.message)
      // refetching list
      fetchChargeList()
    } catch ({ message }: any) {
      toast.error(message)
    } finally {
      SET_MODEL((rest) => {
        return {
          ...rest,
          alert: false
        }
      });
      id.current = null
    }
  }


  useEffect(() => {
    fetchChargeList()
  }, [])

  return (
    <section className="flex flex-col gap-y-5">

      <div className="flex justify-between">
        <h1 className="text-lg text-gray-800 font-semibold">Charges</h1>
        <Button variant='outline' size='sm' onClick={() => SET_MODEL((rest) => {
          return {
            ...rest,
            chargeForm: true
          }
        })}>
          <Plus /> Add Charge
        </Button>
      </div>


      <Table>
        <TableHeader>
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
          {CHARGES.map((charge, i) => {
            return <TableRow key={i}>
              <TableCell>{charge.date}</TableCell>
              {/* to view details model */}
              <TableCell className="text-blue-500 cursor-pointer hover:text-blue-400 font-semibold" onClick={() => {
                SET_MODEL((rest) => {
                  return {
                    ...rest,
                    chargeDetails: true
                  }
                });
                id.current = charge.id
              }} >
                {charge.name}
              </TableCell>
              <TableCell>{charge.charge_type}</TableCell>
              <TableCell>{currencyFormat(charge.amount)}</TableCell>
              <TableCell>{currencyFormat(charge.tpa)}</TableCell>
              <TableCell>{currencyFormat(charge.net_amount)}</TableCell>
              <TableCell className="space-x-2">

                {/* EDIT  */}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Pencil className="w-4 cursor-pointer text-gray-600" onClick={() => {
                        SET_MODEL((rest) => {
                          return {
                            ...rest,
                            chargeForm: true
                          }
                        });
                        id.current = charge.id
                      }} />
                    </TooltipTrigger>
                    <TooltipContent>Edit</TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                {/* DELETE */}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Trash className="w-4 cursor-pointer text-gray-600" onClick={() => {
                        SET_MODEL((rest) => {
                          return {
                            ...rest,
                            alert: true
                          }
                        });
                        id.current = charge.id
                      }} />
                    </TooltipTrigger>
                    <TooltipContent>Edit</TooltipContent>
                  </Tooltip>
                </TooltipProvider>

              </TableCell>
            </TableRow>
          })}
        </TableBody>
      </Table>


      {CHARGES.length < 1 && <h1 className='text-gray-900 mt-4 sm:mt-1 font-semibold text-lg flex items-center gap-1'>No data found <SearchX className='h-5 w-5' /></h1>}

      {/* MODEL */}

      {MODEL.chargeForm && <ChargeFormModel ID={Number(id.current)}
        onClick={() => {
          SET_MODEL((rest) => {
            return {
              ...rest,
              chargeForm: false
            }
          });
          fetchChargeList();
          id.current = null
        }}
      />}


      {/* Alert Model */}

      {MODEL.alert && <AlertModel
        cancel={() => {
          SET_MODEL((rest) => {
            return {
              ...rest,
              alert: false
            }
          });
          id.current = null
        }}

        continue={onDelete}
      />}



      {/* Details Model */}

      {MODEL.chargeDetails && <ChargeDetailsModel />}

    </section>
  )
}

export default CahrgesList