import PermissionProtectedAction from '@/components/permission-protected-actions'
import { buttonVariants } from '@/components/ui/button'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Banknote, BriefcaseMedical, Clock, HeartPulse, Menu, PocketKnife, ReceiptText, SquareStack } from 'lucide-react'
import { Link, Outlet } from 'react-router-dom'

const OpdDetailsLayout = () => {


    return (
        <div className='space-y-4 pt-4 pb-10'>

            <div className="w-full h-12 ring-1 ring-gray-200 dark:ring-gray-800 rounded px-2">
                <ScrollArea className='h-full w-full'>
                    <div className="flex h-12 gap-x-3 items-center">

                        {/* we provide relative path like this */}

                        <PermissionProtectedAction action='view' module='opd'>
                            <Link to={``} className={buttonVariants({
                                variant: 'outline'
                            })}>
                                <Menu /> Overview
                            </Link>
                        </PermissionProtectedAction>

                        <PermissionProtectedAction action='view' module='medication'>
                            <Link to={`medication`} className={buttonVariants({
                                variant: 'outline'
                            })}>
                                <BriefcaseMedical /> Medication
                            </Link>
                        </PermissionProtectedAction>

                        <PermissionProtectedAction action='view' module='operation'>
                            <Link to={`operation`} className={buttonVariants({
                                variant: 'outline'
                            })}>
                                <PocketKnife /> Operation
                            </Link>
                        </PermissionProtectedAction>

                        <PermissionProtectedAction action='view' module='vitals'>
                            <Link to={`vital`} className={buttonVariants({
                                variant: 'outline'
                            })}>
                                <HeartPulse /> Vital
                            </Link>
                        </PermissionProtectedAction>

                        <PermissionProtectedAction action='view' module='timeline'>
                            <Link to={`timeline`} className={buttonVariants({
                                variant: 'outline'
                            })}>
                                <Clock /> Timeline
                            </Link>
                        </PermissionProtectedAction>


                        <Link to={`treatmenthistory`} className={buttonVariants({
                            variant: 'outline'
                        })}>
                            <SquareStack /> Treatment History
                        </Link>

                        <PermissionProtectedAction action='view' module='charges'>
                            <Link to={`charges`} className={buttonVariants({
                                variant: 'outline'
                            })}>
                                <ReceiptText /> Charges
                            </Link>
                        </PermissionProtectedAction>

                        <PermissionProtectedAction action='view' module='payments'>
                            <Link to={`payment`} className={buttonVariants({
                                variant: 'outline'
                            })}>
                                <Banknote /> Payment
                            </Link>
                        </PermissionProtectedAction>

                    </div>

                    <ScrollBar orientation='horizontal' />
                </ScrollArea>
            </div>

            <Outlet></Outlet>
        </div>
    )
}

export default OpdDetailsLayout

// NOTE : IT IS PARENT COMPONENT FOR ALL COMPONENTS INSIDE THIS DIRECTORY