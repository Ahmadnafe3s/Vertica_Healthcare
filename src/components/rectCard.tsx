import { currencyFormat } from '@/lib/utils'
import React from 'react'
import { Link } from 'react-router-dom'


interface rectCardProps {
    path: string,
    name: string,
    amount?: number,
    visits?: number,
    children: React.ReactNode
}

const RectCard = ({ path, name, amount, visits, children }: rectCardProps) => {
    return (
        <div className="mx-auto w-full ">
            <Link to={{
                pathname: path
            }} className='flex items-center gap-x-4 p-2.5 bg-white dark:bg-dark active:scale-95 rounded-lg ring-1 transition-all ring-gray-200 dark:ring-gray-700 hover:shadow-lg dark:shadow-gray-800'>
                {children}
                <span className='mr-5 inline-block text-nowrap'>
                    <p>{name}</p>
                    {amount && <p className='font-bold'>{currencyFormat(amount)}</p>}
                    {visits && <p className='font-bold'>{visits}</p>}
                </span>
            </Link>
        </div>
    )
}

export default RectCard