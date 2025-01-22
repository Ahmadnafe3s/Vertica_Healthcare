import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { ScrollArea } from '@/components/ui/scroll-area'
import { MedicinePurchaseDetails } from '@/types/type'
import { Receipt, X } from 'lucide-react'
import { HTMLAttributes, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { getPurchaseDetails } from './pharmacyApiHandler'
import { currencyFormat } from '@/lib/utils'


interface PurchaseMedicineDetailsModelProps extends HTMLAttributes<HTMLDivElement> {
    ID: number
}



const PurchaseMedicineDetailsModel = ({ ID, ...props }: PurchaseMedicineDetailsModelProps) => {

    const [purchaseDetails, setPurchaseDetails] = useState<MedicinePurchaseDetails>()

    useEffect(() => {
        try {
            (async function fetchData() {
                const data = await getPurchaseDetails(ID)
                setPurchaseDetails(data)
            })()

        } catch ({ message }: any) {
            toast.error(message)
        }
    }, [])


    return (
        <>
            <div {...props} className='fixed top-0 left-0 h-screen w-full transition-all z-[120]' style={{ background: '#0000009c' }}></div>

            <MaxWidthWrapper className='fixed h-auto top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] z-[200] '>

                <div className='bg-white rounded-lg'>

                    {/* hearder */}

                    <div className='flex justify-between bg-zinc-200 items-center p-2 rounded-t-lg'>

                        <h1 className=' text-xl font-semibold '>Medicine Details</h1>

                        <div className='flex gap-x-4'>
                            <div {...props}>
                                <X className='cursor-pointer  active:scale-95 w-5' />
                            </div>
                        </div>

                    </div>

                    <ScrollArea className='relative pt-3 h-[75vh] sm:h-[60vh] w-full'>

                        <div className="grid lg:grid-cols-4 gap-y-3 pt-3 px-2.5 pb-14">

                            {/* medicine name and icon col-span-2 */}

                            <div className="flex items-center gap-2 lg:col-span-2">
                                <div className='p-3 bg-red-500 rounded-full'>
                                    <Receipt className='w-10 h-10 text-white' />
                                </div>
                                <div>
                                    <h1 className='font-semibold text-lg text-gray-900'>{purchaseDetails?.purchase_date}</h1>
                                    <p className='text-sm text-gray-500'>Purchase Date</p>
                                </div>
                            </div>

                            {/* highlights col-span-2*/}

                            <div className='grid sm:grid-cols-4 grid-cols-2 gap-3 lg:col-span-2'>

                                <div className='space-y-1 bg-white p-2 border-2 border-spacing-2 border-dashed border-gray-200 rounded-md'>
                                    <p className='text-gray-700'>Purchase No</p>
                                    <p className='font-semibold'>{purchaseDetails?.id}</p>
                                </div>

                                <div className='space-y-1 bg-white p-2 border-2 border-spacing-2 border-dashed border-gray-200 rounded-md'>
                                    <p className='text-gray-700'>Expiry Date</p>
                                    <p className='font-semibold'>{purchaseDetails?.expiry_date}</p>
                                </div>

                                <div className='space-y-1 bg-white p-2 border-2 border-spacing-2 border-dashed border-gray-200 rounded-md'>
                                    <p className='text-gray-700'>Supplier Name</p>
                                    <p className='font-semibold'>{purchaseDetails?.supplier_name}</p>
                                </div>

                                <div className='space-y-1 bg-white p-2 border-2 border-spacing-2 border-dashed border-gray-200 rounded-md'>
                                    <p className='text-gray-700'>Category</p>
                                    <p className='font-semibold'>{purchaseDetails?.category}</p>
                                </div>

                            </div>


                            {/* other highlight col-span-full */}

                            <div className="col-span-full grid sm:grid-cols-2 lg:grid-cols-3 p-0.5 gap-2">

                                <div className='space-y-1 bg-white p-2  ring-1 ring-gray-200'>
                                    <p className='text-gray-700'>Medicine Name</p>
                                    <p className='font-semibold'>{purchaseDetails?.medicine.name}</p>
                                </div>

                                <div className='space-y-1 bg-white p-2  ring-1 ring-gray-200'>
                                    <p className='text-gray-700'>Medicine Group</p>
                                    <p className='font-semibold'>{purchaseDetails?.medicine.group}</p>
                                </div>

                                <div className='space-y-1 bg-white p-2  ring-1 ring-gray-200'>
                                    <p className='text-gray-700'>Batch No.</p>
                                    <p className='font-semibold'>{purchaseDetails?.batch_no}</p>
                                </div>

                                <div className='space-y-1 bg-white p-2  ring-1 ring-gray-200'>
                                    <p className='text-gray-700'>MRP</p>
                                    <p className='font-semibold'>{currencyFormat(Number(purchaseDetails?.MRP))}</p>
                                </div>

                                <div className='space-y-1 bg-white p-2  ring-1 ring-gray-200'>
                                    <p className='text-gray-700'>Sale Price</p>
                                    <p className='font-semibold'>{currencyFormat(Number(purchaseDetails?.sale_price))}</p>
                                </div>

                                <div className='space-y-1 bg-white p-2  ring-1 ring-gray-200'>
                                    <p className='text-gray-700'>Packing Quantity</p>
                                    <p className='font-semibold'>{purchaseDetails?.packing_quantity}</p>
                                </div>

                                <div className='space-y-1 bg-white p-2  ring-1 ring-gray-200'>
                                    <p className='text-gray-700'>Quantity</p>
                                    <p className='font-semibold'>{purchaseDetails?.quantity}</p>
                                </div>

                                <div className='space-y-1 bg-white p-2  ring-1 ring-gray-200'>
                                    <p className='text-gray-700'>Purchase Price</p>
                                    <p className='font-semibold'>{currencyFormat(Number(purchaseDetails?.purchase_price))}</p>
                                </div>

                                <div className='space-y-1 bg-white p-2  ring-1 ring-gray-200'>
                                    <p className='text-gray-700'>Amount</p>
                                    <p className='font-semibold'>{currencyFormat(Number(purchaseDetails?.amount))}</p>
                                </div>

                                <div className='space-y-1 bg-white p-2  ring-1 ring-gray-200'>
                                    <p className='text-gray-700'>Tax</p>
                                    <p className='font-semibold'>{purchaseDetails?.tax}</p>
                                </div>

                                <div className='space-y-1 bg-white p-2  ring-1 ring-gray-200'>
                                    <p className='text-gray-700'>Discount</p>
                                    <p className='font-semibold'>{purchaseDetails?.discount}</p>
                                </div>

                                <div className='space-y-1 bg-white p-2  ring-1 ring-gray-200'>
                                    <p className='text-gray-700'>Net Amount</p>
                                    <p className='font-semibold'>{currencyFormat(Number(purchaseDetails?.total_amount))}</p>
                                </div>

                                <div className='space-y-1 bg-white p-2  ring-1 ring-gray-200'>
                                    <p className='text-gray-700'>Payment Mode</p>
                                    <p className='font-semibold'>{purchaseDetails?.payment_mode}</p>
                                </div>

                                <div className='space-y-1 bg-white p-2  ring-1 ring-gray-200'>
                                    <p className='text-gray-700'>Note</p>
                                    <p className='font-semibold'>{purchaseDetails?.note}</p>
                                </div>

                            </div>

                        </div>

                        <div className="h-14 bg-gradient-to-t from-white z-30 w-full absolute bottom-0" />
                    </ScrollArea>
                </div>
            </MaxWidthWrapper>



        </>
    )
}

export default PurchaseMedicineDetailsModel