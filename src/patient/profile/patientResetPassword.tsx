import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ResetPasswordForm } from '@/formSchemas/resetPasswordFormSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { Loader } from 'lucide-react'
import { useState } from 'react'
import { resetPatientPassword } from './ApiHandlers'
import { useNavigate, useParams } from 'react-router-dom'



const PatientResetPassword = () => {

    const { id } = useParams()
    const router = useNavigate()

    const [isPending, setPending] = useState<boolean>(false)

    const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof ResetPasswordForm>>({
        resolver: zodResolver(ResetPasswordForm)
    })


    const onResetPassword = async (formData: z.infer<typeof ResetPasswordForm>) => {
        try {
            setPending(true)
            const { password } = formData
            const data = await resetPatientPassword(password, +id!)
            toast.success(data.message)
            router(`../profile/${id}`)
        } catch ({ message }: any) {
            toast.error(message)
        } finally {
            setPending(false)
        }
    }


    return (
        <section className='h-[calc(100vh-56px-1px)] flex items-center justify-center'>
            <form className='flex-1 sm:flex-none sm:w-[400px] flex flex-col p-4 ring-1 ring-gray-200 dark:ring-gray-800 rounded-lg gap-y-3' onSubmit={handleSubmit(onResetPassword)}>

                <div className='text-center'>
                    <h1 className='text-lg text-gray-900 dark:text-gray-100 font-bold'>Reset Password</h1>
                    <p className='text-sm text-gray-500'>Enter your password carefully</p>
                </div>

                <div className='space-y-1'>
                    <Label>Password</Label>
                    <Input type='password' {...register('password')} placeholder='Password' />
                    {errors.password && <p className="text-sm text-red-500">{errors.password?.message}</p>}
                </div>
                <div className='space-y-1'>
                    <Label>Confirm Password</Label>
                    <Input type='password' {...register('confirm_password')} placeholder='Confirm Password' />
                    {errors.confirm_password && <p className="text-sm text-red-500">{errors.confirm_password?.message}</p>}
                </div>

                <div className='space-y-1'>
                    <Button type='submit' className='w-full' size={'sm'}>Save Password {isPending && <Loader className='animate-spin' />}</Button>
                </div>
            </form>
        </section>
    )
}

export default PatientResetPassword