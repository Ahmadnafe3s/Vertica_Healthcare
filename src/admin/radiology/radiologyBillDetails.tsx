import RadiologyReportForm from "@/admin/radiology/radiology-report-form"
import CardBox from "@/components/card-box"
import CustomTooltip from "@/components/customTooltip"
import Dialog from "@/components/Dialog"
import LoaderModel from "@/components/loader"
import PermissionProtectedAction from "@/components/permission-protected-actions"
import SampleCollectionForm from "@/components/sample-collection-form"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { LabReportFormSchema } from "@/formSchemas/approvedBYschema"
import { sampleCollectionSchema } from "@/formSchemas/sampleCollectionSchema"
import { currencySymbol } from "@/helpers/currencySymbol"
import { currencyFormat } from "@/lib/utils"
import { RadiologyBillDeatils, RadiologySampleCollectionDet, RadioTestReport } from "@/types/radiology/radiology"
import { CalendarDays, Eye, Plus, UserRoundPlus } from "lucide-react"
import { HTMLAttributes, useRef, useState } from "react"
import toast from "react-hot-toast"
import { z } from "zod"
import { createRadiologyReport, createRadioSampleCollection, getRadiologyReportDetails, getRadioSampleCollectionDetails, updateRadiologyReport, updateRadioSampleCollection } from "./APIHandlers"
import PrintRadiologyBill from "./print/print-radio-bill"
import PrintRadioTestReport from "./print/print-radio-test-report"



interface PharmacyDetailsProps extends HTMLAttributes<HTMLDivElement> {
    details: RadiologyBillDeatils
}


