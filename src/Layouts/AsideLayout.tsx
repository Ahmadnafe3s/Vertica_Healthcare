import Aside from '@/components/Aside'
import { Outlet } from 'react-router-dom'

const AsideLayout = () => {
    return (
        <div className='flex'>
            <Aside />
            <div className="flex-1 min-h-[calc(100vh-56px)] px-2.5 overflow-hidden"> {/* overflow is important here */}
                <Outlet></Outlet>
            </div>

        </div>
    )
}

export default AsideLayout

// bg-gradient-to-b from-purple-50 to-rose-50