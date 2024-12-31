import React from "react"
import { cn } from "../lib/utils"

interface MaxWidthWrapperProps {
    className?: string,
    children: React.ReactNode
}

const MaxWidthWrapper = ({ className, children }: MaxWidthWrapperProps) => {

    return <div className={cn('px-2.5 lg:px-20 mx-auto max-w-screen-xl h-full w-full', className)}>
        {children}
    </div>

}

export default MaxWidthWrapper