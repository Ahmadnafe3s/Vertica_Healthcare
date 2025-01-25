import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { ScrollArea } from '@/components/ui/scroll-area'
import { MedicineDetails } from '@/types/type'
import { Pill, X } from 'lucide-react'
import { HTMLAttributes, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { getMedicinedetails } from './pharmacyApiHandler'


interface MedicineDetailsModelProps extends HTMLAttributes<HTMLDivElement> {
    ID: number
}



const MedicineDetailsModel = ({ ID, ...props }: MedicineDetailsModelProps) => {

    const [medicineDetails, setMedicineDetails] = useState<MedicineDetails>()

    useEffect(() => {
        try {
            (async function fetchData() {
                const data = await getMedicinedetails(ID)
                setMedicineDetails(data)
            })()

        } catch ({ message }: any) {
            toast.error(message)
        }
    }, [])

    return (
        <>
            <div {...props} className='fixed top-0 left-0 h-screen w-full transition-all z-[120]' style={{ background: '#0000009c' }}></div>

            <MaxWidthWrapper className='fixed h-auto top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] z-[200] '>

                <div className='bg-white rounded-lg p-2'>

                    {/* hearder */}

                    <div className='flex justify-between items-center p-2 border-b border-gray-200'>

                        <h1 className='px-4 py-1 text-white bg-green-500 text-sm sm:text-lg font-semibold rounded-lg '>Medicine Details</h1>

                        <div className='flex gap-x-4'>
                            <div {...props}>
                                <X className='cursor-pointer  active:scale-95 w-5' />
                            </div>
                        </div>

                    </div>

                    <ScrollArea className='relative pt-3 h-[75vh] sm:h-[60vh] w-full'>

                        <div className="grid lg:grid-cols-4 gap-y-3 pt-3 px-2.5 pb-10">

                            {/* medicine name and icon col-span-2 */}

                            <div className="flex items-center gap-2 lg:col-span-2">
                                <div className='p-3 bg-green-500 rounded-full'>
                                    <Pill className='w-10 h-10 text-white' />
                                </div>
                                <div>
                                    <h1 className='font-semibold text-lg text-gray-900'>{medicineDetails?.name}</h1>
                                    <p className='text-sm text-gray-500'>{medicineDetails?.group}</p>
                                </div>
                            </div>

                            {/* highlights col-span-2*/}

                            <div className='grid sm:grid-cols-4 grid-cols-2 gap-3 lg:col-span-2'>

                                <div className='space-y-1 bg-white p-2 border-2 border-spacing-2 border-dashed border-gray-200 rounded-md'>
                                    <p className='text-gray-700'>Medicine ID</p>
                                    <p className='font-semibold'>{medicineDetails?.id}</p>
                                </div>

                                <div className='space-y-1 bg-white p-2 border-2 border-spacing-2 border-dashed border-gray-200 rounded-md'>
                                    <p className='text-gray-700'>Category</p>
                                    <p className='font-semibold'>{medicineDetails?.category}</p>
                                </div>

                                <div className='space-y-1 bg-white p-2 border-2 border-spacing-2 border-dashed border-gray-200 rounded-md'>
                                    <p className='text-gray-700'>Company</p>
                                    <p className='font-semibold text-sm'>{medicineDetails?.company}</p>
                                </div>

                                <div className='space-y-1 bg-white p-2 border-2 border-spacing-2 border-dashed border-gray-200 rounded-md'>
                                    <p className='text-gray-700'>Composition</p>
                                    <p className='font-semibold text-sm'>{medicineDetails?.composition}</p>
                                </div>

                            </div>


                            {/* other highlight col-span-full */}

                            <div className="col-span-full grid sm:grid-cols-2 p-0.5 gap-2">

                                <div className='space-y-1 bg-white p-2  ring-1 ring-gray-200'>
                                    <p className='text-gray-700'>Group</p>
                                    <p className='font-semibold'>{medicineDetails?.group}</p>
                                </div>

                                <div className='space-y-1 bg-white p-2  ring-1 ring-gray-200'>
                                    <p className='text-gray-700'>Unit</p>
                                    <p className='font-semibold'>{medicineDetails?.unit}</p>
                                </div>

                                <div className='space-y-1 bg-white p-2  ring-1 ring-gray-200'>
                                    <p className='text-gray-700'>Quantity</p>
                                    <p className='font-semibold'>{medicineDetails?.quantity === 0 ? (<span className='text-red-500'>out of stock</span>) : medicineDetails?.quantity}</p>
                                </div>

                                <div className='space-y-1 bg-white p-2  ring-1 ring-gray-200'>
                                    <p className='text-gray-700'>Rack No</p>
                                    <p className='font-semibold'>{medicineDetails?.rack_no}</p>
                                </div>

                                <div className='space-y-1 bg-white p-2  ring-1 ring-gray-200'>
                                    <p className='text-gray-700'>Min Level</p>
                                    <p className='font-semibold'>{medicineDetails?.min_level}</p>
                                </div>

                                <div className='space-y-1 bg-white p-2  ring-1 ring-gray-200'>
                                    <p className='text-gray-700'>Reorder Level</p>
                                    <p className='font-semibold'>{medicineDetails?.reorder_level}</p>
                                </div>

                                <div className='space-y-1 bg-white p-2  ring-1 ring-gray-200'>
                                    <p className='text-gray-700'>VAT</p>
                                    <p className='font-semibold'>{medicineDetails?.vat}</p>
                                </div>

                                <div className='space-y-1 bg-white p-2  ring-1 ring-gray-200'>
                                    <p className='text-gray-700'>Note</p>
                                    <p className='font-semibold'>{medicineDetails?.note}</p>
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

export default MedicineDetailsModel