import { currencyFormat } from '@/lib/utils'
import React from 'react'
import { Link } from 'react-router-dom'


interface rectCardProps {
    path: string,
    name: string,
    amount: number,
    children: React.ReactNode
}

const RectCard = ({ path, name, amount, children }: rectCardProps) => {
    return (
        <div className="mx-auto w-full">
            <Link to={{
                pathname: path
            }} className='flex items-center gap-x-4 p-2.5 active:scale-95 rounded-lg ring-1 transition-all ring-gray-200 hover:shadow-lg'>
                {children}
                <span className='mr-5 inline-block text-nowrap'>
                    <p>{name}</p>
                    <p className='font-bold'>{currencyFormat(amount)}</p>
                </span>
            </Link>
        </div>
    )
}

export default RectCard