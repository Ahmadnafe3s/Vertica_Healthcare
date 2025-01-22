import { buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { currencyFormat } from '@/lib/utils'
import { Eye, FileText, Plus, Printer, SearchX } from 'lucide-react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { getPurchaseList } from './pharmacyApiHandler'
import { useEffect, useRef, useState } from 'react'
import { MedicinePurchaseList } from '@/types/type'
import PurchaseMedicineDetailsModel from './purchaseMedicineDetailsModel'
import { symbolForHeaders } from '@/helpers/symbolForHeaders'

const Purchase = () => {

  const [purcahseList, setPurchaseList] = useState<MedicinePurchaseList[]>([])

  const [model, setModel] = useState<{ purchaseDetails: boolean }>({
    purchaseDetails: false
  })

  const id = useRef<number | undefined>(undefined)

  const fetchPurchaseList = async () => {
    try {

      const data = await getPurchaseList()
      setPurchaseList(data)

    } catch ({ message }: any) {
      toast.error(message)
    }
  }


  useEffect(() => {
    console.log('hello');

    fetchPurchaseList()
  }, [])



  return (
    <>
      <div className='my-2 flex flex-col'>

        {/* top bar */}
        <div className='flex py-3 flex-col md:flex-row gap-y-2 md:items-center md:justify-between border-b border-gray-200'>
          <h1 className='font-semibold tracking-tight'>Medicine Purchase List</h1>
          <div className='flex gap-x-2 overflow-x-auto'>

            <Link to={'../createPurchase'} className={buttonVariants({
              variant: 'outline',
              size: 'sm',
              className: 'flex gap-x-1'
            })}>
              <Plus />
              Purchase Medicine
            </Link>

          </div>
        </div>

        {/* search bar */}

        <div className='flex py-3 flex-col md:flex-row gap-y-4 md:items-center md:justify-between border-b border-gray-200'>

          <div className='flex gap-x-2'>
            <Input type='text' height='10px' placeholder='search' />
          </div>

          <div className='flex gap-x-2'>

            <FileText className='cursor-pointer text-gray-600' />
            <Printer className='cursor-pointer text-gray-600' />

          </div>
        </div>


        <Table className='my-10'>

          <TableHeader>
            <TableRow>
              <TableHead>Purchase No.</TableHead>
              <TableHead>Medicine Name</TableHead>
              <TableHead>Purchase Date</TableHead>
              <TableHead>Supplier Name</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Total{symbolForHeaders()}</TableHead>
              <TableHead>Tax</TableHead>
              <TableHead>Discount</TableHead>
              <TableHead>Net Amount{symbolForHeaders()}</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {purcahseList.map((purchase, i) => {
              return <TableRow key={i} >
                <TableCell className="font-medium">{purchase.id}</TableCell>
                <TableCell>{purchase.medicine.name}</TableCell>
                <TableCell>{purchase.purchase_date}</TableCell>
                <TableCell>{purchase.supplier_name}</TableCell>
                <TableCell>{purchase.quantity}</TableCell>
                <TableCell>{currencyFormat(purchase.amount)}</TableCell>
                <TableCell>{purchase.tax}%</TableCell>
                <TableCell>{purchase.discount}%</TableCell>
                <TableCell className='text-gray-700 font-semibold'>{currencyFormat(purchase.total_amount)}</TableCell>
                <TableCell className='flex gap-2'>
                  <Eye className='cursor-pointer text-gray-500 w-4  active:scale-95'
                    onClick={() => {
                      id.current = purchase.id;
                      setModel((rest) => {
                        return {
                          ...rest,
                          purchaseDetails: true
                        }
                      })
                    }}
                  />
                </TableCell>
              </TableRow>
            })}
          </TableBody>

        </Table>

        {/* if no data will be recive */}

        {purcahseList.length < 1 && <h1 className='text-gray-900 mt-4 sm:mt-1 font-semibold text-lg flex items-center gap-1'>No data found <SearchX className='h-5 w-5' /></h1>}

        {/* Model */}

        {model.purchaseDetails && <PurchaseMedicineDetailsModel ID={Number(id.current)}
          onClick={() => {
            setModel((rest) => {
              return {
                ...rest,
                purchaseDetails: false
              }
            });
            id.current = undefined
          }}
        />}

      </div>
    </>

  )
}

export default Purchase

