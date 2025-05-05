import { cn } from "@/lib/utils"
import { X } from "lucide-react"
import { AnimatePresence, motion } from 'motion/react'
import React, { HTMLAttributes } from "react"
import Backdrop from "./backdrop"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"


interface DialogProps extends HTMLAttributes<HTMLDivElement> {
    pageTitle: string
    className?: string
    children: React.ReactNode
}



const Dialog = ({ children, pageTitle, className, ...props }: DialogProps) => {
    return (
        <AnimatePresence>
            <Backdrop {...props}>
                <motion.div className="flex-1"
                    initial={{ opacity: 0.3 }}
                    animate={{ opacity: 1 }}
                >
                    {/* // prevents modal to click backdrop */}
                    <div className={cn('px-3 mx-auto max-w-screen-lg', className)} onClick={(e) => e.stopPropagation()}>
                        <div className={cn('rounded-lg pb-2 bg-white dark:bg-background border dark:border-zinc-800')}>

                            {/* hearder */}

                            <div className='flex justify-between items-center p-3 border-b border-zinc-200 dark:border-zinc-800'>

                                <h1 className=' text-sm sm:text-lg font-semibold text-zinc-800 dark:text-neutral-300 py-1 px-4 rounded-xl'>{pageTitle}</h1>

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
                            {/* children of modal */}
                            <div className="pt-3">{children}</div>
                        </div>
                    </div>
                </motion.div>
            </Backdrop>
        </AnimatePresence >
    )
}

export default Dialog