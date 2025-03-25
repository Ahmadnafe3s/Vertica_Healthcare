import { ScrollArea } from './ui/scroll-area'
import { Link } from 'react-router-dom'
import { Airplay, BriefcaseMedical, CalendarClock, ChevronRight, HeartPulse, Network, Settings, Watch } from 'lucide-react'
import { Button, buttonVariants } from './ui/button'
import { cn } from '@/lib/utils'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion'
import { useEffect, useState } from 'react'
import AlertModel from './alertModel'
import { authSelector, logout } from '@/features/auth/authSlice'
import usePermission from '@/authz'
import { openAside } from '@/features/aside/asideSlice'

const Aside = () => {

    // custom
    const { loadPermission, hasPermission } = usePermission()

    // model
    const [isAlert, setAlert] = useState<boolean>(false)

    const isSlideOpend = useAppSelector((state) => state.asideReducer)
    const dispatch = useAppDispatch()
    const session = useAppSelector(authSelector)

    const onNavigate = () => {
        if (window.screen.width > 630) return null
        dispatch(openAside(false))
    }

    // making routes static
    const Routes = (session.user?.role === 'patient') ? session.user?.role : 'admin'

    useEffect(() => {
        (async () => {
            await loadPermission()
        })()
    }, [])


    return (
        <>
            <div className={cn('sticky w-0 sm:w-52 p-0 sm:p-2.5 transition-all border-r border-zinc-200 h-[calc(100vh-56px-35px)] top-14', { 'w-52 p-2.5': isSlideOpend })}>

                <ScrollArea className='h-full '>

                    <ul className='flex flex-col gap-y-2 pb-10'>

                        <li><Link to={{ pathname: `/${Routes}/dashboard` }} onClick={onNavigate} className={
                            buttonVariants({
                                variant: 'ghost',
                                className: 'flex text-sm items-center'
                            })
                        }><Airplay className='h-4 w-4' /> Dashboard</Link></li>


                        {hasPermission('view', 'appointment') &&
                            <li><Link to={{ pathname: `/${Routes}/appointment` }} onClick={onNavigate} className={
                                buttonVariants({
                                    variant: 'ghost',
                                    className: 'flex text-sm items-center'
                                })
                            }><CalendarClock className='h-4 w-4' /> Appointment</Link></li>}


                        {hasPermission('view', 'opd') && <li><Link to={{ pathname: `/${Routes}/opd` }} onClick={onNavigate} className={
                            buttonVariants({
                                variant: 'ghost',
                                className: 'flex text-sm items-center'
                            })
                        }><HeartPulse className='h-4 w-4' /> OPD - Out Patient</Link></li>
                        }

                        {hasPermission('view', 'pharmacy_bill') &&

                            <li><Link to={{ pathname: `/${Routes}/pharmacy` }} onClick={onNavigate} className={
                                buttonVariants({
                                    variant: 'ghost',
                                    className: 'flex text-sm items-center'
                                })
                            }><BriefcaseMedical className='h-4 w-4' />Pharmacy</Link></li>
                        }


                        {/* only these role can see this */}

                        {hasPermission('view', 'human_resource') &&
                            <li><Link to={{ pathname: '/admin/humanresource/staff' }} onClick={onNavigate} className={
                                buttonVariants({
                                    variant: 'ghost',
                                    className: 'flex text-sm items-center'
                                })
                            }><Network className='h-4 w-4' />Human Resource</Link></li>
                        }


                        {hasPermission('view', 'duty_roster') && (
                            <li><Link to={{ pathname: '/admin/dutyroster/rosterreport' }} onClick={onNavigate} className={
                                buttonVariants({
                                    variant: 'ghost',
                                    className: 'flex text-sm items-center'
                                })
                            }><Watch className='h-4 w-4' />Duty Roster</Link></li>
                        )}


                        {/* Tree View Links setup links */}

                        {(session?.user?.role === 'admin') &&
                            <>

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
                                                    <Link to={{ pathname: '/admin/setup/charges' }} onClick={onNavigate} className='flex hover:bg-slate-100 rounded-md py-1 items-center gap-x-1 justify-start text-[13px]'>
                                                        <ChevronRight className='h-4 w-4' />Hospital Charges</Link>
                                                </div>
                                            </AccordionContent>

                                            <AccordionContent className='py-1'>
                                                <div className="pl-5">
                                                    <Link to={{ pathname: '/admin/setup/operation' }} onClick={onNavigate} className='flex hover:bg-slate-100 rounded-md py-1 items-center gap-x-1 justify-start text-[13px]'>
                                                        <ChevronRight className='h-4 w-4' />Operation</Link>
                                                </div>
                                            </AccordionContent>

                                            <AccordionContent className='py-1'>
                                                <div className="pl-5">
                                                    <Link to={{ pathname: '/admin/setup/finding' }} onClick={onNavigate} className='flex hover:bg-slate-100 rounded-md py-1 items-center gap-x-1 justify-start text-[13px]'>
                                                        <ChevronRight className='h-4 w-4' />Findings</Link>
                                                </div>
                                            </AccordionContent>

                                            <AccordionContent className='py-1'>
                                                <div className="pl-5">
                                                    <Link to={{ pathname: '/admin/setup/pharmacy' }} onClick={onNavigate} className='flex hover:bg-slate-100 rounded-md py-1 items-center gap-x-1 justify-start text-[13px]'>
                                                        <ChevronRight className='h-4 w-4' />Pharmacy</Link>
                                                </div>
                                            </AccordionContent>

                                            <AccordionContent className='py-1'>
                                                <div className="pl-5">
                                                    <Link to={{ pathname: '/admin/setup/vital' }} onClick={onNavigate} className='flex hover:bg-slate-100 rounded-md py-1 items-center gap-x-1 justify-start text-[13px]'>
                                                        <ChevronRight className='h-4 w-4' />Vital</Link>
                                                </div>
                                            </AccordionContent>

                                            <AccordionContent className='py-1'>
                                                <div className="pl-5">
                                                    <Link to={{ pathname: '/admin/setup/event' }} onClick={onNavigate} className='flex hover:bg-slate-100 rounded-md py-1 items-center gap-x-1 justify-start text-[13px]'>
                                                        <ChevronRight className='h-4 w-4' />Calendar</Link>
                                                </div>
                                            </AccordionContent>

                                            <AccordionContent className='py-1'>
                                                <div className="pl-5">
                                                    <Link to={{ pathname: '/admin/setup/patient' }} onClick={onNavigate} className='flex hover:bg-slate-100 rounded-md py-1 items-center gap-x-1 justify-start text-[13px]'>
                                                        <ChevronRight className='h-4 w-4' />Patients</Link>
                                                </div>
                                            </AccordionContent>

                                            <AccordionContent className='py-1'>
                                                <div className="pl-5">
                                                    <Link to={{ pathname: '/admin/setup/authorization' }} onClick={onNavigate} className='flex hover:bg-slate-100 rounded-md py-1 items-center gap-x-1 justify-start text-[13px]'>
                                                        <ChevronRight className='h-4 w-4' />Authorization</Link>
                                                </div>
                                            </AccordionContent>

                                        </AccordionItem>
                                    </Accordion>
                                </li>
                            </>
                        }

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