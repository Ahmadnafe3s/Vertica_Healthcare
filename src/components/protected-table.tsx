import { MoreHorizontal, Pencil, Trash } from 'lucide-react'; // Assuming you're using Lucide icons
import { ReactNode, useContext } from 'react';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { PermissionContext } from '@/contexts/permission-provider';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { render } from '@fullcalendar/core/preact.js';


interface PermissionActionsProps<T extends object> {
    module: string;
    // onEdit?: (v: T) => void;
    // onDelete: (v: T) => void;
    // exclude?: {
    //     edit?: boolean;
    //     delete?: boolean;
    // },
    // tableData: T[]
    // header: Array<{ key: keyof T, label: string, renderCell?: (value: any, row: T) => ReactNode }>
    // includeAction?: ReactNode,
    renderTable: (show: boolean, canUpdate: boolean, canDelete: boolean) => ReactNode
}


const ProtectedTable = <T extends object>({
    module,
    // onEdit,
    // onDelete,
    // exclude = { edit: false, delete: false },
    // tableData,
    // header,
    // includeAction
    renderTable
}: PermissionActionsProps<T>) => {

    const { hasPermission } = useContext(PermissionContext)

    const canUpdate = hasPermission('update', module);
    const canDelete = hasPermission('delete', module);


    // If no permissions, then return false means no action (if any of these true then show action)
    const shouldShowAction = (canUpdate || canDelete);


    return (
        <>
            {/* <Table>
                <TableHeader>
                    <TableRow>
                        {header.map((item, i) => (
                            <TableHead key={i}>{item.label}</TableHead>
                        ))}
                        {shouldShowAction && <TableHead>Action</TableHead>}
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {tableData.map((item, i) => (
                        <TableRow key={i}>
                            {header.map((header, i) => (
                                <TableCell key={i}>
                                    {header.renderCell ? header.renderCell(item[header.key], item as any) : (item[header.key] as any)}
                                </TableCell>
                            ))}

                            {shouldShowAction && <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant='outline' className='active:scale-95 transition-all' size='sm'>
                                            <MoreHorizontal />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align='end' className='p-0.5 dark:border-gray-800 z-[200]'>
                                        {includeAction && (
                                            <DropdownMenuItem>
                                                <button type='button' className='relative flex items-center w-full space-x-2 h-5 hover:text-gray-600 dark:hover:text-gray-400'>
                                                    {includeAction}
                                                </button>
                                            </DropdownMenuItem>
                                        )}

                                        {canUpdate && (
                                            <DropdownMenuItem>
                                                <button type='button' onClick={(() => { onEdit && onEdit(item) })} className='flex items-center w-full space-x-2 h-5 hover:text-gray-600 dark:hover:text-gray-400'>
                                                    <Pencil className='w-4' /> <span>Edit</span>
                                                </button>
                                            </DropdownMenuItem>
                                        )}

                                        {canDelete && (
                                            <DropdownMenuItem>
                                                <button type='button' onClick={() => onDelete(item)} className='flex items-center w-full space-x-2 h-5 hover:text-gray-600 dark:hover:text-gray-400'>
                                                    <Trash className='w-4' /> <span>Delete</span>
                                                </button>
                                            </DropdownMenuItem>
                                        )}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>}
                        </TableRow>
                    ))}
                </TableBody>
            </Table> */}

            <main>{renderTable(shouldShowAction, canUpdate, canDelete)}</main>

        </>
    )

};


export default ProtectedTable;