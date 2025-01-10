import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Eye, FileText, ListMinus, Plus, Printer } from 'lucide-react'
import { Link } from 'react-router-dom'
import AddMedicineFormModel from './forms/addMedicineFormModel'
import { useState } from 'react'

const Medicines = () => {

  const [isAddMedicineFormModel, setMedicineFormModel] = useState<boolean>(false)

  return (
    <>
      <div className='my-2 flex flex-col'>

        {/* top bar */}
        <div className='flex py-3 flex-col md:flex-row gap-y-2 md:items-center md:justify-between border-b border-gray-200'>
          <h1 className='font-semibold tracking-tight'>Pharmacy Bill</h1>
          <div className='flex gap-x-2 overflow-x-auto'>

            <Button className='flex gap-x-1' variant={'outline'} size={'sm'} onClick={() => { setMedicineFormModel(true) }}>
              <Plus />
              Add Medicine
            </Button>


            <Link to={{ pathname: '/admin/pharmacy/purchase' }} className={buttonVariants({
              variant: 'outline',
              size: 'sm',
              className: 'flex gap-x-1'
            })}>
              <ListMinus />
              Purcahse
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
              <TableHead>Medicine Name</TableHead>
              <TableHead>Medicine Company</TableHead>
              <TableHead>Medicine Composition</TableHead>
              <TableHead>Medicine Categoy</TableHead>
              <TableHead>Medicine Group</TableHead>
              <TableHead>Avaliable Qty</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow>
              <TableCell className="font-medium">PHARM4568</TableCell>
              <TableCell>7859</TableCell>
              <TableCell>Meraj Khan</TableCell>
              <TableCell>Dr. Saurabh joshi</TableCell>
              <TableCell>5</TableCell>
              <TableCell>500</TableCell>
              <TableCell className='flex gap-2'>
                <Eye className='cursor-pointer text-gray-600 w-5 h-5' />
              </TableCell>
            </TableRow>
          </TableBody>

        </Table>

      </div >

      {/* Model */}

      {isAddMedicineFormModel && <AddMedicineFormModel onClick={() => { setMedicineFormModel(false) }} />}

    </>

  )
}

export default Medicines