const RadiologyBillDetailsModal = ({ details, ...props }: PharmacyDetailsProps) => {

    const itemId = useRef(0)
    const testId = useRef(0)
    const index = useRef(0) // for updating the view of collection and report icons

    const [view, setView] = useState<{ [key: number]: { collection?: boolean, report?: boolean } }>()

    const [loading, setLoading] = useState({ inline: false, model: false })
    const [collectionForm, setCollectionForm] = useState(false)
    const [reportForm, setReportForm] = useState(false)
    const [collectionDetails, setCollectionDetails] = useState<RadiologySampleCollectionDet>()
    const [reportDetails, setReportDetails] = useState<RadioTestReport>()



    const onCollectionSubmit = async (formData: z.infer<typeof sampleCollectionSchema>) => {
        try {
            let data;
            setLoading(prev => ({ ...prev, inline: true }))
            collectionDetails ? (
                data = await updateRadioSampleCollection(collectionDetails?.itemId, formData),
                setCollectionDetails(undefined)
            )
                :
                (data = await createRadioSampleCollection(formData, itemId.current))
            toast.success(data.message)
            setCollectionForm(false)
            setView({ ...view, [index.current]: { collection: true } })
            index.current = 0
        } catch ({ message }: any) {
            toast.error(message)
        } finally {
            setLoading(prev => ({ ...prev, inline: false }))
        }
    }


    const onReportSubmit = async (formData: z.infer<typeof LabReportFormSchema>) => {
        try {
            let data;
            setLoading(prev => ({ ...prev, inline: true }))
            reportDetails ? (
                data = await updateRadiologyReport(reportDetails.itemId, formData),
                setReportDetails(undefined)
            )
                :
                (
                    data = await createRadiologyReport(itemId.current, formData)
                )
            toast.success(data.message)
            setReportForm(false)
            setView({ ...view, [index.current]: { report: true } })
            index.current = 0
        } catch ({ message }: any) {
            toast.error(message)
        } finally {
            setLoading(prev => ({ ...prev, inline: false }))
        }
    }


    const fetchReportDetails = async (itemId: number) => {
        try {
            setLoading(prev => ({ ...prev, model: true }))
            const data = await getRadiologyReportDetails(itemId)
            setReportDetails(data)
        } catch ({ message }: any) {
            toast.error(message)
        } finally {
            setLoading(prev => ({ ...prev, model: false }))
        }
    }


    const fetchCollectionDetails = async (itemId: number) => {
        try {
            setLoading(prev => ({ ...prev, model: true }))
            const data = await getRadioSampleCollectionDetails(itemId)
            setCollectionDetails(data)
        } catch ({ message }: any) {
            toast.error(message)
        } finally {
            setLoading(prev => ({ ...prev, model: false }))
        }
    }



    return (
        <>
            <Dialog pageTitle="Bill Details" {...props}>
                <ScrollArea className={'relative h-[75vh] sm:h-[60vh] w-full'}>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 px-2.5">

                        <div className="flex items-center gap-2 sm:col-span-2 mb-4">
                            <div className='p-3 bg-yellow-500 rounded-full'>
                                <CalendarDays className='w-10 h-10 text-white' />
                            </div>
                            <div className=''>
                                <p className='font-semibold text-lg text-gray-900 dark:text-gray-100'>{details?.date}</p>
                                <div className="flex space-x-1 items-center">
                                    <p className='text-sm text-gray-400'>Invoice Date</p>
                                    {/* printing commulative bill */}
                                    <PrintRadiologyBill details={details!} />
                                </div>
                            </div>
                        </div>

                        {/* dashed cards */}

                        <div className="sm:col-span-2 grid grid-cols-2 gap-2">
                            <CardBox borderType='dashed' title="Invoice No" value={details?.id} />
                            <CardBox borderType='dashed' title="Patient Name" value={details?.patient.name} />
                        </div>

                        {/* solid cards */}

                        <CardBox borderType='solid' title="Invoice No" value={details?.id} />

                        <CardBox borderType='solid' title="Patient ID" value={details?.patientId ?? 'N/A'} />

                        <CardBox borderType='solid' title="Doctor Name" value={details?.doctor ?? 'N/A'} />

                        <CardBox borderType='solid' title="OPD ID" value={details?.previousReportValue ?? 'N/A'} />

                        <CardBox borderType='solid' title="Discount %" value={details?.discount ?? 'N/A'} />

                        <CardBox borderType='solid' title="Tax %" value={details?.additionalTax ?? 'N/A'} />

                        <CardBox borderType='solid' title={`Net Amount ${currencySymbol()}`} value={currencyFormat(details?.net_amount) ?? 'N/A'} />

                        <CardBox borderType='solid' title="Payment Mode" value={details?.payment_mode ?? 'N/A'} />

                        <CardBox borderType='solid' title="Note" value={details?.note ?? 'N/A'} />

                    </div>

                    {/* second grid */}

                    <div className="grid pb-10 pt-5 px-2.5 font-medium">
                        <h1 className="text-lg text-gray-800 dark:text-gray-100">Medicines</h1>

                        <Table className="mt-2">
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Test Name</TableHead>
                                    <TableHead>Report Days</TableHead>
                                    <TableHead>Expected Date</TableHead>
                                    <TableHead>Collected By</TableHead>
                                    <TableHead>Approved By</TableHead>
                                    <TableHead>Tax%</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Action</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {details?.RadiologyBillItems.map((item, i) => (
                                    <TableRow key={i}>
                                        <TableCell>{item.testName.name}</TableCell>
                                        <TableCell>{item.reportDays}</TableCell>
                                        <TableCell>{item.reportDate}</TableCell>
                                        {/* Collector */}
                                        <TableCell className="flex">

                                            {item.RadioSampleCollection?.id || view?.[i]?.collection ?
                                                <PermissionProtectedAction action='view' module='sample_collection'>
                                                    <CustomTooltip message="View Collector">
                                                        <Eye className="w-4 h-4 text-gray-700 dark:text-gray-100 cursor-pointer"
                                                            onClick={async () => {
                                                                await fetchCollectionDetails(item.id)
                                                                setCollectionForm(true)
                                                            }}
                                                        />
                                                    </CustomTooltip>
                                                </PermissionProtectedAction>
                                                :
                                                <PermissionProtectedAction action='create' module='sample_collection'>
                                                    <CustomTooltip message="Add User">
                                                        <UserRoundPlus className="w-4 h-4 text-gray-700 dark:text-gray-100 cursor-pointer"
                                                            onClick={() => { setCollectionForm(true); itemId.current = item.id }}
                                                        />
                                                    </CustomTooltip>
                                                </PermissionProtectedAction>

                                            }
                                        </TableCell>

                                        {/* Approved By or Report */}
                                        <TableCell>

                                            {item.RadiologyReport?.id || view?.[i]?.report ?
                                                <PermissionProtectedAction action='view' module='radiology_report'>
                                                    <CustomTooltip message="View Collector">
                                                        <Eye className="w-4 h-4 text-gray-700 dark:text-gray-100 cursor-pointer"
                                                            onClick={async () => {
                                                                await fetchReportDetails(item.id)
                                                                setReportForm(true)
                                                            }}
                                                        />
                                                    </CustomTooltip>
                                                </PermissionProtectedAction>

                                                :

                                                <PermissionProtectedAction action='create' module='radiology_report'>
                                                    <CustomTooltip message="Add Report">
                                                        <Plus className="w-4 h-4 text-gray-700 dark:text-gray-100 cursor-pointer"
                                                            // testId for getting testName parameters && itemId for REREFERENCE
                                                            onClick={() => { setReportForm(true); testId.current = item.testNameId, itemId.current = item.id }}
                                                        />
                                                    </CustomTooltip>
                                                </PermissionProtectedAction>
                                            }
                                        </TableCell>
                                        <TableCell>{item.tax} %</TableCell>
                                        <TableCell>{currencyFormat(item.amount)}</TableCell>
                                        <TableCell><PrintRadioTestReport details={details!} itemId={item.id} onPending={(v) => setLoading({ ...loading, model: v })} /></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                    </div>
                </ScrollArea>
            </Dialog>


            {/* Model */}

            {collectionForm && (
                <SampleCollectionForm
                    editDetails={collectionDetails!}
                    isPending={loading.inline}
                    Role="radiologist"
                    Submit={onCollectionSubmit}
                    onClick={() => { setCollectionForm(false); setCollectionDetails(undefined) }}
                />
            )}


            {reportForm && (
                <RadiologyReportForm
                    editDetails={reportDetails!}
                    testNameId={testId.current}
                    isPending={loading.inline}
                    Submit={onReportSubmit}
                    onClick={() => { setReportForm(false); setReportDetails(undefined) }}
                />
            )}


            {loading.model && <LoaderModel />}

        </>
    )
}

export default RadiologyBillDetailsModal