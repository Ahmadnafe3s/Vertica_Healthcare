import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { buttonVariants } from '@/components/ui/button'
import { Star } from 'lucide-react'
import { Fade } from 'react-awesome-reveal'



const HomePage = () => {


    const doctors = [
        { name: 'Dr. Isabella Grant, MD', speciality: 'Pediatric Cardiology', image: '/doctors/doctor-1.jpg' },
        { name: 'Dr. Theo Carter, DO', speciality: 'Orthopedic Surgery and Sports Medicine', image: '/doctors/doctor-2.jpg' },
        { name: 'Dr. Emily Harper, MD', speciality: 'Internal Medicine & Preventative Healthcare', image: '/doctors/doctor-3.jpg' },
        // you can add more
    ]


    return (

        <div>

            <MaxWidthWrapper className="pt-14 md:pt-20 lg:pt-32 pb-20 lg:pb-32 grid lg:grid-cols-4">

                <div className="lg:col-span-2 flex flex-col justify-center gap-y-5">

                    <Fade damping={0.1} cascade triggerOnce>
                        <p className="font-bold text-4xl md:text-5xl lg:text-6xl text-gray-900 tracking-tight ">
                            Welcome to Vertica Healthcare
                        </p>

                        <p className="font-semibold text-2xl md:text-3xl lg:text-4xl text-gray-600 tracking-tight leading-tight">
                            Efficiency in Care, Excellence in Service
                        </p>

                        <p className="text-gray-800 lg:text-lg">
                            Here, you can efficiently manage patient records, appointments, medical staff, and hospital operations.
                            Easily access key data, track ongoing treatments, and ensure smooth workflows for enhanced patient care and hospital efficiency.
                        </p>

                        <div>
                            <button type="button" className="text-sm inline-block hover:bg-blue-400 bg-blue-500 rounded-md active:scale-95 transition-all text-white py-1 px-3 hov">
                                Know More
                            </button>
                        </div>
                    </Fade>
                </div>

                <div className="lg:col-span-2 mx-auto flex flex-col justify-center">
                    <Fade triggerOnce className='w-72 lg:w-[500px] '>
                        <img src="/hospital-2.png" className="object-cover" />
                    </Fade>
                </div>

            </MaxWidthWrapper>



            {/* Services Section */}
            <section className=" bg-slate-50">
                <MaxWidthWrapper className="pt-14 md:pt-20 lg:pt-32 pb-20 lg:pb-32">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-gray-900 mb-16">Our Services</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
                        <div className="bg-gray-50 p-8 rounded-lg shadow border-2 border-dashed border-gray-200">
                            <h3 className="text-xl font-semibold text-blue-600 mb-4">Emergency Care</h3>
                            <p className="text-gray-600">Our emergency services are available 24/7 with state-of-the-art facilities and expert care.</p>
                        </div>

                        <div className="bg-gray-50 p-8 rounded-lg shadow border-2 border-dashed border-gray-200">
                            <h3 className="text-xl font-semibold text-blue-600 mb-4">Pediatrics</h3>
                            <p className="text-gray-600">Compassionate care for children with a focus on comfort and development.</p>
                        </div>
                        <div className="bg-gray-50 p-8 rounded-lg shadow border-2 border-dashed border-gray-200">
                            <h3 className="text-xl font-semibold text-blue-600 mb-4">Surgery</h3>
                            <p className="text-gray-600">Advanced surgical techniques and a team of experienced surgeons ensuring your safety.</p>
                        </div>
                    </div>
                </MaxWidthWrapper>
            </section>



            {/* Testimonials Section */}


            <MaxWidthWrapper className=" md:pt-16 pb-20 lg:pb-32">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 text-center  my-20">What Our Patients Say</h2>
                <div className="flex flex-wrap justify-center gap-10">

                    <div className="bg-gray-50 p-8 rounded-lg shadow border-2 border-dashed border-gray-200 max-w-xs">
                        <p className="text-gray-600 italic mb-4">"The doctors and nurses took great care of me during my surgery. I'm so thankful for the professional and caring team!"</p>
                        <p className="text-blue-600 font-semibold">John Doe</p>
                        <p className="text-gray-500">Patient</p>
                        <div className='flex space-x-1 mt-2'>
                            <Star className="h-4 w-4 fill-current text-green-500" />
                            <Star className="h-4 w-4 fill-current text-green-500" />
                            <Star className="h-4 w-4 fill-current text-green-500" />
                            <Star className="h-4 w-4 fill-current text-green-500" />
                            <Star className="h-4 w-4 fill-current text-green-500" />
                        </div>
                    </div>

                    <div className="bg-gray-50 p-8 rounded-lg shadow border-2 border-dashed border-gray-200 max-w-xs">
                        <p className="text-gray-600 italic mb-4">"My child received amazing care in the pediatric department. The staff was so warm and kind, making the experience stress-free!"</p>
                        <p className="text-blue-600 font-semibold">Jane Smith</p>
                        <p className="text-gray-500">Parent</p>
                        <div className='flex space-x-1 mt-2'>
                            <Star className="h-4 w-4 fill-current text-green-500" />
                            <Star className="h-4 w-4 fill-current text-green-500" />
                            <Star className="h-4 w-4 fill-current text-green-500" />
                            <Star className="h-4 w-4 fill-current text-green-500" />
                            <Star className="h-4 w-4 fill-current text-green-500" />
                        </div>
                    </div>

                    <div className="bg-gray-50 p-8 rounded-lg shadow border-2 border-dashed border-gray-200 max-w-xs">
                        <p className="text-gray-600 italic mb-4">"The emergency care team responded quickly and saved my life. I am forever grateful for their expertise and compassion."</p>
                        <p className="text-blue-600 font-semibold">Mary Johnson</p>
                        <p className="text-gray-500">Patient</p>
                        <div className='flex space-x-1 mt-2'>
                            <Star className="h-4 w-4 fill-current text-green-500" />
                            <Star className="h-4 w-4 fill-current text-green-500" />
                            <Star className="h-4 w-4 fill-current text-green-500" />
                            <Star className="h-4 w-4 fill-current text-green-500" />
                            <Star className="h-4 w-4  text-green-500" />
                        </div>
                    </div>

                </div>
            </MaxWidthWrapper>



            {/* doctors */}

            <section className='bg-slate-50'>

                <MaxWidthWrapper className='pt-14 md:pt-20 lg:pt-32 pb-20 lg:pb-32'>

                    <h1 className='text-3xl md:text-4xl lg:text-5xl text-center font-bold mb-12 text-gray-900'>
                        Our doctors
                    </h1>
                    <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-y-10'>

                        {/* iterating doctors array */}

                        {doctors.map((doctor, index) => {
                            return <div key={index} className='flex flex-col shadow-lg w-72 mx-auto p-2 border-gray-200 border-dashed border-2 rounded-lg'>
                                <div className='w-full h-48 '>
                                    <img src={doctor.image} className='object-cover rounded-lg select-none' alt="doctor image" />
                                </div>

                                <div className='pl-2'>
                                    <p className='font-bold my-1'>{doctor.name}</p>
                                    <p className='text-gray-600 italic text-sm'>{doctor.speciality}</p>
                                </div>
                            </div>
                        })}

                    </div>
                </MaxWidthWrapper>
            </section>


            {/* Contact Section */}
            <div className="bg-gray-50">
                <MaxWidthWrapper className="pt-14 md:pt-20 lg:pt-32 pb-20 lg:pb-48">
                    <Fade cascade damping={0.1} triggerOnce className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8">Get In Touch</h2>
                        <p className=" text-gray-600 mb-8">Feel free to contact us for appointments or inquiries. We're here to help!</p>
                        <a href="mailto:contact@hospital.com" className={buttonVariants({
                            variant: 'default',
                            size: 'lg'
                        })}>Email Us</a>
                    </Fade>
                </MaxWidthWrapper>
            </div>
        </div>


    )
}

export default HomePage