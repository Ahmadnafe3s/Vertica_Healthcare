import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Calendar, Clock, Pencil, Plus, SearchX, Trash2 } from "lucide-react"
import TimelineFormModel from "./timelineFormModel"
import { useEffect, useRef, useState } from "react"
import AlertModel from "@/components/alertModel"
import { Timeline_List } from "@/types/type"
import toast from "react-hot-toast"
import { deleteTimeline, getTimelines } from "../../opdApiHandler"
import { useParams } from "react-router-dom"

const Timeline = () => {

    const id = useRef<null | number>(null)

    const { caseId } = useParams()

    const [TIMELINE, SET_TIMELINE] = useState<Timeline_List[]>([])

    const [MODEL, SET_MODEL] = useState<{ timelineForm: boolean, alert: boolean }>({
        timelineForm: false,
        alert: false
    })


    const fetchTimeline_list = async () => {
        try {
            const data = await getTimelines(Number(caseId))
            SET_TIMELINE(data)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    const onDelete = async () => {
        try {
            const data = await deleteTimeline(Number(id.current))  // timeline id
            toast.success(data.message)
            fetchTimeline_list()
        } catch ({ message }: any) {
            toast.error(message)
        } finally {
            SET_MODEL((rest) => {
                return {
                    ...rest,
                    alert: false
                }
            });
            id.current = null
        }
    }


    useEffect(() => {
        fetchTimeline_list()
    }, [])


    return (
        <section className="flex flex-col gap-y-5 pb-14">

            <div className="flex justify-between">
                <h1 className="text-lg text-gray-800 font-semibold">Timeline</h1>
                <Button variant='outline' size='sm' onClick={() => {
                    SET_MODEL((rest) => {
                        return {
                            ...rest,
                            timelineForm: true
                        }
                    })
                }}>
                    <Plus /> Add Timeline
                </Button>
            </div>

            <Separator />

            {TIMELINE.length > 0 ? (<ul className="relative before:absolute space-y-5 before:w-1 w-64 sm:w-[400px] lg:w-[550px] mx-auto gap-3 before:h-full before:bg-gray-300 before:top-0 before:block">



                {TIMELINE.map((timeline, i) => {
                    return <li className="space-y-4" key={i}>

                        {/* Time section */}
                        <span className="relative  text-sm my-2 -top-1 bg-slate-500 -left-[10%] sm:-left-[8%] text-white py-1 px-3 rounded-md">{timeline.date}</span>

                        <div className="relative flex items-center space-x-3 -ml-3 z-10">

                            {/* Calendor section */}
                            <div className="p-1.5 bg-slate-500 rounded-full ">
                                <span ><Calendar className="w-4 h-4 text-white" /></span>
                            </div>

                            <div className="space-y-2 flex-1 border-2 border-dashed border-gray-200 p-2 rounded-lg">

                                {/* Title section */}
                                <div className=" flex justify-between items-center cursor-pointer group transition-all">
                                    <p className="text-lg font-semibold text-gray-800">{timeline.title}</p>
                                    <div className="flex gap-x-2">

                                        <Pencil className="w-4 h-4 text-gray-500 transition-all active:scale-90 opacity-0 group-hover:opacity-100 "
                                            onClick={() => {
                                                SET_MODEL((rest) => {
                                                    return {
                                                        ...rest,
                                                        timelineForm: true
                                                    }
                                                });
                                                id.current = timeline.id
                                            }}
                                        />

                                        <Trash2 className="w-4 h-4 text-gray-500 transition-all active:scale-90 opacity-0 group-hover:opacity-100 "
                                            onClick={() => {
                                                SET_MODEL((rest) => {
                                                    return {
                                                        ...rest,
                                                        alert: true
                                                    }
                                                });
                                                id.current = timeline.id
                                            }}
                                        />

                                    </div>
                                </div>

                                <Separator />
                                {/* Description */}
                                <p className="text-sm text-gray-700">{timeline.description}</p>

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



            {/* Models */}

            {/* Form model */}

            {MODEL.timelineForm && <TimelineFormModel ID={Number(id.current)}
                onClick={() => {
                    SET_MODEL((rest) => {
                        return {
                            ...rest,
                            timelineForm: false
                        }
                    });
                    id.current = null;
                    fetchTimeline_list()
                }}
            />}


            {/* Alert Model */}

            {MODEL.alert && <AlertModel
                cancel={() => {
                    SET_MODEL((rest) => {
                        return {
                            ...rest,
                            alert: false
                        }
                    });
                    id.current = null
                }}
                continue={onDelete}
            />}

        </section>
    )
}

export default Timeline