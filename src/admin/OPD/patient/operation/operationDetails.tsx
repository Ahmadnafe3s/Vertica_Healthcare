import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { HTMLAttributes } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { CalendarDays, X } from 'lucide-react'
import { Operation_Details } from '@/types/type'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'



interface OperationDetailsModelProps extends HTMLAttributes<HTMLDivElement> {
    operationDetails: Operation_Details | undefined
}


const OperationDetailsModel = ({ operationDetails, ...props }: OperationDetailsModelProps) => {

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
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <X className='cursor-pointer' />
                                        </TooltipTrigger>
                                        <TooltipContent className="z-[200]">Close popup</TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
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
                                    <p className='font-semibold text-lg text-gray-900'>{operationDetails?.date}</p>
                                    <p className='text-sm text-gray-500'>Operation Date</p>
                                </div>
                            </div>

                            <div className="sm:col-span-2 grid grid-cols-2 gap-2">

                                <div className='space-y-1 bg-white p-2 border-2 border-spacing-2 border-dashed border-gray-200 rounded-md'>
                                    <p className='text-gray-700 text-sm'>Reference No.</p>
                                    <p className='font-semibold'>{operationDetails?.id}</p>
                                </div>

                                <div className='space-y-1 bg-white p-2 border-2 border-spacing-2 border-dashed border-gray-200 rounded-md'>
                                    <p className='text-gray-700 text-sm'>Operation Name</p>
                                    <p className='font-semibold'>{operationDetails?.name}</p>
                                </div>

                            </div>

                            <div className='space-y-1 bg-white p-2  ring-1 ring-gray-200 rounded-sm'>
                                <p className='text-gray-700'>Case ID</p>
                                <p className='text-sm'>{operationDetails?.caseId}</p>
                            </div>

                            <div className='space-y-1 bg-white p-2  ring-1 ring-gray-200 rounded-sm'>
                                <p className='text-gray-700'>Category</p>
                                <p className='text-sm'>{operationDetails?.category}</p>
                            </div>

                            <div className='space-y-1 bg-white p-2  ring-1 ring-gray-200 rounded-sm'>
                                <p className='text-gray-700'>Consultant</p>
                                <p className='text-sm'>{operationDetails?.doctor.name}</p>
                            </div>

                            <div className='space-y-1 bg-white p-2  ring-1 ring-gray-200 rounded-sm'>
                                <p className='text-gray-700'>Consultant Assistant 1</p>
                                <p className='text-sm'>{operationDetails?.assistant_1}</p>
                            </div>

                            <div className='space-y-1 bg-white p-2  ring-1 ring-gray-200 rounded-sm'>
                                <p className='text-gray-700'>Consultant Assistant 2</p>
                                <p className='text-sm'>{operationDetails?.assistant_2}</p>
                            </div>

                            <div className='space-y-1 bg-white p-2  ring-1 ring-gray-200 rounded-sm'>
                                <p className='text-gray-700'>Anesthetist</p>
                                <p className='text-sm'>{operationDetails?.anesthetist}</p>
                            </div>

                            <div className='space-y-1 bg-white p-2  ring-1 ring-gray-200 rounded-sm'>
                                <p className='text-gray-700'>Anesthesia Type</p>
                                <p className='text-sm'>{operationDetails?.anesthesia_type}</p>
                            </div>

                            <div className='space-y-1 bg-white p-2  ring-1 ring-gray-200 rounded-sm'>
                                <p className='text-gray-700'>OT Technician</p>
                                <p className='text-sm'>{operationDetails?.ot_technician}</p>
                            </div>

                            <div className='space-y-1 bg-white p-2  ring-1 ring-gray-200 rounded-sm'>
                                <p className='text-gray-700'>OT Assistant</p>
                                <p className='text-sm'>{operationDetails?.ot_assistant}</p>
                            </div>

                            <div className='space-y-1 bg-white p-2  ring-1 ring-gray-200 rounded-sm'>
                                <p className='text-gray-700'>Note</p>
                                <p className='text-sm'>{operationDetails?.note}</p>
                            </div>

                            <div className='space-y-1 bg-white p-2  ring-1 ring-gray-200 rounded-sm'>
                                <p className='text-gray-700'>Result</p>
                                <p className='text-sm'>{operationDetails?.result}</p>
                            </div>

                        </div>



                        <div className="h-14 bg-gradient-to-t from-white z-30 w-full absolute bottom-0" />
                    </ScrollArea>
                </div >
            </MaxWidthWrapper >



        </>
    )
}

export default OperationDetailsModel