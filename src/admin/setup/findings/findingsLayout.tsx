import { buttonVariants } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { ChartBarStacked, Tags } from "lucide-react"
import { Link, Outlet } from "react-router-dom"

const FindingsLayout = () => {
    return (
        <div className='space-y-4 pt-4 pb-10'>

            <div className="w-full h-12 ring-1 ring-gray-200 dark:ring-gray-800 rounded px-2">
                <ScrollArea className='h-full w-full'>
                    <div className="flex h-12 gap-x-3 items-center">

                        {/* we provide relative path like this */}

                        <Link to={``} className={buttonVariants({
                            variant: 'outline'
                        })}>
                            <Tags /> Findings
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

export default FindingsLayout