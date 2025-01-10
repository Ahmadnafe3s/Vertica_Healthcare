import { authSelector } from '@/features/auth/authSlice'
import { useAppSelector } from '@/hooks'
import { HTMLAttributes } from 'react'
import { Button } from './ui/button'

interface userModelProps extends HTMLAttributes<HTMLDivElement> {
    onLogout: () => void;
    onProfile: () => void;
}

const UserModel = ({ onLogout, onProfile }: userModelProps) => {

    const session = useAppSelector(authSelector)

    return (
        <>
            <div className="bg-white w-[300px] p-2.5 z-[100] flex flex-col ring-1 shadow rounded-xl fixed top-16 right-2 sm:right-5 ring-gray-200">
                <div className="flex items-center gap-x-3 my-2">
                    <img src="/user.png" alt="" className="w-12 border-2 border-gray-300 rounded-full" />
                    <div className="text-sm tracking-tight leading-tight">
                        <p className="font-semibold">{session.user?.name}</p>
                        <p>{session.user?.email}</p>
                    </div>
                </div>
                <div className="h-px bg-gray-200"></div>
                <div className="my-2 text-sm text-gray-800 cursor-pointer flex flex-col gap-y-2">
                    <p className="flex items-center"> Manage Account</p>
                    <Button size={'sm'} onClick={onLogout}>logout</Button>
                </div>
            </div>
        </>
    )
}

export default UserModel