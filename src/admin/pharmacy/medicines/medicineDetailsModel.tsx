import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Pill, X } from 'lucide-react'
import { HTMLAttributes } from 'react'
import { medicineDetails } from '@/types/pharmacy/pharmacy'
import Dialog from '@/components/Dialog'


interface MedicineDetailsModelProps extends HTMLAttributes<HTMLDivElement> {
    medicineDetails: medicineDetails
}



const MedicineDetailsModel = ({ medicineDetails, ...props }: MedicineDetailsModelProps) => {


    return (
        <Dialog pageTitle='Medicine Details' {...props}>
            <ScrollArea className='relative pt-3 h-[75vh] sm:h-[60vh] w-full'>

                <div className="grid lg:grid-cols-4 gap-y-3 pt-3 px-2.5 pb-10">

                    {/* medicine name and icon col-span-2 */}

                    <div className="flex items-center gap-2 lg:col-span-2">
                        <div className='p-3 bg-green-500 rounded-full'>
                            <Pill className='w-10 h-10 text-white' />
                        </div>
                        <div>
                            <h1 className='font-semibold text-lg text-gray-900 dark:text-gray-100'>{medicineDetails?.name}</h1>
                            <p className='text-sm text-gray-400'>{medicineDetails?.group.name}</p>
                        </div>
                    </div>

                    {/* highlights col-span-2*/}

                    <div className='grid sm:grid-cols-4 grid-cols-2 gap-3 lg:col-span-2'>

                        <div className='space-y-1 p-2 border-2 border-spacing-2 border-dashed border-gray-200 dark:border-gray-700 rounded-md'>
                            <p className='text-gray-700 dark:text-gray-400'>Medicine ID</p>
                            <p className='font-semibold'>{medicineDetails?.id}</p>
                        </div>

                        <div className='space-y-1 p-2 border-2 border-spacing-2 border-dashed border-gray-200 dark:border-gray-700 rounded-md'>
                            <p className='text-gray-700 dark:text-gray-400'>Category</p>
                            <p className='font-semibold'>{medicineDetails?.category.name}</p>
                        </div>

                        <div className='space-y-1 p-2 border-2 border-spacing-2 border-dashed border-gray-200 dark:border-gray-700 rounded-md'>
                            <p className='text-gray-700 dark:text-gray-400'>Company</p>
                            <p className='font-semibold text-sm'>{medicineDetails?.company.name}</p>
                        </div>

                        <div className='space-y-1 p-2 border-2 border-spacing-2 border-dashed border-gray-200 dark:border-gray-700 rounded-md'>
                            <p className='text-gray-700 dark:text-gray-400'>Composition</p>
                            <p className='font-semibold text-sm'>{medicineDetails?.composition}</p>
                        </div>

                    </div>


                    {/* other highlight col-span-full */}

                    <div className="col-span-full grid sm:grid-cols-2 p-0.5 gap-2">

                        <div className='space-y-1 p-2  ring-1 ring-gray-200 dark:ring-gray-700'>
                            <p className='text-gray-700 dark:text-gray-400'>Group</p>
                            <p className='font-semibold'>{medicineDetails?.group.name}</p>
                        </div>

                        <div className='space-y-1 p-2  ring-1 ring-gray-200 dark:ring-gray-700'>
                            <p className='text-gray-700 dark:text-gray-400'>Unit</p>
                            <p className='font-semibold'>{medicineDetails?.unit.name}</p>
                        </div>

                        <div className='space-y-1 p-2  ring-1 ring-gray-200 dark:ring-gray-700'>
                            <p className='text-gray-700 dark:text-gray-400'>Quantity</p>
                            <p className='font-semibold'>{medicineDetails?.quantity === 0 ? (<span className='text-red-500'>out of stock</span>) : medicineDetails?.quantity}</p>
                        </div>

                        <div className='space-y-1 p-2  ring-1 ring-gray-200 dark:ring-gray-700'>
                            <p className='text-gray-700 dark:text-gray-400'>Rack No</p>
                            <p className='font-semibold'>{medicineDetails?.rack_no}</p>
                        </div>

                        <div className='space-y-1 p-2  ring-1 ring-gray-200 dark:ring-gray-700'>
                            <p className='text-gray-700 dark:text-gray-400'>Min Level</p>
                            <p className='font-semibold'>{medicineDetails?.min_level}</p>
                        </div>

                        <div className='space-y-1 p-2  ring-1 ring-gray-200 dark:ring-gray-700'>
                            <p className='text-gray-700 dark:text-gray-400'>Reorder Level</p>
                            <p className='font-semibold'>{medicineDetails?.reorder_level}</p>
                        </div>

                        <div className='space-y-1 p-2  ring-1 ring-gray-200 dark:ring-gray-700'>
                            <p className='text-gray-700 dark:text-gray-400'>VAT</p>
                            <p className='font-semibold'>{medicineDetails?.vat}</p>
                        </div>

                        <div className='space-y-1 p-2  ring-1 ring-gray-200 dark:ring-gray-700'>
                            <p className='text-gray-700 dark:text-gray-400'>Note</p>
                            <p className='font-semibold'>{medicineDetails?.note}</p>
                        </div>

                    </div>

                </div>

            </ScrollArea>
        </Dialog>
    )
}

export default MedicineDetailsModel