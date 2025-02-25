import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { createStaffFormSchema } from '@/formSchemas/createStaffFormSchema'
import { bloodGroups, departments, maritalStatus, roles } from '@/helpers/formSelectOptions'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import { z } from 'zod'
import { createStaff, fetchStaffProfile, updateStaff } from './HRApiHandler'
import { currencySymbol } from '@/helpers/currencySymbol'

const CreateStaff = () => {

  const { id } = useParams()

  const [isPending, setPending] = useState<boolean>(false)
  const [editMode, setEditmode] = useState<string | undefined>(id)

  const { handleSubmit, reset, register, setValue, control, formState: { errors } } = useForm<z.infer<typeof createStaffFormSchema>>({
    resolver: zodResolver(createStaffFormSchema)
  })


  async function onSubmit(formData: z.infer<typeof createStaffFormSchema>) {
    try {

      setPending(true)

      let data;

      if (editMode) {
        data = await updateStaff(Number(id), formData)
      } else {
        data = await createStaff(formData)
      }
      toast.success(data.message)

    } catch ({ message }: any) {
      toast.error(message)
    }

    finally {
      setPending(false)
    }
  }



  useEffect(() => {

    try {

      console.log(editMode);

      (async function fetchData() {
        if (editMode) {
          const data = await fetchStaffProfile(Number(id))
          setValue('name', data.name)
          setValue('role', data.role)
          setValue('designation', data.designation)
          setValue('department', data.department)
          setValue('fees', data.fees)
          setValue('father_name', data.father_name)
          setValue('mother_name', data.mother_name)
          setValue('gender', data.gender)
          setValue('marital_status', data.marital_status)
          setValue('blood_group', data.blood_group)
          setValue('dob', data.dob)
          setValue('date_of_joining', data.date_of_joining)
          setValue('phone', data.phone)
          setValue('emergency_contact', data.emergency_contact)
          setValue('email', data.email)
          setValue('current_address', data.current_address)
          setValue('permanent_address', data.permanent_address)
          setValue('qualification', data.qualification)
          setValue('specialist', data.specialist)
          setValue('work_experience', data.work_experience)
          setValue('note', data.note)
          setValue('PAN', data.PAN)
          setValue('national_identification_number', data.national_identification_number)
          setValue('local_identification_number', data.local_identification_number)
        }
      })()

    } catch ({ message }: any) {
      toast.error(message)
    }

  }, [])



  return (
    <section className='bg-slate-50 pt-4 pb-20'>
      <form className='p-5 grid lg:grid-cols-4 md:grid-cols-3 ring-1 ring-gray-200 rounded-lg gap-4' onSubmit={handleSubmit(onSubmit)}>

        {/* header */}
        <div className="col-span-full">
          <h1 className='text-lg font-bold'>Basic Information</h1>
        </div>

        {/* separator */}
        <div className="h-px bg-gray-200 col-span-full mt-3 mb-4" />


        {/* name */}

        <div className="w-full flex flex-col gap-y-2">
          <Label>Name</Label>
          <Input type='text' {...register('name')} />
          {errors.name && <p className='text-sm text-red-500'>{errors.name.message}</p>}
        </div>

        {/* role */}

        <div className="w-full flex flex-col gap-y-2">
          <Controller control={control} name='role' render={({ field }) => {
            return <>
              <Label>Role</Label>
              <Select value={field.value || ''} onValueChange={(value) => { field.onChange(value) }}>
                <SelectTrigger >
                  <SelectValue placeholder="Select" />
                </SelectTrigger>

                <SelectContent className='z-[200]'>
                  {roles?.map((role, index) => {
                    return <SelectItem key={index} value={role.value}>{role.label}</SelectItem>
                  })}
                </SelectContent>
              </Select>
            </>
          }} />
          {errors.role && <p className='text-sm text-red-500'>{errors.role.message}</p>}
        </div>


        {/* Designation */}

        <div className="w-full flex flex-col gap-y-2">
          <Controller control={control} name='designation' render={({ field }) => {
            return <>
              <Label>Designation</Label>
              <Select value={field.value || ''} onValueChange={(value) => { field.onChange(value) }}>
                <SelectTrigger >
                  <SelectValue placeholder="Select" />
                </SelectTrigger>

                <SelectContent className='z-[200]'>
                  {roles?.map((role, index) => {
                    return <SelectItem key={index} value={role.value}>{role.label}</SelectItem>
                  })}
                </SelectContent>
              </Select>
            </>
          }} />
          {errors.designation && <p className='text-sm text-red-500'>{errors.designation.message}</p>}
        </div>


        {/* Department */}

        <div className="w-full flex flex-col gap-y-2">
          <Controller control={control} name='department' render={({ field }) => {
            return <>
              <Label>Department</Label>
              <Select value={field.value || ''} onValueChange={(value) => { field.onChange(value) }}>
                <SelectTrigger >
                  <SelectValue placeholder="Select" />
                </SelectTrigger>

                <SelectContent className='z-[200]'>
                  {departments?.map((department, index) => {
                    return <SelectItem key={index} value={department.value}>{department.label}</SelectItem>
                  })}
                </SelectContent>
              </Select>
            </>
          }} />
          {errors.department && <p className='text-sm text-red-500'>{errors.department.message}</p>}
        </div>

        {/* Fees */}

        <div className="w-full flex flex-col gap-y-2">
          <Label>Fees {currencySymbol()}</Label>
          <Input type='number' {...register('fees')} />
          {errors.fees && <p className='text-sm text-red-500'>{errors.fees.message}</p>}
        </div>

        {/*father name */}

        <div className="w-full flex flex-col gap-y-2">
          <Label>Father Name</Label>
          <Input type='text' {...register('father_name')} />
          {errors.father_name && <p className='text-sm text-red-500'>{errors.father_name.message}</p>}
        </div>

        {/*mother name */}

        <div className="w-full flex flex-col gap-y-2">
          <Label>Mother Name</Label>
          <Input type='text' {...register('mother_name')} />
          {errors.mother_name && <p className='text-sm text-red-500'>{errors.mother_name.message}</p>}
        </div>

        {/* gender */}

        <div className="w-full flex flex-col gap-y-2">
          <Controller control={control} name='gender' render={({ field }) => {
            return <>
              <Label>Gender</Label>
              <Select value={field.value || ''} onValueChange={(value) => { field.onChange(value) }}>
                <SelectTrigger >
                  <SelectValue placeholder="Select" />
                </SelectTrigger>

                <SelectContent className='z-[200]'>
                  <SelectItem value='male'>Male</SelectItem>
                  <SelectItem value='female'>Female</SelectItem>
                </SelectContent>
              </Select>
            </>
          }} />
          {errors.gender && <p className='text-sm text-red-500'>{errors.gender.message}</p>}
        </div>


        {/* Marital Status */}

        <div className="w-full flex flex-col gap-y-2">
          <Controller control={control} name='marital_status' render={({ field }) => {
            return <>
              <Label>Marital Status</Label>
              <Select value={field.value || ''} onValueChange={(value) => { field.onChange(value) }}>
                <SelectTrigger >
                  <SelectValue placeholder="Select" />
                </SelectTrigger>

                <SelectContent className='z-[200]'>
                  {maritalStatus?.map((status, index) => {
                    return <SelectItem key={index} value={status.value}>{status.label}</SelectItem>
                  })}
                </SelectContent>
              </Select>
            </>
          }} />
          {errors.marital_status && <p className='text-sm text-red-500'>{errors.marital_status.message}</p>}
        </div>

        {/* Blood Group */}

        <div className="w-full flex flex-col gap-y-2">
          <Controller control={control} name='blood_group' render={({ field }) => {
            return <>
              <Label>Blood Group</Label>
              <Select value={field.value || ''} onValueChange={(value) => { field.onChange(value) }}>
                <SelectTrigger >
                  <SelectValue placeholder="Select" />
                </SelectTrigger>

                <SelectContent className='z-[200]'>
                  {bloodGroups?.map((group, index) => {
                    return <SelectItem key={index} value={group.value}>{group.label}</SelectItem>
                  })}
                </SelectContent>
              </Select>
            </>
          }} />
          {errors.blood_group && <p className='text-sm text-red-500'>{errors.blood_group.message}</p>}
        </div>

        {/*Date of birth */}

        <div className="w-full flex flex-col gap-y-2">
          <Label>Date of birth</Label>
          <Input type='date' {...register('dob')} />
          {errors.dob && <p className='text-sm text-red-500'>{errors.dob.message}</p>}
        </div>

        {/*Date of joining */}

        <div className="w-full flex flex-col gap-y-2">
          <Label>Date of joining</Label>
          <Input type='date' {...register('date_of_joining')} />
          {errors.date_of_joining && <p className='text-sm text-red-500'>{errors.date_of_joining.message}</p>}
        </div>

        {/*Phone */}

        <div className="w-full flex flex-col gap-y-2">
          <Label>Phone</Label>
          <Input type='number' {...register('phone')} />
          {errors.phone && <p className='text-sm text-red-500'>{errors.phone.message}</p>}
        </div>

        {/*Emergency Contact */}

        <div className="w-full flex flex-col gap-y-2">
          <Label>Emergency Contact</Label>
          <Input type='number' {...register('emergency_contact')} />
          {errors.emergency_contact && <p className='text-sm text-red-500'>{errors.emergency_contact.message}</p>}
        </div>

        {/* Email */}

        <div className="w-full flex flex-col gap-y-2">
          <Label>Email</Label>
          <Input type='email' {...register('email')} />
          {errors.email && <p className='text-sm text-red-500'>{errors.email.message}</p>}
        </div>

        {/* Image */}

        <div className="w-full flex flex-col gap-y-2">
          <Controller control={control} name='image' render={({ field }) => {
            return <>
              <Label>Image</Label>
              <Input type='file'
                accept='image/*'
                onChange={(e) => { field.onChange(e.target.files?.[0]) }}
              />
            </>
          }} />
          {errors.image && <p className='text-sm text-red-500'>{errors.image.message}</p>}
        </div>

        {/* Current Address */}

        <div className="w-full flex flex-col gap-y-2 sm:col-span-2">
          <Label>Current Address</Label>
          <Input type='text' {...register('current_address')} />
          {errors.current_address && <p className='text-sm text-red-500'>{errors.current_address.message}</p>}
        </div>

        {/* Permanent Address */}

        <div className="w-full flex flex-col gap-y-2 sm:col-span-2">
          <Label>Permanent Address</Label>
          <Input type='text' {...register('permanent_address')} />
          {errors.permanent_address && <p className='text-sm text-red-500'>{errors.permanent_address.message}</p>}
        </div>

        {/* Qualification */}

        <div className="w-full flex flex-col gap-y-2 ">
          <Label>Qualification</Label>
          <Input type='text' {...register('qualification')} />
          {errors.qualification && <p className='text-sm text-red-500'>{errors.qualification.message}</p>}
        </div>

        {/* Specialist */}

        <div className="w-full flex flex-col gap-y-2">
          <Label>Specialist</Label>
          <Input type='text' {...register('specialist')} />
          {errors.specialist && <p className='text-sm text-red-500'>{errors.specialist.message}</p>}
        </div>

        {/* Work Experience */}

        <div className="w-full flex flex-col gap-y-2 ">
          <Label>Work Experience</Label>
          <Input type='text' {...register('work_experience')} />
          {errors.work_experience && <p className='text-sm text-red-500'>{errors.work_experience.message}</p>}
        </div>

        {/* Note */}

        <div className="w-full flex flex-col gap-y-2 ">
          <Label>Note</Label>
          <Input type='text' {...register('note')} />
          {errors.note && <p className='text-sm text-red-500'>{errors.note.message}</p>}
        </div>

        {/* Pan Number */}

        <div className="w-full flex flex-col gap-y-2 ">
          <Label>Pan Number</Label>
          <Input type='text' {...register('PAN')} />
          {errors.PAN && <p className='text-sm text-red-500'>{errors.PAN.message}</p>}
        </div>

        {/* National Identification Number */}

        <div className="w-full flex flex-col gap-y-2 ">
          <Label>National Identification Number</Label>
          <Input type='text' {...register('national_identification_number')} />
          {errors.national_identification_number && <p className='text-sm text-red-500'>{errors.national_identification_number.message}</p>}
        </div>

        {/* local Identification Number */}

        <div className="w-full flex flex-col gap-y-2 lg:col-span-2">
          <Label>Local Identification Number</Label>
          <Input type='text' {...register('local_identification_number')} />
          {errors.local_identification_number && <p className='text-sm text-red-500'>{errors.local_identification_number.message}</p>}
        </div>

        <div className="col-span-full flex gap-3 flex-col sm:flex-row">
          <div className='order-2 sm:order-1'>
            <Button className='w-full sm:w-auto' variant={'ghost'} onClick={() => { reset(); setEditmode(undefined) }}>Reset</Button>
          </div>
          <div className='sm:order-2'>
            <Button type='submit' className='w-full sm:w-auto'>{editMode ? 'Update' : 'Save'} {isPending && <Loader className='h-4 w-4 animate-spin' />}</Button>
          </div>
        </div>

      </form>
    </section>
  )
}

export default CreateStaff