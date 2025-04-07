import { cn } from "@/lib/utils"

interface CardBoxProps {
    borderType: 'solid' | 'dashed',
    className?: string,
    title: string,
    value: string | number | undefined
}


const CardBox = ({ borderType, className, title, value }: CardBoxProps) => {
    return (
        <>
            {borderType === 'solid' ? (
                <div className={cn('space-y-1 p-2  ring-1 ring-gray-200 dark:ring-gray-700', className)}>
                    <p className='text-gray-700 dark:text-gray-400'>{title}</p>
                    <p className='font-semibold'>{value}</p>
                </div>
            )
                :
                <div className={cn('space-y-1 p-2 border-2 border-spacing-2 border-dashed border-gray-200 dark:border-gray-700 rounded-md', className)}>
                    <p className='text-gray-700 dark:text-gray-400'>{title}</p >
                    <p className='font-semibold'>{value}</p>
                </div >
            }
        </>
    )
}

export default CardBox