import { motion } from 'motion/react'
import { HTMLAttributes, ReactNode } from 'react'

interface BackdropProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode
}


const Backdrop = ({ children, ...Props }: BackdropProps) => {
    return (
        <div {...Props}>
            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                exit={{ opacity: 0 }}
                className='fixed inset-0 flex items-center justify-center h-screen w-screen backdrop-blur-md transition-all z-[120] bg-[#0000009c]'
            >
                {children}
            </motion.section>
        </div>
    )
}

export default Backdrop