import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Pencil, Plus, Trash } from 'lucide-react'
import { Link } from 'react-router-dom'
import AssignRosterFormModel from './formModel/AssignRosterFormModel'
import { useState } from 'react'

const RosterReport = () => {

    let searchValue: string | null = null
    const [isRosterFormOpen, setRosterForm] = useState<boolean>(false)

        function onSearch() {

        }

    return (
        <div className='my-2 flex flex-col'>

            {/* top bar */}
            <div className='flex py-3 flex-row gap-y-2 items-center justify-between border-b border-gray-200'>
                <h1 className='font-semibold tracking-tight'>Duty Roster</h1>

                <div className='flex gap-x-2 overflow-x-auto'>
                    <Link to={''} onClick={()=>{setRosterForm(true)}} className={buttonVariants({
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
                    <Input onChange={(e) => { searchValue = e.target.value }} placeholder='id , name , date' />
                    <Button type='button' onClick={onSearch} size={'sm'} >Search</Button>
                </div>

            </div>

            {/* Table */}

            <Table className='my-10'>

                <TableHeader>
                    <TableRow>
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

                    <TableRow>
                        <TableCell className="font-medium">Rahul</TableCell>
                        <TableCell>12/08/2025</TableCell>
                        <TableCell>30/12/2025</TableCell>
                        <TableCell>09:00AM</TableCell>
                        <TableCell>12:00PM</TableCell>
                        <TableCell>8.0</TableCell>
                        <TableCell>Morning</TableCell>
                        <TableCell>OT</TableCell>
                        <TableCell>Working on 4th floor</TableCell>
                        <TableCell className='flex gap-x-2'>
                            <Pencil className='text-gray-600 w-5 h-5 cursor-pointer active:scale-95' />
                            <Trash className='text-gray-600 w-5 h-5 cursor-pointer active:scale-95' />
                        </TableCell>
                    </TableRow>

                </TableBody>
            </Table>

            {isRosterFormOpen && <AssignRosterFormModel onClick={()=>{setRosterForm(false)}} />}
        </div>
    )
}

export default RosterReport