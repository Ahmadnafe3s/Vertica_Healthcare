import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import { Blocks, Heart, Microscope, Stethoscope, UserRound } from "lucide-react";

const AboutUs = () => {

    const certifications = [
        "Joint Commission Accredited",
        "MAGNET Recognition",
        "ISO 9001:2015 Certified",
        "NABH Accredited",
        "Green Hospital Certified"
    ];

    return (
        <div>
            <MaxWidthWrapper className="flex flex-col gap-10 pt-10 pb-20">

                <div className="py-2 px-4 rounded-full border border-blue-100 w-fit mx-auto  shadow-lg dark:bg-gray-900 dark:border-gray-700">
                    <span className="text-2xl font-bold ">Our <span className="text-blue-500">Mission</span></span>
                </div>

                <div className="animate-fadeIn">
                    <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
                        <div>
                            <p className="text-lg text-gray-700 dark:text-neutral-50 leading-relaxed mb-6">
                                Vertica Healthcare is dedicated to providing exceptional healthcare services with compassion, innovation, and excellence. We are committed to improving the health and well-being of our community through advanced medical care, education, and research.
                            </p>
                            <p className="text-lg text-gray-700 dark:text-neutral-50 leading-relaxed mb-8">
                                Our state-of-the-art facility combines cutting-edge medical technology with a warm, patient-centered approach, ensuring every individual receives personalized care tailored to their unique needs.
                            </p>

                            <div className="space-y-3">
                                <h3 className="text-xl font-semibold text-gray-900 mb-4 dark:text-neutral-300">Accreditations & Certifications</h3>
                                {certifications.map((cert, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        <span className="text-gray-700 dark:text-neutral-400">{cert}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative">
                            <div className="bg-gradient-to-br from-violet-300 to-red-200 dark:from-violet-500 dark:to-red-400 rounded-3xl p-8 shadow-xl">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="p-4 rounded-xl bg-white/20 dark:bg-white/10 backdrop-blur-sm shadow-xl w-fit">
                                            <Stethoscope className="text-white w-8 h-8" />
                                        </div>
                                        <div className="text-sm font-medium text-gray-700">Modern Facility</div>
                                    </div>
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="p-4 rounded-xl bg-white/20 dark:bg-white/10 backdrop-blur-sm shadow-xl w-fit">
                                            <Microscope className="text-white w-8 h-8" />
                                        </div>
                                        <div className="text-sm font-medium text-gray-700">Advanced Technology</div>
                                    </div>
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="p-4 rounded-xl bg-white/20 dark:bg-white/10 backdrop-blur-sm shadow-xl w-fit">
                                            <Heart className="text-white w-8 h-8" />
                                        </div>
                                        <div className="text-sm font-medium text-gray-700">Compassionate Care</div>
                                    </div>
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="p-4 rounded-xl bg-white/20 dark:bg-white/10 backdrop-blur-sm shadow-xl w-fit">
                                            <UserRound className="text-white w-8 h-8" />
                                        </div>
                                        <div className="text-sm font-medium text-gray-700">Expert Staff</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </MaxWidthWrapper>
        </div>
    )
}

export default AboutUs