import { buttonVariants } from '@/components/ui/button'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Boxes, Building2, ChartBarStacked, Clock3, Repeat2, Ruler } from 'lucide-react'
import { Link, Outlet } from 'react-router-dom'

const PharmacyLayout = () => {
    return (
        <div className='space-y-4 pt-4 pb-10'>

            <div className="w-full h-12 ring-1 ring-gray-200 rounded px-2">
                <ScrollArea className='h-full w-full'>
                    <div className="flex h-12 gap-x-3 items-center">

                        {/* we provide relative path like this */}

                        <Link to={``} className={buttonVariants({
                            variant: 'outline'
                        })}>
                            <ChartBarStacked /> Medicine Category
                        </Link>

                        <Link to={`interval`} className={buttonVariants({
                            variant: 'outline'
                        })}>
                          <Repeat2 /> Dose Interval
                        </Link>

                        <Link to={`duration`} className={buttonVariants({
                            variant: 'outline'
                        })}>
                          <Clock3 /> Dose Duration
                        </Link>

                        <Link to={`unit`} className={buttonVariants({
                            variant: 'outline'
                        })}>
                           <Ruler /> Units
                        </Link>

                        <Link to={`company`} className={buttonVariants({
                            variant: 'outline'
                        })}>
                            <Building2 /> Company
                        </Link>

                        <Link to={`group`} className={buttonVariants({
                            variant: 'outline'
                        })}>
                            <Boxes /> Medicine Group
                        </Link>


                    </div>

                    <ScrollBar orientation='horizontal' />
                </ScrollArea>
            </div>

            <Outlet></Outlet>
        </div>
    )
}

export default PharmacyLayout