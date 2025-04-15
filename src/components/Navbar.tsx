import { SidebarContext } from "@/contexts/sidebar-provider"
import { authSelector, logout } from "@/features/auth/authSlice"
import { useAppDispatch, useAppSelector } from "@/hooks"
import { Moon, SunMedium, User } from "lucide-react"
import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import MaxWidthWrapper from "./MaxWidthWrapper"
import { buttonVariants } from "./ui/button"
import UserModel from "./userModel"



const Navbar = () => {

    const [isDark, setDark] = useState(false)
    const { toggleSidebar } = useContext(SidebarContext)


    const router = useNavigate()

    const dispatch = useAppDispatch()
    const session = useAppSelector(authSelector)
    const [isUserModel, setUserModel] = useState<boolean>(false)


    const onLogout = () => {
        dispatch(logout())
        setUserModel(false)
    }


    const handleDark = () => {
        const toggle = !isDark
        document.body.classList.toggle('dark')
        localStorage.setItem('dark', JSON.stringify(toggle))
        setDark(toggle)
    }


    useEffect(() => {
        const isDark = JSON.parse(localStorage.getItem('dark') || 'false')
        document.body.classList.toggle('dark', isDark) //  dependency
        setDark(isDark) // if exists then add
    }, [])


    return (
        <>
            <section className="h-14 bg-gradient-to-r from-purple-50 to-violet-100 dark:from-slate-800 backdrop-blur shadow w-full z-[100] sticky inset-x-0 top-0">
                <MaxWidthWrapper >
                    <header className="h-full flex justify-between items-center">

                        <Link to={{ pathname: '/' }} className="tracking-tight cursor-pointer z-[100] select-none">
                            <span className="text-primary dark:text-white font-semibold">V</span>ertica
                            {' '}
                            <span className="text-primary dark:text-white font-semibold">H</span>ealtcare
                        </Link>

                        <div className="flex h-full items-center gap-x-3">


                            {/* Dark mode */}

                            <div className="p-1 bg-black dark:bg-white rounded-full cursor-pointer active:scale-90 transition-all"
                                onClick={handleDark}
                            >
                                {isDark ? <SunMedium className="size-4 text-black" /> : <Moon className="size-4 text-white" />}
                            </div>

                            {session.user ?
                                <>
                                    < div
                                        onClick={() => { setUserModel(!isUserModel) }}
                                        className="h-8 w-8 leading-none cursor-pointer rounded-full border-2 border-gray-300 active:scale-95 transition-all">
                                        <img src="/user.png" alt="" className="object-cover" srcSet="" />
                                    </div>

                                    <div onClick={toggleSidebar}
                                        className="w-10 rounded-md flex flex-col gap-2 p-2 shadow ring-1 ring-gray-200 bg-gray-100 transition-all active:scale-95 cursor-pointer sm:hidden">
                                        <div className="h-px bg-gray-700 w-full"></div>
                                        <div className="h-px bg-gray-700 w-full"></div>
                                        <div className="h-px bg-gray-700 w-full"></div>
                                    </div>

                                </>
                                :

                                <Link to={{ pathname: '/signin' }} className={buttonVariants({
                                    variant: "default",
                                    size: 'sm'
                                })}>log In <User /> </Link>
                            }
                        </div >
                    </header >
                </MaxWidthWrapper >

            </section >


            {/* user model */}

            {isUserModel && <UserModel onClick={() => setUserModel(false)} onLogout={onLogout}
                onProfile={() => {

                    session.user?.role !== "patient" ? router(`/admin/profile/staff/${session.user?.id}`)
                        :
                        session.user?.role === "patient" ? router(`/patient/profile/${session.user.id}`) : alert('Invalid user')
                    setUserModel(false)
                }}

                onDashboard={() => {
                    const Routes = (session.user?.role === 'patient') ? session.user?.role : 'admin'
                    router(`/${Routes}/dashboard`), setUserModel(false)
                }}
            />}

        </>

    )
}

export default Navbar