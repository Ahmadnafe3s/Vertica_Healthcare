import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import {  buttonVariants } from '@/components/ui/button'
import { Home } from 'lucide-react'
import { Link } from 'react-router-dom'


const Not_found = () => {
    return (
        <MaxWidthWrapper className='h-[calc(100vh-56px-1px)] flex justify-center items-center'>
            <div className='flex flex-col gap-y-4'>
                <div className='w-[300px] sm:w-[500px]'>
                    <img src="/not_found.svg" alt="not found svg" />
                </div>
                <div className='text-center'>
                    <Link to={{pathname : '/'}} className={buttonVariants({
                        variant: 'outline',
                        size : 'lg'
                    })}>Go to home <Home /></Link>
                </div>
            </div>
        </MaxWidthWrapper>
    )
}

export default Not_found