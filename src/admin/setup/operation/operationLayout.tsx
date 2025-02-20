import { buttonVariants } from '@/components/ui/button'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { ChartBarStacked, Slice } from 'lucide-react'
import { Link, Outlet } from 'react-router-dom'

const OperationLayout = () => {
    return (
        <div className='space-y-4 pt-4 pb-10'>

            <div className="w-full h-12 ring-1 ring-gray-200 rounded px-2">
                <ScrollArea className='h-full w-full'>
                    <div className="flex h-12 gap-x-3 items-center">

                        {/* we provide relative path like this */}

                        <Link to={``} className={buttonVariants({
                            variant: 'outline'
                        })}>
                            <Slice /> Operations
                        </Link>

                        <Link to={`category`} className={buttonVariants({
                            variant: 'outline'
                        })}>
                            <ChartBarStacked /> Categories
                        </Link>
                
                    </div>

                    <ScrollBar orientation='horizontal' />
                </ScrollArea>
            </div>

            <Outlet></Outlet>
        </div>
    )
}

export default OperationLayout