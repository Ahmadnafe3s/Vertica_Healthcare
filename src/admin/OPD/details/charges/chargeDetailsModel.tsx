import Dialog from "@/components/Dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { currencySymbol } from "@/helpers/currencySymbol"
import { currencyFormat } from "@/lib/utils"
import { ChargeDetailsType } from "@/types/opd_section/charges"
import { CalendarDays } from "lucide-react"
import { HTMLAttributes } from "react"


interface ChargeDetailsModelProps extends HTMLAttributes<HTMLDivElement> {
    chargeDetails: ChargeDetailsType | undefined
}


const ChargeDetailsModel = ({ chargeDetails, ...props }: ChargeDetailsModelProps) => {

    return (
        <Dialog pageTitle="Charge Details" {...props}>
            <ScrollArea className={'relative h-[75vh] sm:h-[60vh] w-full'}>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 px-2.5 pb-14">

                    <div className="flex items-center gap-2 sm:col-span-2 mb-4">
                        <div className='p-3 bg-yellow-500 rounded-full'>
                            <CalendarDays className='w-10 h-10 text-white' />
                        </div>
                        <div className=''>
                            <p className='font-semibold text-lg text-gray-900 dark:text-gray-100'>{chargeDetails?.date}</p>
                            <p className='text-sm text-gray-500'>Charge Date</p>
                        </div>
                    </div>

                    <div className="sm:col-span-2 grid grid-cols-2 gap-2">

                        <div className='space-y-1 p-2 border-2 border-spacing-2 border-dashed border-gray-200 dark:border-gray-700 rounded-md'>
                            <p className='text-gray-700 dark:text-gray-400 text-sm'>Reference No.</p>
                            <p className='font-semibold'>{chargeDetails?.id}</p>
                        </div>

                        <div className='space-y-1 p-2 border-2 border-spacing-2 border-dashed border-gray-200 dark:border-gray-700 rounded-md'>
                            <p className='text-gray-700 dark:text-gray-400 text-sm'>Charge Name</p>
                            <p className='font-semibold'>{chargeDetails?.chargeNames.name}</p>
                        </div>

                    </div>

                    <div className='space-y-1 p-2  ring-1 ring-gray-200 dark:ring-gray-700 rounded-sm'>
                        <p className='text-gray-700 dark:text-gray-400'>Charge Type</p>
                        <p className='text-sm'>{chargeDetails?.chargeType.charge_type}</p>
                    </div>

                    <div className='space-y-1 p-2  ring-1 ring-gray-200 dark:ring-gray-700 rounded-sm'>
                        <p className='text-gray-700 dark:text-gray-400'>Charge Category</p>
                        <p className='text-sm'>{chargeDetails?.chargeCategory.category}</p>
                    </div>

                    <div className='space-y-1 p-2  ring-1 ring-gray-200 dark:ring-gray-700 rounded-sm'>
                        <p className='text-gray-700 dark:text-gray-400'>Standard Amount {currencySymbol()}</p>
                        <p className='text-sm'>{currencyFormat(Number(chargeDetails?.standard_charge))}</p>
                    </div>

                    <div className='space-y-1 p-2  ring-1 ring-gray-200 dark:ring-gray-700 rounded-sm'>
                        <p className='text-gray-700 dark:text-gray-400'>TPA Charge {currencySymbol()} </p>
                        <p className='text-sm'>{currencyFormat(Number(chargeDetails?.tpa))}</p>
                    </div>

                    <div className='space-y-1 p-2  ring-1 ring-gray-200 dark:ring-gray-700 rounded-sm'>
                        <p className='text-gray-700 dark:text-gray-400'>Total {currencySymbol()}</p>
                        <p className='text-sm'>{currencyFormat(Number(chargeDetails?.total))}</p>
                    </div>

                    <div className='space-y-1 p-2  ring-1 ring-gray-200 dark:ring-gray-700 rounded-sm'>
                        <p className='text-gray-700 dark:text-gray-400'>Tax %</p>
                        <p className='text-sm'>{chargeDetails?.tax} %</p>
                    </div>


                    <div className='space-y-1 p-2  ring-1 ring-gray-200 dark:ring-gray-700 rounded-sm'>
                        <p className='text-gray-700 dark:text-gray-400'>Discount</p>
                        <p className='text-sm'>{chargeDetails?.discount} %</p>
                    </div>

                    <div className='space-y-1 p-2  ring-1 ring-gray-200 dark:ring-gray-700 rounded-sm'>
                        <p className='text-gray-700 dark:text-gray-400'>Net Amount {currencySymbol()}</p>
                        <p className='text-sm'>{currencyFormat(Number(chargeDetails?.net_amount))}</p>
                    </div>
                </div>
            </ScrollArea>
        </Dialog>
    )
}


export default ChargeDetailsModel