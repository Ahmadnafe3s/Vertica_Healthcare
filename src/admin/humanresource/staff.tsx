import { buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus, SearchX } from 'lucide-react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { data, Link } from 'react-router-dom'
import { getStaffs } from './HRApiHandler'
import { useDebouncedCallback } from 'use-debounce'
import { useQueryState, parseAsInteger } from 'nuqs'
import { staffs } from '@/types/staff/staff'
import CustomPagination from '@/components/customPagination'
import usePermission from '@/authz'
import EmptyList from '@/components/emptyList'
import { Separator } from '@/components/ui/separator'



const Staff = () => {

  // custom hooks
  const { loadPermission, hasPermission } = usePermission()

  // query params
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))
  const [search, setSearch] = useQueryState('search')


  // API state
  const [staffList, setStaffs] = useState<staffs>({ data: [], total_pages: 0 })


  // setting values to queryParams for seacrh
  const onSearch = useDebouncedCallback(async (value: any) => {
    value ? setSearch(value) : setSearch(null)
    setPage(1) //static (whether value or not)
  }, 400)


  // fetching staffs list
  const fetchStaffs = async () => {
    try {
      const data = await getStaffs({ page, limit: 10, search: search! })
      setStaffs(data)
    } catch ({ message }: any) {
      toast.error(message)
    }
  }


  useEffect(() => {
    fetchStaffs()
    loadPermission()
  }, [page, search])


  return (
    <>
      <div className='my-2 flex flex-col'>

        {/* top bar */}
        <div className='flex py-3 justify-between gap-y-2 md:items-center md:justify-between'>
          <h1 className='font-semibold tracking-tight'>Staff List</h1>
          <div className='flex gap-x-2 overflow-x-auto'>

            {/* visible for only admin */}

            {hasPermission('create', 'human_resource') && (
              <Link to={'../create'}
                className={buttonVariants({ variant: 'default', size: 'sm', className: 'flex gap-x-1' })}>
                <Plus />Add Staff
              </Link>
            )}

          </div>
        </div>


        <Separator />


        {/* search section */}

        <div className='pt-2 pb-5 space-y-2'>

          <Label>Search by keyword</Label>

          <div className='flex items-center gap-2 w-72 sm:w-96'>
            <Input onChange={(e) => { onSearch(e.target.value) }} placeholder='id , role , name , specialization' defaultValue={search!} />
          </div>

        </div>

        <Separator />

        {/* pagination layout */}
        <div className="flex flex-col pb-16 min-h-[77vh]">
          <div className="flex-1">
            {/* grid for staffs */}
            <div className='grid xl:grid-cols-4 gap-4 lg:grid-cols-3 sm:grid-cols-2 py-5'>
              {/* staff card */}
              {staffList?.data.map((staff, i) => (
                <div className="mx-auto w-full h-28" key={i}>
                  <Link to={{
                    pathname: `/admin/profile/staff/${staff.id}`
                  }} className='flex items-center gap-x-3 p-2.5 active:scale-95 rounded-lg ring-1 transition-all ring-gray-200 dark:ring-gray-700 hover:shadow-lg dark:hover:shadow-gray-800 '>

                    <div className='w-24 h-24'>
                      <img src={staff.image ? staff.image : staff.gender === 'male' ? '/user.png' : '/female_user.png'} alt="staff img" className='object-cover h-full w-full rounded-lg' />
                    </div>

                    <span>
                      <p className='font-semibold'>{staff.name}</p>
                      <p className='text-sm'>{staff.id}</p>
                      <p className='text-sm'>{staff.phone}</p>
                      <p className='bg-gray-200 dark:bg-gray-700 w-fit rounded-sm px-1 text-sm'>{staff.role.name}</p>
                    </span>

                  </Link>
                </div>
              ))}
            </div>

            <EmptyList length={staffList.data.length} message='No staffs found' />

          </div>

          {/* Pagination */}

          <section>
            <CustomPagination
              total_pages={staffList?.total_pages}
              currentPage={+page}
              previous={(p) => setPage(p)}
              goTo={(p) => setPage(p)}
              next={(p) => setPage(p)}
            />
          </section>
        </div>

      </div>

    </>
  )
}

export default Staff