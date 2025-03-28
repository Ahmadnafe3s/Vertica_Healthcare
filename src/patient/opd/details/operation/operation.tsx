import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { SearchX } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import LoaderModel from '@/components/loader';
import { operationDetailsType, PaginatedOperations } from '@/types/opd_section/operationType';
import CustomPagination from '@/components/customPagination';
import { Separator } from '@/components/ui/separator';
import { useQueryState, parseAsInteger } from 'nuqs';
import { getOperation_Details, getOperations } from '@/admin/OPD/opdApiHandler';
import OperationDetailsModel from '@/admin/OPD/details/operation/operationDetails';
import EmptyList from '@/components/emptyList';




const PatientOpdOperation = () => {

    // Route params
    const { opdId } = useParams()

    // search params
    const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))


    // API states
    const [OPERATION_LIST, SET_OPERATION] = useState<PaginatedOperations>() // dont use squre bracket
    const [OPERATION_DETAILS, SET_OPERATION_DETAILS] = useState<operationDetailsType | undefined>(undefined)


    // model state
    const [model, setModel] = useState<{ operationDetails: boolean, loader: boolean }>({
        operationDetails: false,
        loader: false
    })



    // fetching operation details
    const fetchOperationDetails = async (id: string) => {
        try {
            setModel({ ...model, loader: true })
            const data = await getOperation_Details(id)
            SET_OPERATION_DETAILS(data)
        } catch ({ message }: any) {
            toast.error(message)
        } finally {
            setModel({ ...model, loader: false })
        }
    }



    const fetchOperations = async () => {
        try {
            const data = await getOperations({ opdId: opdId!, page, limit: 10 })
            SET_OPERATION(data)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }



    useEffect(() => {
        fetchOperations()
    }, [page])


    return (
        <>
            <section className="flex flex-col gap-y-5">

                <div className="flex justify-between">
                    <h1 className="text-lg font-semibold">Operations</h1>
                </div>

                <Separator />

                {/* with pagination */}

                <div className="flex flex-col min-h-[70vh] mb-20">
                    <div className='flex-1'>
                        <Table className="rounded-lg border dark:border-gray-800">
                            <TableHeader className='bg-zinc-100 dark:bg-gray-900'>
                                <TableRow>
                                    <TableHead>Reference No</TableHead>
                                    <TableHead>Operation Date</TableHead>
                                    <TableHead>Operation Name</TableHead>
                                    <TableHead>Operation Category</TableHead>
                                    <TableHead>OT Technician</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {OPERATION_LIST?.data?.map((opertion, i) => {
                                    return <TableRow key={i}>
                                        <TableCell className='cursor-pointer font-semibold text-blue-500 hover:text-blue-400'
                                            onClick={async () => {
                                                await fetchOperationDetails(opertion.id)
                                                setModel({ ...model, operationDetails: true })
                                            }}
                                        >
                                            {opertion.id}
                                        </TableCell>
                                        <TableCell>{opertion.date}</TableCell>
                                        <TableCell>{opertion.operationName.name}</TableCell>
                                        <TableCell>{opertion.operationCategory.name}</TableCell>
                                        <TableCell>{opertion.ot_technician}</TableCell>
                                    </TableRow>
                                })}
                            </TableBody>
                        </Table>


                        {/* error on emply list */}

                        <EmptyList length={OPERATION_LIST?.data.length!} />
                    </div>

                    <section>
                        <CustomPagination
                            total_pages={OPERATION_LIST?.total_pages!}
                            currentPage={page}
                            previous={(p) => setPage(p)}
                            goTo={(p) => setPage(p)}
                            next={(p) => setPage(p)}
                        />
                    </section>
                </div>

            </section>


            {/* models */}

            {/* Operation details model */}

            {model.operationDetails && <OperationDetailsModel operationDetails={OPERATION_DETAILS}
                onClick={() => {
                    setModel({ ...model, operationDetails: false })
                }}
            />}


            {/* loader */}

            {model.loader && (<LoaderModel />)}
        </>
    )
}



export default PatientOpdOperation