import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import { ScrollArea } from "@/components/ui/scroll-area"
import { currencySymbol } from "@/helpers/currencySymbol"
import { currencyFormat } from "@/lib/utils"
import { ChargeDetails } from "@/types/type"
import { CalendarDays, X } from "lucide-react"
import { HTMLAttributes } from "react"


interface ChargeDetailsModelProps extends HTMLAttributes<HTMLDivElement> {
    chargeDetails: ChargeDetails | undefined
}


const ChargeDetailsModel = ({ chargeDetails, ...props }: ChargeDetailsModelProps) => {

    return (
        <>
            <div {...props} className='fixed top-0 left-0 h-screen w-full transition-all z-[120]' style={{ background: '#0000009c' }}></div>

            <MaxWidthWrapper className='fixed h-auto top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] z-[200] '>

                <div className='bg-white rounded-lg pb-2'>

                    {/* hearder */}

                    <div className='flex justify-between items-center p-3 border-b border-gray-200'>

                        <h1 className=' text-sm sm:text-lg font-semibold text-white bg-primary py-1 px-4 rounded-xl'>Operation Details</h1>

                        <div className='flex gap-x-4'>
                            <div {...props}>
                                <X className='cursor-pointer  active:scale-95 w-5' />
                            </div>
                        </div>

                    </div>

                    <ScrollArea className='relative pt-3 h-[75vh] sm:h-[60vh] w-full'>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 px-2.5 pb-14">

                            <div className="flex items-center gap-2 sm:col-span-2 mb-4">
                                <div className='p-3 bg-yellow-500 rounded-full'>
                                    <CalendarDays className='w-10 h-10 text-white' />
                                </div>
                                <div className=''>
                                    <p className='font-semibold text-lg text-gray-900'>{chargeDetails?.date}</p>
                                    <p className='text-sm text-gray-500'>Charge Date</p>
                                </div>
                            </div>

                            <div className="sm:col-span-2 grid grid-cols-2 gap-2">

                                <div className='space-y-1 bg-white p-2 border-2 border-spacing-2 border-dashed border-gray-200 rounded-md'>
                                    <p className='text-gray-700 text-sm'>Reference No.</p>
                                    <p className='font-semibold'>{chargeDetails?.id}</p>
                                </div>

                                <div className='space-y-1 bg-white p-2 border-2 border-spacing-2 border-dashed border-gray-200 rounded-md'>
                                    <p className='text-gray-700 text-sm'>Charge Name</p>
                                    <p className='font-semibold'>{chargeDetails?.name}</p>
                                </div>

                            </div>

                            <div className='space-y-1 bg-white p-2  ring-1 ring-gray-200 rounded-sm'>
                                <p className='text-gray-700'>Charge Type</p>
                                <p className='text-sm'>{chargeDetails?.charge_type}</p>
                            </div>

                            <div className='space-y-1 bg-white p-2  ring-1 ring-gray-200 rounded-sm'>
                                <p className='text-gray-700'>Charge Category</p>
                                <p className='text-sm'>{chargeDetails?.category}</p>
                            </div>

                            <div className='space-y-1 bg-white p-2  ring-1 ring-gray-200 rounded-sm'>
                                <p className='text-gray-700'>Standard Amount {currencySymbol()}</p>
                                <p className='text-sm'>{currencyFormat(Number(chargeDetails?.amount))}</p>
                            </div>

                            <div className='space-y-1 bg-white p-2  ring-1 ring-gray-200 rounded-sm'>
                                <p className='text-gray-700'>TPA Charge {currencySymbol()} </p>
                                <p className='text-sm'>{currencyFormat(Number(chargeDetails?.tpa))}</p>
                            </div>

                            <div className='space-y-1 bg-white p-2  ring-1 ring-gray-200 rounded-sm'>
                                <p className='text-gray-700'>Total {currencySymbol()}</p>
                                <p className='text-sm'>{currencyFormat(Number(chargeDetails?.total))}</p>
                            </div>

                            <div className='space-y-1 bg-white p-2  ring-1 ring-gray-200 rounded-sm'>
                                <p className='text-gray-700'>Tax %</p>
                                <p className='text-sm'>{chargeDetails?.tax} %</p>
                            </div>


                            <div className='space-y-1 bg-white p-2  ring-1 ring-gray-200 rounded-sm'>
                                <p className='text-gray-700'>Discount</p>
                                <p className='text-sm'>{chargeDetails?.discount} %</p>
                            </div>

                            <div className='space-y-1 bg-white p-2  ring-1 ring-gray-200 rounded-sm'>
                                <p className='text-gray-700'>Net Amount {currencySymbol()}</p>
                                <p className='text-sm'>{currencyFormat(Number(chargeDetails?.net_amount))}</p>
                            </div>

                        </div>


                        <div className="h-14 bg-gradient-to-t from-white z-30 w-full absolute bottom-0" />
                    </ScrollArea>
                </div >
            </MaxWidthWrapper >



        </>
    )
}


export default ChargeDetailsModel