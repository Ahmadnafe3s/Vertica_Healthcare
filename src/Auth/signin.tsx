import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm, SubmitHandler } from "react-hook-form"
import { Loader } from "lucide-react"
import { Link } from "react-router-dom"

interface Inputs {
  email: string,
  password: string
}

const SignIn = () => {

  let isPending = false

  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>()

  const submitHandler: SubmitHandler<Inputs> = (formData) => {

    console.log(formData);

  }



  return (
    <div className="bg-zinc-50 ">
      <MaxWidthWrapper className="min-h-[calc(100vh-56px-1px)] flex flex-col justify-center items-center">
        <div>
          <form className="sm:w-[500px] p-4 w-full flex flex-col gap-y-4 bg-white ring-1 ring-gray-200 rounded-lg" onSubmit={handleSubmit(submitHandler)}>

            <div className="text-center my-4">
              <h1 className="text-gray-900 font-bold text-2xl tracking-tight">Vertica Healthcare</h1>
              <p className="mt-2 text-gray-500">Sign In to your account</p>
            </div>

            <div className="flex flex-col gap-2">
              <Label>Email</Label>
              <Input type="email" placeholder="example@gmail.com" {...register('email', {
                required: { value: true, message: 'Email is required!' },
                pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/g, message: 'Enter valid email!' }
              })} />
              {errors.email?.message && <p className="text-sm text-gray-500">{errors.email?.message}</p>}
            </div>
            <div className="flex flex-col gap-2">
              <Label>Password</Label>
              <Input type="password" placeholder="password" {...register('password', { required: { value: true, message: 'Password is required!' }, })} />
              {errors.password?.message && <p className="text-sm text-gray-500">{errors.password?.message}</p>}
            </div>

            <div className="my-2">
              <Button type="submit" size={'sm'} className="w-full active:scale-95 transition-all">{isPending ? <Loader className="animate-spin" /> : 'Sign In'}</Button>
            </div>
          </form>


          {/* form footer */}

          <div className="flex text-sm my-1 justify-center items-center">
            <p className="text-gray-500">Not a existing patient?</p>
            <Link to={{ pathname: '/registerPatient' }} className={buttonVariants({ variant: 'link' })}>Rgister Patient</Link>
          </div>

        </div>
      </MaxWidthWrapper>
    </div>
  )
}

export default SignIn

