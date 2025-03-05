import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { currencyFormat } from '@/lib/utils'
import { FileText, Plus, Printer, SearchX, Trash } from 'lucide-react'
import toast from 'react-hot-toast'
import { createPurchase, deletePurchaseMedicine, getPurchaseDetails, getPurchaseList } from '../pharmacyApiHandler'
import { useEffect, useRef, useState } from 'react'
import { currencySymbol } from '@/helpers/currencySymbol'
import { PurchaseMedicineFormSchema } from '@/formSchemas/purchaseMedicineFormSchema'
import { z } from 'zod'
import { medicinePurchaseDetails, medicinePurchases } from '@/types/opd_section/purchaseMedicine'
import CustomPagination from '@/components/customPagination'
import AlertModel from '@/components/alertModel'
import LoaderModel from '@/components/loader'
import CustomTooltip from '@/components/customTooltip'
import PurchaseMedicineDetailsModel from './purchaseMedicineDetailsModel'
import PurchaseMedicineForm from './purchaseMedicine'
import { useDebouncedCallback } from 'use-debounce'
import { useQueryState, parseAsInteger } from 'nuqs'
import PrintMedicinePurchase from './printPurchase/printPurchase'
import PrintMedicinePurchases from './printPurchase/printPurchases'




const Purchase = () => {

  // query params
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))
  const [search, setSearch] = useQueryState('search')


  // credential
  const itemID = useRef('')

  // loading state
  const [loading, setLoading] = useState<{ inline: boolean, model: boolean }>({
    inline: false,
    model: false
  })


  // API state
  const [purcahseList, setPurchaseList] = useState<medicinePurchases>({ data: [], total_pages: 0 })
  const [purchaseDetails, setPurchaseDetails] = useState<medicinePurchaseDetails>()


  // Model State
  const [model, setModel] = useState<{ purchaseDetails: boolean, createPurchaseForm: boolean, alert: boolean }>({
    purchaseDetails: false,
    createPurchaseForm: false,
    alert: false
  })


  // performing only insert
  const handleSubmit = async (formData: z.infer<typeof PurchaseMedicineFormSchema>) => {
    try {
      const data = await createPurchase(formData)
      toast.success(data.message)
      fetchPurchases()
      setModel(rest => ({ ...rest, createPurchaseForm: false }))
    } catch ({ message }: any) {
      toast.error(message)
    }
  }


  // just passing queries

  const onSearch = useDebouncedCallback(async (value: string) => {
    value ? setSearch(value) : setSearch(null)
    setPage(1)
  }, 400)


  const fetchPurchases = async () => {
    try {
      const data = await getPurchaseList({
        page,
        limit: 10,
        search: search! // dont have to use string object otherwise null will become string
      })
      setPurchaseList(data)
    } catch ({ message }: any) {
      toast.error(message)
    }
  }


  //deleting
  const onDelete = async () => {
    try {
      setLoading(rest => ({ ...rest, inline: true }))
      const data = await deletePurchaseMedicine(itemID.current)
      toast.success(data.message)
      fetchPurchases()
    } catch ({ message }: any) {
      toast.error(message)
    } finally {
      setModel(rest => ({ ...rest, alert: false }))
      setLoading(rest => ({ ...rest, inline: false }))
    }
  }


  const fetchPurchaseDetails = async (id: string) => {
    try {
      setLoading(rest => ({ ...rest, model: true }))
      const data = await getPurchaseDetails(id)
      setPurchaseDetails(data)
    } catch ({ message }: any) {
      toast.success(message)
    } finally {
      setLoading(rest => ({ ...rest, model: false }))
    }
  }


  useEffect(() => {
    fetchPurchases()
  }, [page, search])



  return (
    <>
      <div className='my-2 flex flex-col'>

        {/* top bar */}
        <div className='flex py-3 flex-col md:flex-row gap-y-2 md:items-center md:justify-between border-b border-gray-200'>
          <h1 className='font-semibold tracking-tight'>Medicine Purchases</h1>
          <div className='flex gap-x-2 overflow-x-auto'>

            <Button className='flex gap-x-1' size={'sm'}
              onClick={() => setModel(rest => ({ ...rest, createPurchaseForm: true }))}>
              <Plus />
              Add Purchase
            </Button>

          </div>
        </div>

        {/* search bar */}

        <div className='flex py-3 flex-col md:flex-row gap-y-4 md:items-center md:justify-between border-b border-gray-200'>

          <div className='flex gap-x-2'>
            <Input type='text' height='10px' placeholder='search' onChange={(e) => onSearch(e.target.value)} defaultValue={search!} />
          </div>

          <div className='flex gap-x-2'>
            {/* Printing purcahse list */}

            <PrintMedicinePurchases MedicinePurchases={purcahseList['data']} />
          </div>
        </div>


        {/* Paginated layout */}

        <div className="flex flex-col space-y-5 min-h-[75vh] mb-20">
          <div className='flex-1'>
            <Table className="rounded-lg border my-10">
              <TableHeader className='bg-zinc-100'>
                <TableRow>
                  <TableHead>Purchase No.</TableHead>
                  <TableHead>Medicine Name</TableHead>
                  <TableHead>Purchase Date</TableHead>
                  <TableHead>Expiry Date</TableHead>
                  <TableHead>Supplier Name</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Total {currencySymbol()}</TableHead>
                  <TableHead>Tax</TableHead>
                  <TableHead>Discount</TableHead>
                  <TableHead>Net Amount {currencySymbol()}</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {purcahseList?.data.map((purchase) => (
                  <TableRow key={purchase.id as any} >
                    <TableCell className="font-medium cursor-pointer text-blue-500 hover:text-blue-400"
                      onClick={async () => {
                        await fetchPurchaseDetails(purchase.id)
                        setModel(rest => ({ ...rest, purchaseDetails: true }))
                      }}
                    >
                      {purchase.id}
                    </TableCell>
                    <TableCell>{purchase.medicine.name}</TableCell>
                    <TableCell>{purchase.purchase_date}</TableCell>
                    <TableCell>{purchase.expiry_date}</TableCell>
                    <TableCell>
                      {purchase.supplier_name}
                    </TableCell>
                    <TableCell>{purchase.quantity}</TableCell>
                    <TableCell>{currencyFormat(purchase.amount)}</TableCell>
                    <TableCell>{purchase.tax}%</TableCell>
                    <TableCell>{purchase.discount}%</TableCell>
                    <TableCell className='text-gray-700 font-semibold'>{currencyFormat(purchase.total_amount)}</TableCell>
                    <TableCell className='flex gap-2'>
                      {/* Delete */}
                      <CustomTooltip message='DELETE'>
                        <Trash className='cursor-pointer text-gray-500 w-4  active:scale-95'
                          onClick={() => {
                            itemID.current = purchase.id;
                            setModel((rest) => ({ ...rest, alert: true }))
                          }}
                        />
                      </CustomTooltip>

                      {/* Print purchase Details */}
                      <PrintMedicinePurchase Id={purchase.id} onPending={(v) => setLoading({ ...loading, model: v })} />

                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>



            {/* if no data will be recive */}

            {purcahseList?.data.length! < 1 && <h1 className='text-gray-900 mt-4 sm:mt-1 font-semibold text-lg flex items-center gap-1'>No data found <SearchX className='h-5 w-5' /></h1>}
          </div>

          <section>
            <CustomPagination
              total_pages={purcahseList?.total_pages!}
              currentPage={page}
              next={(p) => setPage(p)}
              goTo={(p) => setPage(p)}
              previous={(p) => setPage(p)}
            />
          </section>
        </div>



        {/* Model */}

        {model.createPurchaseForm && (
          <PurchaseMedicineForm
            Submit={handleSubmit}
            isPending={loading.inline}
            onClick={() => setModel(rest => ({ ...rest, createPurchaseForm: false }))}
          />
        )}


        {model.alert && (
          <AlertModel
            continue={onDelete}
            cancel={() => setModel(rest => ({ ...rest, alert: false }))}
            isPending={loading.inline}
          />
        )}


        {loading.model && (<LoaderModel />)}

        {/* details model */}

        {model.purchaseDetails && <PurchaseMedicineDetailsModel
          purchaseDetails={purchaseDetails!}
          onClick={() => {
            setModel((rest => ({ ...rest, purchaseDetails: false })))
          }}
        />}

      </div >
    </>

  )
}

export default Purchase

