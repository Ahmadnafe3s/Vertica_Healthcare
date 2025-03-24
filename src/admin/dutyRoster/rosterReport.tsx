import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Pencil, Plus, SearchX, Trash } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import AssignRosterFormModel from './formModel/AssignRosterFormModel'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import calculateShiftDuration from '@/helpers/calculateHours'
import AlertModel from '@/components/alertModel'
import Radio from '@/components/radio'
import { createRoster, deleteRoster, getRosterDetails, getRosters, updateRoster } from './apihandlers'
import CustomTooltip from '@/components/customTooltip'
import { AssignRosterSchema } from '@/formSchemas/assignRosterFormSchema'
import { z } from 'zod'
import { RosterDetails, Rosters } from '@/types/dutyRoster/DutyRoster'
import { useQueryState, parseAsInteger } from 'nuqs'
import CustomPagination from '@/components/customPagination'
import { useDebouncedCallback } from 'use-debounce'
import LoaderModel from '@/components/loader'
import usePermission from '@/authz'
import { useConfirmation } from '@/hooks/useConfirmation'




const RosterReport = () => {

    // custom hooks
    const { loadPermission, hasPermission } = usePermission()
    const { confirm, confirmationProps } = useConfirmation()


    // Query params
    const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))
    const [credential, setCredential] = useQueryState('credential')
    const [date, setDate] = useQueryState('date')
    const [period, setPeriod] = useState({ startDate: '', endDate: '' })


    // laoding States
    const [loading, setLoading] = useState<{ inlineLoader: boolean, modelLoader: boolean }>({ inlineLoader: false, modelLoader: false })

    // model states
    const [rosterFormModel, setRosterFormModel] = useState(false)


    const [searchBy, setSearchBy] = useState<'date' | 'period' | 'credentials'>('credentials')

    // API states
    const [rosterList, setRosterList] = useState<Rosters>({ data: [], total_pages: 0 })
    const [rosterDetails, setRosterDetails] = useState<RosterDetails | undefined>(undefined)

    const router = useNavigate()


    // Performing both upsert
    const handleSubmit = async (formData: z.infer<typeof AssignRosterSchema>) => {
        try {
            let data;
            setLoading({ ...loading, inlineLoader: true })
            rosterDetails ? (
                data = await updateRoster(formData, rosterDetails.id),
                setRosterDetails(undefined)
            ) :
                (data = await createRoster(formData))
            toast.success(data.message)
            fetchRosters()
            setRosterFormModel(false)
        } catch ({ message }: any) {
            toast.error(message)
        } finally { setLoading({ ...loading, inlineLoader: false }) }
    }


    // Getting rosters list
    const fetchRosters = async () => {
        try {
            const data = await getRosters({
                page,
                limit: 10,
                credentials: credential!,
                date: date!,
                period
            })
            setRosterList(data)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    const fetchRosterDetails = async (id: number) => {
        try {
            setLoading({ ...loading, modelLoader: true })
            const data = await getRosterDetails(id)
            setRosterDetails(data)
        } catch ({ message }: any) {
            toast.error(message)
        } finally { setLoading({ ...loading, modelLoader: false }) }
    }


    // search functionality

    const onSearch = useDebouncedCallback(async (search: { credential?: string, startDate?: string, endDate?: string, date?: string }) => {
        try {
            search.credential ? (setCredential(search.credential)) : (setCredential(null));
            search.date ? (setDate(search.date)) : (setDate(null));
            search.startDate && setPeriod({ ...period, startDate: search.startDate })
            search.endDate && setPeriod({ ...period, endDate: search.endDate });
            (!search.startDate && !search.endDate) && setPeriod({ startDate: '', endDate: '' }) // after clearing any field this will reset (coz we are passing only one field from input which means second one will be alwasys false)

            setPage(1) // always
        } catch ({ message }: any) {
            toast.error(message)
        }
    }, 400)


    // for deleting rosters

    const onDelete = async (id: number) => {
        try {
            const isConfirm = await confirm()
            if (!isConfirm) return null
            const data = await deleteRoster(id)
            toast.success(data.message)
            fetchRosters()
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    useEffect(() => {
        loadPermission()
    }, [])


    useEffect(() => {
        fetchRosters()
    }, [page, period, date, credential])


    return (
        <div className='my-2 flex flex-col'>

            {/* top bar */}
            <div className='flex py-3 flex-row gap-y-2 items-center justify-between border-b border-gray-200'>
                <h1 className='font-semibold tracking-tight'>Duty Roster</h1>

                <div className='flex gap-x-2 overflow-x-auto'>
                    {hasPermission('create', 'duty_roster') && (
                        <Button size='sm' onClick={() => setRosterFormModel(true)}>
                            <Plus /> Add Roster
                        </Button>
                    )}
                </div>

            </div>


            {/* search section */}

            <div className='pt-2 pb-5 space-y-2 border-b  border-gray-200'>

                <Label>Search by keyword</Label>

                <div className='flex items-center gap-2 w-72 sm:w-96'>
                    {searchBy === 'date' && <Input type='date' onChange={(e) => { onSearch({ date: e.target.value }) }} defaultValue={date!} />}
                    {searchBy === 'period' &&
                        <form className='flex flex-row space-x-2'>
                            <Input type='date' onChange={(e) => {
                                onSearch({ startDate: e.target.value })
                            }} />

                            <Input type='date' onChange={(e) => {
                                onSearch({ endDate: e.target.value })
                            }} />
                        </form>
                    }
                    {searchBy === 'credentials' && <Input type='text' placeholder='staff id , name' onChange={(e) => onSearch({ credential: e.target.value })} defaultValue={credential!} />}
                </div>


                {/* search by options */}

                <div className='flex gap-x-6 pt-2'>

                    <Radio text='Credentials' id='id' name='search' className={searchBy === 'credentials' ? 'bg-gray-700' : ''}
                        onClick={() => { setSearchBy('credentials') }}
                    />

                    <Radio text='Date' id='Date' name='search' className={searchBy === 'date' ? 'bg-gray-700' : ''}
                        onClick={() => { setSearchBy('date') }}
                    />

                    <Radio text='Period' id='period' name='search' className={searchBy === 'period' ? 'bg-gray-700' : ''}
                        onClick={() => { setSearchBy('period') }}
                    />

                </div>

            </div>

            {/* paginated Table */}

            <div className="flex flex-col pb-16 gap-y-10 min-h-[70vh]">
                <div className="flex-1">
                    <Table className="rounded-lg border my-10">
                        <TableHeader className='bg-zinc-100'>
                            <TableRow>
                                <TableHead>Staff ID</TableHead>
                                <TableHead>Staff</TableHead>
                                <TableHead>Start Date</TableHead>
                                <TableHead>End Date</TableHead>
                                <TableHead>Shift Start Time</TableHead>
                                <TableHead>Shift End Time</TableHead>
                                <TableHead>Shift Hour</TableHead>
                                <TableHead>Shift</TableHead>
                                <TableHead>Department</TableHead>
                                <TableHead>Note</TableHead>
                                {(hasPermission('update', 'duty_roster') || hasPermission('delete', 'duty_roster')) && (
                                    <TableHead>Action</TableHead>
                                )}
                            </TableRow>
                        </TableHeader>

                        <TableBody>

                            {rosterList?.data.map((roster, i) => {
                                return <TableRow key={i}>
                                    <TableCell
                                        className='font-semibold text-blue-600 cursor-pointer hover:text-blue-500'
                                        onClick={() => router(`/admin/profile/staff/${roster.staffId}`)}>
                                        {roster.staffId}
                                    </TableCell>
                                    <TableCell className="font-medium cursor-pointer">{roster.staff.name}</TableCell>
                                    <TableCell>{roster.shiftStartDate}</TableCell>
                                    <TableCell>{roster.shiftEndDate}</TableCell>
                                    <TableCell>{roster.shiftStartTime}</TableCell>
                                    <TableCell>{roster.shiftEndTime}</TableCell>
                                    <TableCell>{calculateShiftDuration(roster.shiftStartTime, roster.shiftEndTime)}</TableCell>
                                    <TableCell>{roster.shift}</TableCell>
                                    <TableCell>{roster.staff.department}</TableCell>
                                    <TableCell>{roster.note}</TableCell>
                                    <TableCell className='flex gap-x-2'>
                                        {/* Edit button */}
                                        {hasPermission('update', 'duty_roster') && (
                                            <CustomTooltip message='EDIT'>
                                                <Pencil className='text-gray-600 w-4 h-4 cursor-pointer active:scale-95'
                                                    onClick={async () => {
                                                        await fetchRosterDetails(roster.id)
                                                        setRosterFormModel(true)
                                                    }}
                                                />
                                            </CustomTooltip>
                                        )}


                                        {/* Delete */}
                                        {hasPermission('delete', 'duty_roster') && (
                                            <CustomTooltip message='DELETE'>
                                                <Trash className='text-gray-600 w-4 h-4 cursor-pointer active:scale-95'
                                                    onClick={() => onDelete(roster.id)}
                                                />
                                            </CustomTooltip>)}
                                    </TableCell>
                                </TableRow>
                            })}
                        </TableBody>
                    </Table>

                    {/* error on emply list */}
                    {rosterList.data.length < 1 && <h1 className='text-gray-900 mt-4 sm:mt-1 font-semibold text-lg flex items-center gap-1'>Not found <SearchX className='h-5 w-5' /></h1>}
                </div>

                {/* pagination */}
                <section>
                    <CustomPagination
                        total_pages={rosterList?.total_pages}
                        currentPage={+page}
                        previous={(p) => setPage(p)}
                        goTo={(p) => setPage(p)}
                        next={(p) => setPage(p)}
                    />
                </section>
            </div>



            {/* roster form model */}

            {
                rosterFormModel && <AssignRosterFormModel
                    Submit={handleSubmit}
                    rosterDetails={rosterDetails!}
                    isPending={loading.inlineLoader}
                    onClick={() => {
                        setRosterFormModel(false)
                        setRosterDetails(undefined)
                    }}
                />
            }


            {/* alert model */}

            {
                confirmationProps.isOpen && <AlertModel
                    cancel={() => confirmationProps.onCancel()}
                    continue={() => confirmationProps.onConfirm()}
                />
            }

            {loading.modelLoader && <LoaderModel />}

        </div >
    )
}

export default RosterReport