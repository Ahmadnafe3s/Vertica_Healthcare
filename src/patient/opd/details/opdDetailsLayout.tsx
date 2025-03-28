import { buttonVariants } from '@/components/ui/button'
import { ScrollBar } from '@/components/ui/scroll-area'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { Banknote, BriefcaseMedical, Clock, HeartPulse, Menu, PocketKnife, ReceiptText, Tags } from 'lucide-react'
import { Link, Outlet } from 'react-router-dom'

const PatinetOpdDetailsLayout = () => {
  return (
    <div className='space-y-4 pt-4 pb-10'>

      <div className="w-full h-12 ring-1 ring-gray-200 dark:ring-gray-800 rounded px-2">
        <ScrollArea className='h-full w-full'>
          <div className="flex h-12 gap-x-3 items-center">

            {/* we provide relative path like this */}

            <Link to={``} className={buttonVariants({
              variant: 'outline'
            })}>
              <Menu /> Overview
            </Link>

            <Link to={`medication`} className={buttonVariants({
              variant: 'outline'
            })}>
              <BriefcaseMedical /> Medication
            </Link>

            <Link to={`operation`} className={buttonVariants({
              variant: 'outline'
            })}>
              <PocketKnife /> Operation
            </Link>

            <Link to={`vital`} className={buttonVariants({
              variant: 'outline'
            })}>
              <HeartPulse /> Vital
            </Link>

            <Link to={`timeline`} className={buttonVariants({
              variant: 'outline'
            })}>
              <Clock /> Timeline
            </Link>

            {/* <Link to={`findings`} className={buttonVariants({
              variant: 'outline'
            })}>
              <Tags /> Findings
            </Link> */}

            <Link to={`charges`} className={buttonVariants({
              variant: 'outline'
            })}>
              <ReceiptText /> Charges
            </Link>

            <Link to={`payment`} className={buttonVariants({
              variant: 'outline'
            })}>
              <Banknote /> Payment
            </Link>

          </div>

          <ScrollBar orientation='horizontal' />
        </ScrollArea>
      </div>

      <Outlet></Outlet>
    </div>
  )
}

export default PatinetOpdDetailsLayout