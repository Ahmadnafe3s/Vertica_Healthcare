import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { currencyFormat } from '@/lib/utils'
import { Pencil, Plus, Trash } from 'lucide-react'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { useEffect, useState } from 'react'
import CustomTooltip from '@/components/customTooltip'
import LoaderModel from '@/components/loader'
import AlertModel from '@/components/alertModel'
import { useQueryState, parseAsInteger } from 'nuqs'
import CustomPagination from '@/components/customPagination'
import { useDebouncedCallback } from 'use-debounce'
import usePermission from '@/authz'
import { useConfirmation } from '@/hooks/useConfirmation'
import { Separator } from '@/components/ui/separator'
import EmptyList from '@/components/emptyList'
import { createRadiologyBillSchema } from '@/formSchemas/createRadiologyBill'
import { currencySymbol } from '@/helpers/currencySymbol'
import { createPathologyBill, deletePathologyBill, getPathologyBillDetails, getPathologyBills, updatePathologyBill } from './api-handlers'
import CreatePathologyBill from './create-pathology-bill'
import { PaginatedPathologyBills, PathologyBillDeatils } from '@/types/pathology/pathology'
import PathologyBillDetailsModal from './pathology-bill-details'




const PathologyBills = () => {

  // custom hooks
  const { loadPermission, hasPermission } = usePermission()
  const { confirm, confirmationProps } = useConfirmation()

  // query params
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))
  const [search, setSearch] = useQueryState('search')

  //model states
  const [model, setModel] = useState({ radiologyForm: false, billDetails: false })

  // loading states
  const [isLodaing, setLoading] = useState({ inline: false, model: false, })

  // API states
  const [bills, setBills] = useState<PaginatedPathologyBills>({ data: [], total_pages: 0 })
  const [pathBillDetails, setPathBillDetails] = useState<PathologyBillDeatils>()



  // list of bills
  const fetchRadiologyBills = async () => {
    try {
      // adjust limit accordingly
      const data = await getPathologyBills({ page, limit: 10, search: search! }) // here search only will have value when we will search anything
      setBills(data)
    } catch ({ message }: any) {
      toast.error(message)
    }
  }



  const onSearch = useDebouncedCallback((value: string) => {
    value ? (setSearch(value)) : setSearch(null)
    setPage(1)
  }, 400)


  // bill deatils
  const fetchRadiologyBillDetails = async (id: string) => {
    try {
      setLoading(prev => ({ ...prev, model: true }))
      const data = await getPathologyBillDetails(id)
      setPathBillDetails(data)
      console.log(data);

    } catch ({ message }: any) {
      toast.error(message)
    } finally {
      setLoading(prev => ({ ...prev, model: false }))
    }
  }


  // handling form data
  const handleSubmit = async (formData: z.infer<typeof createRadiologyBillSchema>) => {
    try {
      let data;
      setLoading(pre => ({ ...pre, inline: true }))
      pathBillDetails ? (
        data = await updatePathologyBill(pathBillDetails.id, formData),
        setPathBillDetails(undefined)
      )
        :
        (
          data = await createPathologyBill(formData)
        )
      toast.success(data.message)
      fetchRadiologyBills()
      setModel(prev => ({ ...prev, radiologyForm: false }))
    } catch ({ message }: any) {
      toast.error(message)
    } finally {
      setLoading(pre => ({ ...pre, inline: false }))
    }
  }


  // deleting a particular bill
  const onDelete = async (id: string) => {
    try {
      const isConfirm = await confirm()
      if (!isConfirm) return null
      const data = await deletePathologyBill(id)
      toast.success(data.message)
      fetchRadiologyBills()
    } catch ({ message }: any) {
      toast.error(message)
    }
  }


  useEffect(() => {
    fetchRadiologyBills()
    loadPermission()
  }, [page, search])



  return (
    <>
      <div className='my-2 flex flex-col'>

        {/* top bar */}
        <div className='flex py-3 flex-col md:flex-row gap-y-2 md:items-center md:justify-between'>
          <h1 className='font-semibold tracking-tight'>Pathology Bill</h1>
          <div className='flex gap-x-2 overflow-x-auto'>

            {hasPermission('create', 'pathology_bill') && (
              <Button
                size={'sm'}
                onClick={() => setModel(prev => ({ ...prev, radiologyForm: true }))}
              > <Plus /> Generate Bill</Button>
            )}

          </div>
        </div>

        <Separator />

        {/* search bar */}

        <div className='flex py-3 flex-col md:flex-row gap-y-4 md:items-center md:justify-between'>

          <div className='flex gap-x-2'>
            <Input type='text' height='10px' placeholder='Bill No. , Date , Patient' onChange={(e) => { onSearch(e.target.value) }} defaultValue={search!} />
          </div>

          {/* radiology bills */}
          <div className='flex gap-x-2'>

          </div>
        </div>

        <Separator />


        <div className="flex flex-col pb-16 gap-y-10 min-h-[80vh]">
          <div className="flex-1 space-y-3">
            <Table className='border rounded-lg my-10 dark:border-gray-800'>
              <TableHeader className='bg-slate-100 dark:bg-gray-900'>
                <TableRow>
                  <TableHead>Bill No.</TableHead>
                  <TableHead>Invoice Date</TableHead>
                  <TableHead>OPD ID</TableHead>
                  <TableHead>Patient Name</TableHead>
                  <TableHead>Doctor Name</TableHead>
                  <TableHead>Discount%</TableHead>
                  <TableHead>Net Amount {currencySymbol()}</TableHead>
                  <TableHead>Payment Mode</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {bills.data.map((bill) => (
                  <TableRow key={bill.id}>
                    <TableCell
                      className='text-blue-500 hover:text-blue-400 cursor-pointer font-medium'
                      onClick={async () => {
                        await fetchRadiologyBillDetails(bill.id)
                        setModel(prev => ({ ...prev, billDetails: true }))
                      }}
                    >{bill.id}
                    </TableCell>
                    <TableCell>{bill.date}</TableCell>
                    <TableCell>{bill.opdId}</TableCell>
                    <TableCell>{bill.patient.name}</TableCell>
                    <TableCell>{bill.doctor}</TableCell>
                    <TableCell>{bill.discount} %</TableCell>
                    <TableCell>{currencyFormat(bill.net_amount)}</TableCell>
                    <TableCell>{bill.payment_mode}</TableCell>
                    <TableCell className='flex space-x-2'>

                      {/* EDIT  */}
                      {hasPermission('update', 'pathology_bill') && (
                        <CustomTooltip message='EDIT'>
                          <Pencil className="w-4 cursor-pointer dark:text-gray-300 text-gray-600" onClick={async () => {
                            await fetchRadiologyBillDetails(bill.id)
                            setModel(prev => ({ ...prev, radiologyForm: true }))
                          }} />
                        </CustomTooltip>
                      )}

                      {/* DELETE  */}
                      {hasPermission('delete', 'pathology_bill') && (
                        <CustomTooltip message='DELETE'>
                          <Trash className="w-4 cursor-pointer dark:text-gray-300 text-gray-600" onClick={() => onDelete(bill.id)} />
                        </CustomTooltip>
                      )}

                      {/* Print Bill */}

                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <EmptyList length={bills.data.length} message='No bills found' />
          </div>

          {/* pagination buttons */}

          <section>
            <CustomPagination
              total_pages={bills?.total_pages!}
              currentPage={page}
              next={(p) => setPage(p)}
              goTo={(p) => setPage(p)}
              previous={(p) => setPage(p)}
            />
          </section>
        </div>
      </div >


      {/* Models */}

      {
        model.radiologyForm && (
          < CreatePathologyBill
            Submit={handleSubmit}
            isPending={isLodaing.inline}
            editDetails={pathBillDetails!}
            onClick={() => { setModel(prev => ({ ...prev, radiologyForm: false })); setPathBillDetails(undefined) }}
          />
        )
      }


      {/*  */}

      {model.billDetails && (
        <PathologyBillDetailsModal
          details={pathBillDetails!}
          onClick={() => {
            setModel(prev => ({ ...prev, billDetails: false }));
            setPathBillDetails(undefined);
          }}
        />
      )}

      {isLodaing.model && <LoaderModel />}

      {
        confirmationProps.isOpen && (
          <AlertModel
            continue={() => confirmationProps.onConfirm()}
            cancel={() => confirmationProps.onCancel()}
          />
        )
      }
    </>

  )
}






export default PathologyBills