import { buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { currencyFormat } from '@/lib/utils'
import { FileText, Plus, Printer } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const Purchase = () => {
  return (
    <>
      <div className='my-2 flex flex-col'>

        {/* top bar */}
        <div className='flex py-3 flex-col md:flex-row gap-y-2 md:items-center md:justify-between border-b border-gray-200'>
          <h1 className='font-semibold tracking-tight'>Medicine Purchase List</h1>
          <div className='flex gap-x-2 overflow-x-auto'>

            <Link to={''} className={buttonVariants({
              variant: 'outline',
              size: 'sm',
              className: 'flex gap-x-1'
            })}>
              <Plus />
              Purchase Medicine
            </Link>

          </div>
        </div>

        {/* search bar */}

        <div className='flex py-3 flex-col md:flex-row gap-y-4 md:items-center md:justify-between border-b border-gray-200'>

          <div className='flex gap-x-2'>
            <Input type='text' height='10px' placeholder='search' />
          </div>

          <div className='flex gap-x-2'>

            <FileText className='cursor-pointer text-gray-600' />
            <Printer className='cursor-pointer text-gray-600' />

          </div>
        </div>


        <Table className='my-10'>

          <TableHeader>
            <TableRow>
              <TableHead>Purchase No.</TableHead>
              <TableHead>Purchase Date</TableHead>
              <TableHead>Supplier Name</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Tax</TableHead>
              <TableHead>Discount</TableHead>
              <TableHead>Net Amount</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow>
              <TableCell className="font-medium">PCHN4568</TableCell>
              <TableCell>01/01/2005</TableCell>
              <TableCell>Meraj Khan</TableCell>
              <TableCell>{currencyFormat(10)}</TableCell>
              <TableCell>5%</TableCell>
              <TableCell>6%</TableCell>
              <TableCell>{currencyFormat(9.5)}</TableCell>
            </TableRow>
          </TableBody>

        </Table>

      </div>
    </>

  )
}

export default Purchase