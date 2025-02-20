import { ScrollArea } from './ui/scroll-area'
import { Link } from 'react-router-dom'
import { Airplay, BriefcaseMedical, CalendarClock, ChevronRight, HeartPulse, Network, Settings, Watch } from 'lucide-react'
import { Button, buttonVariants } from './ui/button'
import { cn } from '@/lib/utils'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion'
import { useState } from 'react'
import AlertModel from './alertModel'
import { logout } from '@/features/auth/authSlice'

const Aside = () => {

    // model
    const [isAlert, setAlert] = useState<boolean>(false)

    const isSlideOpend = useAppSelector((state) => state.asideReducer)
    const dispatch = useAppDispatch()

    return (
        <>
            <div className={cn('sticky w-0 sm:w-52 p-0 bg-white sm:p-2.5 transition-all border-r border-zinc-200 h-[calc(100vh-56px-35px)] top-14', { 'w-52 p-2.5': isSlideOpend })}>

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


                        {/* Tree View Links setup links */}

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
                                        <div className="pl-5">
                                            <Link to={{ pathname: '/admin/setup/charges' }} className='flex hover:bg-slate-100 rounded-md py-1 items-center gap-x-1 justify-start text-[13px]'>
                                                <ChevronRight className='h-4 w-4' />Hospital Charges</Link>
                                        </div>
                                    </AccordionContent>

                                    <AccordionContent className='py-1'>
                                        <div className="pl-5">
                                            <Link to={{ pathname: '/admin/setup/operation' }} className='flex hover:bg-slate-100 rounded-md py-1 items-center gap-x-1 justify-start text-[13px]'>
                                                <ChevronRight className='h-4 w-4' />Operation</Link>
                                        </div>
                                    </AccordionContent>

                                    <AccordionContent className='py-1'>
                                        <div className="pl-5">
                                            <Link to={{ pathname: '/admin/setup/finding' }} className='flex hover:bg-slate-100 rounded-md py-1 items-center gap-x-1 justify-start text-[13px]'>
                                                <ChevronRight className='h-4 w-4' />Findings</Link>
                                        </div>
                                    </AccordionContent>

                                    <AccordionContent className='py-1'>
                                        <div className="pl-5">
                                            <Link to={{ pathname: '/admin/setup/pharmacy' }} className='flex hover:bg-slate-100 rounded-md py-1 items-center gap-x-1 justify-start text-[13px]'>
                                                <ChevronRight className='h-4 w-4' />Pharmacy</Link>
                                        </div>
                                    </AccordionContent>

                                    <AccordionContent className='py-1'>
                                        <div className="pl-5">
                                            <Link to={{ pathname: '/admin/setup/vital' }} className='flex hover:bg-slate-100 rounded-md py-1 items-center gap-x-1 justify-start text-[13px]'>
                                                <ChevronRight className='h-4 w-4' />Vital</Link>
                                        </div>
                                    </AccordionContent>

                                </AccordionItem>
                            </Accordion>
                        </li>

                    </ul>
                    <div className="h-16 bg-gradient-to-t from-white z-30 w-full absolute bottom-0" />
                </ScrollArea>

                {/* logout button */}
                <div className={cn('sm:flex gap-2 items-center transition-all', isSlideOpend ? 'flex' : 'hidden')}>
                    <img src="/user.png" alt="" className="w-9 border-2 border-gray-300 rounded-full" />
                    <Button variant={'destructive'} size='sm' className='flex-1' onClick={() => setAlert(true)}>Logout</Button>
                </div >

            </div>

            {/* Alert model */}

            {isAlert && (<AlertModel
                continue={() => { dispatch(logout()); setAlert(false) }}
                cancel={() => { setAlert(false) }}
            />)}
        </>
    )
}

export default Aside