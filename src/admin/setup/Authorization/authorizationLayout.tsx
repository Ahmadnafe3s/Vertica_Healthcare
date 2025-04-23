import { buttonVariants } from '@/components/ui/button'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Flag, UserPen } from 'lucide-react'
import { Link, Outlet, useLocation } from 'react-router-dom'

const PermissionLayout = () => {

  const { pathname } = useLocation()

  return (
    <>
      {!pathname.endsWith('role') &&
        <div className="bg-gradient-to-r from-pink-500 to-violet-600 h-6">
          <p className="text-center text-white">Unavailable options are disabled</p>
        </div>
      }
      <div className='space-y-4 pt-4 pb-10'>
        <div className="w-full h-12 ring-1 ring-gray-200 dark:ring-gray-800 rounded px-2">
          <ScrollArea className='h-full w-full'>
            <div className="flex h-12 gap-x-3 items-center">

              {/* we provide relative path like this */}

              <Link to={``} className={buttonVariants({
                variant: 'outline'
              })}>
                <Flag />  Permissions
              </Link>

              <Link to={`role`} className={buttonVariants({
                variant: 'outline'
              })}>
                <UserPen /> Roles
              </Link>
            </div>
            <ScrollBar orientation='horizontal' />
          </ScrollArea>
        </div>
        <Outlet></Outlet>
      </div>
    </>

  )
}

export default PermissionLayout