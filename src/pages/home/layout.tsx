import Footer from "@/components/footer"
import { ModeToggle } from "@/components/mode-toggle"
import { Button, buttonVariants } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { authSelector } from "@/features/auth/authSlice"
import { useAppSelector } from "@/hooks"
import { cn } from "@/lib/utils"
import { Calendar, CalendarCheck2, CalendarDays, ChevronDownIcon, CircleAlert, ClipboardPlus, Goal, Home, Hospital, Image, Menu, Send, User } from "lucide-react"
import { useState } from "react"
import { Link, Outlet } from "react-router-dom"


const HomeLayout = () => {

    // window.addEventListener('scroll', x => console.log(window.pageYOffset))

    return (
        <div className="flex flex-col">
            <Header />  {/* Wriiten below */}
            <div className="flex flex-col min-h-[calc(100vh-4rem-1px)]">
                <main className="flex flex-1 flex-col h-full"><Outlet></Outlet></main>
                <Footer />
            </div>
        </div>
    )
}

export default HomeLayout







const Header = () => {

    const { user } = useAppSelector(authSelector)
    const [isOpen, setIsOpen] = useState(false)
    // making routes static
    const Routes = (user?.role === 'patient') ? user?.role : 'admin'

    const closeMenu = () => setIsOpen(false)

    return (
        <div className="sticky top-0 z-40 px-2.5 lg:px-10 border-b border-border h-16 flex items-center justify-between backdrop-blur-lg">

            <div className="flex items-center gap-x-1 z-50">
                <img src="/logo.png" alt="logo" className="w-14 h-14 rounded-full object-cover" />
                <p className="font-semibold text-gray-900 dark:text-neutral-100">Vertica Healthcare</p>
            </div>


            <div className={cn("fixed md:static w-56 md:w-auto top-0 left-0 h-screen p-5 gap-1 items-start flex flex-col md:flex-row md:h-full md:items-center gap-x-2 bg-white dark:bg-background md:bg-transparent md:dark:bg-transparent border-r border-border border-dashed md:border-none transition-all duration-200", isOpen ? 'left-0' : '-left-[100%]')}>

                <div className="pt-14 md:hidden" />

                <Link to={{ pathname: '/' }} onClick={closeMenu} className={buttonVariants({
                    variant: "ghost",
                })}>
                    <Home /> Home
                </Link>

                <Link to={{ pathname: '/home/annual-calendar' }} onClick={closeMenu} className={buttonVariants({
                    variant: "ghost",
                })}>
                    <Calendar /> Annual Calendar
                </Link>

                <Link to={{ pathname: '/home/event' }} onClick={closeMenu} className={buttonVariants({
                    variant: "ghost",
                })}>
                    <CalendarCheck2 /> Event
                </Link>


                <div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost">
                                <CircleAlert /> About Us <ChevronDownIcon />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="space-y-1">
                            <DropdownMenuItem asChild>
                                <Link to={{ pathname: '/home/about' }} onClick={closeMenu} className="flex space-x-2 p-1 cursor-pointer">
                                    <Hospital className="w-5 h-5" /> <p className="text-sm">About Hospital</p>
                                </Link>
                            </DropdownMenuItem>
                            <Separator />
                            <DropdownMenuItem asChild>
                                <Link to={{ pathname: '/' }} onClick={closeMenu} className="flex space-x-2 p-1 cursor-pointer">
                                    <ClipboardPlus className="w-5 h-5" /> <p className="text-sm">Meet Our Doctors</p>
                                </Link>
                            </DropdownMenuItem>
                            <Separator />
                            <DropdownMenuItem asChild>
                                <Link to={{ pathname: '/' }} onClick={closeMenu} className="flex space-x-2 p-1 cursor-pointer">
                                    <Goal className="w-5 h-5" /> <p className="text-sm">Vision & Mission</p>
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>


                <Link to={{ pathname: '/' }} onClick={closeMenu} className={buttonVariants({
                    variant: "ghost",
                })}>
                    < Send /> Contact
                </Link>

                {user ?
                    <Link to={{ pathname: `/${Routes}/dashboard` }} onClick={closeMenu} className={buttonVariants({
                        variant: "outline",
                        className: "mt-5 md:mt-0"
                    })}>
                        Dashboard ✨
                    </Link>
                    :
                    <Link to={{ pathname: '/signin' }} onClick={closeMenu} className={buttonVariants({
                        variant: "default",
                        className: "mt-5 md:mt-0"
                    })}>
                        < User /> Log In
                    </Link>
                }

            </div>

            <div className=" flex space-x-3">
                <ModeToggle />

                {/* Hamburger menu for mobile */}
                <div className="block md:hidden p-2 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full text-white shadow-green-500 cursor-pointer active:scale-95" onClick={() => setIsOpen(!isOpen)}>
                    <Menu className="w-6 h-6" />
                </div>
            </div>

        </div>
    )
}