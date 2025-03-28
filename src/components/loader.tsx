
import { Loader } from "lucide-react"

const LoaderModel = () => {
    return (
        <>
            <div className='fixed -top-4 left-0 h-screen w-full transition-all z-[120]' style={{ background: '#0000009c' }}></div>
            <div className="z-[200] fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] ">
                <div className="flex gap-y-1 flex-col items-center justify-center h-20 w-20 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-950">
                    <Loader className="w-7 h-7 animate-spin" />
                    <p className="text-gray-500 text-sm dark:text-white">loading...</p>
                </div>
            </div>
        </>
    )
}

export default LoaderModel