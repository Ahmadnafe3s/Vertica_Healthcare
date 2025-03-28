import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Key, Pencil, Trash } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { authSelector, logout } from '@/features/auth/authSlice';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import toast from 'react-hot-toast';
import { deletePatient, getPatientDetails } from './ApiHandlers';
import { PatientDetails } from '@/types/patient/patient';
import CustomTooltip from '@/components/customTooltip';
import AlertModel from '@/components/alertModel';
import { Separator } from '@/components/ui/separator';




const PatientProfile = () => {

    const { id } = useParams();
    const router = useNavigate()
    const [alert, setAlert] = useState<boolean>(false)
    const session = useAppSelector(authSelector)
    const dispatch = useAppDispatch()
    const [profile, setProfile] = useState<PatientDetails>()


    const onDelete = async () => {
        try {
            const data = await deletePatient(Number(id))
            toast.success(data.message)
            router('/')
            dispatch(logout())
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    useEffect(() => {

        (async function () {
            try {
                if (!id) return null
                const data = await getPatientDetails(+id)
                setProfile(data)
            } catch ({ message }: any) {
                toast.error(message)
            }
        })() // IIFE

    }, [])



    return (
        <section className='flex flex-col pt-5 pb-10'>

            <div className="grid lg:grid-cols-4 gap-y-10">
                {/* image , name , action*/}
                <div className='flex items-center gap-x-3 lg:col-span-2'>
                    <div className='w-20 h-20'>
                        <img src={profile?.image ? profile?.image : profile?.gender === 'male' ? '/user.png' : '/female_user.png'} alt="staff img" className='object-cover h-full w-full rounded-lg' />
                    </div>
                    <div className='space-y-2'>
                        <h1 className='text-gray-900 dark:text-gray-100 text-2xl font-bold'>{profile?.name}</h1>
                        {(['admin'].includes(session.user?.role!) || (session.user?.id === +id!)) && <div className='flex gap-x-2'>
                            {/* reset */}
                            <CustomTooltip message='Reset Password'>
                                <Key className='text-green-600 w-4 h-4 cursor-pointer active:scale-95' onClick={() => { router(`../resetpassword/${id}`) }} />
                            </CustomTooltip>
                            {/* Edit */}
                            <CustomTooltip message='Edit Profile'>
                                <Pencil className='text-yellow-600 w-4 h-4 cursor-pointer active:scale-95' onClick={() => { router(`../edit/${profile?.id}`) }} />
                            </CustomTooltip>
                            {/* Delete Acccount */}
                            <CustomTooltip message='Delete Account'>
                                <Trash className='text-red-600 w-4 h-4 cursor-pointer active:scale-95' onClick={() => setAlert(true)} />
                            </CustomTooltip>
                        </div>}
                    </div>
                </div>



                {/* highlights (Inside parent grid)*/}

                <div className="col-span-full grid sm:grid-cols-2 lg:grid-cols-4  p-0.5 gap-2">

                    <div className='space-y-1 p-2 border-2 border-spacing-2 border-dashed border-gray-200  dark:border-gray-800 rounded-md'>
                        <p className='text-gray-700 dark:text-gray-400'>ID</p>
                        <p className='font-semibold'>{profile?.id}</p>
                    </div>
                    <div className='space-y-1 p-2 border-2 border-spacing-2 border-dashed border-gray-200  dark:border-gray-800 rounded-md'>
                        <p className='text-gray-700 dark:text-gray-400'>Role</p>
                        <p className='font-semibold'>{profile?.role}</p>
                    </div>
                    <div className='space-y-1 p-2 border-2 border-spacing-2 border-dashed border-gray-200  dark:border-gray-800 rounded-md'>
                        <p className='text-gray-700 dark:text-gray-400'>Age</p>
                        <p className='font-semibold'>{profile?.age}</p>
                    </div>
                    <div className='space-y-1 p-2 border-2 border-spacing-2 border-dashed border-gray-200  dark:border-gray-800 rounded-md'>
                        <p className='text-gray-700 dark:text-gray-400'>DOB</p>
                        <p className='font-semibold'>{profile?.dob}</p>
                    </div>
                    <div className='space-y-1 p-2 border-2 border-spacing-2 border-dashed border-gray-200  dark:border-gray-800 rounded-md'>
                        <p className='text-gray-700 dark:text-gray-400'>Gender</p>
                        <p className='font-semibold'>{profile?.gender}</p>
                    </div>
                    <div className='space-y-1 p-2 border-2 border-spacing-2 border-dashed border-gray-200  dark:border-gray-800 rounded-md'>
                        <p className='text-gray-700 dark:text-gray-400'>Email</p>
                        <p className='font-semibold'>{profile?.email}</p>
                    </div>
                    <div className='space-y-1 p-2 border-2 border-spacing-2 border-dashed border-gray-200  dark:border-gray-800 rounded-md'>
                        <p className='text-gray-700 dark:text-gray-400'>Alergies</p>
                        <p className='font-semibold'>{profile?.alergies}</p>
                    </div>
                    <div className='space-y-1 p-2 border-2 border-spacing-2 border-dashed border-gray-200  dark:border-gray-800 rounded-md'>
                        <p className='text-gray-700 dark:text-gray-400'>Joined with us</p>
                        <p className='font-semibold'>{profile?.createdAt}</p>
                    </div>


                </div>
            </div>



            {/* profile section */}

            <div className='my-5'>
                <h1 className='text-lg font-bold'>Profile</h1>  {/*Can be make navigator*/}

                <Separator className='my-3' />

                {/* profile data */}

                <ScrollArea className='w-full ring-1 ring-gray-200 dark:ring-gray-800 p-2 rounded-md'>
                    <div className="grid grid-cols-2 py-2 gap-x-3 hover:bg-gray-100 dark:hover:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                        <p className='font-semibold text-sm text-gray-900 dark:text-gray-100'>Phone</p>
                        <p className='text-gray-900 dark:text-gray-100 text-sm'>{profile?.phone}</p>
                    </div>

                    <div className="grid grid-cols-2 py-2 gap-x-3 hover:bg-gray-100 dark:hover:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                        <p className='font-semibold text-sm text-gray-900 dark:text-gray-100'>Email</p>
                        <p className='text-gray-900 dark:text-gray-100 text-sm'>{profile?.email}</p>
                    </div>

                    <div className="grid grid-cols-2 py-2 gap-x-3 hover:bg-gray-100 dark:hover:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                        <p className='font-semibold text-sm text-gray-900 dark:text-gray-100'>Gender</p>
                        <p className='text-gray-900 dark:text-gray-100 text-sm'>{profile?.gender}</p>
                    </div>

                    <div className="grid grid-cols-2 py-2 gap-x-3 hover:bg-gray-100 dark:hover:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                        <p className='font-semibold text-sm text-gray-900 dark:text-gray-100'>Blood Group</p>
                        <p className='text-gray-900 dark:text-gray-100 text-sm'>{profile?.blood_group}</p>
                    </div>

                    <div className="grid grid-cols-2 py-2 gap-x-3 hover:bg-gray-100 dark:hover:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                        <p className='font-semibold text-sm text-gray-900 dark:text-gray-100'>DOB</p>
                        <p className='text-gray-900 dark:text-gray-100 text-sm'>{profile?.dob}</p>
                    </div>

                    <div className="grid grid-cols-2 py-2 gap-x-3 hover:bg-gray-100 dark:hover:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                        <p className='font-semibold text-sm text-gray-900 dark:text-gray-100'>Marital Status</p>
                        <p className='text-gray-900 dark:text-gray-100 text-sm'>{profile?.marital_status}</p>
                    </div>

                    <div className="grid grid-cols-2 py-2 gap-x-3 hover:bg-gray-100 dark:hover:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                        <p className='font-semibold text-sm text-gray-900 dark:text-gray-100'>Guardian Name</p>
                        <p className='text-gray-900 dark:text-gray-100 text-sm'>{profile?.guardian_name}</p>
                    </div>

                    <div className="grid grid-cols-2 py-2 gap-x-3 hover:bg-gray-100 dark:hover:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                        <p className='font-semibold text-sm text-gray-900 dark:text-gray-100'>Address</p>
                        <p className='text-gray-900 dark:text-gray-100 text-sm'>{profile?.address}</p>
                    </div>

                    <div className="grid grid-cols-2 py-2 gap-x-3 hover:bg-gray-100 dark:hover:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                        <p className='font-semibold text-sm text-gray-900 dark:text-gray-100'>Aadhar</p>
                        <p className='text-gray-900 dark:text-gray-100 text-sm'>{profile?.aadhar}</p>
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </div>

            {alert && <AlertModel cancel={() => { setAlert(false) }} continue={() => { onDelete() }} />}
        </section>
    )
}



export default PatientProfile