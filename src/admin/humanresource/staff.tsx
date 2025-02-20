import { buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import axios from 'axios'
import { Plus, SearchX } from 'lucide-react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { searchStaffs } from './HRApiHandler'

export interface staffList {
  name: string, id: number, role: string, phone: string, image: string, gender: string
}

const Staff = () => {

  const [staffList, setStaffs] = useState<staffList[]>()


  const onSearch = async (value: any) => {
    try {
      const data = await searchStaffs(value)
      setStaffs(data)

    } catch (error: any) {

      toast.error(error.response.data.message)

    }

  }



  const fetchStaffs = async () => {
    const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/api/staff`)
    setStaffs(response.data)
  }


  useEffect(() => {
    fetchStaffs()
  }, [])


  return (
    <>
      <div className='my-2 flex flex-col'>

        {/* top bar */}
        <div className='flex py-3 flex-col md:flex-row gap-y-2 md:items-center md:justify-between border-b border-gray-200'>
          <h1 className='font-semibold tracking-tight'>Staff List</h1>
          <div className='flex gap-x-2 overflow-x-auto'>

            <Link to={'../create'} className={buttonVariants({   // on step back
              variant: 'default',
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
            <Input onChange={(e) => { onSearch(e.target.value) }} placeholder='id , role , name , specialization' />
          </div>

        </div>


        {/* grid for staffs */}

        <div className='grid xl:grid-cols-4 gap-4 lg:grid-cols-3 sm:grid-cols-2 py-5'>

          {/* staff card */}

          {staffList?.map((staff, i) => {
            return <div className="mx-auto w-full h-28" key={i}>
              <Link to={{
                pathname: `/admin/profile/staff/${staff.id}`
              }} className='flex items-center gap-x-3 p-2.5 active:scale-95 rounded-lg ring-1 transition-all ring-gray-200 hover:shadow-lg'>

                <div className='w-24 h-24'>
                  <img src={staff.image ? staff.image : staff.gender === 'male' ? '/user.png' : '/female_user.png'} alt="staff img" className='object-cover h-full w-full rounded-lg' />
                </div>

                <span>
                  <p className='font-semibold'>{staff.name}</p>
                  <p className='text-sm'>{staff.id}</p>
                  <p className='text-sm'>{staff.phone}</p>
                  <p className='bg-gray-200 w-fit rounded-sm px-1 text-sm'>{staff.role}</p>
                </span>

              </Link>
            </div>
          })}

          {staffList?.length! < 1 && <h1 className='text-gray-900 font-semibold text-lg flex items-center gap-1'>Not found <SearchX className='h-5 w-5' /></h1>}

        </div>

      </div>

    </>
  )
}

export default Staff