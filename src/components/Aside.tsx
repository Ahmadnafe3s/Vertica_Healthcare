import { ScrollArea } from './ui/scroll-area'
import { Link } from 'react-router-dom'
import { Airplay, CalendarClock, HeartPulse } from 'lucide-react'
import { buttonVariants } from './ui/button'
import { cn } from '@/lib/utils'
import { useAppSelector } from '@/hooks'

const Aside = () => {

    const isSlideOpend = useAppSelector((state)=>state.asideReducer)
    
    return (
        <div className={cn('sticky w-0 sm:w-52 p-0 sm:p-2.5 transition-all h-[calc(100vh-56px-1px)] top-14' , {'w-52 p-2.5' : isSlideOpend})}>

            <div className="h-16 bg-gradient-to-t from-white z-30 w-full absolute bottom-0" />

            <ScrollArea className='h-full  border-r border-zinc-200 '>

                <ul className='flex flex-col gap-y-2'>
                    <li><Link to={{ pathname: '/admin/dashboard' }} className={
                        buttonVariants({
                            variant: 'ghost',
                            className: 'flex text-sm items-center'
                        })
                    }><Airplay className='h-4 w-4' /> Dashboard</Link></li>

                    <li><Link to={{pathname : '/admin/appointment'}} className={
                        buttonVariants({
                            variant: 'ghost',
                            className: 'flex text-sm items-center'
                        })
                    }><CalendarClock className='h-4 w-4' /> Appointment</Link></li>
                    
                    <li><Link to={{pathname : '/admin/OPD'}} className={
                        buttonVariants({
                            variant: 'ghost',
                            className: 'flex text-sm items-center'
                        })
                    }><HeartPulse className='h-4 w-4' /> OPD - Out Patient</Link></li>
                </ul>
            </ScrollArea>
        </div>
    )
}

export default Aside