import AlertModel from '@/components/alertModel';
import CardBox from '@/components/card-box';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import UserImage from '@/components/user-image';
import { authSelector } from '@/features/auth/authSlice';
import { currencySymbol } from '@/helpers/currencySymbol';
import { useAppSelector } from '@/hooks';
import { currencyFormat } from '@/lib/utils';
import StaffApi from '@/services/staff-api';
import { StaffProfile } from '@/types/staff/staff';
import { Key, Pencil, Trash } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';




const Staffprofile = () => {

    const { id } = useParams();
    const router = useNavigate()
    const [alert, setAlert] = useState<boolean>(false)
    const session = useAppSelector(authSelector)
    const [profile, setProfile] = useState<StaffProfile>()


    const onDelete = async () => {
        try {
            const data = await StaffApi.deleteStaffProfile(Number(id))
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
                const data = await StaffApi.getStaffById(+id)
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
                <div className='flex items-center lg:col-span-2'>
                    <UserImage url={profile?.image!} gender={profile?.gender!}
                        width='w-fit'
                        imageClass='w-20 h-20'
                    />
                    <div className='space-y-2'>
                        <h1 className='text-gray-900 dark:text-gray-100 text-xl font-bold'>{profile?.name}</h1>

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
                    <CardBox borderType='dashed' title="Staff ID" value={profile?.id} />
                    <CardBox borderType='dashed' title="Role" value={profile?.role?.name} />
                    <CardBox borderType='dashed' title="Designation" value={profile?.designation} />
                    <CardBox borderType='dashed' title="Gender" value={profile?.gender} />
                </div>

                {/* some other highlights (Inside parent grid)*/}

                <div className="col-span-full grid sm:grid-cols-2 lg:grid-cols-4  p-0.5 gap-3">
                    <CardBox borderType='solid' title="Department" value={profile?.department} />
                    {/* <CardBox borderType='solid' title="Specialist" value={profile?.specialist} /> */}
                    <CardBox borderType='solid' title="Qualification" value={profile?.qualification} />
                    <CardBox borderType='solid' title="Work Experience" value={profile?.work_experience} />
                    <CardBox borderType='solid' title="Date of birth" value={profile?.dob} />
                    <CardBox borderType='solid' title="Date of joining" value={profile?.date_of_joining} />
                    <CardBox borderType='solid' title={`Normal Fees ${currencySymbol()}`} value={currencyFormat(Number(profile?.normal_fees))} />
                    <CardBox borderType='solid' title={`Emergency Fees ${currencySymbol()}`} value={currencyFormat(Number(profile?.emergency_fees))} />
                    <CardBox borderType='solid' title={`Salary ${currencySymbol()}`} value={currencyFormat(Number(profile?.salary))} />
                </div>
            </div>



            {/* profile section */}

            <div className='my-5'>

                <h1 className='text-lg font-bold'>Profile</h1>  {/*Can be make navigator*/}

                <Separator className='my-3' />

                {/* profile data */}

                <ScrollArea className='w-full ring-1 ring-gray-200 dark:ring-zinc-800 p-2 rounded-md'>

                    <div className="grid grid-cols-2 py-2 gap-x-3 hover:bg-gray-100 dark:hover:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800">
                        <p className='font-semibold text-sm text-gray-900 dark:text-gray-100'>Phone</p>
                        <p className='text-gray-900 dark:text-gray-100 text-sm'>{profile?.phone}</p>
                    </div>

                    <div className="grid grid-cols-2 py-2 gap-x-3 hover:bg-gray-100 dark:hover:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800">
                        <p className='font-semibold text-sm text-gray-900 dark:text-gray-100'>Emergency Contact</p>
                        <p className='text-gray-900 dark:text-gray-100 text-sm'>{profile?.emergency_contact}</p>
                    </div>

                    <div className="grid grid-cols-2 py-2 gap-x-3 hover:bg-gray-100 dark:hover:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800">
                        <p className='font-semibold text-sm text-gray-900 dark:text-gray-100'>Email</p>
                        <p className='text-gray-900 dark:text-gray-100 text-sm'>{profile?.email}</p>
                    </div>

                    <div className="grid grid-cols-2 py-2 gap-x-3 hover:bg-gray-100 dark:hover:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800">
                        <p className='font-semibold text-sm text-gray-900 dark:text-gray-100'>Gender</p>
                        <p className='text-gray-900 dark:text-gray-100 text-sm'>{profile?.gender}</p>
                    </div>

                    <div className="grid grid-cols-2 py-2 gap-x-3 hover:bg-gray-100 dark:hover:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800">
                        <p className='font-semibold text-sm text-gray-900 dark:text-gray-100'>Blood Group</p>
                        <p className='text-gray-900 dark:text-gray-100 text-sm'>{profile?.blood_group}</p>
                    </div>

                    <div className="grid grid-cols-2 py-2 gap-x-3 hover:bg-gray-100 dark:hover:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800">
                        <p className='font-semibold text-sm text-gray-900 dark:text-gray-100'>DOB</p>
                        <p className='text-gray-900 dark:text-gray-100 text-sm'>{profile?.dob}</p>
                    </div>

                    <div className="grid grid-cols-2 py-2 gap-x-3 hover:bg-gray-100 dark:hover:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800">
                        <p className='font-semibold text-sm text-gray-900 dark:text-gray-100'>Marital Status</p>
                        <p className='text-gray-900 dark:text-gray-100 text-sm'>{profile?.marital_status}</p>
                    </div>

                    <div className="grid grid-cols-2 py-2 gap-x-3 hover:bg-gray-100 dark:hover:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800">
                        <p className='font-semibold text-sm text-gray-900 dark:text-gray-100'>Father Name</p>
                        <p className='text-gray-900 dark:text-gray-100 text-sm'>{profile?.father_name}</p>
                    </div>

                    <div className="grid grid-cols-2 py-2 gap-x-3 hover:bg-gray-100 dark:hover:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800">
                        <p className='font-semibold text-sm text-gray-900 dark:text-gray-100'>Mother Name</p>
                        <p className='text-gray-900 dark:text-gray-100 text-sm'>{profile?.mother_name}</p>
                    </div>

                    <div className="grid grid-cols-2 py-2 gap-x-3 hover:bg-gray-100 dark:hover:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800">
                        <p className='font-semibold text-sm text-gray-900 dark:text-gray-100'>Qualification</p>
                        <p className='text-gray-900 dark:text-gray-100 text-sm'>{profile?.qualification}</p>
                    </div>

                    <div className="grid grid-cols-2 py-2 gap-x-3 hover:bg-gray-100 dark:hover:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800">
                        <p className='font-semibold text-sm text-gray-900 dark:text-gray-100'>Work Experience</p>
                        <p className='text-gray-900 dark:text-gray-100 text-sm'>{profile?.work_experience}</p>
                    </div>

                    <div className="grid grid-cols-2 py-2 gap-x-3 hover:bg-gray-100 dark:hover:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800">
                        <p className='font-semibold text-sm text-gray-900 dark:text-gray-100'>Specialist</p>
                        <p className='text-gray-900 dark:text-gray-100 text-sm'>{profile?.specialist.map(item => item.name).join(', ')}</p>
                    </div>

                    <div className="grid grid-cols-2 py-2 gap-x-3 hover:bg-gray-100 dark:hover:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800">
                        <p className='font-semibold text-sm text-gray-900 dark:text-gray-100'>PAN Number</p>
                        <p className='text-gray-900 dark:text-gray-100 text-sm'>{profile?.PAN}</p>
                    </div>

                    <div className="grid grid-cols-2 py-2 gap-x-3 hover:bg-gray-100 dark:hover:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800">
                        <p className='font-semibold text-sm text-gray-900 dark:text-gray-100'>Current Address</p>
                        <p className='text-gray-900 dark:text-gray-100 text-sm'>{profile?.current_address}</p>
                    </div>

                    <div className="grid grid-cols-2 py-2 gap-x-3 hover:bg-gray-100 dark:hover:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800">
                        <p className='font-semibold text-sm text-gray-900 dark:text-gray-100'>Permanant Address</p>
                        <p className='text-gray-900 dark:text-gray-100 text-sm'>{profile?.permanent_address}</p>
                    </div>

                    <div className="grid grid-cols-2 py-2 gap-x-3 hover:bg-gray-100 dark:hover:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800">
                        <p className='font-semibold text-sm text-gray-900 dark:text-gray-100'>National Identification Number</p>
                        <p className='text-gray-900 dark:text-gray-100 text-sm'>{profile?.national_identification_number}</p>
                    </div>

                    <div className="grid grid-cols-2 py-2 gap-x-3 hover:bg-gray-100 dark:hover:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800">
                        <p className='font-semibold text-sm text-gray-900 dark:text-gray-100'>Loacl Identification Number</p>
                        <p className='text-gray-900 dark:text-gray-100 text-sm'>{profile?.local_identification_number}</p>
                    </div>

                    {
                        (session.user?.role === 'admin' || session.user?.id === profile?.id) &&
                        <>
                            <div className="grid grid-cols-2 py-2 gap-x-3 hover:bg-gray-100 dark:hover:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800">
                                <p className='font-semibold text-sm text-gray-900 dark:text-gray-100'>Nominee Name</p>
                                <p className='text-gray-900 dark:text-gray-100 text-sm'>{profile?.nominee_name}</p>
                            </div>

                            <div className="grid grid-cols-2 py-2 gap-x-3 hover:bg-gray-100 dark:hover:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800">
                                <p className='font-semibold text-sm text-gray-900 dark:text-gray-100'>Relation</p>
                                <p className='text-gray-900 dark:text-gray-100 text-sm'>{profile?.relation}</p>
                            </div>

                            <div className="grid grid-cols-2 py-2 gap-x-3 hover:bg-gray-100 dark:hover:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800">
                                <p className='font-semibold text-sm text-gray-900 dark:text-gray-100'>Account Holder</p>
                                <p className='text-gray-900 dark:text-gray-100 text-sm'>{profile?.account_holder}</p>
                            </div>

                            <div className="grid grid-cols-2 py-2 gap-x-3 hover:bg-gray-100 dark:hover:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800">
                                <p className='font-semibold text-sm text-gray-900 dark:text-gray-100'>Account Number</p>
                                <p className='text-gray-900 dark:text-gray-100 text-sm'>{profile?.account_number}</p>
                            </div>

                            <div className="grid grid-cols-2 py-2 gap-x-3 hover:bg-gray-100 dark:hover:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800">
                                <p className='font-semibold text-sm text-gray-900 dark:text-gray-100'>Bank Name</p>
                                <p className='text-gray-900 dark:text-gray-100 text-sm'>{profile?.bank_name}</p>
                            </div>

                            <div className="grid grid-cols-2 py-2 gap-x-3 hover:bg-gray-100 dark:hover:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800">
                                <p className='font-semibold text-sm text-gray-900 dark:text-gray-100'>Branch</p>
                                <p className='text-gray-900 dark:text-gray-100 text-sm'>{profile?.branch}</p>
                            </div>

                            <div className="grid grid-cols-2 py-2 gap-x-3 hover:bg-gray-100 dark:hover:bg-zinc-900">
                                <p className='font-semibold text-sm text-gray-900 dark:text-gray-100'>Ifsc Code</p>
                                <p className='text-gray-900 dark:text-gray-100 text-sm'>{profile?.ifsc_code}</p>
                            </div>
                        </>
                    }

                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </div>

            {alert && <AlertModel cancel={() => { setAlert(false) }} continue={() => { onDelete() }} />}
        </section>
    )
}

export default Staffprofile