import { HTMLAttributes } from 'react'
import { CalendarDays} from 'lucide-react'
import Dialog from '@/components/Dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { operationDetailsType } from '@/types/opd_section/operationType'



interface OperationDetailsModelProps extends HTMLAttributes<HTMLDivElement> {
    operationDetails: operationDetailsType | undefined
}


const OperationDetailsModel = ({ operationDetails, ...props }: OperationDetailsModelProps) => {

    return (
        <Dialog pageTitle='Opration Details' {...props}>
            <ScrollArea className={'relative h-[75vh] sm:h-[60vh] w-full'}>
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
                            <p className='font-semibold'>{operationDetails?.operationName.name}</p>
                        </div>

                    </div>

                    <div className='space-y-1 bg-white p-2  ring-1 ring-gray-200 rounded-sm'>
                        <p className='text-gray-700'>OPD ID</p>
                        <p className='text-sm'>{operationDetails?.opdId}</p>
                    </div>

                    <div className='space-y-1 bg-white p-2  ring-1 ring-gray-200 rounded-sm'>
                        <p className='text-gray-700'>Category</p>
                        <p className='text-sm'>{operationDetails?.operationCategory.name}</p>
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
            </ScrollArea>
        </Dialog>
    )
}

export default OperationDetailsModel