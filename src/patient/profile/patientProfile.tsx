import AlertModel from '@/components/alertModel';
import CardBox from '@/components/card-box';
import CustomTooltip from '@/components/customTooltip';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { authSelector } from '@/features/auth/authSlice';
import { useAppSelector } from '@/hooks';
import { Key, Pencil, Trash } from 'lucide-react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import RegisterPatient from '../register/patient-signup';
import usePatient from './handlers';




const PatientProfile = () => {

    const { id } = useParams();
    const router = useNavigate()
    const session = useAppSelector(authSelector)

    const { isPending, getPatientById, handlePatient, onDelete, current, confirmationProps, form, setForm } = usePatient()



    useEffect(() => {
        getPatientById(+id!)
    }, [id])



    return (
        <section className='flex flex-col pt-5 pb-10'>

            <div className="grid lg:grid-cols-4 gap-y-10">
                {/* image , name , action*/}
                <div className='flex items-center gap-x-3 lg:col-span-2'>
                    <div className='w-20 h-20'>
                        <img src={current?.image ? current?.image : current?.gender === 'male' ? '/user.png' : '/female_user.png'} alt="staff img" className='object-cover h-full w-full rounded-full border-2 border-border' />
                    </div>
                    <div className='space-y-2'>
                        <h1 className='text-gray-900 dark:text-gray-100 text-2xl font-bold'>{current?.name}</h1>
                        {(['admin'].includes(session.user?.role!) || (session.user?.id === +id!)) && <div className='flex gap-x-2'>
                            {/* reset */}
                            <CustomTooltip message='Reset Password'>
                                <Key className='text-green-600 w-4 h-4 cursor-pointer active:scale-95' onClick={() => { router(`../resetpassword/${id}`) }} />
                            </CustomTooltip>
                            {/* Edit */}
                            <CustomTooltip message='Edit Profile'>
                                <Pencil className='text-yellow-600 w-4 h-4 cursor-pointer active:scale-95' onClick={() => setForm(true)} />
                            </CustomTooltip>
                            {/* Delete Acccount */}
                            <CustomTooltip message='Delete Account'>
                                <Trash className='text-red-600 w-4 h-4 cursor-pointer active:scale-95' onClick={() => onDelete(current?.id!)} />
                            </CustomTooltip>
                        </div>}
                    </div>
                </div>



                {/* highlights (Inside parent grid)*/}

                <div className="col-span-full grid sm:grid-cols-2 lg:grid-cols-4  p-0.5 gap-2">
                    <CardBox borderType='dashed' title="ID" value={current?.id} />
                    <CardBox borderType='dashed' title="Role" value={current?.role} />
                    <CardBox borderType='dashed' title="Age" value={current?.age} />
                    <CardBox borderType='dashed' title="DOB" value={current?.dob} />
                    <CardBox borderType='dashed' title="Gender" value={current?.gender} />
                    <CardBox borderType='dashed' title="Email" value={current?.email} />
                    <CardBox borderType='dashed' title="Alergies" value={current?.alergies} />
                    <CardBox borderType='dashed' title="Joined with us" value={current?.createdAt} />
                </div>
            </div>



            {/* profile section */}

            <div className='my-5'>
                <h1 className='text-lg font-bold'>Profile</h1>  {/*Can be make navigator*/}

                <Separator className='my-3' />

                {/* profile data */}

                <ScrollArea className='w-full ring-1 ring-zinc-200 dark:ring-border p-2 rounded-md'>

                    <div className="grid grid-cols-2 py-2 gap-x-3 hover:bg-zinc-100 dark:hover:bg-zinc-900 border-b border-zinc-200 dark:border-border">
                        <p className='font-semibold text-sm text-gray-900 dark:text-gray-100'>Phone</p>
                        <p className='text-gray-900 dark:text-gray-100 text-sm'>{current?.phone}</p>
                    </div>

                    <div className="grid grid-cols-2 py-2 gap-x-3 hover:bg-zinc-100 dark:hover:bg-zinc-900 border-b border-zinc-200 dark:border-border">
                        <p className='font-semibold text-sm text-gray-900 dark:text-gray-100'>Email</p>
                        <p className='text-gray-900 dark:text-gray-100 text-sm'>{current?.email}</p>
                    </div>

                    <div className="grid grid-cols-2 py-2 gap-x-3 hover:bg-zinc-100 dark:hover:bg-zinc-900 border-b border-zinc-200 dark:border-border">
                        <p className='font-semibold text-sm text-gray-900 dark:text-gray-100'>Gender</p>
                        <p className='text-gray-900 dark:text-gray-100 text-sm'>{current?.gender}</p>
                    </div>

                    <div className="grid grid-cols-2 py-2 gap-x-3 hover:bg-zinc-100 dark:hover:bg-zinc-900 border-b border-zinc-200 dark:border-border">
                        <p className='font-semibold text-sm text-gray-900 dark:text-gray-100'>Blood Group</p>
                        <p className='text-gray-900 dark:text-gray-100 text-sm'>{current?.blood_group}</p>
                    </div>

                    <div className="grid grid-cols-2 py-2 gap-x-3 hover:bg-zinc-100 dark:hover:bg-zinc-900 border-b border-zinc-200 dark:border-border">
                        <p className='font-semibold text-sm text-gray-900 dark:text-gray-100'>DOB</p>
                        <p className='text-gray-900 dark:text-gray-100 text-sm'>{current?.dob}</p>
                    </div>

                    <div className="grid grid-cols-2 py-2 gap-x-3 hover:bg-zinc-100 dark:hover:bg-zinc-900 border-b border-zinc-200 dark:border-border">
                        <p className='font-semibold text-sm text-gray-900 dark:text-gray-100'>Marital Status</p>
                        <p className='text-gray-900 dark:text-gray-100 text-sm'>{current?.marital_status}</p>
                    </div>

                    <div className="grid grid-cols-2 py-2 gap-x-3 hover:bg-zinc-100 dark:hover:bg-zinc-900 border-b border-zinc-200 dark:border-border">
                        <p className='font-semibold text-sm text-gray-900 dark:text-gray-100'>Guardian Name</p>
                        <p className='text-gray-900 dark:text-gray-100 text-sm'>{current?.guardian_name}</p>
                    </div>

                    <div className="grid grid-cols-2 py-2 gap-x-3 hover:bg-zinc-100 dark:hover:bg-zinc-900 border-b border-zinc-200 dark:border-border">
                        <p className='font-semibold text-sm text-gray-900 dark:text-gray-100'>Address</p>
                        <p className='text-gray-900 dark:text-gray-100 text-sm'>{current?.address}</p>
                    </div>

                    <div className="grid grid-cols-2 py-2 gap-x-3 hover:bg-zinc-100 dark:hover:bg-zinc-900 border-b border-zinc-200 dark:border-border">
                        <p className='font-semibold text-sm text-gray-900 dark:text-gray-100'>Aadhar</p>
                        <p className='text-gray-900 dark:text-gray-100 text-sm'>{current?.aadhar}</p>
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </div>

            {/* alert model */}

            {confirmationProps.isOpen && (
                <AlertModel
                    cancel={() => confirmationProps.onCancel()}
                    continue={() => confirmationProps.onConfirm()}
                />
            )}

            {/* form modal */}

            {form && (
                <RegisterPatient
                    isPending={isPending}
                    Submit={(v) => { handlePatient(v, () => getPatientById(+id!)) }}
                    editDetails={current!}
                    onClick={() => { setForm(false) }}
                />
            )}


        </section>
    )
}



export default PatientProfile