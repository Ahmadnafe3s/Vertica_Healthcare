import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus } from 'lucide-react'
import { Link } from 'react-router-dom'

const Staff = () => {

  let searchValue: string = ''

  const onSearch = () => {
    alert(searchValue)
  }

  return (
    <>
      <div className='my-2 flex flex-col'>

        {/* top bar */}
        <div className='flex py-3 flex-col md:flex-row gap-y-2 md:items-center md:justify-between border-b border-gray-200'>
          <h1 className='font-semibold tracking-tight'>Appointment Details</h1>
          <div className='flex gap-x-2 overflow-x-auto'>

            <Link to={'/admin/humanresource/create'} className={buttonVariants({
              variant: 'outline',
              size: 'sm',
              className: 'flex gap-x-1'
            })}>
              <Plus />
              Add Staff
            </Link>
          </div>
        </div>

        {/* search section */}

        <div className='pt-2 pb-5 space-y-2 border-b  border-gray-200'>

          <Label>Search by keyword</Label>

          <div className='flex items-center gap-2 w-72 sm:w-96'>
            <Input onChange={(e) => { searchValue = e.target.value }} placeholder='id , role , name' />
            <Button type='button' onClick={onSearch} size={'sm'} >Search</Button>
          </div>

        </div>


        {/* grid for staffs */}

        <div className='grid xl:grid-cols-4 gap-4 lg:grid-cols-3 sm:grid-cols-2 py-5'>

          {/* staff card */}

          <div className="mx-auto w-full">
            <Link to={{
              pathname: ''
            }} className='flex items-center gap-x-3 p-2.5 active:scale-95 rounded-lg ring-1 transition-all ring-gray-200 hover:shadow-lg'>

              <div className='w-24'>
                <img src="/doctors/doctor-1.jpg" alt="staff img" className='object-cover rounded-lg' />
              </div>

              <span>
                <p className='font-semibold'>Dr. Sara Murphy</p>
                <p className='text-sm'>6360</p>
                <p className='text-sm'>96518152444</p>
                <p className='bg-gray-200 w-fit rounded-sm px-1 text-sm'>doctor</p>
              </span>

            </Link>
          </div>

        </div>

      </div>

    </>
  )
}

export default Staff