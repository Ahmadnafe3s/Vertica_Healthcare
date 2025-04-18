import { StaffProfile } from '@/types/type';
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Key, Pencil, Trash } from 'lucide-react';
import { useAppSelector } from '@/hooks';
import { authSelector } from '@/features/auth/authSlice';
import { currencyFormat } from '@/lib/utils';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import AlertModel from '@/components/alertModel';
import toast from 'react-hot-toast';
import { currencySymbol } from '@/helpers/currencySymbol';
import { deleteStaffProfile, getStaffDetails } from '../api-handlers';




const Staffprofile = () => {

    const { id } = useParams();
    const router = useNavigate()
    const [alert, setAlert] = useState<boolean>(false)
    const session = useAppSelector(authSelector)
    const [profile, setProfile] = useState<StaffProfile>()


    const onDelete = async () => {
        try {
            const data = await deleteStaffProfile(Number(id))
            toast.success(data.message)
            router('/admin/humanresource/staff')
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    useEffect(() => {

        (async function () {
            try {
                if (!id) return null
                const data = await getStaffDetails(+id)
                setProfile(data)
            } catch ({ message }: any) {
                toast.error(message)
            }
        })() // IIFE

    }, [id])



    return (
        <section className='flex flex-col pt-5 pb-10'>

            <div className="grid lg:grid-cols-4 gap-y-6">
                {/* image , name , action*/}
                <div className='flex items-center gap-x-3 lg:col-span-2'>
                    <div className='w-20 h-20'>
                        <img src={profile?.image ? profile?.image : profile?.gender === 'male' ? '/user.png' : '/female_user.png'} alt="staff img" className='object-cover h-full w-full rounded-lg' />
                    </div>
                    <div className='space-y-2'>
                        <h1 className='text-gray-900 dark:text-gray-100 text-2xl font-bold'>{profile?.name}</h1>

                        {/* Profile Actions */}
                        <div className='flex gap-x-2'>
                            {(session.user?.role === 'admin' || session.user?.id === profile?.id) &&
                                <Key className='text-green-600 w-4 h-4 cursor-pointer active:scale-95' onClick={() => { router(`./resetpassword`) }} />
                            }
                            {session.user?.role === 'admin' &&
                                <>
                                    <Pencil className='text-yellow-600 w-4 h-4 cursor-pointer active:scale-95' onClick={() => { router(`./edit`) }} />
                                    <Trash className='text-red-600 w-4 h-4 cursor-pointer active:scale-95' onClick={() => setAlert(true)} />
                                </>
                            }
                        </div>

                    </div>
                </div>


                {/* other fields */}

                <div className="grid  grid-cols-2 gap-2 sm:grid-cols-4 lg:col-span-2 ">
                    <div className='space-y-1 p-2 border-2 border-spacing-2 border-dashed border-gray-200 dark:border-gray-700  rounded-md'>
                        <p className='text-gray-700 dark:text-gray-400'>Staff ID</p>
                        <p className='font-semibold'>{profile?.id}</p>
                    </div>
                    <div className='space-y-1 p-2 border-2 border-spacing-2 border-dashed border-gray-200 dark:border-gray-700  rounded-md'>
                        <p className='text-gray-700 dark:text-gray-400'>Role</p>
                        <p className='font-semibold'>{profile?.role?.name}</p>
                    </div>
                    <div className='space-y-1 p-2 border-2 border-spacing-2 border-dashed border-gray-200 dark:border-gray-700  rounded-md'>
                        <p className='text-gray-700 dark:text-gray-400'>Designation</p>
                        <p className='font-semibold'>{profile?.designation}</p>
                    </div>
                    <div className='space-y-1 p-2 border-2 border-spacing-2 border-dashed border-gray-200 dark:border-gray-700  rounded-md'>
                        <p className='text-gray-700 dark:text-gray-400'>Gender</p>
                        <p className='font-semibold'>{profile?.gender}</p>
                    </div>
                </div>



                {/* some other highlights (Inside parent grid)*/}

                <div className="col-span-full grid sm:grid-cols-2 lg:grid-cols-4  p-0.5 gap-1">

                    <div className='space-y-1 p-2  ring-1 ring-gray-200 dark:ring-gray-700'>
                        <p className='text-gray-700 dark:text-gray-400'>Department</p>
                        <p className='font-semibold'>{profile?.department}</p>
                    </div>
                    <div className='space-y-1 p-2  ring-1 ring-gray-200 dark:ring-gray-700'>
                        <p className='text-gray-700 dark:text-gray-400'>Specialist</p>
                        <p className='font-semibold'>{profile?.specialist}</p>
                    </div>
                    <div className='space-y-1 p-2  ring-1 ring-gray-200 dark:ring-gray-700'>
                        <p className='text-gray-700 dark:text-gray-400'>Qualification</p>
                        <p className='font-semibold'>{profile?.qualification}</p>
                    </div>
                    <div className='space-y-1 p-2  ring-1 ring-gray-200 dark:ring-gray-700'>
                        <p className='text-gray-700 dark:text-gray-400'>Experience</p>
                        <p className='font-semibold'>{profile?.work_experience}</p>
                    </div>
                    <div className='space-y-1 p-2 ring-1 ring-gray-200 dark:ring-gray-700'>
                        <p className='text-gray-700 dark:text-gray-400'>Date of birth</p>
                        <p className='font-semibold'>{profile?.dob}</p>
                    </div>
                    <div className='space-y-1 p-2 ring-1 ring-gray-200 dark:ring-gray-700'>
                        <p className='text-gray-700 dark:text-gray-400'>Date of joining</p>
                        <p className='font-semibold'>{profile?.date_of_joining}</p>
                    </div>
                    <div className='space-y-1 p-2 ring-1 ring-gray-200 dark:ring-gray-700'>
                        <p className='text-gray-700 dark:text-gray-400'>Fees {currencySymbol()}</p>
                        <p className='font-semibold'>{currencyFormat(Number(profile?.fees))}</p>
                    </div>
                </div>
            </div>



            {/* profile section */}

            <div className='my-5'>
                <h1 className='text-lg font-bold'>Profile</h1>  {/*Can be make navigator*/}
                <div className='h-px w-full bg-gray-200 dark:bg-gray-700 my-3' />

                {/* profile data */}

                <ScrollArea className='w-full ring-1 ring-gray-200 dark:ring-gray-700 p-2 rounded-md'>

                    <div className="grid grid-cols-2 py-2 gap-x-3 hover:bg-gray-100 dark:hover:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                        <p className='font-semibold text-sm text-gray-900 dark:text-gray-100'>Phone</p>
                        <p className='text-gray-900 dark:text-gray-100 text-sm'>{profile?.phone}</p>
                    </div>

                    <div className="grid grid-cols-2 py-2 gap-x-3 hover:bg-gray-100 dark:hover:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                        <p className='font-semibold text-sm text-gray-900 dark:text-gray-100'>Emergency Contact</p>
                        <p className='text-gray-900 dark:text-gray-100 text-sm'>{profile?.emergency_contact}</p>
                    </div>

                    <div className="grid grid-cols-2 py-2 gap-x-3 hover:bg-gray-100 dark:hover:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                        <p className='font-semibold text-sm text-gray-900 dark:text-gray-100'>Email</p>
                        <p className='text-gray-900 dark:text-gray-100 text-sm'>{profile?.email}</p>
                    </div>

                    <div className="grid grid-cols-2 py-2 gap-x-3 hover:bg-gray-100 dark:hover:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                        <p className='font-semibold text-sm text-gray-900 dark:text-gray-100'>Gender</p>
                        <p className='text-gray-900 dark:text-gray-100 text-sm'>{profile?.gender}</p>
                    </div>

                    <div className="grid grid-cols-2 py-2 gap-x-3 hover:bg-gray-100 dark:hover:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                        <p className='font-semibold text-sm text-gray-900 dark:text-gray-100'>Blood Group</p>
                        <p className='text-gray-900 dark:text-gray-100 text-sm'>{profile?.blood_group}</p>
                    </div>

                    <div className="grid grid-cols-2 py-2 gap-x-3 hover:bg-gray-100 dark:hover:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                        <p className='font-semibold text-sm text-gray-900 dark:text-gray-100'>DOB</p>
                        <p className='text-gray-900 dark:text-gray-100 text-sm'>{profile?.dob}</p>
                    </div>

                    <div className="grid grid-cols-2 py-2 gap-x-3 hover:bg-gray-100 dark:hover:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                        <p className='font-semibold text-sm text-gray-900 dark:text-gray-100'>Marital Status</p>
                        <p className='text-gray-900 dark:text-gray-100 text-sm'>{profile?.marital_status}</p>
                    </div>

                    <div className="grid grid-cols-2 py-2 gap-x-3 hover:bg-gray-100 dark:hover:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                        <p className='font-semibold text-sm text-gray-900 dark:text-gray-100'>Father Name</p>
                        <p className='text-gray-900 dark:text-gray-100 text-sm'>{profile?.father_name}</p>
                    </div>

                    <div className="grid grid-cols-2 py-2 gap-x-3 hover:bg-gray-100 dark:hover:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                        <p className='font-semibold text-sm text-gray-900 dark:text-gray-100'>Mother Name</p>
                        <p className='text-gray-900 dark:text-gray-100 text-sm'>{profile?.mother_name}</p>
                    </div>

                    <div className="grid grid-cols-2 py-2 gap-x-3 hover:bg-gray-100 dark:hover:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                        <p className='font-semibold text-sm text-gray-900 dark:text-gray-100'>Qualification</p>
                        <p className='text-gray-900 dark:text-gray-100 text-sm'>{profile?.qualification}</p>
                    </div>

                    <div className="grid grid-cols-2 py-2 gap-x-3 hover:bg-gray-100 dark:hover:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                        <p className='font-semibold text-sm text-gray-900 dark:text-gray-100'>Work Experience</p>
                        <p className='text-gray-900 dark:text-gray-100 text-sm'>{profile?.work_experience}</p>
                    </div>

                    <div className="grid grid-cols-2 py-2 gap-x-3 hover:bg-gray-100 dark:hover:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                        <p className='font-semibold text-sm text-gray-900 dark:text-gray-100'>Specialization</p>
                        <p className='text-gray-900 dark:text-gray-100 text-sm'>{profile?.specialist}</p>
                    </div>

                    <div className="grid grid-cols-2 py-2 gap-x-3 hover:bg-gray-100 dark:hover:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                        <p className='font-semibold text-sm text-gray-900 dark:text-gray-100'>Note</p>
                        <p className='text-gray-900 dark:text-gray-100 text-sm'>{profile?.note}</p>
                    </div>

                    <div className="grid grid-cols-2 py-2 gap-x-3 hover:bg-gray-100 dark:hover:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                        <p className='font-semibold text-sm text-gray-900 dark:text-gray-100'>PAN Number</p>
                        <p className='text-gray-900 dark:text-gray-100 text-sm'>{profile?.PAN}</p>
                    </div>

                    <div className="grid grid-cols-2 py-2 gap-x-3 hover:bg-gray-100 dark:hover:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                        <p className='font-semibold text-sm text-gray-900 dark:text-gray-100'>Current Address</p>
                        <p className='text-gray-900 dark:text-gray-100 text-sm'>{profile?.current_address}</p>
                    </div>

                    <div className="grid grid-cols-2 py-2 gap-x-3 hover:bg-gray-100 dark:hover:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                        <p className='font-semibold text-sm text-gray-900 dark:text-gray-100'>Permanant Address</p>
                        <p className='text-gray-900 dark:text-gray-100 text-sm'>{profile?.permanent_address}</p>
                    </div>

                    <div className="grid grid-cols-2 py-2 gap-x-3 hover:bg-gray-100 dark:hover:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                        <p className='font-semibold text-sm text-gray-900 dark:text-gray-100'>National Identification Number</p>
                        <p className='text-gray-900 dark:text-gray-100 text-sm'>{profile?.national_identification_number}</p>
                    </div>

                    <div className="grid grid-cols-2 py-2 gap-x-3 hover:bg-gray-100 dark:hover:bg-gray-900">
                        <p className='font-semibold text-sm text-gray-900 dark:text-gray-100'>Loacl Identification Number</p>
                        <p className='text-gray-900 dark:text-gray-100 text-sm'>{profile?.local_identification_number}</p>
                    </div>

                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </div>

            {alert && <AlertModel cancel={() => { setAlert(false) }} continue={() => { onDelete() }} />}
        </section>
    )
}

export default Staffprofile