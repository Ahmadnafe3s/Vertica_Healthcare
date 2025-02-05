import React, { HTMLAttributes } from "react"
import MaxWidthWrapper from "./MaxWidthWrapper"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface DialogProps extends HTMLAttributes<HTMLDivElement> {
    pageTitle: string
    className?: string
    children: React.ReactNode
}



const Dialog = ({ children, pageTitle, className, ...props }: DialogProps) => {
    return (
        <>
            <div {...props} className='fixed top-0 left-0 h-screen w-full transition-all z-[120]' style={{ background: '#0000009c' }}></div>

            <MaxWidthWrapper className='fixed h-auto top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] z-[200] '>

                <div className={cn('rounded-lg pb-2 bg-white', className)}>

                    {/* hearder */}

                    <div className='flex justify-between items-center p-3 border-b border-gray-200'>

                        <h1 className=' text-sm sm:text-lg font-semibold text-gray-800 py-1 px-4 rounded-xl'>{pageTitle}</h1>

                        <div className='flex gap-x-4'>
                            <div {...props}>
                                <TooltipProvider delayDuration={200}>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <X className='cursor-pointer' />
                                        </TooltipTrigger>
                                        <TooltipContent className="z-[200]">Close popup</TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        </div>

                    </div>

                    <div className="pt-3">{children}</div>

                </div>
            </MaxWidthWrapper>
        </>
    )
}

export default Dialog