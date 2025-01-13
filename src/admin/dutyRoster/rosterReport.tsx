import { buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Pencil, Plus, SearchX, Trash } from 'lucide-react'
import { Link } from 'react-router-dom'
import AssignRosterFormModel from './formModel/AssignRosterFormModel'
import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { Shift } from '@/types/type'
import calculateShiftDuration from '@/helpers/calculateHours'
import AlertModel from '@/components/alertModel'
import Radio from '@/components/radio'
import { deleteRoster, fetchRosterlist, searchBYdate, searchBYid, searchBYPeriod } from './apihandlers'



const RosterReport = () => {

    const id = useRef<number | null>(null)

    const [model, setModel] = useState<{ rosterFormModel: boolean, AlertModel: boolean }>({
        rosterFormModel: false,
        AlertModel: false
    })

    const period = useRef<{ startDate: string, endDate: string }>({ startDate: '', endDate: '' })

    const [searchBy, setSearchBy] = useState<'date' | 'period' | 'id'>('id')

    const [rosterList, setRosterList] = useState<Shift[]>([])



    const fetchList = async () => {
        try {
            const data = await fetchRosterlist()
            setRosterList(data)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    // search functionality

    const onSearch = async (value: string) => {
        try {
            let data: Shift[] = []

            if (searchBy === 'id') {
                data = await searchBYid(value)
            }

            if (searchBy === 'date') {
                data = await searchBYdate(value)
            }

            if (searchBy === 'period') {
                data = await searchBYPeriod(period.current.startDate, period.current.endDate)
            }

            setRosterList(data)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    // for deleting rosters

    const onDelete = async () => {
        try {
            
            const data = await deleteRoster(id.current)
            toast.success(data.message)
            fetchList()

        } catch ({ message }: any) {

            toast.error(message)

        } finally {

            setModel((rest) => {
                return {
                    ...rest,
                    AlertModel: false
                }
            });
            id.current = null
        }
    }



    useEffect(() => {
        fetchList()
    }, [])




    return (
        <div className='my-2 flex flex-col'>

            {/* top bar */}
            <div className='flex py-3 flex-row gap-y-2 items-center justify-between border-b border-gray-200'>
                <h1 className='font-semibold tracking-tight'>Duty Roster</h1>

                <div className='flex gap-x-2 overflow-x-auto'>
                    <Link to={''} onClick={() => {
                        setModel((rest) => {
                            return {
                                ...rest,
                                rosterFormModel: true
                            }
                        })
                    }} className={buttonVariants({
                        variant: 'outline',
                        size: 'sm',
                        className: 'flex gap-x-1'
                    })}>
                        <Plus />
                        Add Roster
                    </Link>
                </div>

            </div>


            {/* search section */}

            <div className='pt-2 pb-5 space-y-2 border-b  border-gray-200'>

                <Label>Search by keyword</Label>

                <div className='flex items-center gap-2 w-72 sm:w-96'>
                    {searchBy === 'date' && <Input type='date' onChange={(e) => { onSearch(e.target.value) }} />}
                    {searchBy === 'period' &&
                        <div className='flex flex-col flex-1 space-y-2 sm:space-y-0  sm:space-x-2 sm:flex-row'>
                            <Input type='date' onChange={(e) => {
                                period.current.startDate = e.target.value
                                onSearch('')
                            }} />

                            <Input type='date' onChange={(e) => {
                                period.current.endDate = e.target.value;
                                onSearch('')
                            }} />
                        </div>
                    }
                    {searchBy === 'id' && <Input type='number' placeholder='staff id' onChange={(e) => { onSearch(e.target.value) }} />}
                </div>


                {/* search by options */}

                <div className='flex gap-x-6 pt-2'>

                    <Radio text='Staff' id='id' name='search' className={searchBy === 'id' ? 'bg-gray-700' : ''}
                        onClick={() => { setSearchBy('id') }}
                    />

                    <Radio text='Date' id='Date' name='search' className={searchBy === 'date' ? 'bg-gray-700' : ''}
                        onClick={() => { setSearchBy('date') }}
                    />

                    <Radio text='Period' id='period' name='search' className={searchBy === 'period' ? 'bg-gray-700' : ''}
                        onClick={() => { setSearchBy('period') }}
                    />

                </div>

            </div>

            {/* Table */}

            <Table className='my-10'>

                <TableHeader>
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
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>

                    {rosterList?.map((roster, i) => {
                        return <TableRow key={i}>
                            <TableCell>{roster.staffId}</TableCell>
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
                                <Pencil className='text-gray-600 w-4 h-4 cursor-pointer active:scale-95'
                                    onClick={() => {
                                        setModel((rest) => {
                                            return {
                                                ...rest,
                                                rosterFormModel: true
                                            }
                                        });
                                        id.current = roster.id
                                    }}
                                />

                                {/* Delete */}
                                <Trash className='text-gray-600 w-4 h-4 cursor-pointer active:scale-95'
                                    onClick={() => {
                                        setModel((rest) => {
                                            return {
                                                ...rest,
                                                AlertModel: true
                                            }
                                        });
                                        id.current = roster.id
                                    }}
                                />

                            </TableCell>
                        </TableRow>
                    })}

                </TableBody>
            </Table>


            {/* error on emply list */}

            {rosterList.length < 1 && <h1 className='text-gray-900 mt-4 sm:mt-1 font-semibold text-lg flex items-center gap-1'>Not found <SearchX className='h-5 w-5' /></h1>}


            {/* roster form model */}

            {model.rosterFormModel && <AssignRosterFormModel ID={id.current}
                onClick={() => {
                    setModel((rest) => {
                        return {
                            ...rest,
                            rosterFormModel: false
                        }
                    });
                    fetchList()
                    id.current = null
                }}
            />}


            {/* alert model */}

            {model.AlertModel && <AlertModel
                cancel={() => {
                    setModel((rest) => {
                        return {
                            ...rest,
                            AlertModel: false
                        }
                    });
                    id.current = null
                }}

                continue={onDelete}
            />}

        </div>
    )
}

export default RosterReport