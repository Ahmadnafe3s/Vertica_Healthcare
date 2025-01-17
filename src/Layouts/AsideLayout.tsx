import Aside from '@/components/Aside'
import { Outlet } from 'react-router-dom'

const AsideLayout = () => {
    return (
        <div className='flex'>
            <Aside />
            <div className="flex-1 px-2.5 overflow-hidden "> {/* can be change bg color from here */}
                <Outlet></Outlet>
            </div>

        </div>
    )
}

export default AsideLayout