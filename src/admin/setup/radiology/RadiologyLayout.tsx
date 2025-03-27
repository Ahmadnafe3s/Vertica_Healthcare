import { buttonVariants } from "@/components/ui/button"
import { ScrollBar } from "@/components/ui/scroll-area"
import { ScrollArea } from "@radix-ui/react-scroll-area"
import { Menu, ChartBarStacked, EllipsisVertical, ReceiptText, Ruler, FlaskConical } from "lucide-react"
import { Link, Outlet } from "react-router-dom"

const SetupRadiologyLayout = () => {
  return (
    <div className='space-y-4 pt-4 pb-10'>

      <div className="w-full h-12 ring-1 ring-gray-200 rounded px-2">
        <ScrollArea className='h-full w-full'>
          <div className="flex h-12 gap-x-3 items-center">

            {/* we provide relative path like this */}

            <Link to={``} className={buttonVariants({
              variant: 'outline'
            })}>
              <FlaskConical /> Test Names
            </Link>

            <Link to={`category`} className={buttonVariants({
              variant: 'outline'
            })}>
              <ChartBarStacked /> Categories
            </Link>


            <Link to={`parameter`} className={buttonVariants({
              variant: 'outline'
            })}>
              <ReceiptText /> Parameters
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

export default SetupRadiologyLayout