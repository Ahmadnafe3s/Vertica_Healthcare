import { ScrollArea } from './ui/scroll-area'
import { Link } from 'react-router-dom'
import { Airplay, BriefcaseMedical, CalendarClock, ChevronRight, HeartPulse, Network, Settings, Watch } from 'lucide-react'
import { buttonVariants } from './ui/button'
import { cn } from '@/lib/utils'
import { useAppSelector } from '@/hooks'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion'

const Aside = () => {

    const isSlideOpend = useAppSelector((state) => state.asideReducer)

    return (
        <div className={cn('sticky w-0 sm:w-52 p-0 sm:p-2.5 transition-all border-r border-zinc-200 h-[calc(100vh-56px-1px)] top-14', { 'w-52 p-2.5': isSlideOpend })}>

            <ScrollArea className='h-full '>

                <ul className='flex flex-col gap-y-2'>
                    <li><Link to={{ pathname: '/admin/dashboard' }} className={
                        buttonVariants({
                            variant: 'ghost',
                            className: 'flex text-sm items-center'
                        })
                    }><Airplay className='h-4 w-4' /> Dashboard</Link></li>

                    <li><Link to={{ pathname: '/admin/appointment' }} className={
                        buttonVariants({
                            variant: 'ghost',
                            className: 'flex text-sm items-center'
                        })
                    }><CalendarClock className='h-4 w-4' /> Appointment</Link></li>

                    <li><Link to={{ pathname: '/admin/OPD/list' }} className={
                        buttonVariants({
                            variant: 'ghost',
                            className: 'flex text-sm items-center'
                        })
                    }><HeartPulse className='h-4 w-4' /> OPD - Out Patient</Link></li>

                    <li><Link to={{ pathname: '/admin/pharmacy/bill' }} className={
                        buttonVariants({
                            variant: 'ghost',
                            className: 'flex text-sm items-center'
                        })
                    }><BriefcaseMedical className='h-4 w-4' />Pharmacy</Link></li>

                    <li><Link to={{ pathname: '/admin/humanresource/staff' }} className={
                        buttonVariants({
                            variant: 'ghost',
                            className: 'flex text-sm items-center'
                        })
                    }><Network className='h-4 w-4' />Human Resource</Link></li>

                    <li><Link to={{ pathname: '/admin/dutyroster/rosterreport' }} className={
                        buttonVariants({
                            variant: 'ghost',
                            className: 'flex text-sm items-center'
                        })
                    }><Watch className='h-4 w-4' />Duty Roster</Link></li>


                    {/* Tree View Links */}

                    <li>
                        <Accordion type="single" collapsible >
                            <AccordionItem value="item-1" className='border-none'>

                                <AccordionTrigger className={buttonVariants({
                                    variant: 'ghost',
                                    className: 'justify-between items-center'
                                })}>
                                    <div className='flex gap-2'><Settings className='h-4 w-4' />  Setup</div>
                                </AccordionTrigger>

                                {/* Links */}

                                <AccordionContent className='py-1'>
                                    <Link to={{ pathname: '/admin/charges' }} className='flex hover:bg-slate-100 rounded-md py-1 items-center gap-x-1 justify-center text-[13px]'>
                                        <ChevronRight className='h-4 w-4' />Hospital Charges</Link>
                                </AccordionContent>
                                {/* <AccordionContent className='py-1'>
                                    <Link to={{ pathname: '/admin/dutyroster/rosterreport' }} className='flex hover:bg-slate-100 rounded-md py-1 items-center gap-x-1 justify-center text-[13px]'>
                                        <ChevronRight className='h-4 w-4' />Hospital Charges</Link>
                                </AccordionContent> */}
                            </AccordionItem>
                        </Accordion>
                    </li>

                </ul>

                <div className="h-16 bg-gradient-to-t from-white z-30 w-full absolute bottom-0" />
            </ScrollArea>
        </div >
    )
}

export default Aside