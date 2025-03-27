import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Loader } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { patientRegistrationSchema, DefaultValues, patientUpdateSchema } from '@/formSchemas/patientRegisterFormSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { createPatient, getPatientDetails, updatePatient } from '@/patient/profile/ApiHandlers'
import { useNavigate, useParams } from 'react-router-dom'



const RegisterPatient = () => {

    // params
    const { id } = useParams()

    // router
    const router = useNavigate()

    // loading state
    const [isPending, setPending] = useState<boolean>(false)

    const schema = id ? patientUpdateSchema : patientRegistrationSchema

    const patientRegistrationform = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: DefaultValues
    })


    const fetchPatientDetails = async () => {
        try {
            const data = await getPatientDetails(+id!)
            patientRegistrationform.reset({
                ...data,
                image: undefined, // Exclude or handle image properly if needed
            });

        } catch ({ message }: any) {
            toast.error(message)
        }
    }

    const onSubmit = async (formData: z.infer<typeof schema>) => {
        try {

            setPending(true)
            let data
            id ? (
                data = await updatePatient(+id, formData),
                router(`../profile/${id}`)
            ) : (
                data = await createPatient(formData),
                router(`/signin`)
            )

            toast.success(data.message)

        } catch (error: any) {
            toast.error(error.response.data.message)
        }
        finally {
            setPending(false)
        }

    }


    useEffect(() => {
        if (id) fetchPatientDetails()
    }, [])


    return (

        <section className='bg-slate-50'>

            <MaxWidthWrapper className="pt-14 md:pt-20 pb-20 lg:pb-32">

                <Form {...patientRegistrationform}>
                    <form className='ring-1 ring-gray-200 grid lg:grid-cols-3 sm:grid-cols-2 p-5 gap-5 rounded-lg' onSubmit={patientRegistrationform.handleSubmit(onSubmit)}>

                        {/* form header */}
                        <div className='pt-2 pb-3 border-b border-gray-200 col-span-full'>
                            <h1 className='text-xl text-gray-900 font-bold'>Register Patient</h1>
                        </div>

                        {/* input fields */}


                        {/* Patient Name */}

                        <FormField control={patientRegistrationform.control} name='name' render={({ field }) => {
                            return <FormItem className="flex flex-col gap-3">
                                <FormLabel>Patient Name</FormLabel>
                                <FormControl>
                                    <Input type='text' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        }} />

                        {/* Guardian */}

                        <FormField control={patientRegistrationform.control} name='guardian_name' render={({ field }) => {
                            return <FormItem className="flex flex-col gap-3">
                                <FormLabel>Guardian Name</FormLabel>
                                <FormControl>
                                    <Input type='text' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        }} />


                        {/* Gender */}

                        <FormField control={patientRegistrationform.control} name='gender' render={({ field }) => {
                            return <FormItem className="flex flex-col gap-3">
                                <FormLabel>Gender</FormLabel>
                                <FormControl>
                                    <Select value={field.value || ''} onValueChange={(value) => { field.onChange(value) }}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>

                                        <SelectContent>
                                            <SelectItem value="male">Male</SelectItem>
                                            <SelectItem value="female">Female</SelectItem>
                                            <SelectItem value="other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        }} />


                        {/* DOB */}

                        <FormField control={patientRegistrationform.control} name='dob' render={({ field }) => {
                            return <FormItem className="flex flex-col gap-3">
                                <FormLabel>DOB</FormLabel>
                                <FormControl>
                                    <Input type='date' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        }} />


                        {/* Age */}

                        <FormField control={patientRegistrationform.control} name='age' render={({ field }) => {
                            return <FormItem className="flex flex-col gap-3">
                                <FormLabel>Age</FormLabel>
                                <FormControl>
                                    <Input type='number' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        }} />


                        {/* Blood Group */}

                        <FormField control={patientRegistrationform.control} name='blood_group' render={({ field }) => {
                            return <FormItem className="flex flex-col gap-3">
                                <FormLabel>Blood Group</FormLabel>
                                <FormControl>
                                    <Select value={field.value || ''} onValueChange={(value) => { field.onChange(value) }}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent>

                                            <SelectItem defaultValue={'select'} value={'select'}>Select</SelectItem>
                                            <SelectItem value="A+">A+</SelectItem>
                                            <SelectItem value="A-">A-</SelectItem>
                                            <SelectItem value="B+">B+</SelectItem>
                                            <SelectItem value="B-">B-</SelectItem>
                                            <SelectItem value="AB+">AB+</SelectItem>
                                            <SelectItem value="AB-">AB-</SelectItem>
                                            <SelectItem value="O+">O+</SelectItem>
                                            <SelectItem value="O-">O-</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        }} />



                        {/* Marital Status */}

                        <FormField control={patientRegistrationform.control} name='marital_status' render={({ field }) => {
                            return <FormItem className="flex flex-col gap-3">
                                <FormLabel>Marital Status</FormLabel>
                                <FormControl>
                                    <Select value={field.value || ''} onValueChange={(value) => { field.onChange(value) }}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="married">Married</SelectItem>
                                            <SelectItem value="single">Single</SelectItem>
                                            <SelectItem value="widowed">Widowed</SelectItem>
                                            <SelectItem value="separated">Separated</SelectItem>
                                            <SelectItem value="not specified">Not specified</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        }} />


                        {/* Patient Image */}

                        <FormField control={patientRegistrationform.control} name='image' render={({ field }) => {
                            return <FormItem className="flex flex-col gap-3">
                                <FormLabel>Image</FormLabel>
                                <FormControl>
                                    <Input
                                        type="file"
                                        accept='image/*'
                                        onChange={(e) => {
                                            field.onChange(e.target.files?.[0])  // overwriting
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        }} />


                        {/* phone */}

                        <FormField control={patientRegistrationform.control} name='phone' render={({ field }) => {
                            return <FormItem className="flex flex-col gap-3">
                                <FormLabel>Phone</FormLabel>
                                <FormControl>
                                    <Input type='number' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        }} />


                        {/* email */}

                        <FormField control={patientRegistrationform.control} name='email' render={({ field }) => {
                            return <FormItem className="flex flex-col gap-3">
                                <FormLabel>Email Address</FormLabel>
                                <FormControl>
                                    <Input type='email' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        }} />


                        {/* password */}

                        {!id && <FormField control={patientRegistrationform.control} name='password' render={({ field }) => {
                            return <FormItem className="flex flex-col gap-3">
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type='password' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        }} />}


                        {/* alergies */}

                        <FormField control={patientRegistrationform.control} name='alergies' render={({ field }) => {
                            return <FormItem className="flex flex-col gap-3">
                                <FormLabel>Alergies</FormLabel>
                                <FormControl>
                                    <Input type='text' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        }} />


                        {/* Aadhar No */}

                        <FormField control={patientRegistrationform.control} name='aadhar' render={({ field }) => {
                            return <FormItem className="flex flex-col gap-3">
                                <FormLabel>Aadhar</FormLabel>
                                <FormControl>
                                    <Input type='number' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        }} />


                        {/* Address */}

                        <FormField control={patientRegistrationform.control} name='address' render={({ field }) => {
                            return <FormItem className="flex flex-col gap-3">
                                <FormLabel>Address</FormLabel>
                                <FormControl>
                                    <Input type='text' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        }} />


                        {/* button section */}

                        <div className="col-span-full gap-2 flex flex-col sm:justify-end sm:flex-row">

                            <div className='order-2 sm:order-none'>
                                <Button type='button' size={'sm'} variant={'ghost'} className='w-full' onClick={() => { patientRegistrationform.reset() }}>Reset</Button>
                            </div>
                            <div>
                                <Button type='submit' size={'sm'} className='w-full'>{isPending ? <Loader className='animate-spin' /> : 'Save Patient'}</Button>
                            </div>

                        </div>

                    </form>
                </Form>
            </MaxWidthWrapper>
        </section>
    )
}

export default RegisterPatient