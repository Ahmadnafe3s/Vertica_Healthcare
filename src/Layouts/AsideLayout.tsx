import Aside from '@/components/Aside'
import { Outlet } from 'react-router-dom'

const AsideLayout = () => {
    return (
        <div className='flex'>
            <Aside />
            <div className="flex-1 p-4 overflow-hidden">
                <Outlet></Outlet>
            </div>

        </div>
    )
}

export default AsideLayout