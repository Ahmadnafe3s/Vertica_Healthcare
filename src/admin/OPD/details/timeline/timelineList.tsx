import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Calendar, Clock, Pencil, Plus, SearchX, Trash2 } from "lucide-react"
import TimelineFormModel from "./timelineFormModel"
import { useEffect, useState } from "react"
import AlertModel from "@/components/alertModel"
import toast from "react-hot-toast"
import { createTimeline, deleteTimeline, getTimelineDetails, getTimelines, updateTimeine } from "../../opdApiHandler"
import { useParams } from "react-router-dom"
import { timelineFormSchema } from "@/formSchemas/timelineFormSchema"
import { z } from "zod"
import { timeline } from "@/types/opd_section/timeline"
import LoaderModel from "@/components/loader"
import usePermission from "@/authz"
import { useConfirmation } from "@/hooks/useConfirmation"
import CustomTooltip from "@/components/customTooltip"

const Timeline = () => {

    // custom hook
    const { hasPermission, loadPermission } = usePermission()
    const { confirm, confirmationProps } = useConfirmation()

    const { patientId, opdId } = useParams()

    // pending states
    const [isPending, setPending] = useState<boolean>(false)


    // API states
    const [timelines, setTimelines] = useState<timeline[]>([])
    const [timelineDetails, setTimelineDetails] = useState<timeline>()


    // model state
    const [model, setModel] = useState({ timelineForm: false, loaderModel: false })


    const handleSubmit = async (formData: z.infer<typeof timelineFormSchema>) => {
        try {
            setPending(true)
            let data;

            timelineDetails ? (
                data = await updateTimeine(timelineDetails.id, formData), setTimelineDetails(undefined))
                :
                (data = await createTimeline(opdId!, Number(patientId), formData))

            toast.success(data.message)
            fetchTimelines()
            setModel(rest => ({
                ...rest,
                timelineForm: false
            }))

        } catch ({ message }: any) {
            toast.error(message)
        } finally {
            setPending(false)
        }
    }


    const fetchTimelines = async () => {
        try {
            const data = await getTimelines(opdId!)
            setTimelines(data)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    // fetching details for edir mode

    const fetchTimelineDetails = async (id: number) => {
        try {
            setModel({ ...model, loaderModel: true })
            const data = await getTimelineDetails(id)
            setTimelineDetails(data)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    const onDelete = async (id: number) => {
        try {
            const isConfirm = await confirm()
            if (!isConfirm) return null
            const data = await deleteTimeline(id)  // timeline id
            toast.success(data.message)
            fetchTimelines()
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    useEffect(() => {
        fetchTimelines()
        loadPermission()
    }, [])


    return (
        <section className="flex flex-col gap-y-5 pb-14">

            <div className="flex justify-between">
                <h1 className="text-lg text-gray-800 font-semibold">Timeline</h1>
                {hasPermission('create', 'timeline') && (
                    <Button size='sm' onClick={() => {
                        setModel({ ...model, timelineForm: true })
                    }}>
                        <Plus /> Add Timeline
                    </Button>
                )}
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

                            <div className="space-y-2 flex-1 border-2 border-dashed border-gray-200 p-2 rounded-lg">

                                {/* Title section */}
                                <div className=" flex justify-between items-center cursor-pointer group transition-all">
                                    <p className="text-lg font-semibold text-gray-800">{timeline.title}</p>
                                    <div className="flex gap-x-2">

                                        {/* EDIT */}
                                        {hasPermission('update', 'timeline') && (
                                            <CustomTooltip message="EDIT">
                                                <Pencil className="w-4 h-4 text-gray-500 transition-all active:scale-90 opacity-0 group-hover:opacity-100 "
                                                    onClick={async () => {
                                                        await fetchTimelineDetails(timeline.id)
                                                        setModel({ ...model, timelineForm: true })
                                                    }}
                                                />
                                            </CustomTooltip>
                                        )}

                                        {/* DELETE */}
                                        {hasPermission('delete', 'timeline') && (
                                            <CustomTooltip message="DELETE">
                                                <Trash2 className="w-4 h-4 text-gray-500 transition-all active:scale-90 opacity-0 group-hover:opacity-100 "
                                                    onClick={() => onDelete(timeline.id)}
                                                />
                                            </CustomTooltip>
                                        )}

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

            {model.timelineForm && <TimelineFormModel
                Submit={handleSubmit}
                timelineDetails={timelineDetails!}
                isPending={isPending}
                onClick={() => {
                    setModel({
                        ...model,
                        timelineForm: false
                    })
                    setTimelineDetails(undefined)
                }}
            />}


            {/* Alert Model */}

            {confirmationProps.isOpen && <AlertModel
                cancel={() => confirmationProps.onCancel()}
                continue={() => confirmationProps.onConfirm()}
            />}


            {/* Loader Model */}
            {model.loaderModel && (<LoaderModel />)}

        </section>
    )
}

export default Timeline