import { Link } from "react-router-dom"
import MaxWidthWrapper from "./MaxWidthWrapper"
import { buttonVariants } from "./ui/button"
import { useAppDispatch } from "@/hooks"
import { openAside } from "@/features/aside/asideSlice"
import { User } from "lucide-react"


const Navbar = () => {
    let isAsideOpen = false
    const dispatch = useAppDispatch()


    const asideController = () => {
        isAsideOpen = !isAsideOpen
        dispatch(openAside(isAsideOpen))
    }

    let isUser = false


    return (
        <>
            <section className="h-14  bg-white/75 backdrop-blur-md w-full z-[100] sticky inset-x-0 top-0">
                <MaxWidthWrapper >
                    <header className="h-full border-b border-zinc-200 flex justify-between items-center">

                        <p className="tracking-tight cursor-pointer z-[100] select-none"><span
                            className="text-blue-500 font-semibold">V</span>ertica <span
                                className="text-blue-500 font-semibold">H</span>ealtcare</p>


                        <div className="flex h-full items-center gap-x-3 sm:gap-x-0">



                            {/* hamburger  */}

                            <div onClick={asideController}
                                className="w-10 rounded-md flex flex-col gap-2 p-2 shadow ring-1 ring-gray-200 bg-gray-100 transition-all active:scale-95 cursor-pointer sm:hidden">
                                <div className="h-px bg-gray-700 w-full"></div>
                                <div className="h-px bg-gray-700 w-full"></div>
                                <div className="h-px bg-gray-700 w-full"></div>
                            </div>

                            <nav>

                                {isUser ?
                                    < div
                                        className="h-8 w-8 leading-none cursor-pointer rounded-full border-2 border-gray-300 active:scale-95 transition-all">
                                        <img src="/user.png" alt="" className="object-cover" srcSet="" />
                                    </div>
                                    :
                                    <Link to={{ pathname: '/signin' }} className={buttonVariants({
                                        variant: "default",
                                        size : 'sm'
                                    })}>log In <User /> </Link>
                                }

                            </nav>
                        </div >
                    </header >
                </MaxWidthWrapper >

            </section >

        </>






    )
}

export default Navbar