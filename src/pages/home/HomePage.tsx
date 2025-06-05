import CustomTooltip from '@/components/customTooltip'
import EmptyList from '@/components/emptyList'
import IconMenu from '@/components/icon-menu'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Separator } from '@/components/ui/separator'
import { features, services } from '@/helpers/homepage'
import pulicApi from '@/services/public-apis'
import { paginatedNews } from '@/types/setupTypes/homepage'
import Autoplay from "embla-carousel-autoplay"
import Lottie from 'lottie-react'
import { FileText, Globe, Heart, Newspaper, NotepadText } from 'lucide-react'
import { motion } from 'motion/react'
import { CSSProperties, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import heroAnimation from '@/assets/animation/hero.json'
import { Link } from 'react-router-dom'


const doctors = [
    { name: 'Dr. Isabella Grant, MD', speciality: 'Pediatric Cardiology', image: '/doctors/doctor-1.jpg' },
    { name: 'Dr. Theo Carter, DO', speciality: 'Orthopedic Surgery and Sports Medicine', image: '/doctors/doctor-2.jpg' },
    { name: 'Dr. Emily Harper, MD', speciality: 'Internal Medicine & Preventative Healthcare', image: '/doctors/doctor-3.jpg' },
    // you can add more
    { name: 'Dr. Swan Gill, MS', speciality: 'ENT & Padiatric', image: '/doctors/doctor-4.jpg' },
]





const HomePage = () => {

    const [news, setNews] = useState<paginatedNews>({ data: [], total_pages: 0 })

    const getAllNews = async () => {
        try {
            const data = await pulicApi.getLatestNews({ search: 'unexpired' })
            setNews(data)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }

    useEffect(() => {
        getAllNews()
    }, [])

    return (
        <div>

            {/* Hero */}

            <div className='pt-14 pb-16 lg:px-20 px-2.5 bg-gradient-to-tr from-blue-50 dark:from-background relative'>

                <div className='size-48 bg-blue-500/5 rounded-full absolute -left-16 -top-16 animate-pulse' />

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className='relative  px-5 py-1.5 z-10 rounded-full bg-white dark:bg-background border border-blue-100 dark:border-blue-950 w-fit flex space-x-1 shadow-md items-center mb-5'>
                    <Heart className='text-blue-500 w-5 animate-pulse' />
                    <span className='font-semibold text-gray-800 dark:text-neutral-200 text-sm'>Caring for Your Health Since 1999</span>
                </motion.div>

                <div className='grid lg:grid-cols-4 gap-10 lg:gap-0  min-h-[5vh]'>
                    {/* Text Content & Button */}
                    < div className="lg:col-span-2 flex flex-col space-y-5">
                        <div className='h-full'>
                            <motion.div
                                initial={{ opacity: 0, y: 100 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1 }}
                                className="flex flex-col gap-y-5 h-full w-full"
                            >
                                <motion.h1
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 1, delay: 0.2 }}
                                    className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-violet-500 font-bold text-5xl md:text-6xl lg:text-7xl tracking-tight relative"
                                >
                                    Welcome to Vertica Healthcare
                                </motion.h1>

                                <motion.p
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                    className="text-gray-600 dark:text-neutral-200 text-2xl md:text-4xl tracking-tight leading-tight"
                                >
                                    Efficiency in Care, Excellence in Service
                                </motion.p>

                                <motion.p
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 1, delay: 0.6 }}
                                    className="text-gray-500 dark:text-neutral-300 max-w-4xl"
                                >
                                    Here, you can efficiently manage patient records, appointments, medical staff, and hospital operations. Easily access key data, track ongoing treatments, and ensure smooth workflows for enhanced patient care and hospital efficiency.
                                </motion.p>


                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 1, delay: 0.9 }}
                                    className='grid sm:grid-cols-2 gap-5'>
                                    <div>
                                        <a
                                            className='flex gap-1 items-center justify-center h-16 rounded-3xl border-blue-500 border-2 text-xl text-white bg-blue-500 hover:shadow-xl hover:scale-105 transition-all duration-300'
                                            href="tel:+91-1234567890">
                                            Emergency: +91-1234567890
                                        </a>
                                    </div>
                                    <Link to={{pathname : '/home/book-appointment'}} className='flex gap-1 items-center justify-center h-16 font-bold rounded-3xl border-blue-500 border-2 text-xl text-blue-500 hover:shadow-xl hover:scale-105 transition-all duration-300'>
                                        <NotepadText />
                                        Book Appointment
                                    </Link>
                                </motion.div>
                            </motion.div>
                        </div>
                    </div >

                    {/* Hero Animation */}
                    <div className="lg:col-span-2 mx-auto flex flex-col justify-center" >
                        <div className='w-80 sm:w-[500px] lg:w-[500px]'>
                            <Lottie animationData={heroAnimation} />
                        </div>
                    </div>
                </div>
            </div>


            {/* Carousel Part */}
            <div className="py-20 bg-gradient-to-l from-orange-300 to-violet-300 dark:from-orange-900 dark:to-violet-900 rounded-t-3xl md:rounded-t-[50px]">

                <div className='mb-10 text-center'>
                    <h1 className='text-2xl md:text-4xl font-bold lg:text-5xl text-gray-800 dark:text-gray-200'>Overview & Latest News</h1>
                </div>

                <MaxWidthWrapper className='grid lg:grid-cols-3 gap-10 lg:px-10 justify-center'>

                    {/* Grid 1 */}
                    <div className='lg:col-span-2 border shadow-lg'>
                        <Carousel
                            plugins={[Autoplay({ delay: 2000, })]}>
                            <CarouselContent>
                                <CarouselItem>
                                    <img src="/slider/h-1.jpg" alt="slider-1" className='object-cover' />
                                </CarouselItem>
                                <CarouselItem>
                                    <img src="/slider/h-2.jpg" alt="slider-2" className='object-cover' />
                                </CarouselItem>
                                <CarouselItem>
                                    <img src="/slider/h-3.jpg" alt="slider-3" className='object-cover' />
                                </CarouselItem>
                                <CarouselItem>
                                    < img src="/slider/h-4.jpg" alt="slider-4" className='object-cover' />
                                </CarouselItem>
                                <CarouselItem>
                                    < img src="/slider/h-5.jpg" alt="slider-5" className='object-cover' />
                                </CarouselItem>
                            </CarouselContent>

                            <CarouselNext className='absolute right-5 bg-transparent border-none' />
                            <CarouselPrevious className='absolute left-5 bg-transparent border-none' />
                        </Carousel>

                    </div>

                    {/* Grid 2 */}

                    <div className="rounded border shadow-lg h-fit">
                        <h1 className="p-2 rounded-t text-xl shadow text-gray-900 dark:text-neutral-100 tracking-tight bg-white/20 backdrop-blur-lg">
                            Latest News
                        </h1>

                        <div className="h-[475px] overflow-hidden group">
                            {news.data.length > 0 ?
                                <div className='px-2 py-4 animate-marquee-top hover:animation-paused space-y-3'
                                    style={{ '--marquee-duration': `${news.data.length * 5}s` } as CSSProperties}>
                                    {news.data.map((item, i) => (
                                        <Accordion key={i} type="single" collapsible>
                                            <AccordionItem value="item-1" className='border rounded-lg px-2 shadow-md'>
                                                <AccordionTrigger>
                                                    <IconMenu
                                                        iconBg='bg-black/10 dark:bg-white/20'
                                                        icon={<Newspaper className='text-gray-700 dark:text-neutral-100' />}
                                                        value={new Date(item.date).toDateString()}
                                                        title={item.title}
                                                    />
                                                </AccordionTrigger>
                                                <AccordionContent>

                                                    {item.description}

                                                    {(item.pdf || item.url) && <Separator className='my-2 bg-white' />}

                                                    <div className="flex space-x-2">
                                                        {item.url && (
                                                            <CustomTooltip message='Visit'>
                                                                <div className='bg-black/10 dark:bg-white/20  flexitems-center w-fit rounded-full p-2 cursor-pointer relative active:scale-95 transition-all duration-300'>
                                                                    <Globe className='text-gray-700 dark:text-white h-4 w-4' />
                                                                    <a href={item.url} target='_blank' className='absolute inset-0' />
                                                                </div>
                                                            </CustomTooltip>
                                                        )}

                                                        {item.pdf && (
                                                            <CustomTooltip message='See PDF'>
                                                                <div className='bg-black/10 dark:bg-white/20 0 flexitems-center w-fit rounded-full p-2 cursor-pointer relative active:scale-95 transition-all duration-300' onClick={() => { window.open(`${import.meta.env.VITE_APP_API_URL}/images/${item.pdf}`) }}>
                                                                    <FileText className='text-gray-700 dark:text-white h-4 w-4' />
                                                                </div>
                                                            </CustomTooltip>
                                                        )}
                                                    </div>

                                                </AccordionContent>
                                            </AccordionItem>
                                        </Accordion>
                                    ))}
                                </div>
                                :
                                <EmptyList length={news.data.length} message="No News Found" />
                            }
                        </div>
                    </div>
                </MaxWidthWrapper>
            </div>


            {/* features */}
            <div className='my-20'>
                <MaxWidthWrapper>
                    <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-5 text-white'>

                        {features.map((feature, i) => (
                            <div key={i} className="flex flex-col bg-violet-400 dark:bg-violet-700 p-5 rounded-xl hover:shadow-2xl hover:-translate-y-1 transition-all">
                                <div className='flex space-x-2 items-center '>
                                    <div className='p-2 bg-white/10 rounded-full'>
                                        {feature.icon}
                                    </div>
                                    <span className='text-xl font-bold'>{feature.title}</span>
                                </div>
                                <div className='h-1 w-24 bg-gradient-to-r from-white my-2' />
                                <span className='text-sm'>{feature.description}</span>
                            </div>
                        ))}

                    </div>
                </MaxWidthWrapper>
            </div>


            {/* Services Section */}
            <div className='py-10'>
                <div className='mb-10 text-center'>
                    <h1 className='text-2xl md:text-4xl font-bold lg:text-5xl text-gray-800 dark:text-gray-200'>Our Services</h1>
                </div>
                <MaxWidthWrapper>
                    <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-5'>
                        {services.map((service, i) => (
                            <div key={i} className="flex flex-col items-center border border-border p-5 rounded-xl shadow-lg dark:shadow-white/5 hover:-translate-y-1 transition-all gap-2 text-center">
                                <div className='p-3 bg-rose-100 dark:bg-rose-500/10 rounded-full w-fit'>
                                    {service.icon}
                                </div>
                                <span className='text-xl font-bold'>{service.title}</span>
                                <Separator />
                                <p className='text-sm'>{service.description}</p>
                            </div>
                        ))}
                    </div>
                </MaxWidthWrapper>
            </div>



            {/* doctors */}
            <section>

                <MaxWidthWrapper className='pt-14 md:pt-20 lg:pt-32 pb-20 lg:pb-32'>

                    <h1 className='text-3xl md:text-4xl lg:text-5xl text-center font-bold mb-12 text-gray-900 dark:text-neutral-100'>
                        Our Doctors
                    </h1>

                    <div className='grid sm:grid-cols-2 lg:grid-cols-4 justify-center gap-6'>
                        {doctors.map((doctor, index) => (
                            <div
                                className='group relative space-y-4 bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 p-6 rounded-2xl shadow-sm hover:shadow-xl dark:shadow-black/20 hover:shadow-blue-500/10 hover:-translate-y-2 transition-all duration-300 cursor-pointer backdrop-blur-sm'
                                key={index}
                            >
                                {/* Gradient overlay on hover */}
                                <div className='absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300' />

                                {/* Doctor Image */}
                                <div className='relative z-10 flex justify-center'>
                                    <div className='relative'>
                                        <img
                                            src={doctor.image}
                                            alt={`Dr. ${doctor.name}`}
                                            className='object-cover select-none w-32 h-32 rounded-full border-4 border-white dark:border-gray-700 shadow-lg group-hover:scale-110 group-hover:border-blue-300 dark:group-hover:border-blue-500 transition-all duration-300'
                                        />
                                        {/* Status indicator */}
                                        <div className='absolute bottom-2 right-2 w-4 h-4 bg-green-500 border-2 border-white dark:border-gray-700 rounded-full shadow-sm'></div>
                                    </div>
                                </div>

                                {/* Doctor Info */}
                                <div className='relative z-10 text-center space-y-3'>
                                    <div>
                                        <h3 className='font-bold text-lg text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200'>
                                            {doctor.name}
                                        </h3>
                                        <div className='w-12 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                                    </div>

                                    <div className='bg-gray-50 dark:bg-gray-700/50 px-4 py-2 rounded-lg'>
                                        <p className='text-gray-600 dark:text-gray-300 text-sm font-medium'>
                                            {doctor.speciality}
                                        </p>
                                    </div>

                                    {/* Additional info section */}
                                    <div className='flex items-center justify-center space-x-4 text-xs text-gray-500 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                                        <div className='flex items-center space-x-1'>
                                            <div className='w-2 h-2 bg-yellow-400 rounded-full'></div>
                                            <span>4.8</span>
                                        </div>
                                        <div className='flex items-center space-x-1'>
                                            <div className='w-2 h-2 bg-green-400 rounded-full'></div>
                                            <span>Available</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </MaxWidthWrapper>
            </section>

        </div >


    )
}

export default HomePage
















// < div className = "lg:col-span-2 flex flex-col justify-center space-y-5" >
//     <div className='space-y-5'>
//         <p className="font-bold text-pretty text-4xl md:text-5xl lg:text-6xl text-gray-900 dark:text-neutral-100 tracking-tight ">
//             Welcome to Vertica Healthcare
//         </p>

//         <p className="font-semibold text-pretty text-2xl md:text-3xl lg:text-4xl text-gray-600 dark:text-gray-500 tracking-tight leading-tight">
//             Efficiency in Care, Excellence in Service
//         </p>

//         <p className="text-gray-800 text-balance dark:text-neutral-200 lg:text-lg">
//             Here, you can efficiently manage patient records, appointments, medical staff, and hospital operations.
//             Easily access key data, track ongoing treatments, and ensure smooth workflows for enhanced patient care and hospital efficiency.
//         </p>

//         <div>
//             <button type="button" className="text-sm inline-block hover:bg-blue-400 bg-blue-500 rounded-md active:scale-95 transition-all text-white py-1 px-3 hov">
//                 Know More
//             </button>
//         </div>
//     </div>
//                 </div >

// <div className="lg:col-span-2 mx-auto flex flex-col justify-center" >
//     <div id='hospital' className='w-72 lg:w-[500px] hospital'>
//         <Lottie animationData={animationData} />
//     </div>
// </div>




//    <div className='relative pt-14 md:pt-20 lg:pt-32 pb-20 lg:pb-32 w-full h-[calc(100vh-64px)]'>

//                 <MaxWidthWrapper className='z-10 relative'>
//                     <div className='h-full'>
//                         <motion.div
//                             initial={{ opacity: 0, y: 100 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ duration: 1 }}
//                             className="flex flex-col items-center justify-center gap-y-5 text-center h-full w-full"
//                         >
//                             <motion.h1
//                                 initial={{ opacity: 0, y: 40 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 transition={{ duration: 1, delay: 0.2 }}
//                                 className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-violet-500 font-bold text-5xl md:text-6xl lg:text-8xl tracking-tight relative"
//                             >
//                                 Welcome to Vertica Healthcare +
//                             </motion.h1>

//                             <motion.p
//                                 initial={{ opacity: 0, y: 40 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 transition={{ duration: 1, delay: 0.5 }}
//                                 className="text-gray-600 dark:text-neutral-200 text-2xl md:text-4xl lg:text-5xl tracking-tight leading-tight"
//                             >
//                                 Efficiency in Care, Excellence in Service
//                             </motion.p>

//                             <motion.p
//                                 initial={{ opacity: 0, y: 40 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 transition={{ duration: 1, delay: 0.8 }}
//                                 className="text-gray-500 dark:text-neutral-300 max-w-4xl"
//                             >
//                                 Here, you can efficiently manage patient records, appointments, medical staff, and hospital operations. Easily access key data, track ongoing treatments, and ensure smooth workflows for enhanced patient care and hospital efficiency.
//                             </motion.p>
//                         </motion.div>
//                     </div>
//                 </MaxWidthWrapper>

//                 <img src="/home-image.jpg" alt="home image" className=" absolute inset-0 h-full w-full dark:invert object-cover" />
//             </div>