import { buttonVariants } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { ChartBarStacked, EllipsisVertical, Menu, ReceiptText, Ruler } from "lucide-react"
import { Link, Outlet } from "react-router-dom"

const ChargesLayout = () => {
    return (
        <div className='space-y-4 pt-4 pb-10'>

            <div className="w-full h-12 ring-1 ring-gray-200 rounded px-2">
                <ScrollArea className='h-full w-full'>
                    <div className="flex h-12 gap-x-3 items-center">

                        {/* we provide relative path like this */}

                        <Link to={``} className={buttonVariants({
                            variant: 'outline'
                        })}>
                            <Menu /> Charges
                        </Link>

                        <Link to={`category`} className={buttonVariants({
                            variant: 'outline'
                        })}>
                            <ChartBarStacked /> Categories
                        </Link>

                        <Link to={`types`} className={buttonVariants({
                            variant: 'outline'
                        })}>
                            <EllipsisVertical />Charge Types
                        </Link>

                        <Link to={`tax`} className={buttonVariants({
                            variant: 'outline'
                        })}>
                            <ReceiptText /> Taxes
                        </Link>

                        <Link to={`units`} className={buttonVariants({
                            variant: 'outline'
                        })}>
                            <Ruler /> Units
                        </Link>

                    </div>

                    <ScrollBar orientation='horizontal' />
                </ScrollArea>
            </div>

            <Outlet></Outlet>
        </div>
    )
}

export default ChargesLayout