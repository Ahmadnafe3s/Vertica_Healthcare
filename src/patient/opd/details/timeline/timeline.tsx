import { Separator } from "@/components/ui/separator"
import { Calendar, Clock, Plus, SearchX } from "lucide-react"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useParams } from "react-router-dom"
import { timeline } from "@/types/opd_section/timeline"
import { getTimelines } from "@/admin/OPD/opdApiHandler"

const PatientOpdTimeline = () => {


    const { opdId } = useParams()

    // API states
    const [timelines, setTimelines] = useState<timeline[]>([])


    const fetchTimelines = async () => {
        try {
            const data = await getTimelines(opdId!)
            setTimelines(data)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    useEffect(() => {
        fetchTimelines()
    }, [])



    return (
        <section className="flex flex-col gap-y-5 pb-14">

            <div className="flex justify-between">
                <h1 className="text-lg font-semibold">Timeline</h1>
            </div>

            <Separator />

            {timelines.length > 0 ? (<ul className="relative before:absolute space-y-5 before:w-1 w-64 sm:w-[400px] lg:w-[550px] mx-auto gap-3 before:h-full before:bg-gray-300 before:top-0 before:block">



                {timelines.map((timeline, i) => {
                    return <li className="space-y-4" key={i}>

                        {/* Time section */}
                        <span className="relative  text-sm my-2 -top-1 bg-slate-500 -left-[10%] sm:-left-[8%] text-white py-1 px-3 rounded-md">{timeline.date}</span>

                        <div className="relative flex items-center space-x-3 -ml-3 z-10">

                            {/* Calendor section */}
                            <div className="p-1.5 bg-slate-500 rounded-full ">
                                <span ><Calendar className="w-4 h-4 text-white" /></span>
                            </div>

                            <div className="space-y-2 flex-1 border-2 border-dashed border-gray-200 dark:border-gray-500 p-2 rounded-lg">

                                {/* Title section */}
                                <div className=" flex justify-between items-center cursor-pointer">
                                    <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">{timeline.title}</p>
                                </div>

                                <Separator />
                                {/* Description */}
                                <p className="text-sm text-gray-700 dark:text-gray-400">{timeline.description}</p>

                            </div>
                        </div>
                    </li>

                })}


                {/* Static Secttion */}

                <li className="relative flex items-center space-x-2 -ml-3 z-10">
                    <div className="p-1.5 bg-slate-400 rounded-full">
                        <Clock className="w-4 h-4 text-white" />
                    </div>
                </li>
            </ul>
            )
                :
                <h1 className='text-gray-900 mt-4 sm:mt-1 font-semibold text-lg flex items-center gap-1'>No data found <SearchX className='h-5 w-5' /></h1>
            }

        </section>
    )
}




export default PatientOpdTimeline

